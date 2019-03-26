import { css } from 'styled-components';
import { deepFreeze } from '../utils/object';
export var grommet = deepFreeze({
  global: {
    colors: {
      background: '#ffffff'
    },
    font: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans",  "Helvetica Neue", Arial, sans-serif,  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  },
  button: {
    extend: css(["", ""], function (props) {
      return !props.plain && 'font-weight: bold;';
    })
  }
});