// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Up = require('./Up');
var Right = require('./Right');

function addContents(contents) {
  return contents.map(function (content, index) {
    if (content.hasOwnProperty('section')) {
      var classes = ["document__contents-section"];
      if (content.active) {
        classes.push("document__contents-section--active");
      }
      var children = '';
      if (content.hasOwnProperty('contents')) {
        children = addContents(content.contents);
      }
      return (
        <div key={index} className={classes.join(' ')}>
          <h3>{content.section}</h3>
          {children}
        </div>
      );
    } else {
      return (
        <div key={index} className="document__contents-page">
          {content}
        </div>
      );
    }
  });
}

var Document = React.createClass({

  propTypes: {
    chapters: React.PropTypes.array,
    chapter: React.PropTypes.node,
    pages: React.PropTypes.array,
    next: React.PropTypes.node,
    activeChapterIndex: React.PropTypes.number
  },

  _styleTitle: function () {
    var parent = this.refs.document.getDOMNode().parentNode;
    if (parent.scrollTop > window.innerHeight) {
      this.setState({scrolled: true});
    }
    /*
    // pin title section under header when content header disappears
    var appHeaderElement = document.querySelectorAll('div.header').item(0);
    var appHeaderRect = appHeaderElement.getBoundingClientRect();
    var chapterElement = this.refs.chapter.getDOMNode();
    var chapterHeaderElement = chapterElement.querySelectorAll('header').item(0);
    var chapterHeaderRect = chapterHeaderElement.getBoundingClientRect();
    var titleElement = this.refs.title.getDOMNode();
    if (chapterHeaderRect.bottom < (appHeaderRect.bottom + 48)) { // TODO: 48 too hard coded
      titleElement.classList.add("chapter__title--pinned");
    } else {
      titleElement.classList.remove("chapter__title--pinned");
    }
    */
  },

  _onScroll: function (event) {
    // debounce
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(this._styleTitle, 10);
  },

  _onClickTop: function (event) {
    var parent = this.refs.document.getDOMNode().parentNode;
    parent.scrollTop = 0;
  },

  _onClickNext: function (event) {
    var next = this.refs.next.getDOMNode();
    next.querySelectorAll('a').item(0).click();
  },

  getInitialState: function () {
    return {scrolled: false};
  },

  componentDidMount: function () {
    var parent = this.refs.document.getDOMNode().parentNode;
    parent.addEventListener("scroll", this._onScroll);
  },

  componentWillReceiveProps: function () {
    this.setState({scrolled: false});
  },

  componentDidUpdate: function () {
    if (! this.state.scrolled) {
      this._onClickTop();
    }
  },

  componentWillUnmount: function () {
    var parent = this.refs.document.getDOMNode().parentNode;
    parent.removeEventListener("scroll", this._onScroll);
  },

  render: function() {
    var classes = ["document"];

    if (this.props.activeChapterIndex) {
      classes.push("document--active-chapter-" + this.props.activeChapterIndex);
    }

    var chapters = '';
    var chapter = '';
    if (this.props.chapter) {
      chapter = (
        <div className="document__chapter-title">
          {this.props.chapter}
        </div>
      );
    } else {
      classes.push("document--chapter");

      if (this.props.chapters) {
        var items = this.props.chapters.map(function (chapter, index) {
          return (
            <div key={index} className="document__chapter">
              {chapter}
            </div>
          );
        });
        chapters = (
          <div className={"document__chapters"}>
            <div className={"document__chapters-items"}>
              {items}
            </div>
          </div>
        );
      } else {
        classes.push("document--no-chapters")
      }
    }

    var pages = '';
    if (this.props.pages) {
      items = this.props.pages.map(function (page, index) {
        return (
          <div key={index} className="document__page">
            {page}
          </div>
        );
      });
      pages = (
        <div className={"document__pages"}>
          <div className={"document__pages-items"}>
            {items}
          </div>
        </div>
      );
    }

    var next = '';
    if (this.props.next) {
      next = (
        <div ref="next" className={"document__next control-icon"}
          onClick={this._onClickNext}>
          {this.props.next}
          <Right />
        </div>
      );
    }

    var upClasses = ["document__top", "control-icon"];
    if (this.state.scrolled) {
      upClasses.push("document__top--active");
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        {chapters}
        {chapter}
        {pages}
        <div className={"document__content"}>
          {this.props.children}
        </div>
        <div className={"document__footer"}>
          {next}
          <div className={upClasses.join(' ')}
            onClick={this._onClickTop}>
            <Up />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Document;
