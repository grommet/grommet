import {
  BackgroundType,
  BorderType,
  BreakpointBorderSize,
  BreakpointEdgeSize,
  BreakpointSize,
  ColorType,
  DeepReadonly,
  GapType,
  GraphColorsType,
  MarginType,
  OpacityType,
  RoundType,
  PadType,
} from '../utils';
import { TextProps } from '../components/Text';
import { ReactComponentElement } from 'react';

export declare const base: DeepReadonly<ThemeType>;
export declare const generate: (
  baseSpacing?: number,
  scale?: number,
) => DeepReadonly<ThemeType>;

type ExtendType = string | ((...args: any) => void);

declare const colors: {
  active?: ColorType;
  black?: ColorType;
  border?: ColorType;
  brand?: ColorType;
  control?: ColorType;
  focus?: ColorType;
  placeholder?: ColorType;
  selected?: ColorType;
  text?: ColorType;
  icon?: ColorType;
  white?: ColorType;
};

type Colors = typeof colors & {
  'accent-1'?: ColorType;
  'accent-2'?: ColorType;
  'accent-3'?: ColorType;
  'accent-4'?: ColorType;
  'background-back'?: ColorType;
  'background-contrast'?: ColorType;
  'background-front'?: ColorType;
  'neutral-1'?: ColorType;
  'neutral-2'?: ColorType;
  'neutral-3'?: ColorType;
  'neutral-4'?: ColorType;
  'dark-1'?: ColorType;
  'dark-2'?: ColorType;
  'dark-3'?: ColorType;
  'dark-4'?: ColorType;
  'dark-5'?: ColorType;
  'dark-6'?: ColorType;
  'light-1'?: ColorType;
  'light-2'?: ColorType;
  'light-3'?: ColorType;
  'light-4'?: ColorType;
  'light-5'?: ColorType;
  'light-6'?: ColorType;
  'status-critical'?: ColorType;
  'status-error'?: ColorType;
  'status-warning'?: ColorType;
  'status-ok'?: ColorType;
  'status-unknown'?: ColorType;
  'status-disabled'?: ColorType;
  'graph-0'?: ColorType;
  'graph-1'?: ColorType;
  'graph-2'?: ColorType;
  'graph-3'?: ColorType;
  'graph-4'?: ColorType;
  'graph-5'?: ColorType;
  [x: string]: ColorType;
};

