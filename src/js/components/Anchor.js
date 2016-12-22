// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component } from 'react';
import classnames from 'classnames';
import { schema, PropTypes } from 'react-desc';
import LinkNextIcon from './icons/base/LinkNext';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ANCHOR;

export default class Anchor extends Component {

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
  }

  _onClick (event) {
    const { method, onClick, path, disabled } = this.props;
    const { router } = this.context;

    event.preventDefault();

    if (!disabled) {
      if ('push' === method) {
        router.push(path);
      } else if ('replace' === method) {
        router.replace(path);
      }

      if (onClick) {
        onClick();
      }
    }
  }

  render () {
    const {
      a11yTitle, align, animateIcon, children, className, disabled, href, icon,
      label, onClick, path, primary, reverse, tag, indexLink, ...props
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
        [`${CLASS_ROOT}--align-${align}`]: align,
        [`${CLASS_ROOT}--primary`]: primary,
        [`${CLASS_ROOT}--reverse`]: reverse,
        [`${CLASS_ROOT}--active`]: (router && path &&
                                    router.isActive(path, indexLink))
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

schema(Anchor, {
  description: `A text link. We have a separate component from the browser
  base so we can style it. You can either set the icon and/or label properties
  or just use children.`,
  usage: `import Anchor from 'grommet/components/Anchor';
  <Anchor href={location} label="Label" />`,
  props: {
    a11yTitle: [PropTypes.string, 'Accessibility title.'],
    align: [PropTypes.oneOf(['start', 'center', 'end']), 'Text alignment.'],
    animateIcon: [PropTypes.bool, 'Whether to animate the icon on hover.'],
    disabled: [PropTypes.bool, 'Whether to disable the anchor.'],
    href: [PropTypes.string, 'Hyperlink reference to place in the anchor.'],
    icon: [PropTypes.element, 'Icon element to place in the anchor.'],
    id: [PropTypes.string, 'Anchor identifier.'],
    label: [PropTypes.node, 'Label text to place in the anchor.'],
    method: [PropTypes.oneOf(['push', 'replace']),
      'Valid only when used with path. Indicates whether the browser history' +
      ' should be appended to or replaced.', {
        defaultProp: 'push'
      }
    ],
    onClick: [PropTypes.func, 'Click handler.'],
    path: [PropTypes.string, 'React-router path to navigate to when clicked.'],
    primary: [PropTypes.bool, 'Whether this is a primary anchor.'],
    reverse: [
      PropTypes.bool,
      'Whether an icon and label should be reversed so that the icon is at ' +
      'the end of the anchor.'
    ],
    tag: [PropTypes.string,
      'The DOM tag to use for the element. The default is <a>. This should be' +
      ' used in conjunction with components like Link from React Router. In' +
      ' this case, Link controls the navigation while Anchor controls the' +
      ' styling.', {
        defaultProp: 'a'
      }
    ],
    target: [PropTypes.string, 'Target of the link.'],
    indexLink: [PropTypes.bool, 'If true, the link will not be set' +
      'as active unless the path matches exactly.'
    ]
  }
});

Anchor.contextTypes = {
  router: React.PropTypes.object
};
