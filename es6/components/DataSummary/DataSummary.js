var _excluded = ["messages"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
    selected = _useContext2.selected,
    total = _useContext2.total;
  var messageId;
  if (total !== filteredTotal) {
    if (filteredTotal === 1) messageId = 'dataSummary.filteredSingle';else messageId = 'dataSummary.filtered';
  } else if (total === 1) messageId = 'dataSummary.totalSingle';else messageId = 'dataSummary.total';

  // helps account for cases like 0 results of 1 item
  var items = format({
    id: total === 1 ? 'dataSummary.itemsSingle' : 'dataSummary.items',
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary)
  });
  return /*#__PURE__*/React.createElement(Text, _extends({
    margin: {
      vertical: 'xsmall'
    }
  }, rest), format({
    id: messageId,
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      filteredTotal: filteredTotal,
      total: total,
      items: items
    }
  }), selected > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Text, {
    margin: {
      horizontal: 'small'
    }
  }, "|"), /*#__PURE__*/React.createElement(Text, null, format({
    id: 'dataSummary.selected',
    messages: messages || (dataMessages == null ? void 0 : dataMessages.dataSummary),
    values: {
      selected: selected
    }
  }))) : undefined);
};
DataSummary.propTypes = DataSummaryPropTypes;