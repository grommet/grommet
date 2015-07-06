// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var merge = require('lodash/object/merge');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Attribute = require('grommet/components/Attribute');
var Rest = require('grommet/utils/Rest');

var LDAP_BASE_PARAMS = {
  url: encodeURIComponent('ldap://ldap.hp.com'),
  base: encodeURIComponent('ou=Locations,o=hp.com'),
  scope: 'sub'
};

var About = React.createClass({

  propTypes: {
    person: React.PropTypes.object.isRequired
  },

  _onLocationResponse: function (err, res) {
    if (err) {
      this.setState({location: [], error: err});
    } else if (res.ok) {
      var result = res.body;
      this.setState({location: result[0], error: null});
    }
  },

  _getRelatedDetails: function (props) {
    if (props.person.hpWorkLocation) {
      // get location
      var locationRef = props.person.hpWorkLocation.split(',');
      var params = merge({}, LDAP_BASE_PARAMS, {
        base: locationRef.slice(1).join(','),
        filter: '(' + locationRef[0] + ')'
      });
      Rest.get('/ldap/', params).end(this._onLocationResponse);
    }
  },

  getInitialState: function () {
    return {location: {}};
  },

  componentDidMount: function () {
    this._getRelatedDetails(this.props);
  },

  componentWillReceiveProps: function (newProps) {
    this._getRelatedDetails(newProps);
  },

  _renderAttribute: function (label, value) {
    var result;
    if (value) {
      result = <Attribute label={label}>{value}</Attribute>;
    }
    return result;
  },

  render: function() {
    var person = this.props.person;
    var location = this.state.location;
    return (
      <Article pad={{horizontal: "medium"}}>
        <Section pad="none">
          <h4>Employment</h4>
          {this._renderAttribute("Status", person.hpStatus)}
          {this._renderAttribute("Job Function", person.hpJobFunction)}
          {this._renderAttribute("Job Family", person.hpJobFamily)}
          {this._renderAttribute("Employee Type", person.employeeType)}
          {this._renderAttribute("Payroll Country Code", person.hpPayrollCountryCode)}
          {this._renderAttribute("NT User ID", person.ntUserDomainId)}
        </Section>
        <Section pad="none">
          <h4>Site</h4>
          {this._renderAttribute("Building", location.buildingName)}
          {this._renderAttribute("Floor", person.hpFloor)}
          {this._renderAttribute("Post", person.hpPost)}
          {this._renderAttribute("Mailstop", person.mailStop)}
        </Section>
        <Section pad="none">
          <h4>Administration</h4>
          {this._renderAttribute("Location Code", person.hpLocationCode)}
          {this._renderAttribute("Lighthouse Cost Center", person.hpLHCostCenter)}
          {this._renderAttribute("MRU Code", person.hpMRUCode)}
          {this._renderAttribute("Global ID", person.hpGlobalID)}
        </Section>
      </Article>
    );
  }

});

module.exports = About;
