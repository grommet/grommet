import * as React from 'react';
import Grommet from '../index';

export declare namespace TextInputTypes {
  type Size = 'small' | 'medium' | 'large' | 'xlarge';
  interface SuggestionsObject {
    label: React.ReactNode, 
    value: any
  }
}

export interface TextInputProps extends Grommet.Props {
  defaultValue?: string;
  id?: string;
  name?: string;
  onInput?: Function;
  onSelect?: Function;
  placeholder?: string;
  plain?: boolean;
  size?: TextInputTypes.Size;
  suggestions?: TextInputTypes.SuggestionsObject[] | string[];
  value?: string;
}

export class TextInput extends React.Component<TextInputProps, undefined> { }

export default TextInput;
