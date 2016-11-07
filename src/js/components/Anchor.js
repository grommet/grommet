// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component } from 'react';
import classnames from 'classnames';
import { docComponent, docPropType, PropTypes } from 'react-desc';
import LinkNextIcon from './icons/base/LinkNext';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ANCHOR;

export default class Anchor extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (event) {
    const { method, onClick, path} = this.props;
    const { router } = this.context;

    event.preventDefault();

    if ('push' === method) {
      router.push(path);
    } else if ('replace' === method) {
      router.replace(path);
    }

    if (onClick) {
      onClick();
    }
  }

  render () {
    const {
      a11yTitle, animateIcon, children, className, disabled, href, icon,
      label, onClick, path, primary, reverse, tag, ...props
    } = this.props;
    delete props.method;
    const { router } = this.context;

    let anchorIcon;
    if (icon) {
      anchorIcon = icon;
    } else if (primary) {
      anchorIcon = (
        <LinkNextIcon a11yTitle='link next' />
      );
    }

    if (anchorIcon && !primary && !label) {
      anchorIcon = <span className={`${CLASS_ROOT}__icon`}>{anchorIcon}</span>;
    }

    let hasIcon = anchorIcon !== undefined;
    let anchorChildren = Children.map(children, child => {
      if (child && child.type && child.type.icon) {
        hasIcon = true;
        child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
      }
      return child;
    });

    let adjustedHref = (path && router) ? router.createPath(path) : href;

    let classes = classnames(
      CLASS_ROOT,
      {
        [`${CLASS_ROOT}--animate-icon`]: hasIcon && animateIcon !== false,
        [`${CLASS_ROOT}--disabled`]: disabled,
        [`${CLASS_ROOT}--icon`]: anchorIcon || hasIcon,
        [`${CLASS_ROOT}--icon-label`]: hasIcon && label,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--reverse`]: reverse,
        [`${CLASS_ROOT}--active`]: (router && path && router.isActive(path))
      },
      className
    );

    let adjustedOnClick = (path && router ? this._onClick : onClick);

    if (!anchorChildren) {
      anchorChildren = label;
    }

    const first = reverse ? anchorChildren : anchorIcon;
    const second = reverse ? anchorIcon : anchorChildren;

    const Component = tag;
    return (
      <Component {...props} href={adjustedHref} className={classes}
        aria-label={a11yTitle} onClick={adjustedOnClick}>
        {first}
        {second}
      </Component>
    );
  }
};

const description = `A text link. We have a separate component from the browser
base so we can style it. You can either set the icon and/or label properties
or just use children.`;
const usage = `import Anchor from 'grommet/components/Anchor';
<Anchor href={location} label="Label" />
`;
docComponent(
  description,
  Anchor, {
    usage
  }
);

Anchor.propTypes = {
  a11yTitle: docPropType('Accessibility title.', PropTypes.string),
  animateIcon: docPropType(
    'Whether to animate the icon on hover.', PropTypes.bool
  ),
  disabled: docPropType('Whether to disable the anchor.', PropTypes.bool),
  href: docPropType(
    'Hyperlink reference to place in the anchor.', PropTypes.string
  ),
  icon: docPropType(
    'Icon element to place in the anchor.', PropTypes.element
  ),
  id: docPropType(
    'Anchor identifier.', PropTypes.string
  ),
  label: docPropType('Label text to place in the anchor.', PropTypes.node),
  method: docPropType(
    'Valid only when used with path. Indicates whether the browser history' +
    ' should be appended to or replaced.',
    PropTypes.oneOf(['push', 'replace'])
  ),
  onClick: docPropType('Click handler.', PropTypes.func),
  path: docPropType(
    'React-router path to navigate to when clicked.', PropTypes.string
  ),
  primary: docPropType('Whether this is a primary anchor.', PropTypes.bool),
  reverse: docPropType(
    'Whether an icon and label should be reversed so that the icon is at the' +
    'end of the anchor.',
    PropTypes.bool
  ),
  tag: docPropType(
    'The DOM tag to use for the element. The default is <a>. This should be' +
    ' used in conjunction with components like Link from React Router. In' +
    ' this case, Link controls the navigation while Anchor controls the' +
    ' styling.',
    PropTypes.string
  ),
  target: docPropType('Target of the link.', PropTypes.string)
};

Anchor.defaultProps = {
  method: 'push',
  tag: 'a'
};

Anchor.contextTypes = {
  router: React.PropTypes.object
};
