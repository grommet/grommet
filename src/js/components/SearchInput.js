// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

var React = require('react');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var SearchIcon = require('./icons/Search');

var CLASS_ROOT = "search-input";

var SearchInput = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string
      }),
      React.PropTypes.string
    ]),
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string,
    suggestions: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.shape({
          label: React.PropTypes.string,
          value: React.PropTypes.string
        }),
        React.PropTypes.string
      ])
    ),
    value: React.PropTypes.oneOfType([
      React.PropTypes.shape({
        label: React.PropTypes.string,
        value: React.PropTypes.string
      }),
      React.PropTypes.string
    ])
  },

  mixins: [KeyboardAccelerators],

  getInitialState: function () {
    return {
      dropActive: false,
      defaultValue: this.props.defaultValue,
      value: this.props.value,
      activeSuggestionIndex: -1
    };
  },

  componentDidUpdate: function (prevProps, prevState) {
    // Set up keyboard listeners appropriate to the current state.

    var activeKeyboardHandlers = {
      esc: this._onRemoveDrop,
      tab: this._onRemoveDrop,
      up: this._onPreviousSuggestion,
      down: this._onNextSuggestion,
      enter: this._onEnter
    };
    var focusedKeyboardHandlers = {
      down: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.focused && prevState.focused) {
      this.stopListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (! this.state.dropActive && prevState.dropActive) {
      document.removeEventListener('click', this._onRemoveDrop);
      this.stopListeningToKeyboard(activeKeyboardHandlers);
      if (this._drop) {
        this._drop.remove();
        this._drop = null;
      }
    }

    if (this.state.focused && ! prevState.focused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      this._drop = Drop.add(this.refs.component.getDOMNode(),
        this._renderDrop(), {top: 'bottom', left: 'left'});
    } else if (this.state.dropActive && prevState.dropActive) {
      this._drop.render(this._renderDrop());
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onRemoveDrop);
  },

  _onInputChange: function (event) {
    this.setState({dropActive: true, activeSuggestionIndex: -1});
    this.props.onChange(event.target.value, false);
  },

  _onAddDrop: function (event) {
    event.preventDefault();
    this.setState({dropActive: true, activeSuggestionIndex: -1});
  },

  _onRemoveDrop: function () {
    this.setState({dropActive: false});
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
    this.setState({dropActive: false});
    if (this.state.activeSuggestionIndex >= 0) {
      var suggestion = this.props.suggestions[this.state.activeSuggestionIndex];
      this.setState({value: suggestion});
      this.props.onChange(suggestion, true);
    }
  },

  _onClickSuggestion: function (suggestion) {
    this.setState({value: suggestion, dropActive: false});
    this.props.onChange(suggestion, true);
  },

  _onFocus: function () {
    this.refs.input.getDOMNode().select();
    this.setState({
      focused: true,
      dropActive: false,
      activeSuggestionIndex: -1
    });
  },

  _valueText: function (value) {
    var text = '';
    if (value) {
      if ('string' === typeof value) {
        text = value;
      } else {
        text = value.label || value.value;
      }
    }
    return text;
  },

  _renderDrop: function() {
    var suggestions = null;
    if (this.props.suggestions) {
      suggestions = this.props.suggestions.map(function (suggestion, index) {
        var classes = [CLASS_ROOT + "__suggestion"];
        if (index === this.state.activeSuggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        return (
          <li key={this._valueText(suggestion)}
            className={classes.join(' ')}
            onClick={this._onClickSuggestion.bind(this, suggestion)}>
            {this._valueText(suggestion)}
          </li>
        );
      }, this);
    }

    return (
      <ol className={CLASS_ROOT + "__suggestions"} onClick={this._onRemoveDrop}>
        {suggestions}
      </ol>
    );
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
        <input ref="input" className={CLASS_ROOT + "__input"}
          id={this.props.id} name={this.props.name}
          value={this._valueText(this.props.value)}
          defaultValue={this._valueText(this.props.defaultValue)}
          placeholder={this.props.placeHolder}
          onChange={this._onInputChange}
          onFocus={this._onFocus} />
        <div className={CLASS_ROOT + "__control"} onClick={this._onAddDrop} >
          <SearchIcon />
        </div>
      </div>
    );
  }

});

module.exports = SearchInput;
