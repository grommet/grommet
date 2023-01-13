var _excluded = ["messages"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import { Text } from '../Text';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSummaryPropTypes } from './propTypes';
export var DataSummary = function DataSummary(_ref) {
  var messages = _ref.messages,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(MessageContext),
    format = _useContext.format;
  var _useContext2 = useContext(DataContext),
    filteredTotal = _useContext2.filteredTotal,
    dataMessages = _useContext2.messages,
    total = _useContext2.total;
  var messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';else messageId = 'dataSummary.filtered';
  } else messageId = 'dataSummary.total';
  return /*#__PURE__*/React.createElement(Text, _extends({
    margin: {
      vertical: 'xsmall'
    }
  }, rest), format({
    id: messageId,
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      filteredTotal: filteredTotal,
      total: total
    }
  }));
};
DataSummary.propTypes = DataSummaryPropTypes;