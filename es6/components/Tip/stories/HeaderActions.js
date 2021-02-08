import React, { useState } from 'react';
import { grommet, Anchor, Box, DataTable, Grommet, Heading, Paragraph, Text, Tip } from 'grommet';
import { Trash } from "grommet-icons/es6/icons/Trash";
import { Refresh } from "grommet-icons/es6/icons/Refresh";
import { Info } from "grommet-icons/es6/icons/Info"; // Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js

import { storageColumns, storageData } from '../../DataTable/stories/data';

var TipContent = function TipContent(_ref) {
  var message = _ref.message,
      icon = _ref.icon;
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "small"
  }, icon && /*#__PURE__*/React.createElement(Info, {
    color: "accent-4"
  }), /*#__PURE__*/React.createElement(Text, {
    color: "accent-1"
  }, message));
};

export var HeaderActions = function HeaderActions() {
  var _useState = useState(storageData),
      data = _useState[0],
      setData = _useState[1];

  var _useState2 = useState(),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var removeRow = function removeRow() {
    var filteredData = data.filter(function (item) {
      return item.id !== selected.id;
    });
    setData(filteredData);
    setSelected(undefined);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    background: "dark-1",
    gap: "large",
    height: {
      min: '100%'
    }
  }, /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "center"
  }, /*#__PURE__*/React.createElement("b", null, "Follow"), " the Tips of the Trash & Reload icons for directions. Those Tooltips ", /*#__PURE__*/React.createElement("b", null, "change"), " according to the actions the user perform on the table. The Table meters are also using the Tip component."), /*#__PURE__*/React.createElement(Box, {
    gap: "small"
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    direction: "row",
    justify: "between",
    align: "center"
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }, " Storage Pools with tooltips"), /*#__PURE__*/React.createElement(Box, {
    gap: "small",
    direction: "row"
  }, /*#__PURE__*/React.createElement(Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: /*#__PURE__*/React.createElement(TipContent, {
      message: !selected ? 'Select a table row to enable' : 'Delete table Row',
      icon: !selected
    })
  }, /*#__PURE__*/React.createElement(Anchor, {
    disabled: !selected,
    icon: /*#__PURE__*/React.createElement(Trash, null),
    onClick: removeRow
  })), /*#__PURE__*/React.createElement(Tip, {
    dropProps: {
      align: {
        bottom: 'top'
      }
    },
    content: /*#__PURE__*/React.createElement(TipContent, {
      message: data.length < storageData.length ? 'Reload Data' : 'Delete items before reload action is enabled',
      icon: !selected
    })
  }, /*#__PURE__*/React.createElement(Anchor, {
    icon: /*#__PURE__*/React.createElement(Refresh, null),
    onClick: function onClick() {
      return setData(storageData);
    },
    disabled: data.length === storageData.length
  })))), /*#__PURE__*/React.createElement(DataTable, {
    columns: storageColumns,
    data: data,
    step: 10,
    onClickRow: function onClickRow(event) {
      return setSelected(event.datum);
    }
  }))));
};
HeaderActions.parameters = {
  chromatic: {
    disable: true
  }
};
HeaderActions.storyName = 'Header actions';
export default {
  title: 'Controls/Tip/Header actions'
};