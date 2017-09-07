/* TODO: re-enable eslint before code review */
/* eslint-disable */
import React, { Component, Children } from 'react';
import { compose } from 'recompose';

import StyledAnchor, { StyledIcon } from './StyledAnchor';

import { withTheme } from '../hocs';

import doc from './doc';

const styledComponents = {
  a: StyledAnchor,
};

// TODO: refactor into module  
class AnchorUtils {
  constructor(props) {
    this.props = props;
    this.iconNodes = this.iconNodes.bind(this);
    this.childNodes = this.childNodes.bind(this);
  }
  
  iconNodes() {
    const { primary, icon, theme } = this.props;
    let nextIcon; 
    if (primary && !icon) {
      nextIcon = (<StyledIcon theme={theme} a11yTitle='link next' />);
    }
    return nextIcon || icon || null;
  }
  
  childNodes() {
    const { label, theme } = this.props;
    const anchorChildren = Children
      .map(
        this.props.children,
        child => child && child.type && child.type.icon && <StyledIcon theme={theme}>{child}</StyledIcon>
      );
    return anchorChildren || label;
  }
  
  getChildNodes() {
    const nodeVals = [
      this.iconNodes(this.props),
      this.childNodes(this.props),
    ];
    return this.props.reverse ? nodeVals.reverse() : nodeVals;
  }
}

class Anchor extends Component {
  static defaultProps = {
    tag: 'a',
  }

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.attachUnlisten = this.attachUnlisten.bind(this);
    this.isRouteActive = this.isRouteActive.bind(this);
    const { path } = props;
    const { router } = context;

    const active = this.isRouteActive(path, router);

    this.state = { active };
  }

  componentDidMount() {
    const { path } = this.props;
    const { router } = this.context;

    if (path) {
      this.attachUnlisten(router.history || router);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { path } = nextProps;
    const { router } = this.context;

    if (path && path !== this.props.path) {
      this.attachUnlisten(router.history || router);
    }
  }

  componentWillUnmount() {
    const { path } = this.props;
    if (path) {
      this.unlisten();
    }
    this.unmounted = true;
  }

  isRouteActive(path, router) {
    if (!path) {
      return false;
    }
    let active;
    if (router && router.isActive) {
      active = router && router.isActive &&
        path && router.isActive({
          pathname: path.path || path,
          query: { indexLink: path.index },
        });
    } else if (router && matchPath) {
      active = !!matchPath(
        router.history.location.pathname,
        { path: path.path || path, exact: !!path.index }
      );
    }

    return active;
  }

  attachUnlisten(router) {
    this.unlisten = router.listen(this.onLocationChange);
  }

  onLocationChange(location) {
    // sometimes react router is still calling the listen callback even
    // if we called unlisten. So we added this check here to prevent
    // calling setState in a unmounted component
    if (!this.unmounted) {
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

  onClick(event) {
    const { method, onClick, path, disabled } = this.props;
    const { router } = this.context;
    const modifierKey = event.ctrlKey || event.metaKey;

    if (modifierKey && !disabled && !onClick) {
      return true;
    }

    event.preventDefault();

    if (!disabled) {
      if (path) {
        if (method === 'push') {
          (router.history || router).push(path.path || path);
        } else if (method === 'replace') {
          (router.history || router).replace(path.path || path);
        }
      }

      if (onClick) {
        onClick(...arguments);
      }
    }
  }

  get adjustedHref() {
    const { router } = this.context;
    const { path, href } = this.props;
    if (router && router.createPath) {
      return (path && router)
        ? router.createPath(target)
        : href;
    }
    return (path && router && router.history)
      ? router.history.createHref(
          typeof target === 'string'
            ? { pathname: target }
            : target
        )
      : href;
  }

  render() {
    const {
      tag,
      ...rest
    } = this.props;
    const { active } = this.state;

    const StyledComponent = styledComponents[tag]
      ? styledComponents[tag]
      : StyledAnchor.withComponent(tag);
    
    const childNodes = new AnchorUtils(rest).getChildNodes();
    
    return (
      <StyledComponent href={this.adjustedHref} {...rest}>
        {childNodes}
      </StyledComponent>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Anchor);
}

export default compose(
  withTheme,
)(Anchor);
