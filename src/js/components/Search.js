// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
var SearchIcon = require('./icons/Search');

var CLASS_ROOT = "search";

var Search = React.createClass({

  propTypes: {
    align: React.PropTypes.oneOf(['left', 'right']),
    defaultValue: React.PropTypes.string,
    inline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps: function () {
    return {
      align: 'left',
      inline: false,
      placeHolder: 'Search'
    };
  },

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay],

  _onAddLayer: function (event) {
    event.preventDefault();
    this.setState({layer: true});
  },

  _onRemoveLayer: function () {
    this.setState({layer: false});
  },

  _onFocusControl: function () {
    this.setState({controlFocused: true, layer: true});
  },

  _onBlurControl: function () {
    this.setState({controlFocused: false});
  },

  _onFocusInput: function () {
    this.refs.input.getDOMNode().select();
    this.setState({layer: (! this.props.inline || this.props.suggestions)});
  },

  _onBlurInput: function () {
    //this.setState({layer: false});
  },

  _onChangeInput: function (event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onClickSuggestion: function (item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._onRemoveLayer();
  },

  _onSink: function (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  },

  getInitialState: function () {
    return {
      align: 'left',
      controlFocused: false,
      layer: false
    };
  },

  componentDidUpdate: function (prevProps, prevState) {

    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onRemoveLayer,
      tab: this._onRemoveLayer,
      enter: this._onRemoveLayer
    };
    var focusedKeyboardHandlers = {
      space: this._onAddLayer
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
      this.stopListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (! this.state.layer && prevState.layer) {
      document.removeEventListener('click', this._onRemoveLayer);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      this.stopOverlay();
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.layer && ! prevState.layer) {
      document.addEventListener('click', this._onRemoveLayer);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      var baseElement =
        (this.refs.control ? this.refs.control : this.refs.input).getDOMNode();
      var layerElement = document.getElementById('search-layer');
      var layerControlElement = layerElement.querySelectorAll('.search__control')[0];
      var layerControlIconElement = layerElement.querySelectorAll('svg')[0];
      var inputElement = layerElement.querySelectorAll('.search__input')[0];

      // give input element the same line height and font size as the control
      var fontSize = window.getComputedStyle(baseElement).fontSize;
      inputElement.style.fontSize = fontSize;
      var height = baseElement.clientHeight;
      if (layerControlIconElement && height <= layerControlIconElement.clientHeight) {
        // adjust to align with underlying control when control uses all height
        layerControlElement.style.marginTop = '-2px';
      }
      inputElement.style.height = height + 'px';
      if (layerControlElement) {
        layerControlElement.style.height = height + 'px';
        layerControlElement.style.lineHeight = height + 'px';
      }

      this.startOverlay(baseElement,layerElement, this.props.align);
      inputElement.focus();
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onRemoveLayer);
  },

  focus: function () {
    var ref = this.refs.input || this.refs.control;
    if (ref) {
      ref.getDOMNode().focus();
    }
  },

  _createControl: function () {
    var controlClassName = CLASS_ROOT + "__control";
    return (
      <div className={controlClassName}>
        <SearchIcon />
      </div>
    );
  },

  _classes: function (prefix) {
    var classes = [prefix];

    if (this.props.inline) {
      classes.push(prefix + "--inline");
    } else {
      classes.push(prefix + "--controlled");
    }
    if (this.props.align) {
      classes.push(prefix + "--align-" + this.props.align);
    }

    return classes;
  },

  render: function () {
    var classes = this._classes(CLASS_ROOT);
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.inline) {

      var readOnly = this.props.suggestions ? true : false;

      return (
        <div className={classes.join(' ')}>
          <input ref="input" type="search"
            placeholder={this.props.placeHolder}
            value={this.props.defaultValue}
            className={CLASS_ROOT + "__input" }
            readOnly={readOnly}
            onFocus={this._onFocusInput}
            onBlur={this._onBlurInput}
            onChange={this._onChangeInput} />
        </div>
      );

    } else {

      var controlContents = this._createControl();

      return (
        <div ref="control" className={classes.join(' ')}
          tabIndex="0"
          onClick={this._onAddLayer}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          {controlContents}
        </div>
      );
    }
  },

  renderLayer: function() {
    if (this.state.layer) {

      var classes = this._classes(CLASS_ROOT + "__layer");

      var suggestions = null;
      if (this.props.suggestions) {
        suggestions = this.props.suggestions.map(function (item) {
          return (
            <div key={item}
              className={CLASS_ROOT + "__suggestion"}
              onClick={this._onClickSuggestion.bind(this, item)}>
              {item}
            </div>
          );
        }, this);
      }

      var contents = (
        <div className={CLASS_ROOT + "__layer-contents"} onClick={this._onSink}>
          <input type="search"
            defaultValue={this.props.defaultValue}
            className={CLASS_ROOT + "__input" }
            onChange={this._onChangeInput} />
          <div className={CLASS_ROOT + "__suggestions"}>
            {suggestions}
          </div>
        </div>
      );

      if (! this.props.inline) {
        var control = this._createControl();
        var rightAlign = ('right' === this.props.align);
        var first = rightAlign ? contents : control;
        var second = rightAlign ? control : contents;

        contents = (
          <div className={CLASS_ROOT + "__layer-header"}>
            {first}
            {second}
          </div>
        );
      }

      return (
        <div id="search-layer" className={classes.join(' ')}>
          {contents}
        </div>
      );

    } else { // no layer
      return (<span />);
    }
  }

});

module.exports = Search;
