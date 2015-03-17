// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chapter = require('Chapter');
var Link = require('react-router').Link;

var Patterns = React.createClass({

  render: function() {
    return (
      <Chapter title="Patterns">
        <header>
          <section>
            <h1>Patterns</h1>

            <p>Interaction design patterns are task driven workflows commonly
            used throughout a user interface.  Designers and developers should
            follow the design pattern guidance in order to create consistent user
            experiences across the product suite. Once a user is familiar with
            the design patterns of your application they will come to expect the
            same experience for the same tasks in other applications.</p>

            <ol className="chapter__nav list-bare">
              <li data-target="login">Login</li>
              <li data-target="header">Header</li>
              <li data-target="dashboard">Dashboard</li>
              <li data-target="search">Search</li>
            </ol>
          </section>
        </header>

        <section id="login">
          <h2>Login</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
          fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
          <Link to="login">Read more</Link></p>

          <img src="img/snippet-login.png" alt="login snippet"/>

        </section>

        <section id="header">
          <h2>Header</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
          fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
          <Link to="header">Read more</Link></p>

          <img src="img/snippet-header.png" alt="header snippet"/>

        </section>

        <section id="dashboard">
          <h2>Dashboard</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
          fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
          <Link to="dashboard">Read more</Link></p>

          <img src="img/snippet-dashboard.png" alt="dashboard snippet"/>

        </section>

        <section id="search">
          <h2>Search</h2>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam risus,
          fermentum at nisl pellentesque, iaculis mattis nisl. Duis dapibus.
          <Link to="search">Read more</Link></p>

          <img src="img/snippet-search.png" alt="search snippet"/>

        </section>

      </Chapter>
    );
  }

});

module.exports = Patterns;
