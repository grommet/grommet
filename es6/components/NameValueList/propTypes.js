import PropTypes from 'prop-types';
import { alignPropType, widthPropType } from '../../utils/general-prop-types';
var PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    align: alignPropType,
    layout: PropTypes.oneOfType(['column', 'grid']),
    nameProps: PropTypes.shape({
      align: alignPropType,
      width: widthPropType
    }),
    pairProps: PropTypes.shape({
      direction: PropTypes.oneOf(['row', 'column', 'column-reverse'])
    }),
    valueProps: PropTypes.shape({
      align: alignPropType,
      width: widthPropType
    })
  };
}
export var NameValueListType = PropType;