import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Anchor } from '../Anchor';

class RoutedAnchor extends Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    method: 'push',
  };

  render() {
    const { path, method, ...rest } = this.props;
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `This component will be deprecated in the upcoming releases. Please refer to https://github.com/grommet/grommet/issues/2855 for more information.`,
      );
    }
    return (
      <Anchor
        {...rest}
        href={path}
        onClick={(event, ...args) => {
          const { onClick } = this.props;
          const { router } = this.context;
          if (event) {
            const modifierKey = event.ctrlKey || event.metaKey;

            // if the user right-clicked in the Anchor we should let it go
            if (modifierKey) {
              return;
            }
          }
          if (router) {
            event.preventDefault();
            (router.history || router)[method](path);
          }
          if (onClick) {
            onClick(event, ...args);
          }
        }}
      />
    );
  }
}

let RoutedAnchorDoc;
if (process.env.NODE_ENV !== 'production') {
  RoutedAnchorDoc = require('./doc').doc(RoutedAnchor); // eslint-disable-line global-require
}
const RoutedAnchorWrapper = RoutedAnchorDoc || RoutedAnchor;

export { RoutedAnchorWrapper as RoutedAnchor };
