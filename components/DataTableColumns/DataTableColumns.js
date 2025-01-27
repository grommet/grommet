"use strict";

exports.__esModule = true;
exports.DataTableColumns = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Search = require("grommet-icons/icons/Search");
var _Splits = require("grommet-icons/icons/Splits");
var _Lock = require("grommet-icons/icons/Lock");
var _Box = require("../Box");
var _CheckBoxGroup = require("../CheckBoxGroup");
var _Data = require("../Data");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormContext = require("../Form/FormContext");
var _DropButton = require("../DropButton");
var _List = require("../List");
var _Tab = require("../Tab");
var _Tabs = require("../Tabs");
var _TextInput = require("../TextInput");
var _DataContext = require("../../contexts/DataContext");
var _MessageContext = require("../../contexts/MessageContext");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["drop", "options"],
  _excluded2 = ["drop", "options"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var dropProps = {
  align: {
    top: 'bottom',
    left: 'left'
  }
};
var tabsProps = {
  drop: {
    pad: 'small'
  },
  noDrop: {
    justify: 'start'
  }
};

// options can either be an array of property names or an array of objects.
// The form value always uses an array of property names.
var optionsToValue = function optionsToValue(options) {
  return (options == null ? void 0 : options.map(function (o) {
    return typeof o === 'object' && o.property || o;
  })) || [];
};
var optionProperty = function optionProperty(option) {
  return typeof option === 'object' ? option.property : option;
};

// align the order in value to the order in options, as best we can
var alignOrder = function alignOrder(value, prevValue, options) {
  return value.sort(function (p1, p2) {
    // if both are in prevValue, preserve the order from that
    var i1 = prevValue.findIndex(function (n) {
      return n === p1;
    });
    var i2 = prevValue.findIndex(function (n) {
      return n === p2;
    });
    if (i1 !== -1 && i2 !== -1) return i1 - i2;
    i1 = options.findIndex(function (o) {
      return optionProperty(o) === p1;
    });
    i2 = options.findIndex(function (o) {
      return optionProperty(o) === p2;
    });
    return i1 - i2;
  });
};

// Content is a separate component since it might be getting its form context
// from the DataForm rendered inside DataTableColumns.
var Content = function Content(_ref) {
  var drop = _ref.drop,
    _ref$options = _ref.options,
    options = _ref$options === void 0 ? [] : _ref$options,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages;
  var _useContext2 = (0, _react.useContext)(_FormContext.FormContext),
    useFormInput = _useContext2.useFormInput;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;

  // If the user searches for a particular option, render
  // the filtered list of options.
  var _useState = (0, _react.useState)(''),
    search = _useState[0],
    setSearch = _useState[1];
  var _useState2 = (0, _react.useState)(options),
    filteredOptions = _useState2[0],
    setFilteredOptions = _useState2[1];

  // Note whether options are objects so we can set up the *key properties
  // as needed when rendering.
  var objectOptions = (0, _react.useMemo)(function () {
    return options && options.length && typeof options[0] === 'object';
  }, [options]);
  var pinned = (0, _react.useMemo)(function () {
    var items = objectOptions ? options.filter(function (option) {
      return option.pinned && option.label;
    }).map(function (option) {
      return option.label;
    }) : [];
    return items != null && items.length ? {
      background: 'none',
      color: 'text-weak',
      icon: /*#__PURE__*/_react["default"].createElement(_Lock.Lock, null),
      items: items
    } : undefined;
  }, [options, objectOptions]);
  // 'value' is an array of property names
  var _useFormInput = useFormInput({
      name: _Data.formColumnsKey,
      initialValue: optionsToValue(options)
    }),
    value = _useFormInput[0],
    setValue = _useFormInput[1];

  // When the user searches, updated the filtered options based on the
  // search string.
  var onSearch = (0, _react.useCallback)(function (nextSearch) {
    var nextFilteredOptions = options;
    if (nextSearch) {
      var lowerSearch = nextSearch.toLowerCase();
      nextFilteredOptions = options.filter(function (o) {
        var _ref2, _ref3, _o$label;
        return (_ref2 = (_ref3 = (_o$label = o.label) != null ? _o$label : o.property) != null ? _ref3 : o) == null ? void 0 : _ref2.toLowerCase().includes(lowerSearch);
      });
    }
    setSearch(nextSearch);
    setFilteredOptions(nextFilteredOptions);
  }, [options]);
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, null, /*#__PURE__*/_react["default"].createElement(_Tabs.Tabs, _extends({}, tabsProps[drop ? 'drop' : 'noDrop'], rest), /*#__PURE__*/_react["default"].createElement(_Tab.Tab, {
    id: dataId + "--select-columns-tab",
    title: format({
      id: 'dataTableColumns.select',
      messages: messages == null ? void 0 : messages.dataTableColumns
    })
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      vertical: 'small'
    },
    gap: "xsmall"
  }, /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, {
    type: "search",
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    placeholder: "Search",
    value: search,
    onChange: function onChange(event) {
      return onSearch(event.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement(_CheckBoxGroup.CheckBoxGroup, {
    id: dataId + "--select-columns",
    name: _Data.formColumnsKey,
    "aria-labelledby": dataId + "--select-columns-tab",
    options: filteredOptions,
    valueKey: objectOptions && 'property' || undefined,
    labelKey: objectOptions && 'label' || undefined,
    value: value,
    onChange: function onChange(_ref4) {
      var nextValue = _ref4.value;
      return setValue(alignOrder(nextValue, value, options));
    }
  }))), /*#__PURE__*/_react["default"].createElement(_Tab.Tab, {
    id: dataId + "--order-columns-tab",
    title: format({
      id: 'dataTableColumns.order',
      messages: messages == null ? void 0 : messages.dataTableColumns
    })
  }, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    pad: {
      top: 'small'
    }
  }, /*#__PURE__*/_react["default"].createElement(_List.List, {
    id: dataId + "--order-columns",
    "aria-labelledby": dataId + "--order-columns-tab"
    // List wants objects if possible to be able to use 'label'
    ,
    data: value.map(function (v) {
      return objectOptions && options.find(function (o) {
        return o.property === v;
      }) || v;
    }),
    onOrder: function onOrder(nextData) {
      return setValue(optionsToValue(nextData));
    },
    pad: "none",
    primaryKey: objectOptions && 'label' || undefined,
    pinned: pinned
  })))));
};
var DataTableColumns = exports.DataTableColumns = function DataTableColumns(_ref5) {
  var _theme$data$button;
  var drop = _ref5.drop,
    options = _ref5.options,
    rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  var _useContext4 = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext4.id,
    messages = _useContext4.messages;
  var _useContext5 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext5.inDataForm;
  var _useContext6 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext6.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var _useState3 = (0, _react.useState)(),
    showContent = _useState3[0],
    setShowContent = _useState3[1];
  var tip = format({
    id: 'dataTableColumns.tip',
    messages: messages == null ? void 0 : messages.dataTableColumns
  });
  var content = /*#__PURE__*/_react["default"].createElement(Content, {
    drop: drop,
    options: options
  });
  if (!inDataForm) content = /*#__PURE__*/_react["default"].createElement(_Data.DataForm, {
    footer: false,
    updateOn: "change"
  }, content);
  if (!drop) return content;
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    id: dataId + "--columns-control",
    "aria-label": format({
      id: 'dataTableColumns.open',
      messages: messages == null ? void 0 : messages.dataTableColumns
    }),
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/_react["default"].createElement(_Splits.Splits, null),
    tip: tip,
    dropProps: dropProps,
    dropContent: content,
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
DataTableColumns.propTypes = _propTypes.DataTableColumnsPropTypes;