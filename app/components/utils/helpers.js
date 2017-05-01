var axios = require("axios");

var nytAPI = "8cd5656b7e914603b3c8dee57d88154e";

var helper = {
	runQuery: function(article) {
		console.log(article);

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
			queryURL+= "?" + $.params({
				"api-key": nytAPI,
				"q": search,
				"begin_date": start,
				"end_date": end
			});
		return axios.get(queryURL).then(function(response) {
			if (response.data.results[0]) {
				return response.data.results[0].formatted;
			}

			return "";
		});
	},
	getArticle: function() {
		return axios.get("/api");
	},
	postArticle: function() {
		return axios.post("/api", {location: location});
	}
};

module.exports = helper;