"use strict";

exports.__esModule = true;
exports.DataTablePropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
var parts = ['header', 'body', 'footer'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = _propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string]);
});
var padShapeParts = {};
parts.forEach(function (part) {
  padShapeParts[part] = {};
  sides.forEach(function (side) {
    padShapeParts[part][side] = _propTypes["default"].oneOf(sizes);
  });
});
var backgroundShape = {};
[].concat(parts, ['pinned']).forEach(function (part) {
  backgroundShape[part] = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  }), _propTypes["default"].arrayOf(_propTypes["default"].string)]);
});
var borderTypes = [_propTypes["default"].bool, _propTypes["default"].oneOf(sides), _propTypes["default"].shape({
  color: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
    dark: _propTypes["default"].string,
    light: _propTypes["default"].string
  })]),
  side: _propTypes["default"].oneOf(sides),
  size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string])
})];
var borderShape = {};
parts.forEach(function (part) {
  borderShape[part] = _propTypes["default"].oneOfType(borderTypes);
});
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, _generalPropTypes.genericProps, {
    background: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].shape(backgroundShape)]),
    border: _propTypes["default"].oneOfType([].concat(borderTypes, [_propTypes["default"].shape(borderShape)])),
    columns: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      align: _propTypes["default"].oneOf(['center', 'start', 'end']),
      aggregate: _propTypes["default"].oneOf(['avg', 'max', 'min', 'sum']),
      footer: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].shape({
        aggregate: _propTypes["default"].bool
      })]),
      header: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node, _propTypes["default"].shape({
        aggregate: _propTypes["default"].bool
      })]),
      pin: _propTypes["default"].bool,
      plain: _propTypes["default"].bool,
      primary: _propTypes["default"].bool,
      property: _propTypes["default"].string.isRequired,
      render: _propTypes["default"].func,
      search: _propTypes["default"].bool,
      sortable: _propTypes["default"].bool,
      size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge', '1/2', '1/4', '2/4', '3/4', '1/3', '2/3']), _propTypes["default"].string]),
      units: _propTypes["default"].string,
      verticalAlign: _propTypes["default"].oneOf(['middle', 'top', 'bottom'])
    })),
    data: _propTypes["default"].arrayOf(_propTypes["default"].shape({})),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    groupBy: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      property: _propTypes["default"].string,
      expand: _propTypes["default"].arrayOf(_propTypes["default"].string),
      onExpand: _propTypes["default"].func
    })]),
    onClickRow: _propTypes["default"].func,
    rowDetails: _propTypes["default"].func,
    onMore: _propTypes["default"].func,
    onSearch: _propTypes["default"].func,
    onSelect: _propTypes["default"].func,
    onSort: _propTypes["default"].func,
    pad: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(sizes), _propTypes["default"].string, _propTypes["default"].shape(padShapeSides), _propTypes["default"].shape(padShapeParts)]),
    paginate: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].object]),
    pin: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['header', 'footer'])]),
    placeholder: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
    primaryKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
    replace: _propTypes["default"].bool,
    resizeable: _propTypes["default"].bool,
    rowProps: _propTypes["default"].shape({}),
    select: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
    show: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
      page: _propTypes["default"].number
    })]),
    size: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['small', 'medium', 'large', 'xlarge']), _propTypes["default"].string]),
    sort: _propTypes["default"].shape({
      direction: _propTypes["default"].oneOf(['asc', 'desc']),
      external: _propTypes["default"].bool,
      property: _propTypes["default"].string.isRequired
    }),
    sortable: _propTypes["default"].bool,
    step: _propTypes["default"].number
  });
}

var DataTablePropTypes = PropType;
exports.DataTablePropTypes = DataTablePropTypes;