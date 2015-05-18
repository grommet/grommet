// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "split";

var Split = React.createClass({

  propTypes: {
    flex: React.PropTypes.oneOf(['left', 'right', 'both'])
  },

  getDefaultProps: function () {
    return {flex: 'both'};
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  _setResponsive: function (responsive) {
    if (this.state.responsive !== responsive) {
      this.setState({responsive: responsive});
      if (this.props.onResponsive) {
        this.props.onResponsive(responsive);
      }
    }
  },

  _layout: function () {
    var splitElement = this.refs.split.getDOMNode();
    if (splitElement.offsetWidth < 600) {
      this._setResponsive('single');
    } else {
      this._setResponsive('multiple');
    }
  },

  getInitialState: function () {
    return {responsive: null};
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.flex) {
      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div ref="split" className={classes.join(' ')}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Split;
