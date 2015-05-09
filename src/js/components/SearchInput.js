// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var ReactLayeredComponent = require('../mixins/ReactLayeredComponent');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Overlay = require('../mixins/Overlay');
var SearchIcon = require('./icons/Search');

var CLASS_ROOT = "search-input";

var SearchInput = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.string),
    value: React.PropTypes.string
  },

  mixins: [ReactLayeredComponent, KeyboardAccelerators, Overlay],

  _onOpen: function (event) {
    event.preventDefault();
    this.setState({active: true, activeSuggestionIndex: -1});
  },

  _onClose: function () {
    this.setState({active: false});
  },

  _onSearchChange: function (event) {
    this.setState({activeSuggestionIndex: -1});
    this.props.onSearch(event.target.value);
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
    this.setState({active: false});
    this._activation(false);
    if (this.state.activeSuggestionIndex >= 0) {
      var text = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({value: text});
      this.props.onChange({target: {value: text}});
    }
  },

  _onClickSuggestion: function (text) {
    this.setState({value: text});
    this._activation(false);
    this.props.onChange({target: {value: text}});
  },

  _activation: function (active) {

    var listeners = {
      esc: this._onClose,
      tab: this._onClose,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };

    if (active) {

      document.addEventListener('click', this._onClose);
      this.startListeningToKeyboard(listeners);

      var element = this.refs.component.getDOMNode();
      var layerElement = document.getElementById(CLASS_ROOT + '-layer');
      this.startOverlay(element, layerElement, 'below');

      // focus on search
      var searchInputElement = layerElement.querySelectorAll('input')[0];
      searchInputElement.focus();

    } else {

      document.removeEventListener('click', this._onClose);
      this.stopListeningToKeyboard(listeners);
      this.stopOverlay();

    }
  },

  getInitialState: function () {
    return {
      active: false,
      defaultValue: this.props.defaultValue,
      value: this.props.value,
      activeSuggestionIndex: -1
    };
  },

  componentDidMount: function () {
    if (this.state.active) {
      this._activation(this.state.active);
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.
    if (! this.state.active && prevState.active) {
      this._activation(this.state.active);
    }
    if (this.state.active && ! prevState.active) {
      this._activation(this.state.active);
    }
  },

  componentWillUnmount: function () {
    this._activation(false);
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.state.active) {
      classes.push(CLASS_ROOT + "--active");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    return (
      <div ref="component" className={classes.join(' ')}>
        <input className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name}
          value={this.props.value} defaultValue={this.props.defaultValue}
          onChange={this.props.onChange} />
        <div className={CLASS_ROOT + "__control"} onClick={this._onOpen} >
          <SearchIcon />
        </div>
      </div>
    );
  },

  renderLayer: function() {
    if (this.state.active) {

      var suggestions = null;
      if (this.props.suggestions) {
        suggestions = this.props.suggestions.map(function (text, index) {
          var classes = [CLASS_ROOT + "__layer-suggestion"];
          if (index === this.state.activeSuggestionIndex) {
            classes.push(CLASS_ROOT + "__layer-suggestion--active");
          }
          return (
            <div key={text}
              className={classes.join(' ')}
              onClick={this._onClickSuggestion.bind(this, text)}>
              {text}
            </div>
          );
        }, this);
      }

      return (
        <div id={CLASS_ROOT + "-layer"} className={CLASS_ROOT + "__layer"}
          onClick={this._onClose}>
          <input type="search"
            defaultValue=""
            placeholder="Search"
            className={CLASS_ROOT + "__layer-input"}
            onChange={this._onSearchChange} />
          <div className={CLASS_ROOT + "__layer-suggestions"}>
            {suggestions}
          </div>
        </div>
      );
    } else {
      return (<span />);
    }
  }

});

module.exports = SearchInput;
