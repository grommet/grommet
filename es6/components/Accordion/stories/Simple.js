var _excluded = ["animate", "multiple"];
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
export var Simple = function Simple(props) {
  var animate = props.animate,
    multiple = props.multiple,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, rest, /*#__PURE__*/React.createElement(Accordion, {
      animate: animate,
      multiple: multiple
    }, /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      overflow: "auto",
      height: "medium"
    }, /*#__PURE__*/React.createElement(Box, {
      height: "large",
      flex: false
    }, "Panel 1 contents"))), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      style: {
        height: '50px'
      }
    }, "Panel 2 contents")), /*#__PURE__*/React.createElement(AccordionPanel, {
      label: "Panel 3"
    }, /*#__PURE__*/React.createElement(Box, {
      background: "light-2",
      style: {
        height: '300px'
      }
    }, "Panel 3 contents"))))
    // </Grommet>
  );
};
export default {
  title: 'Controls/Accordion/Simple'
};