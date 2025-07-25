function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
var parts = ['header', 'body', 'footer'];
var verticalAlign = ['bottom', 'middle', 'top'];
var padShapeSides = {};
sides.forEach(function (side) {
  padShapeSides[side] = PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string]);
});
var padShapeParts = {};
parts.forEach(function (part) {
  padShapeParts[part] = {};
  sides.forEach(function (side) {
    padShapeParts[part][side] = PropTypes.oneOf(sizes);
  });
});
var backgroundShape = {};
[].concat(parts, ['pinned']).forEach(function (part) {
  backgroundShape[part] = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  }), PropTypes.arrayOf(PropTypes.string)]);
});
var borderTypes = [PropTypes.bool, PropTypes.oneOf(sides), PropTypes.shape({
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    dark: PropTypes.string,
    light: PropTypes.string
  })]),
  side: PropTypes.oneOf(sides),
  size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string])
})];
var borderShape = {};
parts.forEach(function (part) {
  borderShape[part] = PropTypes.oneOfType(borderTypes);
});
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = _extends({}, genericProps, {
    allowSelectAll: PropTypes.bool,
    background: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string), PropTypes.shape(backgroundShape)]),
    border: PropTypes.oneOfType([].concat(borderTypes, [PropTypes.shape(borderShape)])),
    columns: PropTypes.arrayOf(PropTypes.shape({
      align: PropTypes.oneOf(['center', 'start', 'end']),
      aggregate: PropTypes.oneOf(['avg', 'max', 'min', 'sum']),
      footer: PropTypes.oneOfType([PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.shape({
        aggregate: PropTypes.bool
      })]),
      pin: PropTypes.bool,
      plain: PropTypes.bool,
      primary: PropTypes.bool,
      property: PropTypes.string.isRequired,
      render: PropTypes.func,
      search: PropTypes.bool,
      sortable: PropTypes.bool,
      size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', '1/2', '1/4', '2/4', '3/4', '1/3', '2/3']), PropTypes.string]),
      units: PropTypes.string,
      verticalAlign: PropTypes.oneOf(['middle', 'top', 'bottom'])
    })),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    disabled: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      property: PropTypes.string,
      expand: PropTypes.arrayOf(PropTypes.string),
      expandable: PropTypes.arrayOf(PropTypes.string),
      expandLabel: PropTypes.func,
      select: PropTypes.objectOf(PropTypes.oneOf(['all', 'some', 'none'])),
      onExpand: PropTypes.func,
      onSelect: PropTypes.func
    })]),
    messages: PropTypes.shape({
      ascending: PropTypes.string,
      collapse: PropTypes.string,
      collapseAll: PropTypes.string,
      decrease: PropTypes.string,
      descending: PropTypes.string,
      increase: PropTypes.string,
      expand: PropTypes.string,
      expandAll: PropTypes.string,
      resizerAria: PropTypes.string,
      rows: PropTypes.string,
      rowsChanged: PropTypes.string,
      rowsSingle: PropTypes.string,
      searchBy: PropTypes.string,
      total: PropTypes.string,
      totalSingle: PropTypes.string
    }),
    onClickRow: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf(['select'])]),
    rowDetails: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
      render: PropTypes.func.isRequired,
      expand: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      expandLabel: PropTypes.func,
      onExpand: PropTypes.func
    })]),
    onMore: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func,
    onUpdate: PropTypes.func,
    pad: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string, PropTypes.shape(padShapeSides), PropTypes.shape(padShapeParts)]),
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    pin: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['header', 'footer'])]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    replace: PropTypes.bool,
    resizeable: PropTypes.bool,
    rowProps: PropTypes.shape({}),
    select: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    show: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
      page: PropTypes.number
    })]),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']), PropTypes.string]),
    sort: PropTypes.shape({
      direction: PropTypes.oneOf(['asc', 'desc']),
      external: PropTypes.bool,
      property: PropTypes.string.isRequired
    }),
    sortable: PropTypes.bool,
    step: PropTypes.number,
    verticalAlign: PropTypes.oneOfType([PropTypes.oneOf(verticalAlign), PropTypes.shape({
      header: PropTypes.oneOf(verticalAlign),
      body: PropTypes.oneOf(verticalAlign),
      footer: PropTypes.oneOf(verticalAlign)
    })])
  });
}
export var DataTablePropTypes = PropType;