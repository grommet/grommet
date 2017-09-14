import * as React from 'react';
import Grommet from '../index';

export declare namespace ImageTypes {
  type Fit = 'cover' | 'contain';
}

export interface ImageProps extends Grommet.Props {
  fit?: ImageTypes.Fit;
}

export class Image extends React.Component<ImageProps, undefined> { }

export default Image;
