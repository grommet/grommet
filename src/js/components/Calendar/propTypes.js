import PropTypes from 'prop-types';
import { genericProps } from '../../utils/general-prop-types';

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    activeDate: PropTypes.oneOf(['start', 'end']),
    animate: PropTypes.bool,
    bounds: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.func,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(PropTypes.string),
        ]),
      ),
    ]),
    dates: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
    disabled: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
    ),
    daysOfWeek: PropTypes.bool,
    fill: PropTypes.bool,
    firstDayOfWeek: PropTypes.oneOf([0, 1]),
    header: PropTypes.func,
    level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6']),
    locale: PropTypes.string,
    messages: PropTypes.shape({
      previous: PropTypes.string,
      next: PropTypes.string,
    }),
    onReference: PropTypes.func,
    onSelect: PropTypes.func,
    range: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['array'])]),
    reference: PropTypes.string,
    responsive: PropTypes.bool,
    showAdjacentDays: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['trim']),
    ]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large']),
      PropTypes.string,
    ]),
  };
}
export const CalendarPropTypes = PropType;
