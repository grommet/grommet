import PropTypes from 'prop-types';
import { genericProps, padPropType } from '../../utils/general-prop-types';
import { BoxPropTypes } from '../Box/propTypes';

const sizes = [
  'none',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
];
const sides = [
  'horizontal',
  'vertical',
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'end',
];

const padShapeSides = {};
sides.forEach((side) => {
  padShapeSides[side] = PropTypes.oneOf(sizes);
});

const borderTypes = [
  PropTypes.bool,
  PropTypes.oneOf(sides),
  PropTypes.shape({
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        dark: PropTypes.string,
        light: PropTypes.string,
      }),
    ]),
    side: PropTypes.oneOf(sides),
    size: PropTypes.oneOfType([PropTypes.oneOf(sizes), PropTypes.string]),
  }),
];

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    action: PropTypes.func,
    as: PropTypes.string,
    background: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    border: PropTypes.oneOfType(borderTypes),
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    ),
    children: PropTypes.func,
    defaultItemProps: PropTypes.shape(BoxPropTypes),
    disabled: PropTypes.arrayOf(PropTypes.string),
    itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    itemProps: PropTypes.shape({}),
    onActive: PropTypes.func,
    onClickItem: PropTypes.func,
    onMore: PropTypes.func,
    onOrder: PropTypes.func,
    pad: PropTypes.oneOfType([padPropType]),
    paginate: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    pinned: PropTypes.arrayOf(PropTypes.string),
    primaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    secondaryKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    show: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({ page: PropTypes.number }),
    ]),
    step: PropTypes.number,
  };
}
export const ListPropTypes = PropType;
