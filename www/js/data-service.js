companyService = (function () {

    var baseURL = "";

    // The public API
    return {
        findById: function(id) {
            return $.ajax(baseURL + "/companies/" + id);
        },
        findByBusinessId: function(id) {
            return $.ajax(baseURL + "/companies_bid/" + id);
        },
        findByName: function(searchKey) {
            var treturn = $.ajax({url: baseURL + "/companies", data: {name: searchKey}});
            return treturn;
			 
        }
    };

}());



