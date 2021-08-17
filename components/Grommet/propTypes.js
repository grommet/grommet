"use strict";

exports.__esModule = true;
exports.GrommetPropTypes = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generalPropTypes = require("../../utils/general-prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: _generalPropTypes.backgroundDoc,
    dir: _propTypes["default"].oneOf(['rtl']),
    full: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].oneOf(['min'])]),
    options: _propTypes["default"].shape({
      layer: _propTypes["default"].shape({
        singleId: _propTypes["default"].bool
      })
    }),
    plain: _propTypes["default"].bool,
    cssVars: _propTypes["default"].bool,
    theme: _propTypes["default"].object,
    themeMode: _propTypes["default"].oneOf(['dark', 'light']),
    userAgent: _propTypes["default"].string,
    containerTarget: _propTypes["default"].object,
    messages: _propTypes["default"].shape({
      format: _propTypes["default"].func,
      messages: _propTypes["default"].shape({
        fileInput: _propTypes["default"].shape({
          browse: _propTypes["default"].string,
          dropPrompt: _propTypes["default"].string,
          dropPromptMultiple: _propTypes["default"].string,
          files: _propTypes["default"].string,
          remove: _propTypes["default"].string,
          removeAll: _propTypes["default"].string
        }),
        form: _propTypes["default"].shape({
          invalid: _propTypes["default"].string,
          required: _propTypes["default"].string
        }),
        menu: _propTypes["default"].shape({
          openMenu: _propTypes["default"].string,
          closeMenu: _propTypes["default"].string
        }),
        rangeSelector: _propTypes["default"].shape({
          lower: _propTypes["default"].string,
          upper: _propTypes["default"].string
        }),
        select: _propTypes["default"].shape({
          multiple: _propTypes["default"].string
        }),
        skipLinks: _propTypes["default"].shape({
          skipTo: _propTypes["default"].string
        }),
        tabs: _propTypes["default"].shape({
          tabContents: _propTypes["default"].string
        }),
        textInput: _propTypes["default"].shape({
          enterSelect: _propTypes["default"].string,
          suggestionsCount: _propTypes["default"].string,
          suggestionsExist: _propTypes["default"].string,
          suggestionIsOpen: _propTypes["default"].string
        }),
        video: _propTypes["default"].shape({
          closeMenu: _propTypes["default"].string,
          fullScreen: _propTypes["default"].string,
          progressMeter: _propTypes["default"].string,
          scrubber: _propTypes["default"].string,
          openMenu: _propTypes["default"].string,
          pauseButton: _propTypes["default"].string,
          playButton: _propTypes["default"].string,
          volumeDown: _propTypes["default"].string,
          volumeUp: _propTypes["default"].string
        })
      })
    })
  };
}

var GrommetPropTypes = PropType;
exports.GrommetPropTypes = GrommetPropTypes;