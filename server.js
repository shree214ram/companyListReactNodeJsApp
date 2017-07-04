var express = require('express'),
    companies = require('./routes/companies'),
    app = express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//Routing if url like   http://localhost:5000/#companies then companies findall function will call
app.get('/companies', companies.findAll);


//Routing if url like http://localhost:5000/#companies/3  then companies findById function will call
app.get('/companies/:id', companies.findById);

app.get('/companies_bid/:id', companies.findByBusinessId);


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
