// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Section = require('grommet/components/Section');
var Attribute = require('grommet/components/Attribute');

var About = React.createClass({

  propTypes: {
    person: React.PropTypes.object.isRequired
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
          {this._renderAttribute("Building", person.buildingName)}
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
