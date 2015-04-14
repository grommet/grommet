// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Header = require('ligo/components/Header');
var Menu = require('ligo/components/Menu');
var Form = require('ligo/components/Form');
var FormField = require('ligo/components/FormField');
//var Donut = require('ligo/components/Donut');

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
    return (
      <div>
  <section>
    <h2>Login</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/login">Read more</a></p>

    <Form>
      <fieldset>
        <FormField>
          <label htmlFor="username">Username</label>
          <input id="username" />
        </FormField>
        <FormField>
          <label htmlFor="password">Username</label>
          <input type="password" id="password" />
        </FormField>
      </fieldset>
      <input type="submit" className="primary" val="Login" />
      <input type="checkbox" /><label>Remember me</label>
    </Form>
    <img src="img/snippet-login.png" alt="login snippet"/>

  </section>

  <section>
    <h2>Header</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/header">Read more</a></p>

    <Header>
      <h1>Title</h1>
      <Menu direction="left">
        <span>icon</span>
      </Menu>
    </Header>

  </section>

  <section>
    <h2>Dashboard</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/dashboard">Read more</a></p>


    <img src="img/snippet-dashboard.png" alt="dashboard snippet"/>

  </section>

  <section>
    <h2>Search</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
    fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
    <a href="#/styleguide/search">Read more</a></p>

    <img src="img/snippet-search.png" alt="search snippet"/>

  </section>
      </div>
    );
  }
});

module.exports = {

  Header: PatternsHeader,

  Section: PatternsSection
};
