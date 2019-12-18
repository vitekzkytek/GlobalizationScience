# Globalization of Science

Evidence from Authors in Academic Journalsby Country of Origin
By Vítek Macháček and Martin Srholec

see (http://www.globalizationofscience.com/)[http://www.globalizationofscience.com/]


## Repo Contents:

### `/DownloadData/`

contains downloading scripts for getting the journal data from the Scopus API

Downloads country distribution, affiliation and language distribution for each journal indexed in the [Scopus Source List](/DownloadData/ext_list_April_2018_2017_Metrics.xlsx) in each year between 2005 and 2017.
Stores the output in the SQLite database

Launch download with `downloadAll()`  method in the `Download.py` file.

Scopus API key with appropriate bottleneck (approx. 0.5M requests per week) needed.


### `/CalculateGlobalization/`

contains various methods to calculate globalization from data stored in SQLite into files:
`20181218_AllFieldsCountriesMethods_bot_all.csv` contains data for bottom level of disciplines (Scopus subject areas)
`20181218_AllFieldsCountriesMethods_TOP.xlsx` contains data for top level of disciplines (Life Sciences, Physical Sciences, Medical Sciences, Social Sciences)

 
 ### `/TransformToWeb/`
 Transform data from previous section into a web readable data that can be feeded into the database
 
 
 ### `/InteractiveWeb/`
 Deployment-ready Docker container to launch the app anywhere.
 
Run container:

1. Install Docker
2. go to `/InteractiveWeb/`
3. docker-compose up

