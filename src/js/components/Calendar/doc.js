import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = (Calendar) => {
  const DocumentedCalendar = describe(Calendar)
    .availableAt(getAvailableAtBadge('Calendar'))
    .description(`Calendar of days in months.
      It can be used to select a single date, a range of dates, or multiple
      individual dates.`)
    .usage(
      `import { Calendar } from 'grommet';
<Calendar />`
    );

  DocumentedCalendar.propTypes = {
    bounds: PropTypes.arrayOf(PropTypes.string)
      .description(`An array of two numbers indicating the limits on
        navigation in ISO8601 format`),
    date: PropTypes.string.description('The selected date in ISO8601 format'),
    dates: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]))
      .description(`Multiple selected dates in ISO8601 format.
      Items that are an array indicate a range of dates.`),
    disabled: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]))
      .description(`Multiple dates in ISO8601 format that should not be
        selectable. Items that are an array indicate a range of dates.`),
    firstDayOfWeek: PropTypes.oneOf([0, 1])
      .description('The first day of the week. 0 for Sunday. 1 for Monday.'),
    header: PropTypes.func.description(
      `If specified, the entire calendar header will be managed by the caller.
The function passes the following options:

\`\`\`
  {
    date: Date,
    locale: string,
    onPreviousMonth: func,
    onNextMonth: func,
    previousInBound: bool,
    nextInBound: bool,
  }
\`\`\`

\`onPreviousMonth\` and \`onNextMonth\` are callbacks that will tell the calendar to move between months.
\`previousInBound\` and \`nextInBound\` are booleans that tell, when using \`bounds\`, if the current date is within that range.
You can then use that to disable the previous and next buttons.
`
    ),
    locale: PropTypes.string.description('The locale to use.'),
    onSelect: PropTypes.func.description(`Called with an ISO8601 date when
      the user selects a day.
      For single select, make this the subsequent \`date\` property value.
      For multiple select or ranges, toggle values in \`dates\`.
      Not specifying this property makes the component read only.`),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['small', 'medium', 'large']),
      PropTypes.string,
    ]).description('What size to make it.'),
  };

  return DocumentedCalendar;
};
