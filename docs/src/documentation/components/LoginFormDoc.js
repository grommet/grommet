// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var LoginForm = require('grommet/components/LoginForm');
var GrommetDocument = require('grommet/components/Document');
var Logo = require('../../Logo');

var LoginFormDoc = React.createClass({

  render: function() {
    var inline = "<LoginForm onSubmit={...} />";
    return (
      <GrommetDocument>
        <header>
          <h1>LoginForm</h1>
          <p>The form used to log in.</p>

          <pre><code className="html">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
          <dt><code>errors          {"[{message}, ...]"}</code></dt>
          <dd>An array of error messages. Use this if there is a failure to log in.</dd>
          <dt><code>forgotPassword  {"{component}"}</code></dt>
          <dd>A link that would take the user to a new page.</dd>
          <dt><code>logo            {"{component}"}</code></dt>
          <dd>A logo component.</dd>
          <dt><code>onSubmit        {"function ({username: ..., password: ...}) {...}"}</code></dt>
          <dd>Function that will be called with the username and password provided.</dd>
          <dt><code>rememberMe      true|false</code></dt>
          <dd>Whether to include a remember me input.</dd>
          <dt><code>title           {"{string}"}</code></dt>
          <dd>The product name.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Simple</h3>
          <div className="example">
            <LoginForm />
          </div>
          <pre><code className="html">{"<LoginForm onSubmit={...}/>"}</code></pre>

          <h3>Full</h3>
          <div className="example">
            <LoginForm logo={<Logo />} title="Product Name"
              rememberMe={true} forgotPassword={<a>Forgot password?</a>}
              errors={["Invalid username or password."]}/>
          </div>
          <pre><code className="html">{"<LoginForm\n  logo={<Logo />}\n  title=\"Product Name\"\n  rememberMe={true}\n  forgotPassword={<a>...</a>}\n  onSubmit={...}\n  errors={[\"Invalid username or password.\"]}\n/>"}</code></pre>

        </section>
      </GrommetDocument>
    );
  }
});

module.exports = LoginFormDoc;
