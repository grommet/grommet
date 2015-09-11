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
var Actions = require('../actions/Actions');

var Configuration = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  _onConfigure: function (event) {
    event.preventDefault();
    let configuration = {
      model: this.refs.model.getDOMNode().value,
      numNodes: parseInt(this.refs.nodes.getDOMNode().value),
      numDrives: parseInt(this.refs.drives.getDOMNode().value)
    };
    Actions.configure(configuration);
  },

  render: function() {
    var options = this.props.data.configurationOptions;
    var configuration = this.props.data.configuration;
    var models = options.models.map(function (model) {
      return <option key={model}>{model}</option>;
    });

    return (
      <Article>
        <Header fixed={true} pad={{horizontal: 'medium'}}>
          <Title>{this.props.data.title}</Title>
        </Header>
        <Form pad="medium">
          <FormFields>
            <fieldset>
              <FormField label="Model" htmlFor={"model"}>
                <select ref="model" id={"model"} name="model">
                  {models}
                </select>
              </FormField>
              <FormField label="Nodes" htmlFor={"nodes"}>
                <input ref="nodes" id={"nodes"} name="nodes" type="number"
                  min="1" max={options.maxNodes} step="1"
                  defaultValue={configuration.numNodes} />
              </FormField>
              <FormField label="Drives" htmlFor={"drives"}>
                <input ref="drives" id={"drives"} name="drives" type="number"
                  min="1" max={options.maxDrives} step="1"
                  defaultValue={configuration.numDrives} />
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
