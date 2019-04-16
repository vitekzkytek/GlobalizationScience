#%%
BundleID=1
from sqlalchemy import create_engine
import pandas as pd
from tqdm import tqdm
import os
maxOrMin = {
        'euclid':'min',
        'cosine':'max',
        'maxdif':'min',
        'cityblock':'min',
        'GiniSimpson':'max',
        'shareEnglish':'max',
        'weightGini':'min',
        'instTOP3':'min',
        'top3':'min',
        'localShare':'min'
    }

def DB_GetInternationalityData(field,period,fieldDistAllYears,conn=None):
    if conn is None:
        conn = DB_joinJournals()

    def CleanCountriesDF(df):
        df = df.drop('Undefined',axis='columns')

        if 'Yugoslavia' in df.columns:  # Can be a bit misleading, but most of more than 2 000 results are actually coming from Serbian affiliations in Beograd, Nis, Novi Sad etc.
            ### See AFFILCOUNTRY ( yugoslavia )  AND  DOCTYPE ( ar  OR  re  OR  cp )  AND  PUBYEAR  >  2000 in Scopus
            if 'Serbia' in df.columns:
                df.Serbia = df.Serbia + df.Yugoslavia
            else:
                df.loc[:, 'Serbia'] = df.Yugoslavia
            df = df.drop('Yugoslavia', axis='columns')

        if 'Russia' in df.columns:
            if 'Russian Federation' in df.columns:  # only 4 documents in 2004 and 2005
                df['Russian Federation'] = df['Russian Federation'] + df.Russia
            else:
                df.loc[:, 'Russian Federation'] = df.Russia
            df = df.drop('Russia', axis='columns')

        return df
    def CleanCountriesSeries(df):
        df = df.drop('Undefined')

        if 'Yugoslavia' in df.index:  # Can be a bit misleading, but most of more than 2 000 results are actually coming from Serbian affiliations in Beograd, Nis, Novi Sad etc.
            ### See AFFILCOUNTRY ( yugoslavia )  AND  DOCTYPE ( ar  OR  re  OR  cp )  AND  PUBYEAR  >  2000 in Scopus
            if 'Serbia' in df.index:
                df.loc['Serbia'] = df.loc['Serbia'] + df.loc['Yugoslavia']
            else:
                df.loc['Serbia'] = df.loc['Yugoslavia']
            df = df.drop('Yugoslavia')

        if 'Russia' in df.index:
            if 'Russian Federation' in df.index:  # only 4 documents in 2004 and 2005
                df.loc['Russian Federation'] = df.loc['Russian Federation'] + df.loc['Russia']
            else:
                df.loc['Russian Federation'] = df.loc['Russia']
            df = df.drop('Russia')

        return df

    # Get from DB
    total = DB_GetTotalArticlesOfField(field,period,conn)
    countries = DB_GetJournalCountriesOfField(field, period, conn)
    eng = DB_GetEnglishDocuments(field,period,conn)
    locales = DB_GetLocalDocuments(field, period, conn)
    fieldAllYears = DB_GetFieldDistributionAllYears(field,conn)

    issns = total.index
    # Remove Undefined
    DefinedTotal = total - countries.Undefined

    # Clean country columns

    DefinedCountries = CleanCountriesDF(countries)
    fieldAllYears = CleanCountriesSeries(fieldAllYears)

    # load precalculated
    AffilSums = pd.read_excel('Sums/AffilSums_N_3.xlsx')
    AffilSums = AffilSums.reindex(DefinedTotal.index).loc[:,period]


    # return clean data
    d = {}
    d['countries'] = DefinedCountries
    d['total'] = DefinedTotal
    d['totalUndefined'] = total
    d['field'] = field
    d['CalcFieldDistAllYears'] = fieldDistAllYears
    d['fieldAllYears'] = fieldAllYears
    d['period'] = period
    d['eng'] = eng.reindex(issns,fill_value=0)
    d['locals'] = locales.reindex(issns,fill_value=0)
    d['AffilSums'] = AffilSums

    return d


def DB_joinJournals(path=None):
    if path is None:
        path = 'sqlite:///{}\\180802_1611_AllJournals_ArReCp_2001_2017.sqlite'.format(os.getcwd())
    engine = create_engine(path)
    return engine

