import PropTypes from 'prop-types';

export const SpinnerPropType = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
    PropTypes.string,
  ]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  ]),
};
