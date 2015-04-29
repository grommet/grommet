// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var GrommetDocument = require('grommet/components/Document');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var FullForm = require('./FullForm');

var SimpleDialog = React.createClass({
  _onSubmit: function (event) {
    event.preventDefault();
    this.props.onClose();
  },
  render: function () {
    return (
      <Layer>
        <Form>
          <Header>
            <h2>Title</h2>
          </Header>
          <FormFields>
            <p>This is a simple dialog.</p>
          </FormFields>
          <Footer>
            <span></span>
            <Menu direction="right">
              <button className="primary" onClick={this._onSubmit}>Close</button>
            </Menu>
          </Footer>
        </Form>
      </Layer>
    );
  }
});

var FormDialog = React.createClass({
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
