function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect } from 'react';
import { DataForm } from '../Data/DataForm';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { DataViewPropTypes } from './propTypes';
export var DataView = function DataView(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    view = _useContext.view,
    views = _useContext.views,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = useContext(FormContext),
    noForm = _useContext2.noForm;
  useEffect(function () {
    if (noForm) addToolbarKey('_view');
  }, [addToolbarKey, noForm]);
  if (!views) return null;
  var names = views.map(function (v) {
    return v.name;
  });
  var id = dataId + "-view";
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
      placeholder: noForm ? 'Select view ...' : undefined,
      options: names,
      value: view == null ? void 0 : view.name
    }, rest));
  }
  if (noForm) content = /*#__PURE__*/React.createElement(DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  return content;
};
DataView.propTypes = DataViewPropTypes;