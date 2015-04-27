// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var HelpIcon = require('grommet/components/icons/Help');
var CheckBox = require('grommet/components/CheckBox');
var RadioButton = require('grommet/components/RadioButton');
var Table = require('grommet/components/Table');
var Footer = require('grommet/components/Footer');

var FullForm = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func
  },

  _onChangeRange: function (event) {
    this.setState({rangeValue: event.target.value});
  },

  getInitialState: function () {
    return {rangeValue: 10};
  },

  render: function() {
    return (
      <Form onSubmit={this.props.onSubmit} compact={this.props.compact}>
        <Header>
          <h1>Edit</h1>
          <Menu direction="left">
            <HelpIcon />
          </Menu>
        </Header>
        <FormFields>
          <fieldset>
            <FormField label="Item 1" htmlFor="item1" help="something helpful">
              <input id="item1" type="text" />
            </FormField>
            <FormField>
              <CheckBox id="item2" label="Item 2" name="item2" />
            </FormField>
            <FormField label="Item 3">
              <RadioButton id="item3-1" label="first" name="item3" />
              <RadioButton id="item3-2" label="second" name="item3" />
            </FormField>
            <FormField label="Item 4" htmlFor="item4" error="something's wrong">
              <textarea id="item4"></textarea>
            </FormField>
            <FormField label="Item 5">
              <input type="text" />
              <button>Select</button>
            </FormField>
            <FormField label="Item 6" htmlFor="item6">
              <select id="item6">
                <option>first</option>
                <option>second</option>
                <option>third</option>
              </select>
              <a>learn more ...</a>
            </FormField>
          </fieldset>
          <fieldset>
            <h3>Another section</h3>
            <p>Some informational text.</p>
            <FormField label="Item 7" htmlFor="item7">
              <Table selectable={true} defaultSelection={0}>
                <tbody>
                  <tr>
                    <td>first</td>
                    <td>123</td>
                  </tr>
                  <tr>
                    <td>second</td>
                    <td>456</td>
                  </tr>
                  <tr>
                    <td>third</td>
                    <td>789</td>
                  </tr>
                </tbody>
              </Table>
            </FormField>
            <FormField label="Item 8" htmlFor="item8">
              <input id="item8" type="number"
                min="1" max="20" step="1" defaultValue="10" />
            </FormField>
            <FormField label="Item 9" htmlFor="item9">
              <input id="item9" type="range"
                min="1" max="20" defaultValue="10"
                onChange={this._onChangeRange}/>
              <span ref="rangeValue">{this.state.rangeValue}</span>
            </FormField>
          </fieldset>
        </FormFields>
        <Footer>
          <span></span>
          <Menu direction="left">
            <a onClick={this.props.onCancel}>Cancel</a>
            <input type="submit" className="primary" value="OK"
              onClick={this.props.onSubmit} />
          </Menu>
        </Footer>
      </Form>
    );
  }
});

module.exports = FullForm;
