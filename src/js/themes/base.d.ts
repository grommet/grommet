import { DeepReadonly, ColorType, OpacityType, BackgroundType } from '../utils'

export declare const base: DeepReadonly<ThemeType>;
export declare const generate: (baseSpacing: number, scale: number) => DeepReadonly<ThemeType>;

declare const colors: {
  active: ColorType;
  black: ColorType;
  border: ColorType;
  brand: ColorType;
  control: ColorType;
  focus: ColorType;
  placeholder: ColorType;
  selected: ColorType;
  text: ColorType;
  icon: ColorType;
  white: ColorType;
};
  
type Colors = typeof colors & {
  'accent-1': ColorType;
  'accent-2': ColorType;
  'accent-3': ColorType;
  'accent-4': ColorType;
  'neutral-1': ColorType;
  'neutral-2': ColorType;
  'neutral-3': ColorType;
  'neutral-4': ColorType;
  'dark-1': ColorType;
  'dark-2': ColorType;
  'dark-3': ColorType;
  'dark-4': string;
  'dark-5': ColorType;
  'dark-6': ColorType;
  'light-1': ColorType;
  'light-2': ColorType;
  'light-3': ColorType;
  'light-4': ColorType;
  'light-5': ColorType;
  'light-6': ColorType;
  'status-critical': ColorType;
  'status-error': ColorType;
  'status-warning': ColorType;
  'status-ok': ColorType;
  'status-unknown': ColorType;
  'status-disabled': ColorType;
};

