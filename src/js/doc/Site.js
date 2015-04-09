// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Site = React.createClass({
  render: function() {
    return (
      <div className="site">
        <div className="site__header">
          <div className="site__header-contents">
            <div className="site__title">
              {this.props.title}
            </div>
            <div className="site__nav">
              {this.props.nav}
            </div>
          </div>
        </div>

        {this.props.children}

        <div className="site__footer">
          {this.props.footer}
        </div>
      </div>
    );
  }
});

module.exports = Site;
