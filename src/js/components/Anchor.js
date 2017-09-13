// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Children, Component } from 'react';
import ReactPropTypes from 'prop-types';
import classnames from 'classnames';
import { schema, PropTypes } from 'react-desc';
import { matchPath } from 'react-router';
import LinkNextIcon from './icons/base/LinkNext';

import CSSClassnames from '../utils/CSSClassnames';

const CLASS_ROOT = CSSClassnames.ANCHOR;

export default class Anchor extends Component {

  constructor (props, context) {
    super(props, context);
    this._onClick = this._onClick.bind(this);
    this._onLocationChange = this._onLocationChange.bind(this);
    this._attachUnlisten = this._attachUnlisten.bind(this);
    this._isRouteActive = this._isRouteActive.bind(this);
    const { path } = props;
    const { router } = context;

    const active = this._isRouteActive(path, router);

    this.state = { active };
  }

  componentDidMount () {
    const { path } = this.props;
    const { router } = this.context;

    if (path) {
      this._attachUnlisten(router.history || router);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { path } = nextProps;
    const { router } = this.context;

    if (path && path !== this.props.path) {
      this._attachUnlisten(router.history || router);
    }
  }

  componentWillUnmount () {
    const { path } = this.props;
    if (path) {
      this._unlisten();
    }
    this._unmounted = true;
  }

  _isRouteActive(path, router) {
    if (!path) {
      return false;
    }
    let active;
    if (router && router.isActive) {
      active = router && router.isActive &&
        path && router.isActive({
          pathname: path.path || path,
          query: { indexLink: path.index }
        });
    } else if(router && matchPath) {
      active = !!matchPath(
        router.history.location.pathname,
        { path: path.path || path, exact: !!path.index }
      );
    }

    return active;
  }

  _attachUnlisten(router) {
    this._unlisten = router.listen(this._onLocationChange);
  }

  _onLocationChange (location) {
    // sometimes react router is still calling the listen callback even
    // if we called unlisten. So we added this check here to prevent
    // calling setState in a unmounted component
    if (!this._unmounted) {
      const { path } = this.props;
      const { router } = this.context;
      const active = matchPath ? (
        !!matchPath(
          location.pathname,
          { path: path.path || path, exact: !!path.index }
        )
      ) : (
        router && location.pathname === (path.path || path)
      );
      this.setState({ active });
    }
  }

  _onClick (event) {
    const { method, onClick, path, disabled } = this.props;
    const { router } = this.context;
    const modifierKey = event.ctrlKey || event.metaKey;

    if (modifierKey && !disabled && !onClick) {
      return true;
    }

    event.preventDefault();

    if (!disabled) {
      if (path) {
        if ('push' === method) {
          (router.history || router).push(path.path || path);
        } else if ('replace' === method) {
          (router.history || router).replace(path.path || path);
        }
      }

      if (onClick) {
        onClick(...arguments);
      }
    }
  }

  render () {
    const {
      a11yTitle, align, animateIcon, children, className, disabled, href, icon,
      label, onClick, path, primary, reverse, tag, ...props
    } = this.props;
    delete props.method;
    const { active } = this.state;
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

    const target = path ? path.path || path : undefined;
    let adjustedHref;
    if (router && router.createPath) {
      adjustedHref = (path && router) ?
        router.createPath(target) : href;
    } else {
      adjustedHref = (path && router && router.history) ?
        router.history.createHref(
          typeof target === 'string' ? { pathname: target } : target
        ) : href;
    }

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
        [`${CLASS_ROOT}--active`]: active
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
        aria-label={a11yTitle} onClick={(event, ...args) => {
          if (disabled) {
            event.preventDefault();
          } else if (adjustedOnClick) {
            adjustedOnClick(event, ...args);
          }
        }}>
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
    animateIcon: [PropTypes.bool, 'Whether to animate the icon on hover.', {
      defaultProp: true
    }],
    disabled: [PropTypes.bool, 'Whether to disable the anchor.'],
    href: [PropTypes.string, 'Hyperlink reference to place in the anchor. If'
      + ' `path` prop is provided, `href` prop will be ignored.'],
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
    path: [
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      'React-router path to navigate to when clicked.' +
      ' Use path={{ path: \'/\', index: true }} if you want the Anchor to be' +
      ' active only when the index route is current.'
    ],
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
    target: [PropTypes.string, 'Target of the link.']
  }
});

Anchor.contextTypes = {
  router: ReactPropTypes.object
};
