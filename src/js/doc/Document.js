// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');

function addContents(input, output) {
  input.forEach(function (content) {
    if (content.hasOwnProperty('section')) {
      output.push(
        <h3 key={output.length} className="document__contents-section">
          {content.section}
        </h3>
      );
      if (content.hasOwnProperty('contents')) {
        addContents(content.contents, output);
      }
    } else {
      output.push(
        <div key={output.length} className="document__contents-page">
          {content}
        </div>
      );
    }
  });
}

var Document = React.createClass({

  propTypes: {
    contents: React.PropTypes.array
  },

  render: function() {
    var classes = ['document'];
    var contents = '';
    if (this.props.contents) {
      var items = []
      addContents(this.props.contents, items);
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
