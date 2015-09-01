// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Layer = require('grommet/components/Layer');
var Header = require('grommet/components/Header');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FullForm = require('./samples/FullForm');
var AddUserForm = require('./samples/AddUserForm');
var ConfirmationForm = require('./samples/ConfirmationForm');

var LayerDoc = React.createClass({

  getInitialState: function () {
    return {
      active: null,
      align: 'center'
    };
  },

  _onOpen: function (which, align) {
    this.setState({active: which, align: align});
  },

  _onClose: function (event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({active: null});
  },

  render: function() {
    var inline = "<Layer>\n  ...\n</Layer>";

    var activeLayer = null;
    if (this.state.active) {
      var form;
      switch (this.state.active) {
        case 'simple':
          activeLayer = (
            <Layer onClose={this._onClose} closer={true} flush={true}
              align={this.state.align}>
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
          break;
        case 'mixed':
          form = <FullForm onCancel={this._onClose} onSubmit={this._onClose} />;
          break;
        case 'add user':
          form = <AddUserForm onCancel={this._onClose} onSubmit={this._onClose} />;
          break;
        case 'confirmation':
          form = <ConfirmationForm onCancel={this._onClose} onSubmit={this._onClose} />;
          break;
      }
      if (! activeLayer) {
        activeLayer = <Layer onClose={this._onClose} closer={true} flush={true} align={this.state.align}>{form}</Layer>;
      }
    }

    return (
      <Article primary={true}>
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
              closer control. Clicking the closer control does not automatically cause the Layer to be removed. The recipient of this callback can still decide whether to continue rendering the Layer or not.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <button onClick={this._onOpen.bind(this, 'simple', 'top')}>Simple</button>
          <pre><code className="html">{"<Layer> ..."}</code></pre>

          <h3>Edit</h3>
          <button onClick={this._onOpen.bind(this, 'mixed', 'right')}>Edit</button>
          <pre><code className="html">{"<Layer> ..."}</code></pre>

          <h3>Add User</h3>
          <button onClick={this._onOpen.bind(this, 'add user', 'right')}>Add User</button>
          <pre><code className="html">{"<Layer> ..."}</code></pre>

          <h3>Confirmation</h3>
          <button onClick={this._onOpen.bind(this, 'confirmation', 'right')}>Confirmation</button>
          <pre><code className="html">{"<Layer> ..."}</code></pre>

          <h3>Edit, left</h3>
          <button onClick={this._onOpen.bind(this, 'mixed', 'left')}>Edit</button>
          <pre><code className="html">{"<Layer align=\"left\"> ..."}</code></pre>

        </section>

        {activeLayer}

      </Article>
    );
  }
});

module.exports = LayerDoc;
