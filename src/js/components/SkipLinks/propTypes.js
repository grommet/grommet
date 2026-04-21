import PropTypes from 'prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    id: PropTypes.string,
    children: PropTypes.node.isRequired,
    messages: PropTypes.shape({
      skipTo: PropTypes.string,
    }),
  };
}
export const SkipLinksPropTypes = PropType;
