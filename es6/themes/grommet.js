import { css } from 'styled-components';
import { deepFreeze } from '../utils/object';
export var grommet = deepFreeze({
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
    extend: css(["", ""], function (props) {
      return !props.plain && 'font-weight: bold;';
    })
  }
});