// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var NavStore = require('../stores/NavStore');
var Link = require('../components/Link');

var NavRecents = React.createClass({

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
    var classes = ['nav-recents'];
    if (this.state.activeRecents.length > 0) {
      classes.push('nav-recents--active');
    }

    var clickHandler = this._onClick;
    var recents = this.state.activeRecents.map(function (recent) {
      return (
        <li key={recent.href} className={'nav-recents__recent list-item'}>
          <Link href={recent.href}
            onClick={clickHandler}>
            {recent.name}
          </Link>
        </li>
      );
      /*
            <span className={'nav-recents__recent-category'}>
              {Router.categoryLabel(recent.category)}
            </span>
      */
    });
    return (
      <div className={classes.join(' ')}>
        <h2 className={'nav-recents__label gamma'}>Recent</h2>
        <ul className={'nav-recents__list list-block list-block--tiny'}>
          {recents}
        </ul>
      </div>
    );
  }

});

module.exports = NavRecents;
