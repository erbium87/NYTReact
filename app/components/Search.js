var React = require("react");

var Search = React.createClass({

	getInitialState: function() {
		return { topic: "", startDate: "", endDate: "" };
	},

	handleChange: function(event) {
		var target = event.target
		var value = target.type === 'text' ? target.text : target.value;
		var name = target.name;
		this.setState({ 
			[name]: value
		 });
	},

	handleSubmit: function(event) {
		event.preventDefault();

		this.props.setTerm(this.state.topic, this.state.startDate, this.state.endDate);
		this.setState({ topic: "", startDate: "", endDate: "" });
	},

	render: function() {
		return (
			<div className="panel panel-default">
			  <div className="panel-heading">
			    <h3 className="panel-title text-center">Search</h3>
			   </div>
			   <div className="panel-body text-center">
			     <form onSubmit={this.handleSubmit}>
			       <div className="form-group">
			         <h4 className="">
			           <strong>Search Topic</strong>
			         </h4>
			         	<input
			         	 name="topic"
               			 value={this.state.topic}
                		 type="text"
                		 className="form-control text-center"
                		 id="topic"
                		 onChange={this.handleChange}
                		 required
              			/>
             		 <br />
             		 
             		 <h4 className="">
			           <strong>Search Start Date</strong>
			         </h4>
			         	<input
			         	 name="startDate"
               			 value={this.state.startDate}
                		 type="text"
                		 className="form-control text-center"
                		 id="startDate"
                		 onChange={this.handleChange}
                		 required
              			/>
             		 <br />
             		 <h4 className="">
			           <strong>Search End Date</strong>
			         </h4>
			         	<input
			         	 name="endDate"
               			 value={this.state.endDate}
                		 type="text"
                		 className="form-control text-center"
                		 id="endDate"
                		 onChange={this.handleChange}
                		 required
              			/>
             		 <br />



             		 <button className="btn btn-primary" type="submit">Submit
              		 </button>
              	   </div>
              	 </form>
               </div>
            </div>
			          
		);
	}
});

module.exports = Search;