function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Header } from '../Header';

var CardHeader = function CardHeader(_ref) {
  var rest = _extends({}, _ref);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(Header, _extends({}, theme.card.header, rest));
};

var CardHeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardHeaderDoc = require('./doc').doc(CardHeader);
}

var CardHeaderWrapper = CardHeaderDoc || CardHeader;
export { CardHeaderWrapper as CardHeader };