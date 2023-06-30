import * as React from 'react';
import { TextInputProps } from '../TextInput/index';

export interface DataSearchProps {
  drop?: boolean;
  responsive?: boolean;
}

export interface DataSearchExtendedProps
  extends TextInputProps,
    DataSearchProps {}

declare const DataSearch: React.FC<DataSearchExtendedProps>;

export { DataSearch };
