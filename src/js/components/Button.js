// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';

const CLASS_ROOT = "button";

class Button extends Component {
  render () {
    var classes = [CLASS_ROOT];
    if (this.props.primary) {
      classes.push(CLASS_ROOT + "--primary");
    }
    if (this.props.secondary) {
      classes.push(CLASS_ROOT + "--secondary");
    }
    if (this.props.accent) {
      classes.push(CLASS_ROOT + "--accent");
    }
    if (! this.props.onClick) {
      classes.push(CLASS_ROOT + "--disabled");
    }
    if (this.props.fill) {
      classes.push(CLASS_ROOT + "--fill");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var type = this.props.type;
    if (this.props.type === 'icon') {
      classes.push(CLASS_ROOT + "--icon");
      type = 'button';
    }

    var children = React.Children.map(this.props.children, function (child) {
      if (child && child.type.icon) {
        return <span className={CLASS_ROOT + "__icon"}>{child}</span>;
      } else {
        return child;
      }
    });
    if (! children) {
      children = this.props.label;
    }

    return (
      <button id={this.props.id} type={type} className={classes.join(' ')}
        onClick={this.props.onClick} disabled={! this.props.onClick}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  accent: PropTypes.bool,
  fill: PropTypes.bool,
  icon: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit', 'icon'])
};

Button.defaultProps = {
  type: "button"
};

module.exports = Button;
