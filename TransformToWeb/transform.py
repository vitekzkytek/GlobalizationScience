import pandas as pd
import sqlite3
import numpy as np


def loadAll(topData,bottomData,additionalData):
    # load data
    tops = pd.read_excel(topData,index_col=[0,1,2,3]).reset_index()
    bottoms = pd.read_csv(bottomData,index_col=[0,1,2,3]).reset_index()

    bottoms = bottoms[bottoms.Field != 'All']
    
    # concatenate dfs
    df = pd.concat([tops,bottoms],ignore_index=True)

    # load additional details for countries and methods
    countries = pd.read_excel(additionalData,sheet_name='country')
    index = pd.read_excel(additionalData,sheet_name='index',index=False)
    methods = pd.read_excel(additionalData,sheet_name='method')

    #rename columns and create globs dataframe
    globs = pd.merge(df,countries,how='left',left_on='Country',right_on='full_name').loc[:,['country_code','Field','Method','Period','Internationality']]
    globs.columns = index.columns

    #filter out data to 2004
    globs = globs.loc[globs.period > 2004]
    
    minimaxs = methods.set_index(methods.method_code).minmax.map({'min':-1,'max':1})
    
    # rescale from 0 (min) to 1 (max)
    globs['minmax'] = globs.method_code.map(minimaxs)
    globs.value = globs.value * globs.minmax
    globs = globs.drop('minmax',axis=1)
    
    return globs,countries,methods


def getDocsJournalsForField(field,conn):

    if field == 'All':
        query ='''
        SELECT
       c.name as Country,
       p.name as Year,
       Sum(A.Articles) AS Documents,
       Count(A.Articles) as Journals

        FROM ArticleCountries as A
        INNER JOIN countries c on A.FacetID = c.ID
        INNER JOIN periods p on A.PeriodID = p.ID
        INNER JOIN issns i on A.ISSNID = i.ID
        GROUP BY Country,Year

        '''
    else:
        query = '''
        SELECT
       c.name as Country,
       p.name as Year,
       Sum(A.Articles) AS Documents,
       Count(A.Articles) as Journals

        FROM ArticleCountries as A
        INNER JOIN countries c on A.FacetID = c.ID
        INNER JOIN periods p on A.PeriodID = p.ID
        INNER JOIN issns i on A.ISSNID = i.ID
        WHERE i.{} = 1
        GROUP BY Country,Year
        
        '''.format(field)

    df = pd.read_sql_query(query,conn)
    df['field'] = field
    return df

def filterSmallCountryDisciplines(globs,countries,jrnThreshold=30):

    fields = globs.field_code.unique()

    conn = sqlite3.connect('180802_1611_AllJournals_ArReCp_2001_2017.sqlite')
    
    dfs = []

    for field in fields:
        dfs.append(getDocsJournalsForField(field,conn))

    filters = pd.concat(dfs).merge(countries.loc[:,['country_code','full_name']],left_on='Country',right_on='full_name').drop('full_name',axis=1)
    filters['include'] = np.where(filters['Journals'] >= jrnThreshold, True, False)
    filters.Year = pd.to_numeric(filters.Year)

    globs = globs.merge(filters,left_on=['country_code','field_code','period'],right_on=['country_code','field','Year'],how='left')
    globs = globs[globs['include'] == True]
    globs = globs.drop(['Documents','Journals','field','Country','Year','include'],axis=1)
    
    return globs

