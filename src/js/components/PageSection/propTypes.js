import { backgroundDoc } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    fullBackground: backgroundDoc,
  };
}
export const PageSectionPropTypes = PropType;
