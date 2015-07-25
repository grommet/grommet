// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Header = require('grommet/components/Header');
var Title = require('grommet/components/Title');
var Footer = require('grommet/components/Footer');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');

var Configuration = React.createClass({

  propTypes: {
    onConfigure: React.PropTypes.func.isRequired
  },

  _onConfigure: function (event) {
    event.preventDefault();
    let configuration = {
      model: this.refs.model.getDOMNode().value,
      nodeCount: parseInt(this.refs.nodes.getDOMNode().value),
      driveCount: parseInt(this.refs.drives.getDOMNode().value)
    };
    this.props.onConfigure(configuration);
  },

  render: function() {
    return (
      <Article>
        <Header fixed={true} pad={{horizontal: 'medium'}}>
          <Title>HP 3Par Storage Cabling</Title>
        </Header>
        <Form pad="medium">
          <FormFields>
            <fieldset>
              <FormField label="Model" htmlFor={"model"}>
                <select ref="model" id={"model"} name="model">
                  <option>7200</option>
                  <option>7400</option>
                </select>
              </FormField>
              <FormField label="Nodes" htmlFor={"nodes"}>
                <input ref="nodes" id={"nodes"} name="nodes" type="number"
                  min="1" max="4" step="1" defaultValue="2" />
              </FormField>
              <FormField label="Drives" htmlFor={"drives"}>
                <input ref="drives" id={"drives"} name="drives" type="number"
                  min="1" max="20" step="1" defaultValue="12" />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad={{vertical: 'medium'}}>
            <Menu>
              <Button label="Generate" primary={true} strong={true}
                onClick={this._onConfigure} />
            </Menu>
          </Footer>
        </Form>
      </Article>
    );
  }

});

module.exports = Configuration;
