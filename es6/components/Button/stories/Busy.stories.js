import React, { useState } from 'react';
import { Box, Button } from 'grommet';
export var Busy = function Busy() {
  var _useState = useState(),
    busy = _useState[0],
    setBusy = _useState[1];
  var _useState2 = useState(),
    success = _useState2[0],
    setSuccess = _useState2[1];
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Button, {
    primary: true,
    busy: busy,
    success: success,
    label: "Button Busy",
    onClick: function onClick() {
      setBusy(true);
      setTimeout(function () {
        setBusy(false);
        setSuccess(true);
      }, 2000);
      setTimeout(function () {
        setSuccess(false);
      }, 4000);
    }
  }));
};
Busy.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Controls/Button/Busy'
};