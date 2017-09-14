import * as React from 'react';
import Grommet from '../index';

export interface KeyboardProps extends Grommet.Props {
  onBackspace: Function;
  onComma: Function;
  onDown: Function;
  onEnter: Function;
  onEsc: Function;
  onLeft: Function;
  onRight: Function;
  onShift: Function;
  onSpace: Function;
  onTab: Function;
  onUp: Function;
}

export class Keyboard extends React.Component<KeyboardProps, undefined> { }

export default Keyboard;
