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
    backgrounds: {
      stack: {
        color: 'light-1',
        image: "url(https://v2.grommet.io/img/stak-hurrah.svg)"
      },
      'gradient-purple-blue': {
        color: 'neutral-3',
        image: "linear-gradient(\n          #3D138D 0%, /* neutral-2 */\n          #00739D 100% /* neutral-3 */\n        );",
        rotate: 145
      },
      'gradient-purple-gold': {
        color: 'neutral-2',
        image: "linear-gradient(\n          #3D138D 0%, /* neutral-2 */\n          #EB0F79 75%,\n          #FFCA58 100% /* accent-4 */\n        );"
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