// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavStore = require('../stores/NavStore');
var navActions = require('../actions/NavActions');
var Router = require('../utils/Router');
var Link = require('../components/Link');

var NavSuggestions = React.createClass({

  _onChange: function() {
    if (this.isMounted()) { /// workaround error
      var data = NavStore.getAll();
      this.setState(data);
    }
  },

  _onClick: function(suggestion) {
    this.props.onRequestClose();
  },

  getInitialState: function() {
    var data = NavStore.getAll();
    return data;
  },

  componentDidMount: function() {
    NavStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NavStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = ['nav-suggestions'];
    if (this.state.suggestions.length > 0) {
      classes.push('nav-suggestions--active');
    }

    var clickHandler = this._onClick;
    var suggestions = this.state.suggestions.map(function (suggestion) {
      var href = Router.resourceHref(suggestion.category, suggestion.uri);
      return (
        <li key={suggestion.uri} className={"nav-suggestions__suggestion list-item"}>
          <Link href={href}
            onClick={clickHandler}>
            {suggestion.name}
            <span className={'nav-suggestions__suggestion-category'}>
              {Router.categoryLabel(suggestion.category)}
            </span>
          </Link>
        </li>
      );
    });

    return (
      <div className={classes.join(' ')}>
        <h2 className={'nav-suggestions__label gamma'}>Suggestions</h2>
        <ul className={'nav-suggestions__list list-block list-block--tiny'}>
          {suggestions}
        </ul>
      </div>
    );
  }

});

module.exports = NavSuggestions;
