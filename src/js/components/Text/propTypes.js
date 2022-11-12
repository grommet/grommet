import PropTypes from 'prop-types';
import {
  colorPropType,
  genericProps,
  MARGIN_SIZES,
  skeletonPropType,
} from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    color: colorPropType,
    margin: PropTypes.oneOfType([
      PropTypes.oneOf(['none', ...MARGIN_SIZES]),
      PropTypes.shape({
        bottom: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        end: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        horizontal: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        left: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        right: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        start: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        top: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
        vertical: PropTypes.oneOfType([
          PropTypes.oneOf(MARGIN_SIZES),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf([
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
      ]),
      PropTypes.string,
    ]),
    skeleton: skeletonPropType,
    tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    as: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.element,
    ]),
    textAlign: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
    tip: PropTypes.oneOfType([
      PropTypes.shape({
        content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        dropProps: PropTypes.shape({}),
        plain: PropTypes.bool,
      }),
      PropTypes.string,
    ]),
    truncate: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['tip'])]),
    weight: PropTypes.oneOfType([
      PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter']),
      PropTypes.number,
    ]),
    wordBreak: PropTypes.oneOf([
      'normal',
      'break-all',
      'keep-all',
      'break-word',
    ]),
  };
}
export const TextPropTypes = PropType;
