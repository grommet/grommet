// (C) Copyright 2014-2015 Hewlett-Packard Development Company

'use strict';

var React = require('react');
var IntlMixin = require('../../../mixins/GrommetIntlMixin');

var CLASS_ROOT = "control-icon";

var Icon = React.createClass({
  displayName: 'Icon',

  propTypes: {
    a11yTitle: React.PropTypes.string,
    a11yTitleId: React.PropTypes.string,
    colorIndex: React.PropTypes.string,
    large: React.PropTypes.bool
  },

  mixins: [IntlMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      a11yTitleId: 'payment-mastercard-title'
    };
  },

  render: function render() {
    var classes = [CLASS_ROOT, CLASS_ROOT + '-payment-mastercard'];
    if (this.props.large) {
      classes.push(CLASS_ROOT + "--large");
    }
    if (this.props.colorIndex) {
      classes.push("color-index-" + this.props.colorIndex);
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var a11yTitle = this.getGrommetIntlMessage(typeof this.props.a11yTitle !== "undefined" ? this.props.a11yTitle : "payment-mastercard");

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
        { id: 'payment-mastercard' },
        React.createElement('rect', { id: '_x2E_svg_291_', x: '0', fill: 'none', width: '48', height: '48' }),
        React.createElement(
          'g',
          { id: 'path2268' },
          React.createElement('path', { d: 'M28.8179,17.6966c3.4079,0,6.1812,2.7728,6.1821,6.1848c0.0005,1.6514-0.6422,3.2042-1.8096,4.3722 c-1.1674,1.168-2.7199,1.8115-4.3729,1.8119c-3.4082,0-6.1817-2.7728-6.1826-6.1846c-0.0005-1.6514,0.6422-3.2042,1.8097-4.3722 c1.1674-1.1681,2.7198-1.8116,4.371-1.812H28.8179 M28.8174,16.6966c-0.0005,0-0.0014,0-0.0019,0 c-3.9667,0.001-7.1817,3.2177-7.1807,7.1844c0,0.0013,0,0.0024,0,0.0037c0.0011,3.9664,3.2163,7.1807,7.1826,7.1807 c0.0005,0,0.0013,0,0.0018,0c3.9669-0.001,7.1819-3.2175,7.1808-7.1844c0-0.0013,0-0.0024,0-0.0037 C35.9989,19.9111,32.7838,16.6964,28.8174,16.6966L28.8174,16.6966z' })
        ),
        React.createElement('path', { d: 'M26.2193,25.3257h-4.4697c-0.0481-0.2432-0.0838-0.4864-0.1069-0.7296h4.6857c0.0233-0.2354,0.0367-0.4736,0.0367-0.7151 c0-0.0319-0.0009-0.0637-0.0013-0.0955h-4.7512c0.0024-0.2432,0.0176-0.4864,0.0449-0.7296h4.66 c-0.0277-0.2415-0.067-0.4864-0.118-0.7296H21.809c0.0544-0.2432,0.1231-0.4864,0.2049-0.7296h3.9772 c-0.0889-0.2432-0.1922-0.5674-0.3097-0.8106h-3.3619c0.1213-0.2432,0.2587-0.4864,0.4121-0.7296h2.5361 c-0.1688-0.2432-0.3555-0.4864-0.5575-0.7296h-1.414c0.2186-0.3243,0.4593-0.498,0.7206-0.7239 c-1.2764-1.1625-2.9731-1.8701-4.8343-1.8701c-0.0155,0-0.0308,0-0.0463,0C15.1929,16.733,12,19.949,12,23.8984 c0,3.9647,3.2178,7.1739,7.1826,7.1739c1.8608,0,3.557-0.701,4.8333-1.8633c0,0-0.0002,0.0078-0.0006,0.0078h0.0015 c0.2613-0.2432,0.5051-0.4864,0.7292-0.8106h-1.4715c-0.1965-0.2432-0.3751-0.4864-0.5355-0.7296h2.5379 c0.1543-0.2432,0.2941-0.4864,0.4181-0.7296H22.32c-0.115-0.2432-0.2149-0.5674-0.3002-0.8106h3.9757 C26.0863,25.8932,26.1611,25.6099,26.2193,25.3257z' })
      )
    );
  }

});

module.exports = Icon;