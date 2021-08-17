import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { deepMerge } from '../../utils';
import { ThemeContextPropTypes } from './propTypes';

ThemeContext.Extend = function (_ref) {
  var children = _ref.children,
      value = _ref.value;
  return /*#__PURE__*/React.createElement(ThemeContext.Consumer, null, function (theme) {
    return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
      value: deepMerge(theme, value)
    }, children);
  });
};

ThemeContext.Extend.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({}).isRequired
};
ThemeContext.propTypes = ThemeContextPropTypes;
export { ThemeContext };