import React from 'react';
import { grommet, Box, Meter, Grommet, Heading, List, ResponsiveContext, Text, Tip } from 'grommet';
import { deepMerge } from 'grommet/utils';
var tooltipColor = 'white';
var theme = deepMerge(grommet, {
  list: {
    item: {
      pad: {
        horizontal: 'small',
        vertical: 'xsmall'
      },
      background: tooltipColor,
      border: false
    }
  }
});
var listData = [{
  entry: '6.7 TB (15.6%)',
  action: 'Used'
}, {
  entry: '7.2 TB (16.8%)',
  action: 'Subscribed'
}, {
  entry: '29 TB (67.6 %)',
  action: 'Free'
}];

var TipContent = function TipContent(_ref) {
  var size = _ref.size;
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    align: "center",
    pad: size
  }, size === 'large' && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 30 30",
    version: "1.1",
    width: "22px",
    height: "22px"
  }, /*#__PURE__*/React.createElement("polygon", {
    fill: tooltipColor,
    points: "6 0 32 12 6 29",
    transform: "matrix(-1 0 0 1 36 0)"
  })), /*#__PURE__*/React.createElement(Box, {
    background: tooltipColor,
    round: "xsmall",
    pad: "small",
    gap: size !== 'small' ? 'medium' : 'small',
    fill: true
  }, /*#__PURE__*/React.createElement(Text, {
    weight: "bold",
    alignSelf: "center",
    size: size === 'small' ? 'xsmall' : 'small'
  }, "10/12/2020 2AM MDT"), /*#__PURE__*/React.createElement(Box, {
    direction: "row-responsive"
  }, size !== 'small' && /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    pad: {
      vertical: 'xsmall'
    },
    responsive: false
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "10px",
    background: "graph-0"
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "10px",
    background: "graph-1"
  }), /*#__PURE__*/React.createElement(Box, {
    pad: "10px",
    background: "graph-2"
  })), /*#__PURE__*/React.createElement(List, {
    data: listData,
    primaryKey: "action",
    secondaryKey: "entry"
  }, function (datum, index) {
    return /*#__PURE__*/React.createElement(Box, {
      gap: "medium",
      direction: "row",
      align: "center",
      justify: "between",
      key: index
    }, /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold",
      color: size !== 'small' ? undefined : "graph-" + index
    }, datum.action), /*#__PURE__*/React.createElement(Text, {
      size: "small",
      weight: "bold",
      color: size !== 'small' ? undefined : "graph-" + index
    }, datum.entry));
  }))));
};

export var ResponsiveTip = function ResponsiveTip() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: theme,
    full: true
  }, /*#__PURE__*/React.createElement(ResponsiveContext.Consumer, null, function (size) {
    return /*#__PURE__*/React.createElement(Box, {
      pad: "large",
      gap: "medium",
      background: "light-4",
      height: {
        min: '100%'
      }
    }, /*#__PURE__*/React.createElement(Heading, {
      size: "small",
      level: 3
    }, "Hover the Meter and play with the window size"), /*#__PURE__*/React.createElement(Text, null, "window size: ", size), /*#__PURE__*/React.createElement(Tip, {
      content: /*#__PURE__*/React.createElement(TipContent, {
        size: size
      }),
      dropProps: {
        align: {
          left: 'right'
        },
        overflow: 'visible'
      },
      plain: true
    }, /*#__PURE__*/React.createElement(Meter, {
      type: "circle",
      thickness: "large",
      size: "small",
      values: [{
        value: 67.6
      }, {
        value: 16.8
      }, {
        value: 15.6
      }]
    })));
  }));
};
ResponsiveTip.storyName = 'Responsive';
ResponsiveTip.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Tip/Responsive'
};