import * as React from 'react';
import { A11yTitleType, GapType, GridAreaType, MarginType } from '../../utils';
import { ChartProps } from '../Chart';
import { GridProps } from '../Grid';

type ChartType =
  | string
  | {
      color?: ChartProps['color'];
      dash?: ChartProps['dash']; // defaults to undefined
      opacity?: ChartProps['opacity'];
      point?: ChartProps['point']; // default across points
      // property to get values from objects in data
      property:
        | string
        | string[]
        | { property?: string; color: string }[]
        | {
            color?:
              | string
              | {
                  property: string;
                  transform: (...args: any[]) => React.ReactNode;
                };
            thickness?:
              | string
              | {
                  property: string;
                  transform: (...args: any[]) => React.ReactNode;
                };
            x?: string;
            y?: string;
          };
      round?: ChartProps['round']; // defaults to undefined
      thickness?: ChartProps['thickness']; // defaults to auto assigned based on available space and amount of data
      type?: ChartProps['type'] | 'bars'; // defaults to 'bar',
    };

type SeriesType =
  | string
  | {
      label?: string | React.ReactNode; // used for legend and/or hover/touch detail
      prefix?: string; // used for values in axes and hover/touch detail
      property: string; // property key to get values from objects in data
      render?: (value: any, datum: {}, property: string) => React.ReactNode; // used for hover/touch detail
      suffix?: string; // used for values in axes and hover/touch detail
    };

type GranularityType = 'coarse' | 'medium' | 'fine';

export interface DataChartProps {
  a11yTitle?: A11yTitleType;
  // axis - when true, {
  //   x: { property: 'date' <if any>, granularity: 'coarse' },
  //   y: { property: property[0].property, granularity: 'coarse' },
  // }
  axis?:
    | boolean
    | {
        x?:
          | boolean
          | string
          | { property?: string; granularity?: GranularityType };
        y?:
          | boolean
          | string
          | { property?: string; granularity?: GranularityType };
      };
  bounds?: 'align';
  // chart - if undefined, { type: 'bar', property: <first series property> }
  chart?: ChartType | ChartType[];
  // data - an array of objects containing data values
  data: {}[];
  // detail - whether to show details via hover/touch interaction
  detail?: boolean | ((datum: {}, index: number) => React.ReactNode);
  gap?: GridProps['gap']; // between axes and guides/visuals
  gridArea?: GridAreaType; // generic
  // guide - when true, {
  //   x: { granularity: 'coarse' },
  //   y: { granularity: 'coarse' },
  // }
  guide?:
    | boolean
    | {
        x?: boolean | { granularity?: GranularityType };
        y?: boolean | { granularity?: GranularityType };
      };
  // legend - when true, { side: 'bottom' }
  legend?: boolean | { side: 'left' | 'right' | 'bottom' };
  // pad - padding around the guides/visuals
  // defaults to what's needed based on axis and chart types
  pad?: GridProps['pad'];
  // series - the data item properties and any
  series: SeriesType | SeriesType[];
  margin?: MarginType; // generic
  size?: ChartProps['size']; // width and height, defaults to 'fill'
}

declare const DataChart: React.FC<DataChartProps>;

export { DataChart };
