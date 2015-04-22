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
      placeHolder: 'Search',
      suggestions: []
    };
  },

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay],

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({active: true});
  },

  _onClose: function () {
    this.setState({active: false});
  },

  _onFocusControl: function () {
    this.setState({controlFocused: true, active: this.props.inline});
  },

  _onBlurControl: function () {
    this.setState({controlFocused: false});
  },

  _onFocusInput: function () {
    this.setState({active: true});
  },

  _onBlurInput: function () {
    //this.setState({active: false});
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
    this._onClose();
  },

  _onClickBody: function (event) {
    // ignore if from input or suggestion
    if (! event.target.classList.contains("search__input") &&
      ! event.target.classList.contains("search__suggestion")) {
      this._onClose();
    }
  },

  getInitialState: function () {
    return {
      align: 'left',
      controlFocused: false,
      active: false
    };
  },

  componentDidUpdate: function (prevProps, prevState) {

    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onClose,
      tab: this._onClose,
      enter: this._onClose
    };
    var focusedKeyboardHandlers = {
      space: this._onOpen
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
      this.stopListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (! this.state.active && prevState.active) {
      document.body.removeEventListener('click', this._onClickBody);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      this.stopOverlay();
    }

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.active && ! prevState.active) {
      document.body.addEventListener('click', this._onClickBody);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      var controlElement = this.refs.control.getDOMNode();
      var layerElement = document.getElementById('search-layer');
      var layerControlElement = layerElement.querySelectorAll('.search__control')[0];
      var layerControlIconElement = layerElement.querySelectorAll('svg')[0];
      var inputElement = layerElement.querySelectorAll('.search__input')[0];

      // give input element the same line height and font size as the control
      var fontSize = window.getComputedStyle(controlElement).fontSize;
      inputElement.style.fontSize = fontSize;
      var height = controlElement.clientHeight;
      if (height <= layerControlIconElement.clientHeight) {
        // adjust to align with underlying control when control uses all height
        layerControlElement.style.marginTop = '-3px';
      }
      inputElement.style.height = height + 'px';
      layerControlElement.style.height = height + 'px';
      layerControlElement.style.lineHeight = height + 'px';

      this.startOverlay(controlElement,layerElement, this.props.align);
      inputElement.focus();
    }
  },

  componentWillUnmount: function () {
    document.body.removeEventListener('click', this._onClickBody);
  },

  _createControl: function () {
    var controlClassName = CLASS_ROOT + "__control";
    return (
      <div className={controlClassName}>
        <SearchIcon />
      </div>
    );
  },

  render: function () {
    var classes = [CLASS_ROOT];

    if (this.props.inline) {
      classes.push(CLASS_ROOT + "--inline");
    } else {
      classes.push(CLASS_ROOT + "--controlled");
    }
    if (this.props.align) {
      classes.push(CLASS_ROOT + "--align-" + this.props.align);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.props.inline) {

      return (
        <div className={classes.join(' ')}>
          <input ref="control" type="search"
            placeholder={this.props.placeHolder}
            value={this.props.defaultValue}
            readOnly={true}
            className={CLASS_ROOT + "__input" }
            onFocus={this._onFocusInput}
            onBlur={this._onBlurInput} />
        </div>
      );

    } else {

      var controlContents = this._createControl();

      return (
        <div ref="control" className={classes.join(' ')}
          tabIndex="0"
          onClick={this._onOpen}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          {controlContents}
        </div>
      );
    }
  },

  renderLayer: function() {
    if (this.state.active) {

      var classes = [CLASS_ROOT + "__layer"];

      if (this.props.align) {
        classes.push(CLASS_ROOT + "__layer--align-" + this.props.align);
      }
      if (this.props.inline) {
        classes.push(CLASS_ROOT + "__layer--inline");
      } else {
        classes.push(CLASS_ROOT + "__layer--controlled");
      }

      var suggestions = this.props.suggestions.map(function (item) {
        return (
          <div key={item}
            className={CLASS_ROOT + "__suggestion"}
            onClick={this._onClickSuggestion.bind(this, item)}>
            {item}
          </div>
        );
      }, this);

      var contents = (
        <div className={CLASS_ROOT + "__layer-contents"}>
          <input type="search"
            defaultValue={this.props.defaultValue}
            className={CLASS_ROOT + "__input" }
            onChange={this._onChangeInput} />
          <div className={CLASS_ROOT + "__suggestions"}>
            {suggestions}
          </div>
        </div>
      );

      if (this.props.inline) {

        return (
          <div id="search-layer" className={classes.join(' ')}>
            {contents}
          </div>
        );

      } else { // controlled

        var controlContents = this._createControl();
        var first = null;
        var second = null;
        if ('right' === this.props.align) {
          first = contents;
          second = controlContents;
        } else {
          first = controlContents;
          second = contents;
        }

        return (
          <div id="search-layer" className={classes.join(' ')}>
            <div className={CLASS_ROOT + "__layer-header"}>
              {first}
              {second}
            </div>
          </div>
        );
      }

    } else { // inactive
      return (<span />);
    }
  }

});

module.exports = Search;
