// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var SearchIcon = require('../../components/icons/Search');
var ClearIcon = require('../../components/icons/Clear');

var CLASS_ROOT = 'index-search';

var IndexSearch = React.createClass({

  _onInputChange: function(event) {
    var text = event.target.value;
    var search = this.props.search.clone();
    search.replaceTextTokens(text);
    this._inputChanged = true;
    this.setState({search: search});
    // delay to avoid burden
    clearTimeout(this._timer);
    if (! search.error) {
      this._timer = setTimeout(function () {
        this.props.onSearch(search.fullText);
      }.bind(this), 300);
    }
  },

  _onClear: function() {
    var search = this.props.search.clone();
    search.replaceTextTokens('');
    this.setState({search: search});
    clearTimeout(this._timer);
    this.props.onSearch(search.fullText);
  },

  getInitialState: function() {
    this._inputChanged = false;
    this._timer = null;
    return {search: this.props.search};
  },

  componentWillUnmount: function() {
    clearTimeout(this._timer);
  },

  render: function() {
    var search = this.props.search;
    var inputClasses = [CLASS_ROOT + "__text"];
    var clearClasses = [CLASS_ROOT + "__clear", "control-icon"];
    if (search.text.length > 0) {
      inputClasses.push(CLASS_ROOT + "__text--set");
      clearClasses.push(CLASS_ROOT + "__clear--active");
    }
    if (search.error) {
      inputClasses.push(CLASS_ROOT + "__text--error");
    }

    return (
      <div className={CLASS_ROOT}>
        <input ref="input" className={inputClasses.join(' ')} placeholder="Search"
          value={search.text} onChange={this._onInputChange}/>
        <div className={clearClasses.join(' ')} onClick={this._onClear}>
          <ClearIcon />
        </div>
      </div>
    );
  }

});

module.exports = IndexSearch;
