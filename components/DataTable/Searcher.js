"use strict";

exports.__esModule = true;
exports.Searcher = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _FormSearch = require("grommet-icons/icons/FormSearch");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Keyboard = require("../Keyboard");

var _Text = require("../Text");

var _TextInput = require("../TextInput");

var _utils = require("../../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Searcher =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Searcher, _Component);

  function Searcher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "inputRef", _react.default.createRef());

    return _this;
  }

  var _proto = Searcher.prototype;

  _proto.componentDidMount = function componentDidMount() {
    /* eslint-disable-next-line react/prop-types */
    var _this$props = this.props,
        filtering = _this$props.filtering,
        property = _this$props.property;

    if (this.inputRef.current && filtering === property) {
      this.inputRef.current.focus();
    }
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        filtering = _this$props2.filtering,
        filters = _this$props2.filters,
        onFilter = _this$props2.onFilter,
        onFiltering = _this$props2.onFiltering,
        property = _this$props2.property,
        theme = _this$props2.theme;

    if (filtering === property) {
      return _react.default.createElement(_Keyboard.Keyboard, {
        onEsc: function onEsc() {
          return onFiltering(undefined);
        }
      }, _react.default.createElement(_Box.Box, {
        flex: true,
        pad: {
          horizontal: 'small'
        }
      }, _react.default.createElement(_TextInput.TextInput, {
        ref: this.inputRef,
        value: filters[property],
        onChange: function onChange(event) {
          return onFilter(property, event.target.value);
        },
        onBlur: function onBlur() {
          return onFiltering(undefined);
        }
      })));
    }

    return _react.default.createElement(_react.Fragment, null, filters[property] ? _react.default.createElement(_Box.Box, {
      flex: false,
      pad: {
        horizontal: 'small'
      }
    }, _react.default.createElement(_Text.Text, null, filters[property])) : null, _react.default.createElement(_Button.Button, {
      icon: _react.default.createElement(_FormSearch.FormSearch, {
        color: (0, _utils.normalizeColor)(filtering === property ? 'brand' : 'border', theme)
      }),
      hoverIndicator: true,
      onClick: function onClick() {
        return onFiltering(filtering === property ? undefined : property);
      }
    }));
  };

  return Searcher;
}(_react.Component);

Searcher.defaultProps = {};
Object.setPrototypeOf(Searcher.defaultProps, _defaultProps.defaultProps);
var SearcherWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(Searcher);
exports.Searcher = SearcherWrapper;