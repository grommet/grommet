var _excluded = ["id"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataViewPropTypes } from './propTypes';
export var DataView = function DataView(_ref) {
  var idProp = _ref.id,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    view = _useContext.view,
    views = _useContext.views,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = useContext(DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--view";
  useEffect(function () {
    if (!inDataForm) addToolbarKey('_view');
  }, [addToolbarKey, inDataForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var content;
  if (inDataForm && names.length < 7) {
    content = /*#__PURE__*/React.createElement(RadioButtonGroup, _extends({
      id: id,
      name: "_view",
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  } else {
    content = /*#__PURE__*/React.createElement(Select, _extends({
      id: id,
      name: "_view",
      showSelectedInline: true,
      placeholder: !inDataForm ? 'Select view' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (!inDataForm)
    // likely in Toolbar
    content = /*#__PURE__*/React.createElement(DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/React.createElement(FormField, {
    htmlFor: id,
    label: format({
      id: 'dataView.label',
      messages: messages == null ? void 0 : messages.dataView
    })
  }, content);
  return content;
};
DataView.propTypes = DataViewPropTypes;