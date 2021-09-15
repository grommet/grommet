import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.func,
  };
}
export const AnnounceContextPropTypes = PropType;
