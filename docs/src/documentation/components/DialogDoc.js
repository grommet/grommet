// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Dialog = require('grommet/components/Dialog');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');

var SimpleDialog = React.createClass({
  render: function () {
    return (
      <Dialog>
        <Header>
          <h1>Title</h1>
        </Header>
        <p>Lorem ipsum ...</p>
        <Footer>
          <span></span>
          <button onClick={this.props.onClose}>OK</button>
        </Footer>
      </Dialog>
    );
  }
});

var DialogDoc = React.createClass({

  _onOpen: function () {
    this.setState({active: true});
  },

  _onClose: function () {
    this.setState({active: false});
  },

  getInitialState: function () {
    return {active: false};
  },

  render: function() {
    var inline =
    "<Dialog>\n  ...\n</Dialog>";

    var simple = null;
    if (this.state.active) {
      simple = <SimpleDialog onClose={this._onClose} />;
    }
    return (
      <GrommetDocument>
        <header>
          <h1>Dialog</h1>
          <p>A modal overlay, usually containing a <a>Form</a>.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <button onClick={this._onOpen}>Launch</button>
          {simple}
          <pre><code className="html">{"<Dialog> ..."}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = DialogDoc;
