import PropTypes from 'prop-types';
import {
  alignPropType,
  genericProps,
  widthPropType,
} from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    align: alignPropType,
    layout: PropTypes.oneOfType(['column', 'grid']),
    nameProps: PropTypes.shape({
      align: alignPropType,
      width: widthPropType,
    }),
    pairProps: PropTypes.shape({
      direction: PropTypes.oneOf(['row', 'column', 'column-reverse']),
    }),
    valueProps: PropTypes.shape({
      align: PropTypes.oneOf(
        ['baseline', 'center', 'end', 'start', 'stretch'],
        PropTypes.string,
      ),
      width: widthPropType,
    }),
  };
}
export const NameValueListType = PropType;
