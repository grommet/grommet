import PropTypes from 'prop-types';

export const SkipLinksPropType = {
  children: PropTypes.node.isRequired,
  messages: PropTypes.shape({
    skipTo: PropTypes.string,
  }),
};
