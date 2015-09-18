require('../scss/index.scss');

var React = require('react');
var App = require('grommet/components/App');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var TodoAppDashboard = require('./components/TodoAppDashboard');

var Main = React.createClass({
  render: function() {
    return (
      <App centered={false}>
        <Header direction="row" justify="between" large={true} pad={{horizontal: 'medium'}}>
          <Title><%= appTitle %></Title>
        </Header>
        <TodoAppDashboard />
        <Footer appCentered={true} direction="column"
          align="center" pad="small" colorIndex="grey-1">
          <p>Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!</p>
        </Footer>
      </App>
    );
  }
});

var element = document.getElementById('content');
React.render(React.createElement(Main), element);

document.body.classList.remove('loading');
