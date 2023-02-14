var _excluded = ["drop", "id", "responsive"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
export var DataSearch = function DataSearch(_ref) {
  var drop = _ref.drop,
    idProp = _ref.id,
    responsive = _ref.responsive,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey;
  var _useContext2 = useContext(FormContext),
    noForm = _useContext2.noForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var size = useContext(ResponsiveContext);
  var skeleton = useSkeleton();
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var id = idProp || dataId + "--search";
  useEffect(function () {
    if (noForm) addToolbarKey('_search');
  }, [addToolbarKey, noForm]);
  var content = skeleton ? null : /*#__PURE__*/React.createElement(TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    }),
    id: id,
    name: "_search",
    icon: /*#__PURE__*/React.createElement(Search, null),
    type: "search"
  }, rest));
  if (noForm)
    // likely in Toolbar
    content = /*#__PURE__*/React.createElement(DataForm, {
      footer: false,
      updateOn: "change"
    }, content);else content = /*#__PURE__*/React.createElement(FormField, {
    htmlFor: id,
    label: format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    })
  }, content);
  if (!drop && (!responsive || size !== 'small' && size !== 'xsmall')) return content;
  var control = /*#__PURE__*/React.createElement(DropButton, _extends({
    id: dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: "toolbar",
    icon: /*#__PURE__*/React.createElement(Search, null),
    dropProps: dropProps,
    dropContent: /*#__PURE__*/React.createElement(Box, {
      pad: "small"
    }, content),
    open: showContent,
    onOpen: function onOpen() {
      return setShowContent(undefined);
    },
    onClose: function onClose() {
      return setShowContent(undefined);
    }
  }, rest));
  return control;
};
DataSearch.propTypes = DataSearchPropTypes;