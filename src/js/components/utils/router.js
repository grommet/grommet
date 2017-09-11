import { PropTypes } from 'react-desc';

export const ROUTER_PROPS = {
  path: [
    PropTypes.string,
    'Indicates the path to be used for react-router link.', {
      required: true,
    },
  ],
  method: [
    PropTypes.oneOf(['push', 'replace']),
    'Indicates whether the browser history should be appended to or replaced.', {
      defaultProp: 'push',
    },
  ],
};

export default { ROUTER_PROPS };
