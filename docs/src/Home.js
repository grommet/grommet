// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Documents = require('Documents');
var Hero = Documents.Hero;
var Panel = Documents.Panel;
var Link = require('react-router').Link;
var Displays = require('./Displays');

var Home = React.createClass({

  render: function() {

  var texture = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAADRJREFUSA1j/PHjx38GGgImGpo9TIxmHI2DAY/J0TgY8ChgGI2D0TgY+BAYeBeM5oOBjwMAZNAXfV/JDF0AAAAASUVORK5CYII=)";

    return (
      <Hero texture={texture}>
        <Displays />
        <Panel>
          <Panel index={1} title="Design">
            <p>Guidelines for designing a Ligo application.</p>
            <Link to="style guide" className="call-to-action">Style Guide</Link>
          </Panel>
          <Panel index={2} title="Develop">
            <p>Learn Ligo in a few simple steps.</p>
            <Link to="hello world" className="call-to-action">Hello World</Link>
            <p></p>
            <a href="/demo">Demo</a>
            <a href="https://github.com/HewlettPackard/Ligo">GitHub</a>
          </Panel>
        </Panel>
      </Hero>
    );
  }

});

module.exports = Home;
