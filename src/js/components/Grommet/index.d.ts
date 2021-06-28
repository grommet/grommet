import * as React from 'react';
import { ThemeType } from '../../themes';
import { BackgroundType } from '../../utils';

export interface GrommetProps {
  background?: BackgroundType;
  containerTarget?: HTMLElement;
  cssVars?: boolean;
  dir?: 'rtl';
  full?: boolean | 'min';
  options?: {
    layer?: {
      singleId?: boolean;
    };
  };
  messages?: {
    messages?: {
      fileInput?: {
        browse?: string;
        dropPrompt?: string;
        dropPromptMultiple?: string;
        files?: string;
        remove?: string;
        removeAll?: string;
      };
      form?: {
        invalid?: string;
        required?: string;
      };
      menu?: {
        openMenu?: string;
        closeMenu?: string;
      };
      rangeSelector?: {
        lower?: string;
        upper?: string;
      };
      select?: {
        multiple?: string;
      };
      skipLinks?: {
        skipTo?: string;
      };
      tabs?: {
        tabContents?: string;
      };
      textInput?: {
        enterSelect?: string;
        suggestionsCount?: string;
        suggestionsExist?: string;
        suggestionIsOpen?: string;
      };
      video?: {
        closeMenu?: string;
        fullScreen?: string;
        progressMeter?: string;
        scrubber?: string;
        openMenu?: string;
        pauseButton?: string;
        playButton?: string;
        volumeDown?: string;
        volumeUp?: string;
      };
    };
    format: (...args: any[]) => void;
  };
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: 'dark' | 'light';
  userAgent?: string;
}

export interface GrommetExtendedProps
  extends GrommetProps,
    Omit<JSX.IntrinsicElements['div'], 'dir'> {}

declare const Grommet: React.FC<GrommetExtendedProps>;

export { Grommet };
