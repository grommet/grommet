// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Dialog = require('grommet/components/Dialog');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var FullForm = require('./FullForm');

var SimpleDialog = React.createClass({
  render: function () {
    return (
      <Dialog>
        <Header>
          <h1>Title</h1>
        </Header>
        <p>This is a simple dialog.</p>
        <Footer>
          <span></span>
          <span>
            <button onClick={this.props.onClose}>Close</button>
          </span>
        </Footer>
      </Dialog>
    );
  }
});

var FormDialog = React.createClass({
  render: function () {
    return (
      <Dialog>
        <FullForm onCancel={this.props.onClose} onSubmit={this.props.onClose} />
      </Dialog>
    );
  }
});

var DialogDoc = React.createClass({

  _onOpenSimple: function () {
    this.setState({simpleActive: true});
  },

  _onCloseSimple: function () {
    this.setState({simpleActive: false});
  },

  _onOpenForm: function () {
    this.setState({formActive: true});
  },

  _onCloseForm: function () {
    this.setState({formActive: false});
  },

  getInitialState: function () {
    return {simpleActive: false, formActive: false};
  },

  render: function() {
    var inline =
    "<Dialog>\n  ...\n</Dialog>";

    var simple = null;
    if (this.state.simpleActive) {
      simple = <SimpleDialog onClose={this._onCloseSimple} />;
    }
    var form = null;
    if (this.state.formActive) {
      form = <FormDialog onClose={this._onCloseForm} />;
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
          <button onClick={this._onOpenSimple}>Simple</button>
          {simple}
          <pre><code className="html">{"<Dialog> ..."}</code></pre>

          <h3>Form</h3>
          <button onClick={this._onOpenForm}>Form</button>
          {form}
          <pre><code className="html">{"<Dialog> ..."}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = DialogDoc;
