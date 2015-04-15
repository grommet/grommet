// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var IndexStore = require('../stores/IndexStore');
var Router = require('../../utils/Router');
var Link = require('../../components/Link');
var PreviousIcon = require('../../components/icons/Previous');
var NextIcon = require('../../components/icons/Next');
var CloseIcon = require('../../components/icons/Clear');

var CLASS_ROOT = 'index-resource';

var IndexResource = React.createClass({

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var href;
    var previous = '';
    var next = '';

    if (this.props.uri) {
      classes.push(CLASS_ROOT + '--active');

      var previousUri = IndexStore.previousUri(this.props.uri);
      if (previousUri) {
        href = Router.makeHrefParam('splat', previousUri);
        previous = (
          <div className={CLASS_ROOT + "__previous-container"}>
            <Link className={CLASS_ROOT + "__previous control-icon"} href={href}>
              <PreviousIcon />
            </Link>
          </div>
        );
      }

      var nextUri = IndexStore.nextUri(this.props.uri);
      if (nextUri) {
        href = Router.makeHrefParam('splat', nextUri);
        next = (
          <div className={CLASS_ROOT + "__next-container"}>
            <Link className={CLASS_ROOT + "__next control-icon"} href={href}>
              <NextIcon />
            </Link>
          </div>
        );
      }
    }

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__close control-icon"}
          onClick={this.props.onClose}>
          <CloseIcon />
        </div>
        {previous}
        {next}
        <RouteHandler />
      </div>
    );
  }

});

module.exports = IndexResource;
