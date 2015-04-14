// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LoginForm = require('ligo/components/LoginForm');
var Header = require('ligo/components/Header');
var Menu = require('ligo/components/Menu');
var Form = require('ligo/components/Form');
var FormField = require('ligo/components/FormField');
var Donut = require('ligo/components/Donut');
var SearchIcon = require('ligo/components/icons/Search');

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
      {label: 'Critical', value: 10, accentIndex: 'critical'},
      {label: 'Warning', value: 20, accentIndex: 'warning'},
      {label: 'OK', value: 70, accentIndex: 'ok'}
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
        <h1>Title</h1>
        <Menu direction="left">
          <span>icon</span>
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
        <Menu direction="left">
          <div className="control-icon">
            <SearchIcon />
          </div>
        </Menu>
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
