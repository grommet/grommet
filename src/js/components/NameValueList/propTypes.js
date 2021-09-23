import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    data: PropTypes.arrayOf(PropTypes.shape({})),
  };
}
export const NameValueListPropTypes = PropType;
