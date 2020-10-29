import React from 'react';
import { grommet, Box, Button, Grommet, Heading } from 'grommet';
var kindButtonTheme = {
  global: {
    colors: {
      brand: '#ee9933',
      'brand-contrast': '#ee993333',
      active: '#eecc33'
    },
    font: {
      family: 'Arial'
    }
  },
  button: {
    "default": {
      color: 'text',
      border: undefined,
      padding: {
        horizontal: '12px',
        vertical: '8px'
      }
    },
    primary: {
      background: {
        color: 'brand'
      },
      border: undefined,
      color: 'text-strong',
      font: {
        weight: 'bold'
      },
      padding: {
        horizontal: '12px',
        vertical: '8px'
      }
    },
    secondary: {
      border: {
        color: 'brand',
        width: '4px'
      },
      color: 'text',
      padding: {
        horizontal: '8px',
        vertical: '4px'
      }
    },
    active: {
      background: {
        color: 'brand-contrast'
      },
      color: 'text',
      secondary: {
        background: 'none',
        border: {
          color: 'brand-contrast'
        }
      }
    },
    disabled: {
      opacity: 0.3,
      secondary: {
        border: {
          color: 'text-weak'
        }
      }
    },
    hover: {
      background: {
        color: 'active'
      },
      secondary: {
        border: {
          color: 'active'
        }
      }
    }
  }
};
var customTheme = {
  global: {
    font: {
      family: 'Arial'
    }
  },
  button: {
    border: {
      radius: undefined,
      color: '#2196f3'
    },
    disabled: {
      color: 'orange',
      border: {
        color: 'orange'
      },
      extend: "border: 10px dashed red;"
    },
    padding: {
      vertical: '12px',
      horizontal: '24px'
    },
    primary: {
      color: '#2196f3',
      active: {
        border: {
          color: 'red'
        },
        extend: "background: cadetblue;"
      },
      extend: "background: skyblue; border: 5px dotted green;"
    },
    extend: function extend(props) {
      var extraStyles = '';

      if (props.primary) {
        extraStyles = "\n            text-transform: uppercase;\n          ";
      }

      return "\n          font-size: 12px;\n          font-weight: bold;\n          " + extraStyles + "\n        ";
    }
  }
};
var coloredButton = {
  button: {
    border: {
      color: 'accent-1'
    },
    color: {
      dark: 'accent-1',
      light: 'dark-2'
    },
    primary: {
      color: 'neutral-2'
    }
  }
};
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Grommet, {
    theme: kindButtonTheme
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "small"
  }, "new custom theme"), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "default",
    onClick: function onClick() {}
  }), /*#__PURE__*/React.createElement(Button, {
    label: "active default",
    onClick: function onClick() {},
    active: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "disabled default",
    onClick: function onClick() {},
    disabled: true
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "primary",
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "active primary",
    onClick: function onClick() {},
    primary: true,
    active: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "disabled primary",
    onClick: function onClick() {},
    primary: true,
    disabled: true
  })), /*#__PURE__*/React.createElement(Box, {
    align: "center",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "secondary",
    onClick: function onClick() {},
    secondary: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "active secondary",
    onClick: function onClick() {},
    secondary: true,
    active: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "disabled secondary",
    onClick: function onClick() {},
    secondary: true,
    disabled: true
  })))), /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    pad: "large",
    direction: "row",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    label: "custom theme",
    onClick: function onClick() {},
    primary: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "custom active primary",
    onClick: function onClick() {},
    primary: true,
    active: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "primary disabled",
    onClick: function onClick() {},
    primary: true,
    disabled: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Disabled",
    onClick: function onClick() {},
    disabled: true
  }), /*#__PURE__*/React.createElement(Button, {
    label: "Plain Disabled",
    onClick: function onClick() {},
    plain: true,
    disabled: true
  }))), /*#__PURE__*/React.createElement(Grommet, {
    theme: coloredButton
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    as: "span",
    label: "theme on dark background",
    primary: true
  }))), /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    as: "span",
    label: "Custom as=span"
  }))));
};