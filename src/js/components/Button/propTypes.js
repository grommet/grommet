import PropTypes from 'prop-types';
import {
  backgroundPropType,
  genericProps,
  colorPropType,
  hoverIndicatorPropType,
} from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.node,
    ]),
    active: PropTypes.bool,
    as: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.elementType,
    ]),
    badge: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.element,
      PropTypes.number,
      PropTypes.shape({
        background: backgroundPropType,
        max: PropTypes.number,
        value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
      }),
    ]),
    color: colorPropType,
    disabled: PropTypes.bool,
    fill: PropTypes.oneOfType([
      PropTypes.oneOf(['horizontal', 'vertical']),
      PropTypes.bool,
    ]),
    focusIndicator: PropTypes.bool,
    gap: PropTypes.oneOfType([
      PropTypes.oneOf([
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ]),
      PropTypes.string,
    ]),
    hoverIndicator: hoverIndicatorPropType,
    href: PropTypes.string,
    icon: PropTypes.element,
    justify: PropTypes.oneOf([
      'around',
      'between',
      'center',
      'end',
      'evenly',
      'start',
      'stretch',
    ]),
    label: PropTypes.node,
    onClick: PropTypes.func,
    plain: PropTypes.bool,
    primary: PropTypes.bool,
    reverse: PropTypes.bool,
    secondary: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large']),
      PropTypes.string,
    ]),
    target: PropTypes.oneOfType([
      PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
      PropTypes.string,
    ]),
    tip: PropTypes.oneOfType([
      PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        dropProps: PropTypes.shape({}),
        plain: PropTypes.bool,
      }),
      PropTypes.string,
    ]),
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
  };
}
export const ButtonPropTypes = PropType;
