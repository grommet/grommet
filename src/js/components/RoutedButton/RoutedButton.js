import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';

class RoutedButton extends Component {
  static contextTypes = {
    router: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    method: 'push',
  };

  onClick = (event, ...args) => {
    const { method, onClick, path } = this.props;
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
  };

  render() {
    const { href, path, method, onClick, ...rest } = this.props;
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `This component will be deprecated in the upcoming releases.
         Please refer to https://github.com/grommet/grommet/issues/2855
         for more information.`,
      );
    }
    return (
      <Button
        {...rest}
        href={path || href}
        disabled={!path && !onClick}
        onClick={this.onClick}
      />
    );
  }
}

export { RoutedButton };
