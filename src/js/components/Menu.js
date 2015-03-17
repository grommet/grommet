// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var MoreIcon = require('./icons/More');
var DropCaretIcon = require('./icons/DropCaret');

var Menu = React.createClass({

  propTypes: {
    items: React.PropTypes.array,
    label: React.PropTypes.string,
    direction: React.PropTypes.oneOf(['up', 'down'])
  },

  getDefaultProps: function () {
    return {
      direction: 'down'
    };
  },

  mixins: [ReactLayeredComponent],

  _onOpen: function () {
    this.setState({active: true});
  },

  _onClose: function () {
    this.setState({active: false});
  },

  _onSink: function (event) {
    event.stopPropagation();
  },

  _onResize: function () {
    this._layout();
  },

  _layout: function () {
    // place container over control
    var controlElement = this.refs.control.getDOMNode();
    var containerElement = document.getElementById('menu__container');
    var rect = controlElement.getBoundingClientRect();

    // clear prior styling
    containerElement.style.left = '';
    containerElement.style.width = '';
    containerElement.style.top = '';

    // align right edge and make at least as wide as the control
    var width = Math.max(controlElement.offsetWidth, containerElement.offsetWidth);
    var left = (rect.left + controlElement.offsetWidth) - width;
    var top = rect.top;
    if ('up' === this.props.direction) {
      // align bottom edge
      top = (rect.top + controlElement.offsetHeight) - containerElement.offsetHeight;
    }

    containerElement.style.left = '' + left + 'px';
    containerElement.style.width = '' + width + 'px';
    containerElement.style.top = '' + top + 'px';

    // make title line height the same as the control
    var titleElement = containerElement.querySelectorAll('.menu__title').item(0);
    titleElement.style.lineHeight = getComputedStyle(controlElement)['line-height'];
    titleElement.style.fontSize = getComputedStyle(controlElement)['font-size'];
  },

  getInitialState: function () {
    return {active: false};
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.active && ! prevState.active) {
      this._layout();
      window.addEventListener('resize', this._onResize);
    } else if (! this.state.active && prevState.active) {
      window.removeEventListener('resize', this._onResize);
    }
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._onResize);
  },

  render: function () {
    var classes = ["menu__control"];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.items) {
      var smallControlClasses = ["menu__control-icon"];
      largeControl = '';
      if (this.props.label) {
        largeControl = (
          <div className="menu__control--large">
            {this.props.label}
            <DropCaretIcon className="menu__control-icon" />
          </div>
        );
        smallControlClasses.push("menu__control--small");
      }

      return (
        <div ref="control" className={classes.join(' ')} onClick={this._onOpen}>
          {largeControl}
          <MoreIcon className={smallControlClasses.join(' ')} />
        </div>
      );
    }
    else {
      return (<span/>);
    }
  },

  renderLayer: function() {
    if (this.state.active) {

      var classes = ["menu"];
      if ('up' === this.props.direction) {
        classes.push("menu--up");
      }

      var smallTitleClasses = ["menu__title-icon"];
      largeTitle = '';
      if (this.props.label) {
        largeTitle = (
          <div className="menu__title--large">
            {this.props.label}
            <DropCaretIcon className="menu__title-icon" />
          </div>
        );
        smallTitleClasses.push("menu__title--small");
      }

      var icon = React.createFactory(this.props.iconClass)({
        className: "menu__title-icon"
      });

      var items = [];
      if (this.props.items) {
        items = this.props.items.map(function (item, index) {
          return (
            <li key={index} className={"menu__item list-item"}>
              {item}
            </li>
          );
        });
      }

      return (
        <div className={classes.join(' ')} onClick={this._onClose}>
          <div id={'menu__container'}
            className={"menu__container"} onClick={this._onSink}>
            <div className={"menu__title"} onClick={this._onClose}>
              {largeTitle}
              <MoreIcon className={smallTitleClasses.join(' ')} />
            </div>
            <ol className={"menu__items list-bare"}>
              {items}
            </ol>
          </div>
        </div>
      );
    } else {
      return (<span />);
    }
  }

});

module.exports = Menu;
