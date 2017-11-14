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
    date: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).description(
      'Date to be used in the Clock.'
    ),
    night: PropTypes.bool.description(
      'Whether to force night or day mode for the Clock.'
    ),
    seconds: PropTypes.bool.description(
      'Whether to show seconds hand in the Clock.'
    ),
    size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'huge']).description(
      'Clock size'
    ).defaultValue('medium'),
    timezone: PropTypes.string.description(
      'IANA timezone to use in the Clock (e.g. America/Sao_Paulo).'
    ).defaultValue('America/Los_Angeles'),
  };

  return DocumentedClock;
};
