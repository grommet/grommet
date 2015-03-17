// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('react-router').Navigation;
var Link = require('react-router').Link;

var Chapter = React.createClass({

  mixins: [Navigation],

  _styleTitle: function () {
    // pin title section under document header when content header disappears
    var docHeaderElement = document.querySelectorAll('div.header').item(0);
    var docHeaderRect = docHeaderElement.getBoundingClientRect();
    var chapterElement = this.refs.chapter.getDOMNode();
    var chapterHeaderElement = chapterElement.querySelectorAll('header').item(0);
    var chapterHeaderRect = chapterHeaderElement.getBoundingClientRect();
    var titleElement = this.refs.title.getDOMNode();
    if (chapterHeaderRect.bottom < (docHeaderRect.bottom + 48)) { // TODO: 48 too hard coded
      titleElement.classList.add("chapter__title--pinned");
    } else {
      titleElement.classList.remove("chapter__title--pinned");
    }
  },

  _onScroll: function () {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._styleTitle, 10);
  },

  _onClick: function (event) {
    // If this is a navigation item, scroll to the referenced section.
    if (event.target.parentNode.classList.contains("chapter__nav")) {
      var sectionElement = document.getElementById(event.target.dataset.target);
      var sectionRect = sectionElement.getBoundingClientRect();
      var doc = document.querySelectorAll('div.document').item(0);
      var docHeaderElement = document.querySelectorAll('div.header').item(0);
      var docHeaderRect = docHeaderElement.getBoundingClientRect();
      var chapterElement = this.refs.chapter.getDOMNode();
      var chapterRect = chapterElement.getBoundingClientRect();
      var titleElement = this.refs.title.getDOMNode();
      titleElement.classList.add("chapter__title--pinned");
      var titleRect = titleElement.getBoundingClientRect();
      if (chapterRect.top <= docHeaderRect.bottom) {
        // desktop layout, put below headers
        doc.scrollTop = (doc.scrollTop + sectionRect.top) -
          (docHeaderRect.bottom - docHeaderRect.top) -
          (titleRect.bottom - titleRect.top);
      } else {
        // palm layout, all the way to the top
        doc.scrollTop = doc.scrollTop + sectionRect.top;
      }
    }
  },

  componentDidMount: function () {
    var doc = document.querySelectorAll('div.document').item(0);
    doc.addEventListener("scroll", this._onScroll);
  },

  componentWillUnmount: function () {
    var doc = document.querySelectorAll('div.document').item(0);
    doc.removeEventListener("scroll", this._onScroll);
  },

  render: function() {
    return (
      <div ref="chapter" className={"chapter"} onClick={this._onClick}>
        <div ref="title" className={"chapter__title"}>
          <h1>{this.props.title}</h1>
        </div>
        {this.props.children}
        <RouteHandler />
      </div>
    );
  }

});

module.exports = Chapter;
