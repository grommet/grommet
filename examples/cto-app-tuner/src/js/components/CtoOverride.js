// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Layer = require('grommet/components/Layer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var Footer = require('grommet/components/Footer');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');

var CtoOverride = React.createClass({

  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <Layer onClose={this.props.onClose} closer={true}>
        <Form compact={true} onSubmit={this._onSubmit}>
          <FormFields>
            <h3>CTO Override?</h3>
            <p>Are you prepared for this much fun?</p>
          </FormFields>
          <Footer>
            <Menu direction="row">
              <Button label="Yes, of course" primary={true} onClick={this.props.onSubmit} />
              <Button label="No" onClick={this.props.onClose} />
            </Menu>
          </Footer>
        </Form>
      </Layer>
    );
  }

});

module.exports = CtoOverride;
