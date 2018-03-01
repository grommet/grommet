import * as React from 'react';
import Grommet from '../index';

export declare namespace GrommetTypes {
  type Direction = 'rtl' | 'ltr';
}

export interface GrommetProps extends Grommet.Props {
  dir: GrommetTypes.Direction;
  theme: {};
}

export class Grommet extends React.Component<GrommetProps, undefined> { }

export default Grommet;
