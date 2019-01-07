import { describe, PropTypes } from 'react-desc';
export var doc = function doc(Keyboard) {
  var DocumentedKeyboard = describe(Keyboard).description('A handler of keyboard key presses.').usage("import { Keyboard } from 'grommet';\n<Keyboard onUp={() => {}} />");
  DocumentedKeyboard.propTypes = {
    target: PropTypes.oneOf(['component', 'document']).description('Where to listen for the keyboard presses.').defaultValue('component'),
    onBackspace: PropTypes.func.description('Function that will be called when the user presses the backspace key.'),
    onComma: PropTypes.func.description('Function that will be called when the user presses the comma key.'),
    onDown: PropTypes.func.description('Function that will be called when the user presses the down key.'),
    onEnter: PropTypes.func.description('Function that will be called when the user presses the enter key.'),
    onEsc: PropTypes.func.description('Function that will be called when the user presses the esc key.'),
    onKeyDown: PropTypes.func.description('Function that will be called when the user presses any key.'),
    onLeft: PropTypes.func.description('Function that will be called when the user presses the left key.'),
    onRight: PropTypes.func.description('Function that will be called when the user presses the right key.'),
    onShift: PropTypes.func.description('Function that will be called when the user presses the shift key.'),
    onSpace: PropTypes.func.description('Function that will be called when the user presses the space key.'),
    onTab: PropTypes.func.description('Function that will be called when the user presses the tab key.'),
    onUp: PropTypes.func.description('Function that will be called when the user presses the up key.')
  };
  return DocumentedKeyboard;
};