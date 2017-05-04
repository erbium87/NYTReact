var axios = require("axios");

var nytAPI = "8cd5656b7e914603b3c8dee57d88154e";

var helper = {
	runQuery: function(topic, startDate, endDate) {
		console.log(topic, startDate, endDate);

		// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json",
		// 	qs: {
		// 		"api-key": nytAPI
		// 	};
		// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
		// 	queryURL+= "?" + $.params({
		// 		"api-key": nytAPI,
		// 		"q": topic,
		// 		"begin_date": startDate,
		// 		"end_date": endDate
		// 	});
		return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
			params: {
				"api-key": nytAPI,
				"q": topic,
				"begin_date": startDate,
				"end_date": endDate
			}
		}).then(function(response) {
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
		return axios.post("/api", {
			title: title,
			date: date,
			url: url
		});
	}
};

module.exports = helper;