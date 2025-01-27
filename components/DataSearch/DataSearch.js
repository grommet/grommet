"use strict";

exports.__esModule = true;
exports.DataSearch = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Search = require("grommet-icons/icons/Search");
var _Box = require("../Box");
var _DataContext = require("../../contexts/DataContext");
var _DropButton = require("../DropButton");
var _DataFormContext = require("../../contexts/DataFormContext");
var _FormField = require("../FormField");
var _Skeleton = require("../Skeleton");
var _TextInput = require("../TextInput");
var _Keyboard = require("../Keyboard");
var _MessageContext = require("../../contexts/MessageContext");
var _ResponsiveContext = require("../../contexts/ResponsiveContext");
var _propTypes = require("./propTypes");
var _responsive = require("../../utils/responsive");
var _useDebounce = require("../../utils/use-debounce");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["drop", "id", "responsive", "updateOn"];
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

// 300ms was chosen empirically as a reasonable default
var DEBOUNCE_TIMEOUT = 300;
var DataSearch = exports.DataSearch = function DataSearch(_ref) {
  var _theme$data$button;
  var drop = _ref.drop,
    idProp = _ref.id,
    responsive = _ref.responsive,
    updateOn = _ref.updateOn,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_DataContext.DataContext),
    dataId = _useContext.id,
    messages = _useContext.messages,
    addToolbarKey = _useContext.addToolbarKey,
    onView = _useContext.onView,
    view = _useContext.view,
    views = _useContext.views;
  var _useContext2 = (0, _react.useContext)(_DataFormContext.DataFormContext),
    inDataForm = _useContext2.inDataForm;
  var _useContext3 = (0, _react.useContext)(_MessageContext.MessageContext),
    format = _useContext3.format;
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme;
  var size = (0, _react.useContext)(_ResponsiveContext.ResponsiveContext);
  var skeleton = (0, _Skeleton.useSkeleton)();
  var debounce = (0, _useDebounce.useDebounce)(DEBOUNCE_TIMEOUT);
  var _useState = (0, _react.useState)(),
    showContent = _useState[0],
    setShowContent = _useState[1];
  var _useState2 = (0, _react.useState)(view == null ? void 0 : view.search),
    value = _useState2[0],
    setValue = _useState2[1];
  var id = idProp || dataId + "--search";
  (0, _react.useEffect)(function () {
    if (!inDataForm) addToolbarKey('_search');
  }, [addToolbarKey, inDataForm]);
  (0, _react.useEffect)(function () {
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
  var content = skeleton ? null : /*#__PURE__*/_react["default"].createElement(_TextInput.TextInput, _extends({
    "aria-label": format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    }),
    id: id,
    name: "_search",
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    type: "search",
    value: value,
    onChange: onChange
  }, rest));
  if (updateOn === 'submit') content = /*#__PURE__*/_react["default"].createElement(_Keyboard.Keyboard, {
    onEnter: updateView
  }, content);
  if (!inDataForm)
    // likely in Toolbar.
    // Wrap in Box to give it a reasonable width
    content = /*#__PURE__*/_react["default"].createElement(_Box.Box, null, content);else content = /*#__PURE__*/_react["default"].createElement(_FormField.FormField, {
    htmlFor: id,
    label: format({
      id: 'dataSearch.label',
      messages: messages == null ? void 0 : messages.dataSearch
    })
  }, content);
  if (!drop && (!responsive || !(0, _responsive.isSmall)(size))) return content;
  var control = /*#__PURE__*/_react["default"].createElement(_DropButton.DropButton, _extends({
    id: dataId + "--search-control",
    "aria-label": format({
      id: 'dataSearch.open',
      messages: messages == null ? void 0 : messages.dataSort
    }),
    kind: (_theme$data$button = theme.data.button) == null ? void 0 : _theme$data$button.kind,
    icon: /*#__PURE__*/_react["default"].createElement(_Search.Search, null),
    dropProps: dropProps,
    dropContent: /*#__PURE__*/_react["default"].createElement(_Box.Box, {
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
DataSearch.propTypes = _propTypes.DataSearchPropTypes;