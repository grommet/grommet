// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var KeyboardAccelerators = require('../mixins/KeyboardAccelerators');
var Drop = require('../utils/Drop');
var Responsive = require('../utils/Responsive');
var SearchIcon = require('./icons/Search');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "search";

var Search = React.createClass({

  propTypes: {
    defaultValue: React.PropTypes.string,
    dropAlign: Drop.alignPropType,
    dropColorIndex: React.PropTypes.string,
    inline: React.PropTypes.bool,
    large: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    placeHolder: React.PropTypes.string,
    responsive: React.PropTypes.bool,
    suggestions: React.PropTypes.arrayOf(React.PropTypes.string),
    value: React.PropTypes.string
  },

  mixins: [KeyboardAccelerators, IntlMixin],

  getDefaultProps: function () {
    return {
      align: 'left',
      inline: false,
      placeHolder: 'Search',
      dropAlign: {top: 'top', left: 'left'},
      responsive: true
    };
  },

  getInitialState: function () {
    return {
      align: 'left',
      controlFocused: false,
      inline: this.props.inline,
      dropActive: false,
      activeSuggestionIndex: -1
    };
  },

  componentDidMount: function () {
    if (this.props.inline && this.props.responsive) {
      this._responsive = Responsive.start(this._onResponsive);
    }
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
      space: this._onAddDrop
    };

    // the order here is important, need to turn off keys before turning on

    if (! this.state.controlFocused && prevState.controlFocused) {
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

    if (this.state.controlFocused && ! prevState.controlFocused) {
      this.startListeningToKeyboard(focusedKeyboardHandlers);
    }

    if (this.state.dropActive && ! prevState.dropActive) {
      document.addEventListener('click', this._onRemoveDrop);
      this.startListeningToKeyboard(activeKeyboardHandlers);

      var baseElement =
        (this.refs.control ? this.refs.control : this.refs.input).getDOMNode();
      this._drop = Drop.add(baseElement, this._renderDrop(), this.props.dropAlign);

      document.getElementById('search-drop-input').focus();
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('click', this._onRemoveDrop);
    if (this._responsive) {
      this._responsive.stop();
    }
  },

  _onAddDrop: function (event) {
    event.preventDefault();
    this.setState({dropActive: true, activeSuggestionIndex: -1});
  },

  _onRemoveDrop: function () {
    this.setState({dropActive: false});
  },

  _onFocusControl: function () {
    this.setState({
      controlFocused: true,
      dropActive: true,
      activeSuggestionIndex: -1
    });
  },

  _onBlurControl: function () {
    this.setState({controlFocused: false});
  },

  _onFocusInput: function () {
    this.refs.input.getDOMNode().select();
    this.setState({
      dropActive: (! this.state.inline || this.props.suggestions),
      activeSuggestionIndex: -1
    });
  },

  _onBlurInput: function () {
    //this.setState({drop: false});
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
    this._onRemoveDrop();
  },

  _onClickSuggestion: function (item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this._onRemoveDrop();
  },

  _onSink: function (event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  },

  _onResponsive: function (small) {
    if (small) {
      this.setState({inline: false});
    } else {
      this.setState({inline: this.props.inline});
    }
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

    return classes;
  },

  _renderDrop: function() {
    var classes = this._classes(CLASS_ROOT + "__drop");
    if (this.props.dropColorIndex) {
      classes.push("background-color-index-" + this.props.dropColorIndex);
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "__drop--large");
    }

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
      <div className={CLASS_ROOT + "__drop-contents"} onClick={this._onSink}>
        <input id="search-drop-input" type="search"
          defaultValue={this.props.defaultValue}
          value={this.props.value}
          className={CLASS_ROOT + "__input"}
          onChange={this._onChangeInput} />
        <div className={CLASS_ROOT + "__suggestions"}>
          {suggestions}
        </div>
      </div>
    );

    if (! this.state.inline) {
      var control = this._createControl();
      var rightAlign = (! this.props.dropAlign.left);
      var first = rightAlign ? contents : control;
      var second = rightAlign ? control : contents;

      contents = (
        <div className={CLASS_ROOT + "__drop-header"}>
          {first}
          {second}
        </div>
      );
    }

    return (
      <div id="search-drop" className={classes.join(' ')}>
        {contents}
      </div>
    );
  },

  render: function () {

    var classes = this._classes(CLASS_ROOT);
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    if (this.state.inline) {

      var readOnly = this.props.suggestions ? true : false;

      return (
        <div className={classes.join(' ')}>
          <input ref="input" type="search"
            placeholder={this.getGrommetIntlMessage(this.props.placeHolder)}
            defaultValue={this.props.defaultValue}
            value={this.props.value}
            className={CLASS_ROOT + "__input"}
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
          onClick={this._onAddDrop}
          onFocus={this._onFocusControl}
          onBlur={this._onBlurControl}>
          {controlContents}
        </div>
      );
    }
  }

});

module.exports = Search;
