"use strict";

exports.__esModule = true;
exports.DataTablePropTypes = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _generalPropTypes = require("../../utils/general-prop-types");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
var parts = ['header', 'body', 'footer'];
var verticalAlign = ['bottom', 'middle', 'top'];
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
    allowSelectAll: _propTypes["default"].bool,
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
    disabled: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
    fill: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(['horizontal', 'vertical']), _propTypes["default"].bool]),
    groupBy: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].shape({
      property: _propTypes["default"].string,
      expand: _propTypes["default"].arrayOf(_propTypes["default"].string),
      expandable: _propTypes["default"].arrayOf(_propTypes["default"].string),
      expandLabel: _propTypes["default"].func,
      select: _propTypes["default"].objectOf(_propTypes["default"].oneOf(['all', 'some', 'none'])),
      onExpand: _propTypes["default"].func,
      onSelect: _propTypes["default"].func
    })]),
    messages: _propTypes["default"].shape({
      ascending: _propTypes["default"].string,
      collapse: _propTypes["default"].string,
      collapseAll: _propTypes["default"].string,
      decrease: _propTypes["default"].string,
      descending: _propTypes["default"].string,
      increase: _propTypes["default"].string,
      expand: _propTypes["default"].string,
      expandAll: _propTypes["default"].string,
      resizerAria: _propTypes["default"].string,
      rows: _propTypes["default"].string,
      rowsChanged: _propTypes["default"].string,
      rowsSingle: _propTypes["default"].string,
      searchBy: _propTypes["default"].string,
      total: _propTypes["default"].string,
      totalSingle: _propTypes["default"].string
    }),
    onClickRow: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].oneOf(['select'])]),
    rowDetails: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].shape({
      render: _propTypes["default"].func.isRequired,
      expand: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])),
      expandLabel: _propTypes["default"].func,
      onExpand: _propTypes["default"].func
    })]),
    onMore: _propTypes["default"].func,
    onSearch: _propTypes["default"].func,
    onSelect: _propTypes["default"].func,
    onSort: _propTypes["default"].func,
    onUpdate: _propTypes["default"].func,
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
    step: _propTypes["default"].number,
    verticalAlign: _propTypes["default"].oneOfType([_propTypes["default"].oneOf(verticalAlign), _propTypes["default"].shape({
      header: _propTypes["default"].oneOf(verticalAlign),
      body: _propTypes["default"].oneOf(verticalAlign),
      footer: _propTypes["default"].oneOf(verticalAlign)
    })])
  });
}
var DataTablePropTypes = exports.DataTablePropTypes = PropType;