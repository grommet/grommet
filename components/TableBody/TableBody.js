"use strict";

exports.__esModule = true;
exports.TableBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _hocs = require("../hocs");

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TableBody = function TableBody(_ref) {
  var forwardRef = _ref.forwardRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["forwardRef"]);

  return _react["default"].createElement(_TableContext.TableContext.Provider, {
    value: "body"
  }, _react["default"].createElement(_StyledTable.StyledTableBody, _extends({
    ref: forwardRef
  }, rest)));
};

var TableBodyDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableBodyDoc = require('./doc').doc(TableBody);
}

var TableBodyWrapper = (0, _recompose.compose)(_hocs.withForwardRef)(TableBodyDoc || TableBody);
exports.TableBody = TableBodyWrapper;