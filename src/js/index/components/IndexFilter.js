// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexSearch = require('../components/IndexSearch');
var IndexFilterAttribute = require('../components/IndexFilterAttribute');
var CloseIcon = require('../../components/icons/Close');

var CLASS_ROOT = 'index-filter';

var IndexFilter = React.createClass({

  _onReset: function () {
    this.props.onSearch('');
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    if (this.props.active) {
      classes.push(CLASS_ROOT + '--active');
    }

    var attributes = this.props.attributes.filter(function (attribute) {
      return attribute.filter;
    }).map(function (attribute) {
      return (
        <li key={attribute.name} className={CLASS_ROOT + "__attribute list-item"}>
          <IndexFilterAttribute
            search={this.props.search}
            attribute={attribute}
            onSearch={this.props.onSearch} />
        </li>
      );
    }, this);

    var resetClasses = [CLASS_ROOT + '__reset'];
    if (this.props.search.fullText.length > 0) {
      resetClasses.push(CLASS_ROOT + '__reset--active');
    }

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + '__header'}>
          <span className={CLASS_ROOT + '__title'}>{'Filter'}</span>
          <div className={resetClasses.join(' ')} onClick={this._onReset}>
            {'reset'}
          </div>
          <div className={CLASS_ROOT + "__close control-icon"}
            onClick={this.props.onClose}>
            <CloseIcon />
          </div>
        </div>
        <div className={CLASS_ROOT + '__contents'}>
          <div className={CLASS_ROOT + '__search'}>
            <div className={CLASS_ROOT + "__search-header"}>
              Search
            </div>
            <IndexSearch search={this.props.search} onSearch={this.props.onSearch}/>
          </div>
          <ol className={CLASS_ROOT + '__attributes list-block'}>
            {attributes}
          </ol>
        </div>
      </div>
    );
  }

});

module.exports = IndexFilter;
