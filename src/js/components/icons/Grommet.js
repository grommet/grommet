// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var CLASS_ROOT = "logo-icon";
var uuid = require('node-uuid');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var Grommet = React.createClass({

  propTypes: {
    small: React.PropTypes.bool,
    large: React.PropTypes.bool,
    a11yTitle: React.PropTypes.string
  },

  mixins: [IntlMixin],

  getDefaultProps: function() {
    return { a11yTitle: 'Grommet' };
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.small) {
      classes.push(CLASS_ROOT + "--small");
    }
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }
    var logoTitleId = 'grommet-logo-title-' + uuid.v1();
    return (
      <svg className={classes.join(' ')} viewBox="0 0 140 140" version="1.1" role="img" aria-labelledby={logoTitleId}>
        <title id={logoTitleId}>{this.getGrommetIntlMessage(this.props.a11yTitle)}</title>
        <path role="presentation" d="M119.49603,20.5014878 L100.989057,39.0094878 C105.89805,43.9184878 109.859044,49.7734878 111.669042,55.3734878 C122.692025,89.4684878 93.3250687,120.604488 59.5321185,112.820488 C44.9911399,109.470488 30.5211612,94.9984878 27.1751661,80.4564878 C20.432176,51.1514878 42.9571429,25.1854878 71.2931012,25.9974878 L93.3090687,3.98048778 C86.0960794,1.43348778 78.3420908,0.0304877767 70.2641027,0.000487776719 C32.014159,-0.141512223 0.549205302,30.7384878 0.00720609982,68.9844878 C-0.547793083,108.124488 31.0271604,140.024488 70.045103,139.999488 C108.802046,139.975488 140,108.756488 140,70.0004878 C140,50.6694878 132.164012,33.1694878 119.49603,20.5014878 L119.49603,20.5014878 Z" fill="#8C50FF"></path>
        <path role="presentation" d="M27.1736636,80.457549 C30.5194807,94.999549 44.98869,109.472549 59.5288954,112.821549 C93.3190487,120.605549 122.685444,89.469549 111.663046,55.374549 C109.852145,49.774549 105.891362,43.918549 100.98363,39.010549 L69.9953234,70.000549 L100.083679,70.001549 C100.083679,86.762549 86.3804279,100.322549 69.5663468,100.089549 C53.4302287,99.865549 40.23095,86.746549 39.9119674,70.611549 C39.7429767,62.061549 43.140791,54.304549 48.7174862,48.725549 L48.6404904,48.648549 L71.2872528,25.998549 C42.9548011,25.186549 20.4310321,51.152549 27.1736636,80.457549 L27.1736636,80.457549 Z" fill="#333333"></path>
      </svg>
    );
  }

});

module.exports = Grommet;
