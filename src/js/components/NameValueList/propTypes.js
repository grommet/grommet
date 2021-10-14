import PropTypes from 'prop-types';
import { genericProps, widthPropType } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
      PropTypes.object,
    ]),
    layout: PropTypes.oneOfType(['column', 'grid']),
    nameProps: PropTypes.shape({
      align: PropTypes.oneOf(
        ['baseline', 'center', 'end', 'start', 'stretch'],
        PropTypes.string,
      ),
      width: widthPropType,
    }),
    pairProps: PropTypes.shape({
      direction: PropTypes.oneOf([
        'row',
        'column',
        'row-responsive',
        'row-reverse',
        'column-reverse',
      ]),
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
