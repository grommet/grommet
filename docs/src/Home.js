// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Layout = require('grommet/components/Layout');
var Panel = require('grommet/components/Panel');
var Link = require('react-router').Link;
var Displays = require('./Displays');

var Home = React.createClass({

  render: function() {

  var texture = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAADRJREFUSA1j/PHjx38GGgImGpo9TIxmHI2DAY/J0TgY8ChgGI2D0TgY+BAYeBeM5oOBjwMAZNAXfV/JDF0AAAAASUVORK5CYII=)";

    return (
      <Layout centerColumn={true} texture={texture}>
        <Displays className="flex-2"/>
        <div className="flex-1">
          <Panel index={1} title="Design">
            <p>Guidelines for designing a Grommet application.</p>
            <Link to="style guide" className="call-to-action">Style Guide</Link>
          </Panel>
          <Panel index={2} title="Develop">
            <p>Learn Grommet in a few simple steps.</p>
            <Link to="doc_helloworld" className="call-to-action">Hello World</Link>
            <p></p>
            <a href="/demo">Demo</a>
            <a href="https://github.com/HewlettPackard/grommet">GitHub</a>
          </Panel>
          <RouteHandler />
        </div>
      </Layout>
    );
  }

});

module.exports = Home;
