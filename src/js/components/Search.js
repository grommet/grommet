// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
var SearchIcon = require('./icons/Search');
var IntlMixin = require('../mixins/GrommetIntlMixin');

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

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay, IntlMixin],

  _onAddLayer: function (event) {
    event.preventDefault();
    this.setState({layer: true, activeSuggestionIndex: -1});
  },

  _onRemoveLayer: function () {
    this.setState({layer: false});
  },

  _onFocusControl: function () {
    this.setState({
      controlFocused: true,
      layer: true,
      activeSuggestionIndex: -1
    });
  },

  _onBlurControl: function () {
    this.setState({controlFocused: false});
  },

  _onFocusInput: function () {
    this.refs.input.getDOMNode().select();
    this.setState({
      layer: (! this.state.inline || this.props.suggestions),
      activeSuggestionIndex: -1
    });
  },

  _onBlurInput: function () {
    //this.setState({layer: false});
  },

  _onChangeInput: function (event) {
    this.setState({activeSuggestionIndex: -1});
    if (this.props.onChange) {
      this.props.onChange(event.target.value);
    }
  },

  _onNextSuggestion: function () {
    var index = this.state.activeSuggestionIndex;
    index = Math.min(index + 1, this.props.suggestions.length - 1);
    this.setState({activeSuggestionIndex: index});
  },

  _onPreviousSuggestion: function () {
    var index = this.state.activeSuggestionIndex;
    index = Math.max(index - 1, 0);
    this.setState({activeSuggestionIndex: index});
  },

  _onEnter: function () {
    if (this.state.activeSuggestionIndex >= 0) {
      var text = this.props.suggestions[this.state.activeSuggestionIndex];
      if (this.props.onChange) {
        this.props.onChange(text);
      }
    }
    this._onRemoveLayer();
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

  _layout: function () {
    if (window.innerWidth < 600) {
      this.setState({inline: false});
    } else {
      this.setState({inline: this.props.inline});
    }
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._layout, 50);
  },

  getInitialState: function () {
    return {
      align: 'left',
      controlFocused: false,
      inline: this.props.inline,
      layer: false,
      activeSuggestionIndex: -1
    };
  },

  componentDidMount: function () {
    window.addEventListener('resize', this._onResize);
    this._layout();
  },

  componentDidUpdate: function (prevProps, prevState) {

    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onRemoveLayer,
      tab: this._onRemoveLayer,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
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

      this.startOverlay(baseElement, layerElement, this.props.align);
      inputElement.focus();
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onRemoveLayer);
    window.removeEventListener('resize', this._onResize);
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

    if (this.state.inline) {
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

    if (this.state.inline) {

      var readOnly = this.props.suggestions ? true : false;

      return (
        <div className={classes.join(' ')}>
          <input ref="input" type="search"
            placeholder={this.getGrommetIntlMessage(this.props.placeHolder)}
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
        suggestions = this.props.suggestions.map(function (item, index) {
          var classes = [CLASS_ROOT + "__suggestion"];
          if (index === this.state.activeSuggestionIndex) {
            classes.push(CLASS_ROOT + "__suggestion--active");
          }
          return (
            <div key={item}
              className={classes.join(' ')}
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

      if (! this.state.inline) {
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
