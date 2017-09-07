import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

import { routedButton } from './doc';

class RoutedButton extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  static defaultProps = {
    method: 'push',
  };
  render() {
    const { path, method, ...rest } = this.props;
    return (
      <Button
        {...rest}
        href={path}
        onClick={(event, ...args) => {
          const { onClick } = this.props;
          const { router } = this.context;
          if (event) {
            const modifierKey = event.ctrlKey || event.metaKey;

            // if the user right-clicked in the button we should let it go
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

if (process.env.NODE_ENV !== 'production') {
  routedButton(RoutedButton);
}

export default RoutedButton;
