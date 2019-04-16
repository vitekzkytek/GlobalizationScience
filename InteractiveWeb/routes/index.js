var express = require('express');
var router = express.Router();

const fetcher = require('../prisma/fetchPrisma.js');


const pgres = require('../routes/postgres.js');



router.post('/map',function (req,res,next) {
    let quer = 'select i.country_code, i.value, c.name from interindex i \n' +
        'inner join country c on c.country_code = i.country_code \n' +
        'where i.method_code = $1 and i.field_code = $2 and i.period = $3 and c.type = \'country\'';

    let resp = pgres.query(quer, [req.body.method_code,req.body.field_code,req.body.period]);
    resp.then(result => {
        res.send(result)}
    ).catch(result => {
        res.send('Map Query failed! ' + result)
    })
});

router.post('/line',function (req,res,next) {
    let quer = 'select period,value from interindex i \n' +
    'where i.field_code = $1 and i.country_code = $2 and method_code = $3';

    let resp = pgres.query(quer, [req.body.field_code,req.body.country_code,req.body.method_code]);
    resp.then(result => {
        res.send(result)}
    ).catch(result => {
        res.send('Map Query failed! ' + result)
    })
});



/* POST home page. */
router.post('/prisma', function(req, res, next) {
    let queryFunction;

    switch (req.body.id) {
        case 'queryInterindex':
            queryFunction = fetcher.queryInterindex;
            break;

        case 'queryFields':
            queryFunction = fetcher.queryFields;
            break;

        case 'queryCountries':
            queryFunction = fetcher.queryCountries;
            break;

        case 'queryMethods':
            queryFunction = fetcher.queryMethods;
            break;

        // case 'queryMap':
        //     const { reqbody } = req.body;
        //     queryFunction = pgres.query('SELECT * FROM country', [reqbody]);
        //     break;
        default:
            console.log('wrong post request: ' + JSON.stringify(req.body))
    }
    let resp = queryFunction(req.body);
    resp.then(result => {
        res.send(result)}
     ).catch(result => {
         res.send('Query failed! ' + result)
     })
});

module.exports = router;