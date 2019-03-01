"use strict";

exports.__esModule = true;
exports.SearchInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ = require("../../..");

var _SearchBorderBox = require("./SearchBorderBox");

var _SearchInputContext = require("./SearchInputContext");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SearchInput =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(SearchInput, _Component);

  function SearchInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "textInputRef", (0, _react.createRef)());

    return _this;
  }

  var _proto = SearchInput.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.focusTimeout = setTimeout(function () {
      _this2.textInputRef.current.focus();
    }, 300);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  };

  _proto.render = function render() {
    var _this3 = this;

    return _react.default.createElement(_SearchInputContext.SearchInputContext.Consumer, null, function (_ref) {
      var searching = _ref.searching;
      return _react.default.createElement(_SearchBorderBox.SearchBorderBox, {
        searching: searching
      }, _react.default.createElement(_.TextInput, _extends({}, _this3.props, {
        plain: true,
        ref: _this3.textInputRef
      })));
    });
  };

  return SearchInput;
}(_react.Component);

exports.SearchInput = SearchInput;