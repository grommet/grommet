import PropTypes from 'prop-types';
import { colorPropType } from '../../utils/general-prop-types';
var animationPropType = PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['pulse', 'draw']), PropTypes.shape({
  type: PropTypes.oneOf(['pulse', 'draw']),
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
})]);
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    animation: animationPropType,
    connections: PropTypes.arrayOf(PropTypes.shape({
      anchor: PropTypes.oneOf(['center', 'vertical', 'horizontal']),
      animation: animationPropType,
      color: colorPropType,
      fromTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      label: PropTypes.string,
      // for accessibility
      offset: PropTypes.oneOfType([PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      thickness: PropTypes.oneOfType([PropTypes.oneOf(['hair', 'xxsmall', 'xsmall', 'small', 'medium', 'large']), PropTypes.string]),
      toTarget: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      type: PropTypes.oneOf(['direct', 'curved', 'rectilinear'])
    })).isRequired
  };
}

export var DiagramPropTypes = PropType;