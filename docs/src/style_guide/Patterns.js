// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LoginForm = require('grommet/components/LoginForm');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var Donut = require('grommet/components/Donut');
var Search = require('grommet/components/Search');
var Logo = require('../img/Logo');
var Gravatar = require('react-gravatar');

var PatternsHeader = React.createClass({
  render: function () {
    return (
      <header>
      <h1>Patterns</h1>

      <p>Interaction design patterns are task driven workflows commonly
      used throughout a user interface.  Designers and developers should
      follow the design pattern guidance in order to create consistent user
      experiences across the product suite. Once a user is familiar with
      the design patterns of your application they will come to expect the
      same experience for the same tasks in other applications.</p>
      </header>
    );
  }
});

var PatternsSection = React.createClass({
  render: function () {

    var genericSeries = [
      {label: 'Used', value: 10, units: 'TB'},
      {label: 'Available', value: 20, units: 'TB'}
    ];

    var statusSeries = [
      {label: 'Error', value: 10, colorIndex: 'error'},
      {label: 'Warning', value: 20, colorIndex: 'warning'},
      {label: 'OK', value: 70, colorIndex: 'ok'}
    ];

    return (
      <div>
  <section>
    <h2>Login</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/login">Read more</a></p>

    <div className="example">
      <LoginForm rememberMe={true} forgotPassword={<a>Forgot password?</a>} />
    </div>

  </section>

  <section>
    <h2>Header</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/header">Read more</a></p>

    <div className="example">
      <Header>
        <h1><Logo /> Title</h1>
        <Menu direction="left">
          <Gravatar email={'eric.soderberg@hp.com'} size={48} />
        </Menu>
      </Header>
    </div>

  </section>

  <section>
    <h2>Dashboard</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/dashboard">Read more</a></p>

    <div className="example">
      <Donut series={genericSeries} />
      <Donut series={statusSeries} />
    </div>

  </section>

  <section>
    <h2>Search</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/search">Read more</a></p>

    <div className="example">
      <Header>
        <h1></h1>
        <Search direction="left" />
      </Header>
    </div>

  </section>
      </div>
    );
  }
});

module.exports = {

  Header: PatternsHeader,

  Section: PatternsSection
};
