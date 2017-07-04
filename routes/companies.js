var companies = [
    ];

exports.findAll = function (req, res, next) {
    var name = req.query.name;
    if (name) {
		       
        //**Sunny
       		
		var http = require('http');	

		http.get("http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&name="+name, function(res1) {
		  var body = ''; // Will contain the final response
		  // Received data is a buffer.
		  // Adding it to our body
		  res1.on('data', function(data){
			body += data;
		  });
		  // After the response is completed, parse it and log it to the console
		  res1.on('end', function() {
			var parsed = JSON.parse(body);
			//console.log(parsed.results[0]);
			//res.send(parsed.results[0]);
			companies=parsed.results;
			//console.log(companies);
			res.send(companies.filter(function(company) {
				
				//console.log(company);
				return (company.name + ' ' + company.businessId).toLowerCase().indexOf(name.toLowerCase()) > -1;
			}));
			
		  });
		})
		// If any error has occured, log error to console
		.on('error', function(e) {
		  console.log("Got error: " + e.message);
		});
        //**sunny
        
    } else {
        res.send(companies);
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    //res.send(companies[id]);
    var businessId=id;
        
    var http = require('http');		

	http.get("http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&businessId="+businessId, function(res1) {
	  var body = ''; // Will contain the final response
	  // Received data is a buffer.
	  // Adding it to our body
	  res1.on('data', function(data){
		body += data;
	  });
	  // After the response is completed, parse it and log it to the console
	  res1.on('end', function() {
		var parsed = JSON.parse(body);
		//console.log(parsed.results[0]);
		//res.send(parsed.results[0]);
		companies=parsed.results;
		//console.log(companies);
		
		res.send(companies[0]);
	  });
	})
	// If any error has occured, log error to console
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	//**sunny
    
};


exports.findByBusinessId = function (req, res, next) {
    var id = req.params.id;
    //res.send(companies[id]);
    var businessId=id;
        
    var http = require('http');		

	http.get("http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0&businessId="+businessId, function(res1) {
	  var body = ''; // Will contain the final response
	  // Received data is a buffer.
	  // Adding it to our body
	  res1.on('data', function(data){
		body += data;
	  });
	  // After the response is completed, parse it and log it to the console
	  res1.on('end', function() {
		var parsed = JSON.parse(body);
		//console.log(parsed.results[0]);
		//res.send(parsed.results[0]);
		companies=parsed.results;
		//console.log(companies);
		
		res.send(companies);
	  });
	})
	// If any error has occured, log error to console
	.on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
	//**sunny
    
};


