// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

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

function addChapters(chapters) {
  return chapters.map(function (chapter, index) {
    return (
      <div key={index} className="document__chapter">
        {chapter}
      </div>
    );
  });
}

function addPages(pages) {
  return pages.map(function (page, index) {
    return (
      <div key={index} className="document__page">
        {page}
      </div>
    );
  });
}

var Document = React.createClass({

  propTypes: {
    chapters: React.PropTypes.array,
    pages: React.PropTypes.array,
    next: React.PropTypes.node,
    activeChapterIndex: React.PropTypes.number
  },

  render: function() {
    var classes = ["document"];

    if (this.props.activeChapterIndex) {
      classes.push("document--active-chapter-" + this.props.activeChapterIndex);
    }

    var chapters = '';
    if (this.props.chapters) {
      var items = addChapters(this.props.chapters);
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

    var pages = '';
    if (this.props.pages) {
      items = addPages(this.props.pages);
      pages = (
        <div className={"document__pages"}>
          <div className={"document__pages-items"}>
            {items}
          </div>
        </div>
      );
    }

    return (
      <div className={classes.join(' ')}>
        {chapters}
        {pages}
        <div className={"document__content"}>
          {this.props.children}
        </div>
        <div className={"document__footer"}>
          {this.props.next}
        </div>
      </div>
    );
  }
});

module.exports = Document;
