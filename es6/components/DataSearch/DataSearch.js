var _excluded = ["drop", "id", "responsive", "updateOn"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DropButton } from '../DropButton';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { Keyboard } from '../Keyboard';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';
import { useDebounce } from '../../utils/use-debounce';
import { useThemeValue } from '../../utils/useThemeValue';
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};

// 300ms was chosen empirically as a reasonable default
var DEBOUNCE_TIMEOUT = 300;
export var DataSearch = function DataSearch(_ref) {
  var _theme$data$button;
  var drop = _ref.drop,
    idProp = _ref.id,
    responsive = _ref.responsive,
    updateOn = _ref.updateOn,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = useContext(DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey,
    onView = _useContext.onView,
    view = _useContext.view,
    views = _useContext.views;
  var _useContext2 = useContext(DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = useContext(MessageContext),
    format = _useContext3.format;
  var _useThemeValue = useThemeValue(),
    theme = _useThemeValue.theme;
  var size = useContext(ResponsiveContext);
  var skeleton = useSkeleton();
  var debounce = useDebounce(DEBOUNCE_TIMEOUT);
  var _useState = useState(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var _useState2 = useState(view == null ? void 0 : view.search),
    value = _useState2[0],
    setValue = _useState2[1];
  var id = idProp || dataId + "--search";
  useEffect(function () {
    if (!inDataForm) addToolbarKey('_search');
  }, [addToolbarKey, inDataForm]);
  useEffect(function () {
    return setValue(view == null ? void 0 : view.search);
  }, [view == null ? void 0 : view.search]);
  var updateView = function updateView(e) {
    var _e$target;
    var nextView = _extends({}, view, {
      search: (_e$target = e.target) == null ? void 0 : _e$target.value
    });

    // If there's a named view in effect that has a search term
    // we'll clear the named view (but leave it's other filters)
    var currentView = nextView.view && (views == null ? void 0 : views.find(function (v) {
      return v.name === nextView.view;
    }));
    if (currentView != null && currentView.search) {
      delete nextView.view;
      delete nextView.name;
    }

    // If page is set, reset it to 1
    if (nextView.page) {
      nextView.page = 1;
    }
    onView(nextView);
  };
  var onChange = function onChange(e) {
    var _e$target2, _e$target3;
    setValue((_e$target2 = e.target) == null ? void 0 : _e$target2.value);
    // do the search if the input was cleared or update on change
    if (updateOn !== 'submit' || ((_e$target3 = e.target) == null ? void 0 : _e$target3.value) === '') debounce(function () {
      return function () {
        return updateView(e);
      };
    });
  };
  var content = skeleton ? null : /*#__PURE__*/React.createElement(TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    }),
    id: id,
    name: "_search",
    icon: /*#__PURE__*/React.createElement(Search, null),
    type: "search",
    value: value,
    onChange: onChange
  }, rest));
  if (updateOn === 'submit') content = /*#__PURE__*/React.createElement(Keyboard, {
    onEnter: updateView
  }, content);
  if (!inDataForm)
    // likely in Toolbar.
    // Wrap in Box to give it a reasonable width
    content = /*#__PURE__*/React.createElement(Box, null, content);else content = /*#__PURE__*/React.createElement(FormField, {
    htmlFor: id,
    label: format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    })
  }, content);
  if (!drop && (!responsive || !isSmall(size))) return content;
  var control = /*#__PURE__*/React.createElement(DropButton, _extends({
    id: dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
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