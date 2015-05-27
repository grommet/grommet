require("../scss/index.scss");

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var TodoAppDashboard = require('./components/TodoAppDashboard');

var Main = React.createClass({
	getInitialState: function() {
		return {
			tasks: [
		  	{
		  		type: 'error',
		  		item: 'The coffee pot needs to be cleaned.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'It\'s going to be a sunny day tomorrow.'
		  	},
		  	{
		  		type: 'warning',
		  		item: 'Don\'t forget your anniversary in two weeks.'
		  	},
		  	{
		  		type: 'warning',
		  		item: 'Pay my late bills.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'Go to the Sharks game tomorrow.'
		  	},
		  	{
		  		type: 'ok',
		  		item: 'Go to Santa Cruz, it\'s summer time.'
		  	},
	  	]
		};
	},
  render: function() {
    return (
      <App centered={false}>
        <Header primary={true}>
          <Title><%= appTitle %></Title>
        </Header>
        <TodoAppDashboard tasks={this.state.tasks} />
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');