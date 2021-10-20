import * as React from 'react';
import { a11yTitlePropType } from '../../utils/general-prop-types';

export interface NameValuePairProps {
  a11yTitle?: a11yTitlePropType;
  children?: string | number | JSX.Element;
  name?: string | JSX.Element;
}

declare const NameValuePair: React.FC<NameValuePairProps>;
export type NameValuePairType = NameValuePairProps;

export { NameValuePair };
