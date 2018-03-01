import * as React from 'react';
import Grommet from '../index';

export declare namespace StackTypes {
  type Anchor = 'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right';
}

export interface StackProps extends Grommet.Props {
  anchor?: StackTypes.Anchor;
}

export class Stack extends React.Component<StackProps, undefined> { }

export default Stack;
