import * as React from 'react';

export interface NameValuePairProps {
  children?: string | number | JSX.Element;
  name?: string | JSX.Element;
}

declare const NameValuePair: React.FC<NameValuePairProps>;
export type NameValuePairType = NameValuePairProps;

export { NameValuePair };
