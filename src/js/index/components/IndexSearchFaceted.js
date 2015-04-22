// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var IndexStore = require('../stores/IndexStore');
var Search = require('../utils/Search');
var StringConvert = require('../utils/StringConvert');
var Clear = require('../../components/icons/Clear');
var KeyboardAccelerators = require('../../mixins/KeyboardAccelerators');

var CLASS_ROOT = 'index-search-faceted';

var IndexSearchFaceted = React.createClass({

  mixins: [KeyboardAccelerators],

  _onChange: function() {
    var index = IndexStore.getAll();
    this.setState({
      search: index.params.search,
      suggestions: index.facetedSearchSuggestions,
      suggestionIndex: -1
    });
  },

  _onClose: function() {
    var inputElement = this.refs.input.getDOMNode();
    inputElement.blur();
  },

  _onUp: function() {
    if (this.state.suggestionIndex >= 0) {
      this.setState({suggestionIndex: this.state.suggestionIndex - 1});
    }
  },

  _onDown: function() {
    if (this.state.suggestionIndex < this.state.suggestions.length-1) {
      this.setState({suggestionIndex: this.state.suggestionIndex + 1});
    }
  },

  _onEnter: function() {
    if (this.state.suggestionIndex >= 0) {
      this._onClickSuggestion(
        this.state.suggestions[this.state.suggestionIndex].term);
    } else {
      this._onClose();
    }
  },

  _onTab: function(event) {
    event.preventDefault();
    this._onEnter();
  },

  _onFocus: function() {
    this.setState({active: true});
    this.startListeningToKeyboard({esc: this._onClose,
      up: this._onUp, down: this._onDown, enter: this._onEnter, tab: this._onTab});
  },

  _onBlur: function() {
    this.setState({active: false});
    this.stopListeningToKeyboard();
  },

  _activate: function () {
    this.setState({active: true});
    var inputElement = this.refs.input.getDOMNode();
    var that = this;
    setTimeout(function () {
      that.setState({active: true}); // to prevent onBlur behavior when clicking suggestion
      inputElement.focus();
    }, 10);
  },

  _onInputChange: function(event) {
    var text = event.target.value;
    var search = Search.create(text);
    this.setState({search: search, suggestionIndex: -1});
    clearTimeout(this._timer);
    if (! search.error) {
      this._timer = setTimeout(function () {
        this.props.onSearch(search.fullText);
      }, 300);
    }
  },

  _onClear: function(event) {
    event.stopPropagation();
    clearTimeout(this._timer);
    this.props.onSearch('');
    //this._refocus();
  },

  _onClearToken: function (token) {
    var search = this.state.search.clone();
    search.remove(token);
    this.props.onSearch(search.fullText);
  },

  _onClickSuggestion: function(term) {
    var fullText = this.state.search.fullText;
    if (':' === term[term.length-1]) {
      // attribute name
      // prune any pre-typed text
      fullText = fullText.replace(/^\S+$/, '');
      fullText = fullText.replace(/\s\S+$/, ' ');
      fullText += term;
    } else {
      // attribute value
      // prune any pre-typed text
      fullText = fullText.replace(/:\S+$/, ':');
      term = StringConvert.quoteIfNecessary(term);
      fullText += term;
    }
    this.props.onSearch(fullText);
    this._activate();
  },

  getInitialState: function() {
    this._timer = null;
    var index = IndexStore.getAll();
    return {
      active: false,
      search: index.params.search,
      suggestions: index.facetedSearchSuggestions,
      suggestionIndex: -1
    };
  },

  componentDidMount: function() {
    IndexStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    clearTimeout(this._timer);
    IndexStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function() {
    // place suggestions drop down in line with search text
    var textMirrorElement = this.refs.textMirror.getDOMNode();
    var suggestionsElement = this.refs.suggestions.getDOMNode();
    var rect = textMirrorElement.getBoundingClientRect();
    suggestionsElement.style.left = '' + Math.floor(rect.right - rect.left) + 'px';
  },

  render: function() {
    var search = this.state.search;
    var classes = [CLASS_ROOT];
    var inputClasses = [CLASS_ROOT + "__text"];
    var clearClasses = [CLASS_ROOT + "__clear control-icon"];
    if (search.fullText.length > 0) {
      inputClasses.push(CLASS_ROOT + "__text--set");
      clearClasses.push(CLASS_ROOT + "__clear--active");
    }
    if (search.error) {
      inputClasses.push(CLASS_ROOT + "__text--error");
    }

    var tokens = [];
    var placeholder = '';

    if (this.state.active) {
      classes.push(CLASS_ROOT + "--active");
    } else {
      tokens = search.tokens.map(function (token) {
        var contents;
        if (token.attribute) {
          contents = [
            (<span className={CLASS_ROOT + "__token-attribute"}>{token.attribute}</span>),
            (<span className={CLASS_ROOT + "__token-value"}>{token.value}</span>)
          ];
        } else {
          contents = (<span className={CLASS_ROOT + "__token-text"}>{token.text}</span>);
        }
        var tokenClasses = [CLASS_ROOT + "__token", "list-item"];
        if (token.error) {
          tokenClasses.push(CLASS_ROOT + "__token--error");
        }

        var onClearToken = this._onClearToken;
        return (
          <li className={tokenClasses.join(' ')}>
            {contents}
            <span className={CLASS_ROOT + "__token-clear control-icon"}
              onClick={function (e) {e.stopPropagation(); onClearToken.call(null, token);}}>
              <Clear />
            </span>
          </li>
        );
      }, this);

      if (tokens.length === 0) {
        placeholder = "Search and filter";
      }
    }

    var suggestions = [];
    if (! search.error) {
      suggestions = this.state.suggestions.map(function (suggestion, index) {
        var classes = [CLASS_ROOT + "__suggestion", "list-item"];
        if (index === this.suggestionIndex) {
          classes.push(CLASS_ROOT + "__suggestion--active");
        }
        var count = '';
        if (suggestion.hasOwnProperty('count')) {
          count = (
            <span className={CLASS_ROOT + "__suggestion-count"}>
              {suggestion.count}
            </span>
          );
        }
        return (
          <li key={suggestion.term} className={classes.join(' ')}
            onMouseDown={this._onClickSuggestion.bind(null, suggestion.term)}>
            <span className={CLASS_ROOT + "__suggestion-term"}>
              {suggestion.term}
            </span>
            {count}
          </li>
        );
      }, this);
    }

    var suggestionsClasses = [CLASS_ROOT + "__suggestions", "list-block", "list-block--tiny"];
    if (suggestions.length > 0) {
      suggestionsClasses.push(CLASS_ROOT + "__suggestions--active");
    }

    // mirror all text except last term
    var endMirrorIndex = Math.max(search.fullText.lastIndexOf(' '),
      search.fullText.lastIndexOf(':'), 0);
    var mirrorText = search.fullText.slice(0, endMirrorIndex);

    return (
      <div className={classes.join(' ')} onClick={this._activate}>
        <input ref="input" className={inputClasses.join(' ')}
          value={search.fullText}
          placeholder={placeholder}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChange={this._onInputChange}/>
        <span ref="textMirror" className={CLASS_ROOT + "__text-mirror"}>
          {mirrorText}
        </span>
        <ol className={CLASS_ROOT + "__tokens list-bare"}>
          {tokens}
        </ol>
        <div className={clearClasses.join(' ')} onClick={this._onClear}>
          <Clear />
        </div>
        <ul ref="suggestions" className={suggestionsClasses.join(' ')}>
          {suggestions}
        </ul>
      </div>
    );
  }

});

module.exports = IndexSearchFaceted;
