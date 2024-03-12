var _excluded = ["messages", "numberItems", "page", "step"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import { Box } from '../Box';
import { Text } from '../Text';
import { MessageContext } from '../../contexts/MessageContext';
export var PaginationSummary = function PaginationSummary(_ref) {
  var messages = _ref.messages,
    numberItems = _ref.numberItems,
    page = _ref.page,
    step = _ref.step,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(MessageContext),
    formatMessage = _useContext.format;
  return /*#__PURE__*/React.createElement(Box, rest, /*#__PURE__*/React.createElement(Text, null, numberItems > 0 ? formatMessage({
    id: 'pagination.summary',
    messages: messages,
    values: {
      start: "" + ((page - 1) * step + 1),
      end: "" + Math.min(page * step, numberItems),
      total: numberItems
    }
  }) : formatMessage({
    id: 'pagination.summaryNoItems',
    messages: messages
  })));
};