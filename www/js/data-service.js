companyService = (function () {

    //var baseURL = "http://avoindata.prh.fi/bis/v1?totalResults=false&maxResults=10&resultsFrom=0";
    var baseURL = "";

    // The public API
    return {
        findById: function(id) {
            return $.ajax(baseURL + "/companies/" + id);
        },
        findByName: function(searchKey) {
            return $.ajax({url: baseURL + "/companies", data: {name: searchKey}});
            /*var treturn =$.ajax({url: baseURL + "", data: {name: searchKey}});
            console.log(treturn.results);
            console.log("shree")*/
            /*
             res.send(companies.filter(function(company) {
            return (company.firstName + ' ' + company.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1;
        }));
             * */
        }
    };

}());



