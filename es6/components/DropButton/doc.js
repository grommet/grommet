function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(DropButton) {
  var DocumentedDropButton = describe(DropButton).availableAt(getAvailableAtBadge('DropButton')).description("A Button that controls a Drop. When opened, the Drop will contain\n      whatever is specified via `dropContent`. The Drop will control the focus\n      so that the contents behind it are not focusable. All properties and \n      theme properties of Button or Drop can be passed through.\n      ").usage("import { DropButton } from 'grommet';\n<DropButton dropContent={...} />").intrinsicElement('button');
  DocumentedDropButton.propTypes = _extends({}, genericProps, {
    disabled: PropTypes.bool.description('Whether the button should be disabled.').defaultValue(false),
    dropAlign: PropTypes.shape({
      top: PropTypes.oneOf(['top', 'bottom']),
      bottom: PropTypes.oneOf(['top', 'bottom']),
      right: PropTypes.oneOf(['left', 'right']),
      left: PropTypes.oneOf(['left', 'right'])
    }).description('How to align the drop with respect to the button.').defaultValue({
      top: 'top',
      left: 'left'
    }),
    dropContent: PropTypes.element.description('Content to put inside the Drop.').isRequired,
    dropTarget: PropTypes.object.description("Target where the drop will be aligned to. This should be\n      a React reference. Typically, this is not required as the drop will be\n      aligned to the DropButton itself by default."),
    dropProps: PropTypes.object.description('Any valid Drop prop.'),
    onClose: PropTypes.func.description('Callback for when the drop is closed'),
    onOpen: PropTypes.func.description('Callback for when the drop is opened'),
    open: PropTypes.bool.description("Whether the drop should be open or not. Setting this property does not\n      influence user interaction after it has been rendered.").defaultValue(false)
  });
  return DocumentedDropButton;
};