export interface ThemeType {
  global: {
    animation: {
      duration: string;
      jiggle: {
        duration: string;
      };
    };
    borderSize: {
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    breakpoints: {
      small: {
        value: number;
        borderSize: {
          xsmall: string;
          small: string;
          medium: string;
          large: string;
          xlarge: string;
        };
        edgeSize: {
          none: string;
          hair: string;
          xxsmall: string;
          xsmall: string;
          small: string;
          medium: string;
          large: string;
          xlarge: string;
        };
        size: {
          xxsmall: string;
          xsmall: string;
          small: string;
          medium: string;
          large: string;
          xlarge: string;
          full: string;
        };
      };
      medium: {
        value: number;
      };
      large: {};
    };
    deviceBreakpoints: {
      phone: string;
      tablet: string;
      computer: string;
    };
    colors: Colors;
    control: {
      border: {
        width: string;
        radius: string;
        color: ColorType;
      };
    };
    debounceDelay: number;
    drop: {
      background: BackgroundType;
      border: {
        width: string;
        radius: string;
      };
      shadowSize: string;
      zIndex: string;
    };
    edgeSize: {
      none: string;
      hair: string;
      xxsmall: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      responsiveBreakpoint: string;
    };
    elevation: {
      light: {
        none: string;
        xsmall: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
      };
      dark: {
        none: string;
        xsmall: string;
        small: string;
        medium: string;
        large: string;
        xlarge: string;
      };
    };
    focus: {
      border: {
        color: ColorType;
      };
    };
    font: {
      size: string;
      height: string;
      maxWidth: string;
    };
    hover: {
      background: BackgroundType;
      color: ColorType;
    };
    input: {
      padding: string;
      weight: number;
    };
    opacity: {
      strong: number;
      medium: number;
      weak: number;
    };
    selected: {
      background: BackgroundType;
      color: ColorType;
    };
    spacing: string;
    size: {
      xxsmall: string;
      xsmall: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      full: string;
    };
  };
  accordion: {
    icons: {
      collapse: any;
      expand: any;
    };
  };
  anchor: {
    textDecoration: string;
    fontWeight: number;
    color: ColorType;
    hover: {
      textDecoration: string;
    };
  };
  box: {
    responsiveBreakpoint: string;
  };
  button: {
    border: {
      width: string;
      radius: string;
    };
    primary: ColorType;
    disabled: {
      opacity: OpacityType;
    };
    minWidth: string;
    maxWidth: string;
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
  calendar: {
    small: {
      fontSize: string;
      lineHeight: number;
      daySize: string;
      slideDuration: string;
    };
    medium: {
      fontSize: string;
      lineHeight: number;
      daySize: string;
      slideDuration: string;
    };
    large: {
      fontSize: string;
      lineHeight: number;
      daySize: string;
      slideDuration: string;
    };
    icons: {
      previous: any;
      next: any;
      small: {
        previous: any;
        next: any;
      };
    };
  };
  carousel: {
    icons: {
      current: any;
      next: any;
      previous: any;
    };
  };
  checkBox: {
    border: {
      color: ColorType;
      width: string;
    };
    check: {
      extend: string;
      radius: string;
      thickness: string;
    };
    extend: string;
    color: ColorType;
    icon: { size: string; extend: string };
    icons: {};
    hover: {
      border: {
        color: ColorType;
      };
    };
    size: string;
    toggle: {
      color: ColorType;
      background: BackgroundType;
      radius: string;
      size: string;
      knob: { extend: string };
    };
  };
  clock: {
    analog: {
      hour: {
        color: ColorType;
        width: string;
        size: string;
        shape: string;
      };
      minute: {
        color: ColorType;
        width: string;
        size: string;
        shape: string;
      };
      second: {
        color: ColorType;
        width: string;
        size: string;
        shape: string;
      };
      size: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        huge: string;
      };
    };
    digital: {
      text: {
        xsmall: {
          size: string;
          height: number;
        };
        small: {
          size: string;
          height: number;
        };
        medium: {
          size: string;
          height: number;
        };
        large: {
          size: string;
          height: number;
        };
        xlarge: {
          size: string;
          height: number;
        };
        xxlarge: {
          size: string;
          height: number;
        };
      };
    };
  };
  collapsible: {
    minSpeed: number;
    baseline: number;
  };
  dataTable: {
    header: {};
    groupHeader: {
      border: {
        side: string;
        size: string;
      };
      fill: string;
      pad: {
        horizontal: string;
        vertical: string;
      };
      background: BackgroundType;
    };
    icons: {
      ascending: any;
      contract: any;
      descending: any;
      expand: any;
    };
    resize: {
      border: {
        side: string;
        color: ColorType;
      };
    };
    primary: {
      weight: string;
    };
  };
  formField: {
    border: {
      color: ColorType;
      position: string;
      side: string;
      error: {
        color: ColorType;
      };
    };
    error: {
      color: ColorType;
    };
    help: {
      color: ColorType;
    };
    label: {};
  };
  grommet: {};
  heading: {
    font: {};
    level: {
      1: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
      2: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
      3: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
      4: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
      5: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
      6: {
        font: {};
        small: {
          size: string;
          height: string;
          maxWidth: string;
        };
        medium: {
          size: string;
          height: string;
          maxWidth: string;
        };
        large: {
          size: string;
          height: string;
          maxWidth: string;
        };
        xlarge: {
          size: string;
          height: string;
          maxWidth: string;
        };
      };
    };
    responsiveBreakpoint: string;
    weight: number;
  };
  icon: {
    size: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
  };
  layer: {
    background: BackgroundType;
    border: {
      radius: string;
    };
    container: {
      zIndex: string;
    };
    overlay: {
      background: BackgroundType;
    };
    responsiveBreakpoint: string;
    zIndex: string;
  };
  menu: {
    icons: {
      down: any;
    };
  };
  paragraph: {
    small: {
      size: string;
      height: string;
      maxWidth: string;
    };
    medium: {
      size: string;
      height: string;
      maxWidth: string;
    };
    large: {
      size: string;
      height: string;
      maxWidth: string;
    };
    xlarge: {
      size: string;
      height: string;
      maxWidth: string;
    };
    xxlarge: {
      size: string;
      height: string;
      maxWidth: string;
    };
  };
  radioButton: {
    border: {
      color: ColorType;
      width: string;
    };
    check: {
      radius: string;
    };
    hover: {
      border: {
        color: ColorType;
      };
    };
    icon: {};
    icons: {};
    gap: string;
    size: string;
  };
  rangeInput: {
    track: {
      height: string;
      color: any;
    };
    thumb: {};
  };
  select: {
    container: {};
    control: {};
    icons: {
      down: any;
    };
    step: number;
  };
  tab: {
    active: {
      color: ColorType;
    };
    border: {
      side: string;
      size: string;
      color: ColorType;
      active: {
        color: ColorType;
      };
      hover: {
        color: ColorType;
      };
    };
    color: ColorType;
    hover: {
      color: ColorType;
    };
    margin: {
      vertical: string;
      horizontal: string;
    };
    pad: {
      bottom: string;
    };
  };
  tabs: {
    header: {};
    panel: {};
  };
  table: {
    header: {
      align: string;
      pad: {
        horizontal: string;
        vertical: string;
      };
      border: string;
      verticalAlign: string;
      fill: string;
    };
    body: {
      align: string;
      pad: {
        horizontal: string;
        vertical: string;
      };
    };
    footer: {
      align: string;
      pad: {
        horizontal: string;
        vertical: string;
      };
      border: string;
      verticalAlign: string;
      fill: string;
    };
  };
  text: {
    xsmall: {
      size: string;
      height: string;
      maxWidth: string;
    };
    small: {
      size: string;
      height: string;
      maxWidth: string;
    };
    medium: {
      size: string;
      height: string;
      maxWidth: string;
    };
    large: {
      size: string;
      height: string;
      maxWidth: string;
    };
    xlarge: {
      size: string;
      height: string;
      maxWidth: string;
    };
    xxlarge: {
      size: string;
      height: string;
      maxWidth: string;
    };
  };
  video: {
    captions: {
      background: BackgroundType;
    };
    icons: {
      closedCaption: any;
      configure: any;
      fullScreen: any;
      pause: any;
      play: any;
      reduceVolume: any;
      volume: any;
    };
  };
  worldMap: {
    color: ColorType;
    continent: {
      active: string;
      base: string;
    };
    hover: {
      color: ColorType;
    };
    place: {
      active: string;
      base: string;
    };
  };
}