def addGroupAvgs(globs,countries):
    avgs = [globs]
    def calcGroupAverage(mergedDF,countriesDF,dimension,new_country_codes):
        df = mergedDF.merge(countriesDF,on='country_code',how='left').set_index(keys=['country_code','field_code','method_code','period'])
        df = df[['value',dimension]]
        g = df.groupby(['field_code','method_code','period',dimension]).mean().reset_index()
        g['country_code'] = g[dimension].map(new_country_codes,na_action='ignore')
        return g.drop(dimension,axis=1)[mergedDF.columns].dropna()

    cntrs = [countries]
    def appendToCountries(countries,d):
        l = [{'country_code':d[key],'full_name':key,'name':key,'Type':'aggregate'} for key in d.keys()]
        df = pd.DataFrame(l)
        return df

    #regions
    d = {
        'Europe':'_Europe',
        'North America':'_NAmer',
        'South America':'_SAmer',
        'Central Asia':'_CAsia',
        'Middle East':'_MEast',
        'East Asia':'_EAsia',
        'South Asia':'_SAsia',
        'Pacific':'_Pac',
        'North Africa':'_NAfr', 
        'Sub-Saharan Africa':'_SSAfr'
        }
    avgs.append(calcGroupAverage(globs,countries, 'region',d))
    cntrs.append(appendToCountries(countries,d))


    # Income Level
    d = {'Upper middle income':'_UMI','High income':'_HI','Lower middle income':'_LMI','Low income':'_LI'}
    avgs.append(calcGroupAverage(globs,countries, 'incomelevel',d))
    cntrs.append(appendToCountries(countries,d))


    #EU
    d = {'EU-15':'_EU15','EU-13':'_EU13'}
    avgs.append(calcGroupAverage(globs,countries, 'eu_sub',d))
    cntrs.append(appendToCountries(countries,d))

    # whole EU
    d = {'EU-28':'_EU'}
    avgs.append(calcGroupAverage(globs,countries, 'eu',d))
    cntrs.append(appendToCountries(countries,d))


    #OECD
    d = {'OECD':'_OECD'}
    avgs.append(calcGroupAverage(globs,countries, 'oecd',d))
    cntrs.append(appendToCountries(countries,d))


    #IMF 2003
    d = {
        'Advanced countries':'_ADV',
        'Transition countries':'_TRA',
        'Developing countries':'_DEV'
    }
    avgs.append(calcGroupAverage(globs,countries, 'imf2003',d))
    cntrs.append(appendToCountries(countries,d))

    wld = globs.groupby(['field_code','method_code','period']).mean().reset_index()
    wld['country_code'] = '_AV'
    wld = wld[globs.columns]
    avgs.append(wld)

    cntrs.append(appendToCountries(countries,{'World':'_AV'}))

    merged = pd.concat(avgs,ignore_index=True)
    countries = pd.concat(cntrs,ignore_index=True)
    return merged, countries

def normalize(globs):
    for method in globs.method_code.unique():
        dfm = globs.loc[globs.method_code == method,:]
        dfm.loc[:,'value'] = (dfm.value - dfm.value.min())/(dfm.value.max() - dfm.value.min())
        globs.loc[globs.method_code == method,'value'] = dfm.loc[:,'value']
    return globs


def saveToCSVs(globs,countries,additionalDataPath,csvDir):
    countries.to_csv(csvDir + 'country.csv',index=False)
    pd.read_excel(additionalDataPath,sheet_name='method').to_csv(csvDir + 'method.csv',index=False)
    pd.read_excel(additionalDataPath,sheet_name='field').to_csv(csvDir + 'field.csv',index=False)
    globs.to_csv(csvDir + 'index.csv',index=False)
    