def DB_GetListOfFields(level,conn= None):
    if conn is None:
        DB_joinJournals()
    fields = pd.read_sql_table('fields',conn)

    return list(fields[fields.level == level].DB_Shortcut)



def DB_GetLocalDocuments(field,period,conn = None):
    if conn is None:
        conn = DB_joinJournals()

    if field == 'All':
        query = '''
        SELECT
            issns.name as ISSN,
            ArticleCountries.Articles as Documents
        FROM ArticleCountries
        INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
        INNER JOIN periods ON ArticleCountries.PeriodID = periods.ID
        INNER JOIN issns on ArticleCountries.ISSNID = issns.ID
        WHERE BundleID = {}
        AND
            periods.name = {}
        AND
            issns.PublisherCountryID = ArticleCountries.FacetID
        '''.format(BundleID,period)
    else:
        query = '''
        SELECT
            issns.name as ISSN,
            ArticleCountries.Articles as Documents
        FROM ArticleCountries
        INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
        INNER JOIN periods ON ArticleCountries.PeriodID = periods.ID
        INNER JOIN issns on ArticleCountries.ISSNID = issns.ID
        WHERE BundleID = {}
        AND
            periods.name = {}
        AND
            issns.PublisherCountryID = ArticleCountries.FacetID
        AND 
            issns.{} = 1
        '''.format(BundleID,period,field)


    locals = pd.read_sql_query(query,conn,index_col='ISSN')
    return locals.Documents

def CalcAndSaveNSums(tbl,n,conn=None):
    if conn is None:
        conn = DB_joinJournals()
    years = range(2001, 2018)
    dfs = []
    for year in years:
        query = '''
            SELECT i.name as ISSN,
                   Articles as Documents

            FROM {} AS T
            INNER JOIN issns i on T.ISSNID = i.ID
            INNER JOIN periods p on T.PeriodID = p.ID
            WHERE BundleID = {}
            AND p.name = {}
        '''.format(tbl,BundleID,year)
        df = pd.read_sql_query(query, conn)
        issns = df.ISSN.unique()
        result = pd.DataFrame()
        for issn in tqdm(issns, str(year)):
            sum = df.loc[df.ISSN == issn].Documents.sort_values(ascending=False).iloc[:n].sum()
            result.loc[issn, year] = sum
        dfs.append(result)

    total = pd.concat(dfs, axis=1)
    total.to_excel('Sums/AffilSums_N_{}.xlsx'.format(n))



def DB_GetJournalCountriesOfField(field, period, conn):
    if field == 'All':
        data = pd.read_sql_query('''
            SELECT
                Articles as Documents,
                countries.name AS Country,
                issns.name as ISSN
            FROM ArticleCountries
                INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
                INNER JOIN issns ON issns.ID = ArticleCountries.ISSNID
                INNER JOIN periods ON periods.ID = ArticleCountries.PeriodID
            WHERE BundleID={}
                AND periods.name = {}
            ORDER BY ISSN DESC, Documents DESC
       '''.format(BundleID,period), conn)
    else:
        data = pd.read_sql_query('''
            SELECT
                Articles as Documents,
                countries.name AS Country,
                issns.name as ISSN
            FROM ArticleCountries
                INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
                INNER JOIN issns ON issns.ID = ArticleCountries.ISSNID
                INNER JOIN periods ON periods.ID = ArticleCountries.PeriodID
            WHERE BundleID={}
                AND periods.name = {}
                AND issns.{} = 1
            ORDER BY ISSN DESC, Documents DESC
        '''.format(BundleID,period,field),conn)
    pivot = data.pivot(index='ISSN',columns='Country',values='Documents')
    return pivot.fillna(0).astype(int)#.div(total,axis=0)

