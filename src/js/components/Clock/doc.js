import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export default (Clock) => {
  const DocumentedClock = describe(Clock)
    .availableAt(getAvailableAtBadge('Clock'))
    .description('A clock with timezone awareness.')
    .usage(
      `import { Clock } from 'grommet';
<Clock />`
    );

  DocumentedClock.propTypes = {
    onChange: PropTypes.func.description(
      `If the clock is running, this function will be called with the
      current time value each time it changes.`
    ),
    precision: PropTypes.oneOf(['hours', 'minutes', 'seconds']).description(
      'How precise a time to represent.'
    ),
    run: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['backward', 'forward']),
    ]).description(
      `Whether the clock should actively adjust time or be fixed to the
      time specified. 'backward' could be used as a countdown timer.`
    ).defaultValue('forward'),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']).description(
      'Clock size'
    ).defaultValue('medium'),
    time: PropTypes.string.description(
      `ISO8601 time or duration. For example: 'P8H12M23S',
      'T08:12:23', or '2015-02-22T08:12:23'. Any included date
      portion will be ignored for an analog clock.`
    ),
    type: PropTypes.oneOf(['analog', 'digital']).description(
      'What type of visualization to show.'
    ).defaultValue('analog'),
  };

  return DocumentedClock;
};
