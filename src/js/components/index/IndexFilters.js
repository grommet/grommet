// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Menu = require('../Menu');
var FilterIcon = require('../icons/Filter');
//var Header = require('../Header');
var CheckBox = require('../CheckBox');
var IndexQuery = require('../../utils/IndexQuery');
//var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');
//var ReactIntl = require('react-intl');
//var FormattedMessage = ReactIntl.FormattedMessage;

var CLASS_ROOT = "index-filters";

var IndexFilters = React.createClass({

  propTypes: {
    options: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        label: React.PropTypes.string,
        timestamp: React.PropTypes.bool,
        filter: React.PropTypes.arrayOf(React.PropTypes.string)
      })),
      params: React.PropTypes.shape({
        query: React.PropTypes.object
      })
    }).isRequired,
    onQuery: React.PropTypes.func
  },

  mixins: [IntlMixin],

  getInitialState: function () {
    return {data: this._buildState(this.props.options)};
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({data: this._buildState(newProps.options)});
  },

  _notify: function () {
    var query;
    if (this.props.options.params.query) {
      query = this.props.options.params.query.clone();
    } else {
      query = IndexQuery.create('');
    }

    this.props.options.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .forEach(function (attribute) {
        var attributeData = this.state.data[attribute.attribute];
        var activeValues = attribute.filter.filter(function (value) {
          return attributeData[value];
        });
        query.replaceAttributeValues(attribute.attribute, activeValues);
      }, this);
    this.props.onQuery(query);
  },

  _onChange: function (attribute, value) {
    var data = this.state.data;
    data[attribute][value] = ! data[attribute][value];
    data[attribute].all = false;
    this.setState({data: data});
    this._notify();
  },

  _onChangeAll: function (attribute, values) {
    var data = this.state.data;
    values.forEach(function (value) {
      data[attribute][value] = false;
    });
    data[attribute].all = true;
    this.setState({data: data});
    this._notify();
  },

  _buildState: function (options) {
    var query = options.params.query || IndexQuery.create('');
    var data = {};
    options.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .forEach(function (attribute) {
        var values = {};
        attribute.filter.forEach(function (value) {
          values[value] =
            query.hasToken({attribute: attribute.attribute, value: value});
        });
        values.all =
          (query.attributeValues(attribute.attribute).length === 0);
        data[attribute.attribute] = values;
      });
    return data;
  },

  render: function() {
    var activeFilterCount = 0;

    var filters = this.props.options.attributes
      .filter(function (attribute) {
        return attribute.hasOwnProperty('filter');
      })
      .map(function (attribute) {

        var values = attribute.filter.map(function (value) {
          var id = attribute.attribute + '-' + value;
          var active = this.state.data[attribute.attribute][value];
          if (active) {
            activeFilterCount += 1;
          }
          var label = value ? this.getGrommetIntlMessage(value) : '';
          return (
            <CheckBox key={id} className={CLASS_ROOT + "__filter-value"}
              id={id} label={label}
              checked={active}
              onChange={this._onChange
                .bind(this, attribute.attribute, value)} />
          );
        }, this);

        var components = [];
        components.push(
          <CheckBox key={attribute.attribute + '-all'}
            className={CLASS_ROOT + "__filter-value"}
            id={attribute.attribute + '-all'}
            label={this.getGrommetIntlMessage('All')}
            checked={this.state.data[attribute.attribute].all}
            onChange={this._onChangeAll
              .bind(this, attribute.attribute, attribute.filter)} />
        );
        return (<fieldset className={CLASS_ROOT}>
                  <legend className={CLASS_ROOT + "__filter-legend"}>{this.getGrommetIntlMessage(attribute.label)}</legend>
                  {components.concat(values)}
                </fieldset>);
      }, this);

    /*
    var label = (
      <FormattedMessage
        message={this.getIntlMessage('IndexFilters.filters')}
        quantity={activeFilterCount} />
    );
    */

    var icon = (<FilterIcon notifications={activeFilterCount} />);

    return (
      <Menu className={CLASS_ROOT + "__menu"} icon={icon}
        dropAlign={{right: 'right'}} pad="medium"
        direction="column" closeOnClick={false}>
        {filters}
      </Menu>
    );
  }

});

module.exports = IndexFilters;
