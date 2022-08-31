import PropTypes from 'prop-types';
import {
  genericProps,
  padPropType,
  pointPropType,
} from '../../utils/general-prop-types';

const colorType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      value: PropTypes.number,
    }),
  ),
]);

const thicknessType = PropTypes.oneOfType([
  PropTypes.oneOf([
    'hair',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    'none',
  ]),
  PropTypes.string,
]);

const chartType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    property: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            color: colorType,
          }),
        ]),
      ),
      PropTypes.shape({
        color: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            transform: PropTypes.func,
          }),
        ]),
        thickness: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            transform: PropTypes.func,
          }),
        ]),
        x: PropTypes.string,
        y: PropTypes.string,
      }),
    ]),
    color: colorType,
    dash: PropTypes.bool,
    opacity: PropTypes.oneOfType([
      PropTypes.oneOf(['weak', 'medium', 'strong']),
      PropTypes.number,
      PropTypes.bool,
    ]),
    point: pointPropType,
    round: PropTypes.bool,
    thickness: thicknessType,
    type: PropTypes.oneOf([
      'bar',
      'bars',
      'line',
      'area',
      'areas',
      'lines',
      'point',
    ]),
  }),
]);

const seriesType = PropTypes.oneOfType([
  PropTypes.string, // property
  PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string]),
    prefix: PropTypes.string,
    property: PropTypes.string,
    render: PropTypes.func,
    suffix: PropTypes.string,
  }),
]);

const granularityType = PropTypes.oneOf(['coarse', 'medium', 'fine']);

let PropType = {};
if (process.env.NODE_ENV !== 'production') {
  PropType = {
    ...genericProps,
    axis: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
        y: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
          PropTypes.shape({
            property: PropTypes.string,
            granularity: granularityType,
          }),
        ]),
      }),
    ]),
    bounds: PropTypes.oneOfType([
      PropTypes.oneOf(['align']),
      PropTypes.shape({
        y: PropTypes.arrayOf(PropTypes.number),
      }),
    ]),
    chart: PropTypes.oneOfType([chartType, PropTypes.arrayOf(chartType)]),
    data: PropTypes.arrayOf(PropTypes.shape({})),
    detail: PropTypes.bool,
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
    guide: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        x: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            granularity: granularityType,
          }),
        ]),
        y: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.shape({
            granularity: granularityType,
          }),
        ]),
      }),
    ]),
    legend: PropTypes.bool,
    offset: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({ gap: thicknessType }),
    ]),
    pad: padPropType,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    series: PropTypes.oneOfType([seriesType, PropTypes.arrayOf(seriesType)]),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(['fill']),
      PropTypes.shape({
        height: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
          ]),
          PropTypes.string,
        ]),
        width: PropTypes.oneOfType([
          PropTypes.oneOf([
            'xxsmall',
            'xsmall',
            'small',
            'medium',
            'large',
            'xlarge',
            'fill',
            'auto',
          ]),
          PropTypes.string,
        ]),
      }),
    ]),
  };
}
export const DataChartPropTypes = PropType;
