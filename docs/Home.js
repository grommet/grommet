// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Documents = require('Documents');
var Document = Documents.Document;
var Hero = Documents.Hero;
var Link = require('react-router').Link;
var background = require("./img/home.jpg");

var Home = React.createClass({

  render: function() {

    return (
      <Document background={background}>
        <Hero>
          <div>
            <img />
            <h2>Designers Start Here</h2>
            <p>Guidelines for designing a Ligo application.</p>
            <Link to="style guide" className="call-to-action">Style Guide</Link>
          </div>
          <div>
            <img />
            <h2>Developers Start Here</h2>
            <p>Learn Ligo in a few simple steps.</p>
            <Link to="hello world" className="call-to-action">Hello World</Link>
          </div>
        </Hero>
      </Document>
    );
  }

});

module.exports = Home;
