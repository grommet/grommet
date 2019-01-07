"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(Keyboard) {
  var DocumentedKeyboard = (0, _reactDesc.describe)(Keyboard).description('A handler of keyboard key presses.').usage("import { Keyboard } from 'grommet';\n<Keyboard onUp={() => {}} />");
  DocumentedKeyboard.propTypes = {
    target: _reactDesc.PropTypes.oneOf(['component', 'document']).description('Where to listen for the keyboard presses.').defaultValue('component'),
    onBackspace: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the backspace key.'),
    onComma: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the comma key.'),
    onDown: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the down key.'),
    onEnter: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the enter key.'),
    onEsc: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the esc key.'),
    onKeyDown: _reactDesc.PropTypes.func.description('Function that will be called when the user presses any key.'),
    onLeft: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the left key.'),
    onRight: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the right key.'),
    onShift: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the shift key.'),
    onSpace: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the space key.'),
    onTab: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the tab key.'),
    onUp: _reactDesc.PropTypes.func.description('Function that will be called when the user presses the up key.')
  };
  return DocumentedKeyboard;
};

exports.doc = doc;