import * as React from "react";
import Grommet from '../index';

export interface AnchorProps extends Grommet.Props {
  a11yTitle?: string;
  href?: string;
  icon?: React.ReactElement<any>;
  label?: React.ReactNode;
  primary?: boolean;
  reverse?: boolean;
}

export class Anchor extends React.Component<AnchorProps, undefined> { }

export default Anchor;
