function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure " + obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { DataForm } from '../Data/DataForm';
import { FormContext } from '../Form/FormContext';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSearchPropTypes } from './propTypes';
export var DataSearch = function DataSearch(_ref) {
  var rest = _extends({}, (_objectDestructuringEmpty(_ref), _ref));
  var _useContext = useContext(FormContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    noForm = _useContext.noForm;
  var _useContext2 = useContext(MessageContext),
    format = _useContext2.format;
  var content = /*#__PURE__*/React.createElement(TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.DataSearch
    }),
    id: dataId + "--search",
    name: "_search",
    icon: /*#__PURE__*/React.createElement(Search, null),
    type: "search"
  }, rest));
  if (noForm) content = /*#__PURE__*/React.createElement(DataForm, {
    footer: false
  }, content);
  return content;
};
DataSearch.propTypes = DataSearchPropTypes;