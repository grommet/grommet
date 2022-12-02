import * as React from 'react';
import { BoxProps } from '../Box/index';

export interface View {
  properties?: {
    [property: string]:
      boolean | (string | number)[] | { max: number, min: number };
  };
  search?: string | {
    property?: string | string[];
    text: string;
  };
  sort?: {
    property: string;
    direction: 'asc' | 'desc';
  };

  // Future column ordering, requires 'properties' property on Data
  // columns?: string[];

  // Future name
  // name?: string;
}

export interface DataProps {
  data: object[];
  total?: number;

  view?: View;
  onView?: (view: View) => void;
  // when view changes should be delivered
  updateOn?: 'change' | 'submit';

  // whether to render a Toolbar
  toolbar: boolean | 'search' | 'filters';

  properties?: string[] | {
    [key: string]: {
      // for DataTable column header, DataFilter label, DataTableColumns label
      label?: string | React.ReactNode;
      // Future for DataFilter options
      // values?: (string | number)[];
    };
  };

  // Future selection
  // select: string[];
  // onSelect: (select: string[]) => void;

  // Future named views
  // views?: View[];
  // onCreateView?: (view: View) =>  void;
  // onDeleteView?: (string) => void;
}

type divProps = Omit<JSX.IntrinsicElements['div'], 'onClick'>;

export interface DataExtendedProps
  extends BoxProps,
  DataProps,
    divProps {}

declare const Data: React.FC<DataExtendedProps>;

export { Data };
