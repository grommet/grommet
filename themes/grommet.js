"use strict";

exports.__esModule = true;
exports.grommet = void 0;

var _styledComponents = require("styled-components");

var _object = require("../utils/object");

var grommet = (0, _object.deepFreeze)({
  global: {
    colors: {
      background: {
        light: '#ffffff',
        dark: '#000000'
      }
    },
    font: {
      family: "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
    }
  },
  button: {
    extend: (0, _styledComponents.css)(["", ""], function (props) {
      return !props.plain && 'font-weight: bold;';
    })
  }
});
exports.grommet = grommet;