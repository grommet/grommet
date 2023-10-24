var _excluded = ["search"];
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext } from 'react';
import { Box, DataFilters, DataFilter, DataSearch, DataSummary, DataTable, DataTableGroupBy, Grid, Heading, Notification, ResponsiveContext, Toolbar } from 'grommet';
import { Data } from '../Data';
var sizes = ['small', 'medium', 'large'];
var DATA = [];
for (var i = 0; i < 11; i += 1) {
  DATA.push({
    id: "x-" + i,
    sub: {
      name: "Name " + (i + 1)
    },
    size: sizes[i % sizes.length],
    date: "2022-12-" + (i % 30 + 1)
  });
}
var columns = [{
  property: 'id',
  header: 'ID'
}, {
  property: 'sub.name',
  header: 'Name'
}, {
  property: 'size',
  header: 'Size'
}, {
  property: 'date',
  header: 'Date'
}];
var Filters = function Filters(_ref) {
  var search = _ref.search,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/React.createElement(DataFilters, rest, search && /*#__PURE__*/React.createElement(DataSearch, {
    property: "sub.name"
  }), /*#__PURE__*/React.createElement(DataFilter, {
    property: "size"
  }), /*#__PURE__*/React.createElement(DataTableGroupBy, {
    options: ['size']
  }));
};
export var Inline = function Inline() {
  var size = useContext(ResponsiveContext);
  var toolbar;
  var sidebar;
  if (size === 'small' || size === 'xsmall') {
    toolbar = /*#__PURE__*/React.createElement(Toolbar, {
      key: "tool"
    }, /*#__PURE__*/React.createElement(DataSearch, {
      property: "sub.name"
    }), /*#__PURE__*/React.createElement(Filters, {
      drop: true
    }));
  } else {
    sidebar = /*#__PURE__*/React.createElement(Filters, {
      search: true
    });
  }
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Data, {
      properties: {
        'sub.name': {
          label: 'Name'
        },
        size: {
          label: 'Size'
        },
        date: {
          label: 'Date'
        }
      },
      data: DATA,
      updateOn: sidebar ? 'change' : undefined
    }, /*#__PURE__*/React.createElement(Box, {
      pad: {
        top: 'medium'
      },
      align: "center"
    }, /*#__PURE__*/React.createElement(Notification, {
      status: "info",
      message: "Data is in 'beta'. The API surface is subject to change."
    })), /*#__PURE__*/React.createElement(Grid, {
      columns: sidebar ? ['auto', ['small', 'large']] : 'auto',
      gap: "large",
      pad: "large",
      justifyContent: "center"
    }, sidebar, /*#__PURE__*/React.createElement(Box, {
      flex: false
    }, /*#__PURE__*/React.createElement(Heading, {
      size: "small",
      margin: "none"
    }, "People"), toolbar, /*#__PURE__*/React.createElement(DataSummary, null), /*#__PURE__*/React.createElement(Box, {
      flex: false
    }, /*#__PURE__*/React.createElement(DataTable, {
      columns: columns
    })))))
    // </Grommet>
  );
};

Inline.args = {
  full: true
};
export default {
  title: 'Data/Data/Inline'
};