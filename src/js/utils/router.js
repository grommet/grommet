import PropTypes from 'prop-types';

export const ROUTER_PROPS = {
  // Indicates the path to be used for react-router link.
  path: PropTypes.string.isRequired,
  // Indicates whether the browser history should be appended to or replaced.
  // defaultValue: 'push
  method: PropTypes.oneOf(['push', 'replace']),
};
