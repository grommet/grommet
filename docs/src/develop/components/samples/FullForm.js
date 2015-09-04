// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('grommet/components/Form');
var FormFields = require('grommet/components/FormFields');
var FormField = require('grommet/components/FormField');
var Header = require('grommet/components/Header');
var Menu = require('grommet/components/Menu');
var CheckBox = require('grommet/components/CheckBox');
var RadioButton = require('grommet/components/RadioButton');
var SearchInput = require('grommet/components/SearchInput');
var Table = require('grommet/components/Table');
var Footer = require('grommet/components/Footer');
var Button = require('grommet/components/Button');
var Calendar = require('grommet/components/Calendar');

var FullForm = React.createClass({

  propTypes: {
    compact: React.PropTypes.bool,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    prefix: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {prefix: 'ff'};
  },

  getInitialState: function () {
    return {
      rangeValue: 10,
      searchInput: {suggestions: this._searchInputSuggestions},
      calendarDate: (new Date()).toISOString().slice(0, 10)
    };
  },

  _searchInputSuggestions: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],

  _onChangeRange: function (event) {
    this.setState({rangeValue: event.target.value});
  },

  _onChange: function (event) {
    console.log('!!! FullForm changed', event.target, 'to', event.target.value);
  },

  _onSearchInputChange: function (value) {
    console.log('!!! FullForm _onSearchInputChange', value);
    this.setState({
      searchInput: {
        value: value,
        suggestions: this._searchInputSuggestions
      }
    });
  },

  _onCalendarChange: function (value) {
    console.log('!!! FullForm _onCalendarChange', value);
    this.setState({calendarDate: value});
  },

  _onSearch: function (text) {
    var searchInput = this.state.searchInput;
    var regexp = new RegExp('^' + text);
    searchInput.suggestions =
      this._searchInputSuggestions.filter(function (value) {
        return regexp.test(value);
      });
    this.setState({searchInput: searchInput});
  },

  render: function() {
    var p = this.props.prefix;

    return (
      <Form onSubmit={this.props.onSubmit} compact={this.props.compact}>
        <Header>
          <h1>Edit</h1>
        </Header>
        <FormFields>
          <fieldset>
            <legend>First section</legend>
            <FormField label="Item 1" htmlFor={p + "item1"} help="something helpful">
              <input id={p + "item1"} name="item-1" type="text" onChange={this._onChange} />
            </FormField>
            <FormField>
              <CheckBox id={p + "item2"} name="item-2" label="Item 2"
                onChange={this._onChange} />
            </FormField>
            <FormField label="Item 3">
              <RadioButton id={p + "item3-1"} name="item-3" label="first"
                onChange={this._onChange} />
              <RadioButton id={p + "item3-2"} name="item-3" label="second"
                onChange={this._onChange} />
            </FormField>
            <FormField label="Item 4" htmlFor={p + "item4"}
              error="something's wrong">
              <textarea id={p + "item4"} name="item-4"></textarea>
            </FormField>
            <FormField label="Item 5" htmlFor={p + "item5"}>
              <SearchInput id={p + "item5"} name="item-5"
                value={this.state.searchInput.value}
                suggestions={this.state.searchInput.suggestions}
                onChange={this._onSearchInputChange}
                onSearch={this._onSearchInputSearch} />
            </FormField>
            <FormField label="Item 6" htmlFor={p + "item6"}
              help={<a>learn more ...</a>}>
              <select id={p + "item6"} name="item-6">
                <option>first</option>
                <option>second</option>
                <option>third</option>
              </select>
            </FormField>
            <FormField label="Item 10" htmlFor={p + "item10"}>
              <Calendar id={p + "item10"} name="item-10"
                value={this.state.calendarDate}
                onChange={this._onCalendarChange} />
            </FormField>
          </fieldset>
          <fieldset>
            <legend>Another section</legend>
            <p>Some informational text.</p>
            <FormField label="Item 7">
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
            <FormField label="Item 8" htmlFor={p + "item8"}>
              <input id={p + "item8"} name="item-8" type="number"
                min="1" max="20" step="1" defaultValue="10" />
            </FormField>
            <FormField label="Item 9" htmlFor={p + "item9"} help={this.state.rangeValue}>
              <input id={p + "item9"} name="item-9" type="range"
                min="1" max="20" defaultValue="10"
                onChange={this._onChangeRange}/>
            </FormField>
          </fieldset>
        </FormFields>
        <Footer pad={{vertical: 'medium'}}>
          <Menu direction="right">
            <Button label="OK" primary={true} strong={true} onClick={this.props.onSubmit} />
            <Button label="Cancel" onClick={this.props.onCancel} />
          </Menu>
        </Footer>
      </Form>
    );
  }
});

module.exports = FullForm;
