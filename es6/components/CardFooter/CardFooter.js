function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { defaultProps } from '../../default-props';
import { Footer } from '../Footer'; // Needs to have a CardBody or a flex container when Card uses a fixed height.

var CardFooter = function CardFooter(_ref) {
  var rest = _extends({}, _ref);

  var theme = useContext(ThemeContext) || defaultProps.theme;
  return /*#__PURE__*/React.createElement(Footer, _extends({}, theme.card.footer, rest));
};

var CardFooterDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CardFooterDoc = require('./doc').doc(CardFooter);
}

var CardFooterWrapper = CardFooterDoc || CardFooter;
export { CardFooterWrapper as CardFooter };