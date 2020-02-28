import { describe, PropTypes } from 'react-desc';

import {
  genericProps,
  getAvailableAtBadge,
  // themeDocUtils,
} from '../../utils';

export const doc = DataChart => {
  const DocumentedDataChart = describe(DataChart)
    .availableAt(getAvailableAtBadge('DataChart'))
    .description('Takes a data set and visualizes it.')
    .usage(
      `import { DataChart } from 'grommet';
<DataChart data={data} chart={} />`,
    )
    .intrinsicElement('div');

  DocumentedDataChart.propTypes = {
    ...genericProps,
    // chart: PropTypes.oneOfType([PropTypes.shape({})]).description(
    //   'how to visualize the data.',
    // ).required,
    // data: PropTypes.arrayOf(PropTypes.shape({})).description('the data set')
    //   .required,
    xAxis: PropTypes.shape({}).description('x-xxis configuration'),
    yAxis: PropTypes.shape({}).description('y-axis configuration'),
  };

  return DocumentedDataChart;
};

// export const themeDoc = {
// };