export interface ThemeType {
  global?: {
    active?: {
      background?: {
        color?: ColorType;
        opacity?: OpacityType;
      };
      color?: ColorType;
    };
    animation?: {
      duration?: string;
      jiggle?: {
        duration?: string;
      };
    };
    borderSize?: {
      xsmall?: string;
      small?: string;
      medium?: string;
      large?: string;
      xlarge?: string;
    };
    breakpoints?: {
      small?: {
        value?: number;
        borderSize?: BreakpointBorderSize;
        edgeSize?: BreakpointEdgeSize;
        size?: BreakpointSize;
      };
      medium?: {
        value?: number;
        borderSize?: BreakpointBorderSize;
        edgeSize?: BreakpointEdgeSize;
        size?: BreakpointSize;
      };
      large?: {
        value?: number;
        borderSize?: BreakpointBorderSize;
        edgeSize?: BreakpointEdgeSize;
        size?: BreakpointSize;
      };
      [x: string]: {
        value?: number;
        borderSize?: BreakpointBorderSize;
        edgeSize?: BreakpointEdgeSize;
        size?: BreakpointSize;
      } | undefined;
    };
    deviceBreakpoints?: {
      phone?: string;
      tablet?: string;
      computer?: string;
    };
    colors?: Colors;
    control?: {
      border?: {
        width?: string;
        radius?: string;
        color?: ColorType;
      };
      disabled?: {
        opacity: OpacityType;
      };
    };
    debounceDelay?: number;
    drop?: {
      background?: BackgroundType;
      border?: {
        width?: string;
        radius?: string;
      };
      shadowSize?: string;
      zIndex?: string;
    };
    edgeSize?: {
      none?: string;
      hair?: string;
      xxsmall?: string;
      xsmall?: string;
      small?: string;
      medium?: string;
      large?: string;
      xlarge?: string;
      responsiveBreakpoint?: string;
    };
    elevation?: {
      light?: {
        none?: string;
        xsmall?: string;
        small?: string;
        medium?: string;
        large?: string;
        xlarge?: string;
      };
      dark?: {
        none?: string;
        xsmall?: string;
        small?: string;
        medium?: string;
        large?: string;
        xlarge?: string;
      };
    };
    focus?: {
      border?: {
        color?: ColorType;
      };
    };
    font?: {
      face?: string;
      family?: string;
      height?: string;
      maxWidth?: string;
      size?: string;
    };
    graph?: {
      colors?: GraphColorsType;
    };
    hover?: {
      background?: BackgroundType;
      color?: ColorType;
    };
    input?: {
      padding?: string;
      weight?: number;
    };
    opacity?: {
      strong?: number;
      medium?: number;
      weak?: number;
    };
    selected?: {
      background?: BackgroundType;
      color?: ColorType;
    };
    spacing?: string;
    size?: {
      xxsmall?: string;
      xsmall?: string;
      small?: string;
      medium?: string;
      large?: string;
      xlarge?: string;
      xxlarge?: string;
      full?: string;
      [x: string]: string | undefined;
    };
  };
  accordion?: {
    border?: {
      side?: string;
      color?: ColorType;
    };
    heading?: {
      level?: string;
    };
    icons?: {
      collapse?: any;
      expand?: any;
      color?: ColorType;
    };
  };
  anchor?: {
    color?: ColorType;
    extend?: ExtendType;
    fontWeight?: number;
    hover?: {
      extend?: ExtendType;
      textDecoration?: string;
    };
    textDecoration?: string;
  };
  avatar?: {
    size?: {
      xsmall?: string;
      small?: string;
      medium?: string;
      large?: string;
      xlarge?: string;
      [x: string]: string | undefined;
    },
    text?: {
      fontWeight?: number;
      extend?: ExtendType;
    }
    extend?: ExtendType;
  },
  box?: {
    extend?: ExtendType;
    responsiveBreakpoint?: string;
  };
  button?: {
    border?: {
      color?: ColorType;
      width?: string;
      radius?: string;
    };
    disabled?: {
      opacity?: OpacityType;
    };
    extend?: ExtendType;
    minWidth?: string;
    maxWidth?: string;
    padding?: {
      vertical?: string;
      horizontal?: string;
    };
    primary?: {
      color?: ColorType;
    };
    size?: {
      small?: {
        border?: {
          radius?: string;
        };
        pad?: {
          vertical?: string;
          horizontal?: string;
        };
      };
      medium?: {
        border?: {
          radius?: string;
        };
        pad?: {
          vertical?: string;
          horizontal?: string;
        };
      };
      large?: {
        border?: {
          radius?: string;
        };
        pad?: {
          vertical?: string;
          horizontal?: string;
        };
      };
    };
    transition?: {
      timing?: string;
      duration?: number;
      properties?: string[];
    };
  };
  calendar?: {
    small?: {
      fontSize?: string;
      lineHeight?: number;
      daySize?: string;
      slideDuration?: string;
    };
    medium?: {
      fontSize?: string;
      lineHeight?: number;
      daySize?: string;
      slideDuration?: string;
    };
    large?: {
      fontSize?: string;
      lineHeight?: number;
      daySize?: string;
      slideDuration?: string;
    };
    heading?: {
      level?: string;
    };
    icons?: {
      previous?: any;
      next?: any;
      small?: {
        previous?: any;
        next?: any;
      };
    };
  };
  carousel?: {
    animation?: {
      duration?: number;
    };
    disabled?: {
      icons?: {
        color?: ColorType;
      };
    };
    icons?: {
      color?: ColorType;
      current?: any;
      next?: any;
      previous?: any;
    };
  };
  chart?: {
    color?: ColorType;
    extend?: ExtendType;
  };
  checkBox?: {
    border?: {
      color?: ColorType;
      width?: string;
    };
    check?: {
      extend?: ExtendType;
      radius?: string;
      thickness?: string;
    };
    color?: ColorType;
    extend?: ExtendType;
    gap?: GapType;
    hover?: {
      border?: {
        color?: ColorType;
      };
    };
    icon?: {
      size?: string;
      extend?: ExtendType;
    };
    icons?: {
      checked?: any;
      indeterminate?: any;
    };
    size?: string;
    toggle?: {
      background?: BackgroundType;
      color?: ColorType;
      extend?: ExtendType;
      radius?: string;
      size?: string;
      knob?: {
        extend?: ExtendType;
      };
    };
  };
  clock?: {
    analog?: {
      extend?: ExtendType;
      hour?: {
        color?: ColorType;
        width?: string;
        size?: string;
        shape?: string;
      };
      minute?: {
        color?: ColorType;
        width?: string;
        size?: string;
        shape?: string;
      };
      second?: {
        color?: ColorType;
        width?: string;
        size?: string;
        shape?: string;
      };
      size?: {
        small?: string;
        medium?: string;
        large?: string;
        xlarge?: string;
        huge?: string;
      };
    };
    digital?: {
      text?: {
        xsmall?: {
          size?: string;
          height?: number;
        };
        small?: {
          size?: string;
          height?: number;
        };
        medium?: {
          size?: string;
          height?: number;
        };
        large?: {
          size?: string;
          height?: number;
        };
        xlarge?: {
          size?: string;
          height?: number;
        };
        xxlarge?: {
          size?: string;
          height?: number;
        };
      };
    };
  };
  collapsible?: {
    minSpeed?: number;
    baseline?: number;
  };
  dataTable?: {
    header?: {};
    groupHeader?: {
      border?: {
        side?: string;
        size?: string;
      };
      fill?: string;
      pad?: PadType;
      background?: BackgroundType;
    };
    groupEnd?: {
      border?: {
        side?: string;
        size?: string;
      };
    };
    icons?: {
      ascending?: any;
      contract?: any;
      descending?: any;
      expand?: any;
    };
    resize?: {
      border?: {
        side?: string;
        color?: ColorType;
      };
    };
    primary?: {
      weight?: string;
    };
  };
  diagram?: {
    extend?: ExtendType;
    line?: {
      color?: ColorType;
    };
  };
  drop?: {
    extend?: ExtendType;
    maxHeight?: string;
  };
  formField?: {
    border?: BorderType;
    content?: {
      pad?: PadType;
    };
    disabled?: {
      background?: BackgroundType;
    };
    error?: {
      background?: BackgroundType;
      color?: ColorType;
      margin?: MarginType;
    };
    help?: {
      color?: ColorType;
      margin?: MarginType;
    };
    label?: TextProps;
    margin?: MarginType;
    round?: RoundType;
  };
  grommet?: {
    extend?: ExtendType;
  };
  heading?: {
    extend?: ExtendType;
    font?: {};
    level?: {
      1?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
      2?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
      3?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
      4?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
      5?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
      6?: {
        font?: {};
        small?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        medium?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        large?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
        xlarge?: {
          size?: string;
          height?: string;
          maxWidth?: string;
        };
      };
    };
    responsiveBreakpoint?: string;
    weight?: number;
  };
  icon?: {
    extend?: ExtendType;
    size?: {
      small?: string;
      medium?: string;
      large?: string;
      xlarge?: string;
      [x: string]: string | undefined;
    };
  };
  layer?: {
    background?: BackgroundType;
    border?: {
      radius?: string;
    };
    container?: {
      zIndex?: string;
    };
    extend?: ExtendType;
    overlay?: {
      background?: BackgroundType;
    };
    responsiveBreakpoint?: string;
    zIndex?: string;
  };
  list?: {
    item?: {
      background?: BackgroundType;
      border?:
        | string
        | {
            side?: string;
            color?: ColorType;
            size?: string;
          };
      pad?: PadType;
      extend?: ExtendType;
    };
    extend?: ExtendType;
  };
  maskedInput?: {
    extend?: ExtendType;
  };
  menu?: {
    background?: BackgroundType;
    extend?: ExtendType;
    icons?: {
      down?: any;
    };
  };
  meter?: {
    color?: ColorType;
    colors?: GraphColorsType;
    extend?: ExtendType;
  };
  paragraph?: {
    extend?: ExtendType;
    small?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    medium?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    large?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    xlarge?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    xxlarge?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
  };
  radioButton?: {
    border?: {
      color?: ColorType;
      width?: string;
    };
    check?: {
      radius?: string;
    };
    hover?: {
      border?: {
        color?: ColorType;
      };
    };
    icon?: {
      extend?: ExtendType;
      size?: string;
    };
    icons?: {
      circle?: string;
    };
    gap?: string;
    size?: string;
  };
  rangeInput?: {
    track?: {
      height?: string;
      color?: any;
    };
    thumb?: {
      color?: ColorType;
    };
  };
  rangeSelector?: {
    background?: {
      invert?: {
        color?: ColorType;
      };
    };
    edge?: {
      type?: string;
    };
  };
  select?: {
    background?: BackgroundType;
    container?: {
      extend?: ExtendType;
    };
    control?: {
      extend?: ExtendType;
      open?: boolean;
    };
    extend?: ExtendType;
    icons?: {
      down?: any;
      margin?: MarginType;
    };
    options?: {
      container?: {
        align?: string;
        pad?: string;
      };
      text?: {
        margin?: MarginType;
      };
    };
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37506
    searchInput?: ReactComponentElement<any>;
    step?: number;
  };
  tab?: {
    active?: {
      background?: BackgroundType;
      color?: ColorType;
    };
    background?: BackgroundType;
    border?: {
      side?: string;
      size?: string;
      color?: ColorType;
      active?: {
        color?: ColorType;
      };
      hover?: {
        color?: ColorType;
        extend?: ExtendType;
      };
    };
    color?: ColorType;
    extend?: ExtendType;
    hover?: {
      background?: BackgroundType;
      color?: ColorType;
      extend?: ExtendType;
    };
    margin?: MarginType;
    pad?: PadType;
  };
  tabs?: {
    background?: BackgroundType;
    extend?: ExtendType;
    gap?: GapType;
    header?: {
      background?: BackgroundType;
      extend?: ExtendType;
    };
    panel?: {
      extend?: ExtendType;
    };
  };
  table?: {
    header?: {
      background?: BackgroundType;
      extend?: ExtendType;
      align?: string;
      pad?: PadType;
      border?: string;
      verticalAlign?: string;
      fill?: string;
    };
    body?: {
      align?: string;
      background?: BackgroundType;
      border?: string;
      extend?: ExtendType;
      pad?: PadType;
    };
    footer?: {
      align?: string;
      background?: BackgroundType;
      extend?: ExtendType;
      pad?: PadType;
      border?: string;
      verticalAlign?: string;
      fill?: string;
    };
    row?: {
      hover?: {
        background?: BackgroundType;
        extend?: ExtendType;
      };
    };
  };
  text?: {
    xsmall?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    small?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    medium?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    large?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    xlarge?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
    xxlarge?: {
      size?: string;
      height?: string;
      maxWidth?: string;
    };
  };
  textArea?: {
    extend?: ExtendType;
    disabled?: OpacityType;
  };
  textInput?: {
    extend?: ExtendType;
    disabled?: OpacityType;
  };
  video?: {
    captions?: {
      background?: BackgroundType;
    };
    controls?: {
      background?: BackgroundType;
    };
    icons?: {
      closedCaption?: any;
      color?: ColorType;
      configure?: any;
      fullScreen?: any;
      pause?: any;
      play?: any;
      reduceVolume?: any;
      volume?: any;
    };
    scrubber?: {
      color?: ColorType;
    };
  };
  worldMap?: {
    color?: ColorType;
    continent?: {
      active?: string;
      base?: string;
    };
    hover?: {
      color?: ColorType;
    };
    place?: {
      active?: string;
      base?: string;
    };
  };
}
