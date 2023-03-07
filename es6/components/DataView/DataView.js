var _excluded = ["id"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
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
  var _useContext2 = useContext(FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var id = idProp || dataId + "--view";
  useEffect(function () {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var content;
  if (!noForm && names.length < 7) {
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
      placeholder: noForm ? 'Select view' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (noForm)
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