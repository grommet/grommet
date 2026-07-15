var _excluded = ["id", "options"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataTableGroupByPropTypes } from './propTypes';
export var DataTableGroupBy = function DataTableGroupBy(_ref) {
  var idProp = _ref.id,
    options = _ref.options,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = useContext(DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--groupby";
  useEffect(function () {
    if (!inDataForm) addToolbarKey('_groupBy');
  }, [addToolbarKey, inDataForm]);
  if (!options) return null;
  var content = /*#__PURE__*/React.createElement(Select, _extends({
    id: id,
    name: "_groupBy",
    showSelectedInline: true,
    placeholder: !inDataForm ? 'Group by' : undefined,
    options: options,
    labelKey: "label",
    clear: view != null && view.groupBy ? {
      position: 'top',
      label: format({
        id: 'dataTableGroupBy.clear',
        messages: messages == null ? void 0 : messages.dataTableGroupBy
      })
    } : undefined,
    value: view == null ? void 0 : view.groupBy
  }, rest));
  if (!inDataForm)
    // likely in Toolbar
    content = /*#__PURE__*/React.createElement(DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/React.createElement(FormField, {
    htmlFor: id,
    label: format({
      id: 'dataTableGroupBy.label',
      messages: messages == null ? void 0 : messages.dataTableGroupBy
    })
  }, content);
  return content;
};
DataTableGroupBy.propTypes = DataTableGroupByPropTypes;