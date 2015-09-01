// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "split";

var Split = React.createClass({

  propTypes: {
    fixed: React.PropTypes.bool,
    flex: React.PropTypes.oneOf(['left', 'right', 'both']),
    separator: React.PropTypes.bool,
    stack: React.PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps: function () {
    return {
      fixed: true,
      flex: 'both'
    };
  },

  getInitialState: function () {
    return {responsive: null};
  },

  componentDidMount: function () {
    // figure out the break width
    this._breakWidth = 720; // default
    // CSS stores the break width in a hidden pseudo element
    var splitElement = this.refs.split.getDOMNode();
    var after = window.getComputedStyle(splitElement, ':after');
    if (after) {
      this._breakWidth = after.getPropertyValue('width');
    }

    window.addEventListener('resize', this._onResize);
    this._layout();
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
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
    if (splitElement.offsetWidth < this._breakWidth) {
      this._setResponsive('single');
    } else {
      this._setResponsive('multiple');
    }
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.flex) {
      classes.push(CLASS_ROOT + "--flex-" + this.props.flex);
    }
    if (this.props.fixed) {
      classes.push(CLASS_ROOT + "--fixed");
    }
    if (this.props.separator) {
      classes.push(CLASS_ROOT + "--separator");
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
