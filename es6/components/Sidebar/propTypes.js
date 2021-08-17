import PropTypes from 'prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    children: PropTypes.node,
    footer: PropTypes.node,
    header: PropTypes.node
  };
}

export var SidebarPropTypes = PropType;