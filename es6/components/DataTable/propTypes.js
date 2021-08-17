function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';
var sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];
var sides = ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'];
var parts = ['header', 'body', 'footer'];
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
    fill: PropTypes.oneOfType([PropTypes.oneOf(['horizontal', 'vertical']), PropTypes.bool]),
    groupBy: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
      property: PropTypes.string,
      expand: PropTypes.arrayOf(PropTypes.string),
      onExpand: PropTypes.func
    })]),
    onClickRow: PropTypes.func,
    rowDetails: PropTypes.func,
    onMore: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    onSort: PropTypes.func,
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
    step: PropTypes.number
  });
}

export var DataTablePropTypes = PropType;