def DB_GetFieldCountries(field, period, conn=None):
    if conn is None:
        conn = DB_joinJournals()

    if field == 'All':
        data = pd.read_sql_query('''
                SELECT
                    Sum(Articles) as Documents,
                    countries.name AS Country
                FROM ArticleCountries
                    INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
                    INNER JOIN issns ON issns.ID = ArticleCountries.ISSNID
                    INNER JOIN periods ON periods.ID = ArticleCountries.PeriodID
                WHERE BundleID={}
                AND periods.name = {}
                GROUP BY Country
                ORDER BY Documents DESC
            '''.format(BundleID,period), conn, index_col='Country')
    else:
        data = pd.read_sql_query('''
            SELECT
                Sum(Articles) as Documents,
                countries.name AS Country
            FROM ArticleCountries
                INNER JOIN countries ON countries.ID = ArticleCountries.FacetID
                INNER JOIN issns ON issns.ID = ArticleCountries.ISSNID
                INNER JOIN periods ON periods.ID = ArticleCountries.PeriodID
            WHERE BundleID={}
            AND periods.name = {}
            AND issns.{} = 1
            GROUP BY Country
            ORDER BY Documents DESC
        '''.format(BundleID,period,field),conn,index_col='Country')
        if 'Undefined' in data.index:
            data.drop('Undefined',axis=0)
    return data.Documents#/total.sum()

def DB_GetEnglishDocuments(field,period,conn):
    if field == 'All':
        query = '''
        SELECT
            issns.name as ISSN,
            Articles as English
        FROM ArticleLanguages
            INNER JOIN languages ON languages.ID = ArticleLanguages.FacetID
            INNER JOIN issns ON issns.ID = ArticleLanguages.ISSNID
            INNER JOIN periods ON periods.ID = ArticleLanguages.PeriodID
        WHERE BundleID={}
            AND periods.name = {}
            AND languages.name = 'English'
        ORDER BY ISSN DESC

        '''.format(BundleID,period)
    else:
        query = '''
        SELECT
            issns.name as ISSN,
            Articles as English
        FROM ArticleLanguages
            INNER JOIN languages ON languages.ID = ArticleLanguages.FacetID
            INNER JOIN issns ON issns.ID = ArticleLanguages.ISSNID
            INNER JOIN periods ON periods.ID = ArticleLanguages.PeriodID
        WHERE BundleID={}
            AND periods.name = {}
            AND issns.{}= 1
            AND languages.name = 'English'
        ORDER BY ISSN DESC
        '''.format(BundleID,period,field)
    return pd.read_sql_query(query,conn,index_col='ISSN').English

def DB_GetTotalArticlesOfField(field,period,conn):
    if field == 'All':
        totalArticles = pd.read_sql_query('''
        SELECT Articles as Documents,
            issns.name as ISSN
        FROM totalArticles
            INNER JOIN issns ON issns.ID = totalArticles.ISSNID
            INNER JOIN periods ON periods.ID = totalArticles.PeriodID
        WHERE
            BundleID = {}
          AND
            periods.name = {}
        ORDER BY ISSN ASC
        '''.format(BundleID,period),conn,index_col='ISSN')
    else:
        totalArticles = pd.read_sql_query('''
        SELECT Articles as Documents,
            issns.name as ISSN
        FROM totalArticles
            INNER JOIN issns ON issns.ID = totalArticles.ISSNID
            INNER JOIN periods ON periods.ID = totalArticles.PeriodID
        WHERE
            BundleID = {}
          AND
            periods.name = {}
          AND
            issns.{} = 1
        ORDER BY ISSN ASC
        '''.format(BundleID,period,field),conn,index_col='ISSN')

    return totalArticles[totalArticles.Documents > 0].Documents



def DB_GetFieldDistributionAllYears(field,conn):
    if field == 'All':
        fieldDist = pd.read_sql_query('''
        SELECT c.name as Country, sum(Articles) as Documents
        FROM ArticleCountries
        inner join countries c on ArticleCountries.FacetID = c.ID
        where
            BundleID = {} 
        group by c.name
        '''.format(BundleID,field),conn,index_col='Country')

    else:
        fieldDist = pd.read_sql_query('''
        SELECT c.name as Country, sum(Articles) as Documents
        FROM ArticleCountries
        inner join countries c on ArticleCountries.FacetID = c.ID
        inner join issns i on ArticleCountries.ISSNID = i.ID
        where
            BundleID = {}
          and
            i.{} = 1
        group by c.name
        '''.format(BundleID,field),conn,index_col='Country')

    return fieldDist[fieldDist.Documents > 0].Documents
