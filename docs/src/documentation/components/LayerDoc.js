// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var Header = require('grommet/components/Header');
var FullForm = require('./FullForm');

var SimpleDialog = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  render: function () {
    return (
      <Layer onClose={this.props.onClose} closer={true}>
        <Form>
          <Header>
            <h2>Title</h2>
          </Header>
          <FormFields>
            <p>This is a simple dialog.</p>
          </FormFields>
        </Form>
      </Layer>
    );
  }
});

var FormDialog = React.createClass({
  propTypes: {
    onClose: React.PropTypes.func.isRequired
  },

  _onSubmit: function (event) {
    event.preventDefault();
    this.props.onClose();
  },

  render: function () {
    return (
      <Layer>
        <FullForm onCancel={this.props.onClose} onSubmit={this._onSubmit} />
      </Layer>
    );
  }
});

var LayerDoc = React.createClass({

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
    "<Layer>\n  ...\n</Layer>";

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
          <h1>Layer</h1>
          <p>A modal overlay, often containing a <a>Form</a>.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>align    center|top|bottom|left|right</code></dt>
            <dd>Which direction the layer contents should emanate from.</dd>
            <dt><code>closer   {"true|false|{node}"}</code></dt>
            <dd>Adds a visible control to close the layer.
              If the caller provides a node, it is the caller&#39;s
              responsibility to listen to events from the node.</dd>
            <dt><code>flush    true|false</code></dt>
            <dd>Whether the contents are flush with the edges or not.
              Defaults to false.</dd>
            <dt><code>hidden   true|false</code></dt>
            <dd>Whether the contents are rendered offscreen.
              Defaults to false.</dd>
            <dt><code>peek     true|false</code></dt>
            <dd>Whether the hidden contents are shown just a bit.
              Defaults to false.</dd>
            <dt><code>onClose  {"function () {...}"}</code></dt>
            <dd>Function that will be called when the user clicks on the
              translucent background.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <button onClick={this._onOpenSimple}>Simple</button>
          {simple}
          <pre><code className="html">{"<Layer> ..."}</code></pre>

          <h3>Form</h3>
          <button onClick={this._onOpenForm}>Form</button>
          {form}
          <pre><code className="html">{"<Layer> ..."}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = LayerDoc;
