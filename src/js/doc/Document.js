// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var DocumentFooter = require('./DocumentFooter');
var MenuNavigation = require('./MenuNavigation');

var Document = React.createClass({

  propTypes: {
    chapters: React.PropTypes.array,
    chapter: React.PropTypes.node,
    pages: React.PropTypes.array,
    next: React.PropTypes.node,
    activeChapterIndex: React.PropTypes.number,
    background: React.PropTypes.string
  },

  _styleBackground: function () {
    if (this.refs.background) {
      var windowRatio = window.innerWidth / window.innerHeight;
      var backgroundElement = this.refs.background.getDOMNode();
      var backgroundRatio = backgroundElement.offsetWidth / backgroundElement.offsetHeight;
      if (windowRatio > backgroundRatio) {
        if (this.state.portrait) {
          this.setState({portrait: false});
        }
      } else {
        if (! this.state.portrait) {
          this.setState({portrait: true});
        }
      }
    }
  },

  _onResize: function () {
    // debounce
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(this._styleBackground, 10);
  },

  getInitialState: function () {
    return {portrait: false};
  },

  componentDidMount: function () {
    window.addEventListener("resize", this._onResize);
    setTimeout(this._styleBackground, 100);
  },

  componentWillUnmount: function () {
    window.removeEventListener("resize", this._onResize);
  },

  render: function() {
    var classes = ["document"];

    if (this.props.activeChapterIndex) {
      classes.push("document--active-chapter-" + this.props.activeChapterIndex);
    }

    var chapters = '';
    var chapter = '';
    var items = '';
    if (this.props.chapter) {
      chapter = (
        <div className="document__chapter-title">
          {this.props.chapter}
        </div>
      );
    } else {
      classes.push("document--chapter");
     
      if (this.props.chapters) {
        items = this.props.chapters.map(function (chapter, index) {
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
        classes.push("document--no-chapters");
      }
    }

    var pages = '';
    if (this.props.pages) {
      pages = <MenuNavigation items={this.props.pages} />;
    }

    var next = '';
    if (this.props.next) {
      next = (
        <div ref="next" className="document__next">
          {this.props.next}
        </div>
      );
    }

    var background = '';
    if (this.props.background) {
      var backgroundClasses = ["document__background"];
      if (this.state.portrait) {
        backgroundClasses.push("document__background--portrait");
      }
      background = (
        <img ref="background" className={backgroundClasses.join(' ')}
          src={this.props.background} alt="background" />
      );
    }

    return (
      <div ref="document" className={classes.join(' ')}>
        {background}
        {chapters}
        {chapter}
        {pages}
        <div className={"document__content"}>
          {this.props.children}
        </div>
        <DocumentFooter next={next} />
      </div>
    );
  }
});

module.exports = Document;
