// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavStore = require('../stores/NavStore');
var Router = require('../utils/Router');
var Link = require('../components/Link');

var NavPages = React.createClass({

  _onChange: function() {
    this.setState(NavStore.getAll());
  },

  _onClick: function() {
    this.props.onRequestClose();
  },

  getInitialState: function() {
    return NavStore.getAll();
  },

  componentDidMount: function() {
    NavStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    NavStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var classes = ['nav-pages'];
    if (this.state.activePages.length > 0 ||
      this.state.activeHighlightPages.length > 0) {
      classes.push('nav-pages--active');
    }

    var pages = this.state.activePages.map(function (page, index) {
      var classes = ['nav-pages__page'];
      if (0 === index) {
        classes.push('nav-pages__page--first-normal');
      }
      return (
        <li key={page.label} className={classes.join(' ')}>
          <Link href={Router.makeHref(page.route)}
            onClick={this._onClick}>
            <span className={'nav-pages__name'}>{page.label}</span>
          </Link>
        </li>
      );
    }, this);

    var highlightPages = this.state.activeHighlightPages.map(function (page) {
      var classes = ['nav-pages__page'];
      var icon = '';
      if (page.icon) {
        var pageIcon = React.createFactory(page.icon)();
        icon = (<div className='nav-pages__icon'>{pageIcon}</div>);
        classes.push('nav-pages__page--iconic');
      } else {
        var acronym = page.label.match(/([A-Z])/g);
        icon = (<span className='nav-pages__symbol'>{acronym.join('')}</span>);
      }
      return (
        <li key={page.label} className={classes.join(' ')}>
          <Link href={Router.makeHref(page.route)}
            onClick={this._onClick}>
            {icon}
            <span className={'nav-pages__name'}>{page.label}</span>
          </Link>
        </li>
      );
    }, this);

    if (this.state.pages.length > 5) {
      classes.push('nav-pages--small');
    }

    return (
      <div className={classes.join(' ')}>
        <ul className={'nav-pages__pages list-block'}>
          {highlightPages}
          {pages}
        </ul>
      </div>
    );
  }

});

module.exports = NavPages;
