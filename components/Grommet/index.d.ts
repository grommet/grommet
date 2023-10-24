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
    box?: {
      cssGap?: boolean;
    };
    layer?: {
      singleId?: boolean;
    };
    drop?: {
      checkContainingBlock?: boolean;
    };
  };
  messages?: {
    messages?: {
      button?: {
        busy?: string;
        success?: string;
      };
      calendar?: {
        previousMove?: string;
        previous?: string;
        nextMove?: string;
        next?: string;
      };
      carousel?: {
        previous?: string;
        next?: string;
        jump?: string;
      };
      dateInput?: {
        openCalendar?: string;
        enterCalendar?: string;
        exitCalendar?: string;
      };
      dataFilters?: {
        clear?: string;
        heading?: string;
        open?: string;
        openSet?: {
          singular?: string;
          plural?: string;
        };
      };
      dataForm?: {
        reset?: string;
        submit?: string;
      };
      dataSearch?: {
        label?: string;
        open?: string;
      };
      dataSort?: {
        ascending?: string;
        by?: string;
        descending?: string;
        direction?: string;
        open?: string;
      };
      dataSummary?: {
        filtered?: string;
        filteredSingle?: string;
        total?: string;
      };
      dataTableColumns?: {
        open?: string;
        order?: string;
        select?: string;
        tip?: string;
      };
      dataTableGroupBy?: {
        clear?: string;
        label?: string;
      };
      dataView?: {
        label?: string;
      };
      fileInput?: {
        browse?: string;
        dropPrompt?: string;
        dropPromptMultiple?: string;
        files?: string;
        maxFile?: string;
        maxSizeSingle?: string;
        maxSizeMultiple?: {
          singular?: string;
          plural?: string;
        };
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
        selected?: string;
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
        audioDescriptions?: string;
        captions?: string;
        closeMenu?: string;
        description?: string;
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
  onAnalytics?: (data: any) => void;
  plain?: boolean;
  theme?: ThemeType;
  themeMode?: 'dark' | 'light' | 'auto';
  userAgent?: string;
}

export interface GrommetExtendedProps
  extends GrommetProps,
    Omit<JSX.IntrinsicElements['div'], 'dir'> {}

declare const Grommet: React.FC<GrommetExtendedProps>;

export { Grommet };
