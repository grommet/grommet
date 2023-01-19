import React, { useContext, useMemo } from 'react';
import { DataContext } from '../../contexts/DataContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSortPropTypes } from './propTypes';
export var DataSort = function DataSort(_ref) {
  var optionsArg = _ref.options;
  var _useContext = useContext(DataContext),
    data = _useContext.data,
    dataId = _useContext.id,
    messages = _useContext.messages,
    properties = _useContext.properties;
  var _useContext2 = useContext(FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var options = useMemo(function () {
    return optionsArg || properties && Object.keys(properties).sort() || Object.keys(data[0]).sort();
  }, [data, optionsArg, properties]);
  var directionOptions = [{
    label: format({
      id: 'dataSort.ascending',
      messages: messages == null ? void 0 : messages.DataSort
    }),
    value: 'asc'
  }, {
    label: format({
      id: 'dataSort.descending',
      messages: messages == null ? void 0 : messages.DataSort
    }),
    value: 'desc'
  }];
  var sortPropertyId = dataId + "--sort-property";
  var sortDirectionId = dataId + "--sort-direction";
  var content = [/*#__PURE__*/React.createElement(FormField, {
    key: "by",
    htmlFor: sortPropertyId,
    label: format({
      id: 'dataSort.by',
      messages: messages == null ? void 0 : messages.DataSort
    })
  }, /*#__PURE__*/React.createElement(Select, {
    id: sortPropertyId,
    name: "_sort.property",
    options: options
  })), /*#__PURE__*/React.createElement(FormField, {
    key: "dir",
    htmlFor: sortDirectionId,
    label: format({
      id: 'dataSort.direction',
      messages: messages == null ? void 0 : messages.DataSort
    })
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: sortDirectionId,
    name: "_sort.direction",
    options: directionOptions
  }))];
  if (noForm) content = /*#__PURE__*/React.createElement(DataForm, {
    footer: false
  }, content);
  return content;
};
DataSort.propTypes = DataSortPropTypes;