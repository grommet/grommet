import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.node,
    messages: PropTypes.shape({
      skipTo: PropTypes.string,
    }),
  };
}
export const SkipLinksPropTypes = PropType;
