import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

const VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
const HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    disabled: PropTypes.bool,
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
      left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
    }),
    dropBackground: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        opacity: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.number,
          PropTypes.oneOf(['weak', 'medium', 'strong']),
        ]),
      }),
    ]),
    dropTarget: PropTypes.object,
    dropProps: PropTypes.object,
    justifyContent: PropTypes.oneOf([
      'start',
      'center',
      'end',
      'between',
      'around',
      'stretch',
    ]),
    icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
    ]).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    messages: PropTypes.shape({
      closeMenu: PropTypes.string,
      openMenu: PropTypes.string,
    }),
    open: PropTypes.bool,
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ]),
  };
}
export const MenuPropTypes = PropType;
