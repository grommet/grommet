// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var React = require('react');
var FormattedMessage = require('../../../components/FormattedMessage');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'social-reddit-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-social-reddit'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var titleLabel = typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "social-reddit";
    var a11yTitle = React.createElement(FormattedMessage, { id: titleLabel, defaultMessage: titleLabel });

    return React.createElement(
      'svg',
      { version: '1.1', viewBox: '0 0 48 48', width: '48px', height: '48px', className: classes.join(' '), 'aria-labelledby': this.props.a11yTitleId },
      React.createElement(
        'title',
        { id: this.props.a11yTitleId },
        a11yTitle
      ),
      React.createElement(
        'g',
        { id: 'social-reddit' },
        React.createElement('rect', { id: '_x2E_svg_289_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement('path', { d: 'M36.0027,23.6172c0-1.4806-1.1866-2.6833-2.6459-2.6833c-0.6949,0-1.3203,0.2673-1.796,0.7109 c-1.7318-1.2187-4.0677-2.0205-6.6762-2.1702l1.1706-3.9127l3.5866,0.7216c0.1229,1.2134,1.1332,2.1595,2.3679,2.1595 c0.0053,0,0.0053,0,0.0107,0s0.0053,0,0.0107,0c1.3149,0,2.3786-1.0797,2.3786-2.4107s-1.069-2.4107-2.384-2.4107 c-0.0053,0-0.0053,0-0.0107,0h-0.0053c-0.9194,0-1.7105,0.5238-2.1114,1.2989l-4.7947-0.9621l-1.6463,5.5056l-0.1336,0.0053 c-2.6886,0.1176-5.1047,0.9301-6.8793,2.1755c-0.4704-0.4437-1.1011-0.7109-1.796-0.7109c-1.4592,0-2.6459,1.2027-2.6459,2.6833 c0,1.0477,0.588,1.951,1.4486,2.3947c-0.0428,0.2619-0.0641,0.5238-0.0641,0.7911c0.0053,4.0517,4.7572,7.3443,10.6156,7.3443 s10.6102-3.2927,10.6102-7.3497c0-0.2673-0.0214-0.5292-0.0588-0.7911C35.4147,25.5628,36.0027,24.6595,36.0027,23.6172z M13.8361,24.6916c-0.3528-0.2405-0.5826-0.6468-0.5826-1.1118c0-0.7376,0.5933-1.3416,1.3203-1.3416 c0.2993,0,0.5773,0.1016,0.8018,0.2726C14.6539,23.1468,14.1194,23.8844,13.8361,24.6916z M31.1278,16.0323 c0-0.4918,0.3955-0.898,0.882-0.898c0.4864,0,0.882,0.4009,0.882,0.898c0,0.4918-0.3955,0.898-0.882,0.898 C31.5234,16.9303,31.1278,16.5294,31.1278,16.0323z M18.7911,25.6163c0-0.9408,0.759-1.6998,1.6998-1.6998 c0.9408,0,1.6998,0.759,1.6998,1.6998s-0.759,1.6998-1.6998,1.6998C19.5501,27.3161,18.7911,26.557,18.7911,25.6163z M24.003,31.7064c-2.8266-0.0119-4.5131-1.6924-4.5843-1.7637l0.7482-0.7363c0.0119,0.0119,1.4074,1.4371,3.8361,1.4489 c2.3931-0.0119,3.8124-1.4371,3.8302-1.4489l0.7482,0.7363C28.5101,30.014,26.8296,31.6945,24.003,31.7064z M27.5465,27.3161 c-0.9408,0-1.6998-0.759-1.6998-1.6998s0.759-1.6998,1.6998-1.6998s1.6998,0.759,1.6998,1.6998 C29.2463,26.557,28.482,27.3161,27.5465,27.3161z M34.18,24.713c-0.2886-0.8178-0.8339-1.5715-1.5661-2.2129 c0.2245-0.1764,0.5078-0.278,0.8125-0.278c0.743,0,1.3416,0.6094,1.3416,1.363C34.7733,24.0555,34.5381,24.4671,34.18,24.713z' })
      )
    );
  }

});

module.exports = Icon;