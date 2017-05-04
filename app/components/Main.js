var React = require("react");

var Search = require("./Search");
var Saved = require("./Saved");

var helpers = require("./utils/helpers");

var Main = React.createClass({
//not sure what goes into getInitialState
getInitialState: function() {
	return { searchTerm: "", results: "", saved: [] };
},
//page renders, get articles (getArticle in helpers.js)
componentDidMount: function() {
	helpers.getArticle().then(function(response) {
		console.log(response);
		if (response !== this.state.saved) {
			console.log("Saved", response.data);
			this.setState({ saved: response.data });
		}
	}.bind(this));
},

componentDidUpdate: function() {
	helpers.runQuery(this.state.searchTerm).then(function(data) {
		if (data !== this.state.results) {
			console.log("Saved", data);
			this.setState({ results: data });

			helpers.postArticle(this.state.searchTerm).then(function(){
				console.log("Updated!");
				helpers.getArticle().then(function(response) {
					console.log("Current Article", response.data);
					console.log("Saved", response.data);
					this.setState({ saved: response.data});
				}.bind(this));
			}.bind(this));
		}
	}.bind(this));

},

setTerm: function(topic, startDate, endDate) {
	this.setState({ searchTerm: topic });
},

render: function() {
	return (
	  <div className="container">
		<div className="row">
		  <div className="jumbotron">
		    <h1 className="text-center">New York Times</h1>
		    <p className="text-center"><em>Search the New York Times</em></p>
		    <a href="#saved"><button className="btn btn-default">Saved</button></a>
		    <a href="#search"><button className="btn btn-default">Search</button></a>
		  </div>

		  <div className="col-md-6">
		    <Search setTerm={this.setTerm} />
		  </div>
		</div>

		  <div className="row">
		    <Saved article={this.state.saved} />
		  </div>

	  </div>

	);
}
});

module.exports = Main;
