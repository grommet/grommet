import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface View {
  name?: string;
  page?: number; // when paging
  properties?:
    | string[]
    | {
        [property: string]:
          | undefined
          | boolean
          | (string | number | boolean)[]
          | { max: number; min: number };
      };
  search?: string;
  sort?: {
    property: string;
    direction: 'asc' | 'desc';
  };
  step?: number; // page size

  // Future column ordering, requires 'properties' property on Data
  // columns?: string[];
}

export interface DataProps {
  id?: string;

  data: object[];
  total?: number;
  // when paging
  filteredTotal?: number;

  defaultView?: View;
  view?: string | View;
  onView?: (view: View) => void;
  // when view changes should be delivered
  updateOn?: 'change' | 'submit';

  // whether to render a Toolbar
  toolbar?: boolean | 'search' | 'filters';

  properties?:
    | string[]
    | {
        [key: string]: {
          // for DataTable column header, DataFilter label, DataTableColumns label
          label?: string | React.ReactNode;
          // DataFilter options
          options?: (
            | string
            | number
            | {
                label: string;
                value: string | number | boolean;
              }
          )[];
          // DataFilter range
          range?: {
            max: number;
            min: number;
          };
          // for internal filtering only, should searching evaluate this property
          search?: boolean;
        };
      };

  messages?: {
    dataFilters?: {
      clear?: string;
      heading?: string;
      open?: string;
    };
    dataForm?: {
      reset?: string;
      submit?: string;
    };
    dataSearch?: {
      label?: string;
    };
    dataSort?: {
      ascending?: string;
      by?: string;
      descending?: string;
      direction?: string;
    };
    dataSummary?: {
      filteredTotal?: string;
      total?: string;
    };
  };

  views?: View[];

  // Future selection
  // select: string[];
  // onSelect: (select: string[]) => void;

  // Future manage named views
  // onCreateView?: (view: View) =>  void;
  // onDeleteView?: (string) => void;
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataExtendedProps extends BoxProps, DataProps, divProps {}

declare const Data: React.FC<DataExtendedProps>;

export { Data };
