import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    value: PropTypes.shape({}),
  };
}
export const ThemeContextPropTypes = PropType;
