// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

function addContents(contents) {
  return contents.map(function (content, index) {
    if (content.hasOwnProperty('section')) {
      var children = '';
      if (content.hasOwnProperty('contents')) {
        children = addContents(content.contents);
      }
      return (
        <div key={index} className="document__contents-section">
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
    contents: React.PropTypes.array,
    activeSectionIndex: React.PropTypes.number
  },

  render: function() {
    var classes = ["document"];

    if (this.props.activeSectionIndex) {
      classes.push("document--active-section-" + this.props.activeSectionIndex);
    }

    var contents = '';
    if (this.props.contents) {
      var items = addContents(this.props.contents);
      contents = (
        <div className={"document__contents"}>
          {items}
        </div>
      );
    } else {
      classes.push("document--no-contents")
    }

    return (
      <div className={classes.join(' ')}>
        {contents}
        <div className={"document__content"}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Document;
