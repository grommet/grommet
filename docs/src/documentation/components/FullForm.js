// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('grommet/components/Form');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var HelpIcon = require('grommet/components/icons/Help');
var Table = require('grommet/components/Table');
var Footer = require('grommet/components/Footer');

var FullForm = React.createClass({

  propTypes: {
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
      <Form>
        <Header>
          <h1>Edit</h1>
          <Menu direction="right">
            <div className="control-icon">
              <HelpIcon />
            </div>
          </Menu>
        </Header>
        <fieldset>
          <FormField>
            <label htmlFor="item1">Item 1</label>
            <input id="item1" type="text" />
          </FormField>
          <FormField>
            <label></label>
            <input id="item2" type="checkbox" />
            <label htmlFor="item2" className="checkbox">Item 2</label>
          </FormField>
          <FormField>
            <label>Item 3</label>
            <span>
              <input id="item3-1" name="item3" type="radio" />
              <label htmlFor="item3-1" className="radio">first</label>
              <input id="item3-2" name="item3" type="radio" />
              <label htmlFor="item3-2" className="radio">second</label>
            </span>
          </FormField>
          <FormField>
            <label htmlFor="item4">Item 4</label>
            <textarea id="item4"></textarea>
          </FormField>
          <FormField>
            <label>Item 5</label>
            <input type="text" />
            <button>Select</button>
          </FormField>
          <FormField>
            <label htmlFor="item6">Item 6</label>
            <select id="item6">
              <option>first</option>
              <option>second</option>
              <option>third</option>
            </select>
            <a>learn more ...</a>
          </FormField>
          <FormField>
            <label htmlFor="item7">Item 7</label>
            <Table ref="table" selectable={true} defaultSelection={0}>
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
          <FormField>
            <label htmlFor="item8">Item 8</label>
            <input id="item8" type="number"
              min="1" max="20" step="1" defaultValue="10" />
          </FormField>
          <FormField>
            <label htmlFor="item9">Item 9</label>
            <input id="item9" type="range"
              min="1" max="20" defaultValue="10"
              onChange={this._onChangeRange}/>
            <span ref="rangeValue">{this.state.rangeValue}</span>
          </FormField>
        </fieldset>
        <Footer>
          <span></span>
          <Menu direction="right">
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
