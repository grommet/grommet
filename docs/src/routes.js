var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var IntlMixin = require('grommet/mixins/GrommetIntlMixin');

var Docs = require('./Docs');
var Home = require('./Home');
var Introduction = require('./Introduction');
var Design = require('./design/Design');
var Develop = require('./develop/Develop');

var DocsRouter = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    return (
      <Docs />
    );
  }
});

module.exports = function (rootPath) {
  return (
    <Route name="docs" path={rootPath} handler={DocsRouter}>
      <Route name="home" path={rootPath} handler={Home} />
      <Route name="introduction" handler={Introduction} />
      {Design.routes()}
      {Develop.routes()}
    </Route>
  );
};