def genDropdownData(csvDir,additionalDataPath,ddlPath):
    methods = pd.read_excel(additionalDataPath,sheet_name='method')

    df_methods = pd.read_excel(additionalDataPath,sheet_name='method',index_col='method_code')
    df_methods = df_methods.loc[['euclid','weightGini','localShare','shareEnglish','top3','GiniSimpson'],:]
    df_fields = pd.read_excel(additionalDataPath,sheet_name='field',index_col='field_code')
    df_countries = pd.read_excel(additionalDataPath,sheet_name='country',index_col='country_code')
    df_countries = pd.read_csv(csvDir + 'country.csv').set_index('country_code')[df_countries.columns]
        
    globs = pd.read_csv(csvDir + 'index.csv')
    df_countries = df_countries.loc[df_countries.index.isin(globs.country_code.unique())]
    d_aggr = df_countries.loc[df_countries.Type == 'aggregate','name'].reset_index().rename(columns={'country_code':'id','name':'text'}).to_dict(orient='records')
    d_cntrs = df_countries.loc[df_countries.Type == 'country','name'].reset_index().rename(columns={'country_code':'id','name':'text'}).sort_values('text').to_dict(orient='records')
    d_countries = {'results':[{'text':'Country Groups','children':d_aggr},{'text':'Countries','children':d_cntrs}]}

    regions = ['_NAmer', '_EAsia', '_Europe', '_SAsia', '_Pac', '_SAmer', '_CAsia', '_MEast', '_SSAfr', '_NAfr']
    incomes = ['_HI','_UMI', '_LMI', '_LI']
    status = ['_ADV', '_TRA', '_DEV']
    others = [ '_EU15', '_EU13', '_EU', '_OECD']

    d_cntrs = df_countries.loc[df_countries.Type == 'country','name'].reset_index().rename(columns={'country_code':'id','name':'text'}).sort_values('text').to_dict(orient='records')

    aggr = df_countries.loc[df_countries.Type == 'aggregate','name'].reset_index().rename(columns={'country_code':'id','name':'text'})
    d_regions = aggr.loc[aggr.id.isin(regions)].to_dict(orient='records')
    d_status = aggr.loc[aggr.id.isin(status)].to_dict(orient='records')
    d_incomes = aggr.loc[aggr.id.isin(incomes)].to_dict(orient='records')
    d_incomes_sorted = []
    for el in incomes:
        texts = [t['text'] for t in d_incomes if t['id'] == el]
        d_incomes_sorted.append({'id':el,'text':texts[0]})
    d_others = aggr.loc[aggr.id.isin(others)].to_dict(orient='records')

    d_countries = {'results':
                   [
                       {'children':[{'id':'_AV','text':'World'}]},
                       {'text':'Development Status','children':d_status},
                       {'text':'Income','children':d_incomes_sorted},
                       {'text':'Regions','children':d_regions},
                       {'text':'Other','children':d_others},
                       {'text':'Countries','children':d_cntrs}
                   ]
                  }
    
    disc_sel2 = df_fields.loc[:,'leg_name'].reset_index().rename(columns={'field_code':'id','leg_name':'text'})
    ltops = ['top_Life', 'top_Physical', 'top_Health', 'top_Social']
    lbottoms =['bot_General', 'bot_AgriculturalAndBiological',
           'bot_ArtsHumanities', 'bot_BiochemistryGeneticsMolecularBiology',
           'bot_BusinessManagementAccounting', 'bot_ChemicalEngineering',
           'bot_Chemistry', 'bot_ComputerScience', 'bot_DecisionSciences',
           'bot_EarthPlanetarySciences', 'bot_EconomicsEconometricsFinance',
           'bot_Energy', 'bot_Engineering', 'bot_EnvironmentalScience',
           'bot_ImmunologyMicrobiology', 'bot_Materials', 'bot_Mathematics',
           'bot_Medicine', 'bot_Neuroscience', 'bot_Nursing',
           'bot_PharmacologyToxicologyPharmaceutics', 'bot_PhysicsAstronomy',
           'bot_Psychology', 'bot_SocialSciences', 'bot_Veterinary',
           'bot_Dentistry', 'bot_HealthProfessions']

    d_tops = disc_sel2.loc[disc_sel2.id.isin(ltops)].to_dict(orient='records')
    d_bottoms = disc_sel2.loc[disc_sel2.id.isin(lbottoms)].to_dict(orient='records')

    d_fields = {'results':
                   [
                       {'children':[{'id':'All','text':'All disciplines'}]},
                       {'text':'Broad Subject Clusters','children':d_tops},
                       {'text':'Major Subject Areas','children':sorted(d_bottoms, key=lambda k: k['text'])}
                   ]
                  }
    
    df_methods['rank'] = pd.Series({'euclid':0,'weightGini':2,'localShare':4,'shareEnglish':5,'top3':3,'GiniSimpson':1})
    df_methods = df_methods.sort_values('rank',ascending=True).drop('rank',axis=1)
    d_methods = df_methods.reset_index().rename(columns={'method_code':'id','name':'text'}).to_dict(orient='records')
    d_methods = {'results':d_methods,'pagination':{'more':True}}

    d = {'methods': d_methods,'fields':d_fields,'countries':d_countries}

    import json
    s = 'var controllers = %s' % (json.dumps(d))

    with open(ddlPath, "w") as f:
        f.write(s)


def processDataForWeb(topData,bottomData,additionalData,csvDir,ddlPath):
    
    globs,countries,methods = loadAll(topData,bottomData,additionalData)
    print('Data from previous calculation succesfully loaded ...')
    globs = filterSmallCountryDisciplines(globs,countries)
    print('Excluded all globalizations from countries and disciplines that contribute to less than 30 journals ...')
    globs,countries = addGroupAvgs(globs,countries)
    print('Succesfully calculated group averages ...')
    globs = normalize(globs)
    print('Results normalized between 0 and 1')
    saveToCSVs(globs,countries,additionalData,csvDir)
    print('Data for database saved in the {} directory'.format(csvDir))
    genDropdownData(csvDir,additionalData,ddlPath)
    print('Data for dropdown lists in interactive webpage saved into {}'.format(ddlPath))
    print('Processing for web finished!')

    