require("../scss/index.scss");

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var CtoAppDashboard = require('./components/CtoAppDashboard');

var Main = React.createClass({
  render: function() {
    return (
      <App centered={false}>
        <Header primary={true} flush={false}>
          <Title>CTO Application Tuner</Title>
        </Header>
        <CtoAppDashboard />
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');