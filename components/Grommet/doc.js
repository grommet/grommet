"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _propTypes = require("../../utils/prop-types");

var _mixins = require("../../utils/mixins");

var doc = function doc(Grommet) {
  var DocumentedGrommet = (0, _reactDesc.describe)(Grommet).availableAt((0, _mixins.getAvailableAtBadge)('Grommet', 'Utilities')).description('The top level Grommet container.').usage("import { Grommet } from 'grommet';\n<Grommet>...</Grommet>").intrinsicElement('div');
  DocumentedGrommet.propTypes = {
    background: _propTypes.backgroundDoc,
    dir: _reactDesc.PropTypes.oneOf(['rtl']).description('Layout direction for right to left contexts'),
    full: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.bool, _reactDesc.PropTypes.oneOf(['min'])]).description("Whether to take the whole viewport. 'min' indicates it should\n        take at minimum the whole viewport, allowing the viewport to\n        control scrolling.").defaultValue(false),
    options: _reactDesc.PropTypes.shape({
      layer: _reactDesc.PropTypes.shape({
        singleId: _reactDesc.PropTypes.bool
      })
    }).description("Provides a way to assign a unique id to a single DOM node. Currently, \n        this is only supported for Layer. This prop was created to preserve \n        backwards compatibility with existing behavior by allowing users to \n        opt-in to newer behavior.").defaultValue(undefined),
    plain: _reactDesc.PropTypes.bool.description("Whether or not Grommet should apply a global font-family, font-size,\n        and line-height.").defaultValue(false),
    cssVars: _reactDesc.PropTypes.bool.description('Whether to expose the css variables.').defaultValue(false),
    theme: _reactDesc.PropTypes.object.description('Custom styles for Grommet app component.'),
    themeMode: _reactDesc.PropTypes.oneOf(['dark', 'light']).description("Dark vs. light theme variation. Default is unspecified and left to\n      theme."),
    userAgent: _reactDesc.PropTypes.string.description("User agent used to detect the device width for setting the initial\n      breakpoint."),
    containerTarget: _reactDesc.PropTypes.object.description("The node where Drop and Layer containers are inserted. Defaults to\n      document.body which is almost always the right choice. This is used\n      for less common cases like rendering within an internal node (e.g.\n      shadow root)."),
    messages: _reactDesc.PropTypes.shape({
      format: _reactDesc.PropTypes.func.description("A function that will that will be called with an options object\n        parameter containing the id of the message needed. This function\n        should return the text string for that message. If this format\n        function is not defined, messages will be used from the messages\n        object below or a default message if the id wasn't defined in\n        this object."),
      messages: _reactDesc.PropTypes.shape({
        fileInput: _reactDesc.PropTypes.shape({
          browse: _reactDesc.PropTypes.string,
          dropPrompt: _reactDesc.PropTypes.string,
          dropPromptMultiple: _reactDesc.PropTypes.string,
          files: _reactDesc.PropTypes.string,
          remove: _reactDesc.PropTypes.string,
          removeAll: _reactDesc.PropTypes.string
        }),
        form: _reactDesc.PropTypes.shape({
          invalid: _reactDesc.PropTypes.string,
          required: _reactDesc.PropTypes.string
        }),
        menu: _reactDesc.PropTypes.shape({
          openMenu: _reactDesc.PropTypes.string,
          closeMenu: _reactDesc.PropTypes.string
        }),
        rangeSelector: _reactDesc.PropTypes.shape({
          lower: _reactDesc.PropTypes.string,
          upper: _reactDesc.PropTypes.string
        }),
        select: _reactDesc.PropTypes.shape({
          multiple: _reactDesc.PropTypes.string
        }),
        skipLinks: _reactDesc.PropTypes.shape({
          skipTo: _reactDesc.PropTypes.string
        }),
        tabs: _reactDesc.PropTypes.shape({
          tabContents: _reactDesc.PropTypes.string
        }),
        textInput: _reactDesc.PropTypes.shape({
          enterSelect: _reactDesc.PropTypes.string,
          suggestionsCount: _reactDesc.PropTypes.string,
          suggestionsExist: _reactDesc.PropTypes.string,
          suggestionIsOpen: _reactDesc.PropTypes.string
        }),
        video: _reactDesc.PropTypes.shape({
          closeMenu: _reactDesc.PropTypes.string,
          fullScreen: _reactDesc.PropTypes.string,
          progressMeter: _reactDesc.PropTypes.string,
          scrubber: _reactDesc.PropTypes.string,
          openMenu: _reactDesc.PropTypes.string,
          pauseButton: _reactDesc.PropTypes.string,
          playButton: _reactDesc.PropTypes.string,
          volumeDown: _reactDesc.PropTypes.string,
          volumeUp: _reactDesc.PropTypes.string
        })
      })
    }).description("Custom messages for grommet components. Use this property to\ndefine messages or a function to get localized messages\nfor any grommet children components.").defaultValue({
      messages: {
        fileInput: {
          browse: 'browse',
          dropPrompt: 'Drop file here or',
          dropPromptMultiple: 'Drop files here or',
          files: 'files',
          remove: 'remove',
          removeAll: 'remove all'
        },
        form: {
          invalid: 'invalid',
          required: 'required'
        },
        menu: {
          openMenu: 'Open Menu',
          closeMenu: 'Close Menu'
        },
        rangeSelector: {
          lower: 'Lower Bounds',
          upper: 'Upper Bounds'
        },
        select: {
          multiple: 'multiple'
        },
        skipLinks: {
          skipTo: 'Skip To:'
        },
        tabs: {
          tabContents: 'Tab Contents'
        },
        textInput: {
          enterSelect: '(Press Enter to Select)',
          suggestionsCount: 'suggestions available',
          suggestionsExist: "This input has suggestions use arrow keys\n            to navigate",
          suggestionIsOpen: "Suggestions drop is open, continue to use\n            arrow keys to navigate"
        },
        video: {
          closeMenu: 'close menu',
          fullScreen: 'full screen',
          progressMeter: 'video progress',
          scrubber: 'scrubber',
          openMenu: 'open menu',
          pauseButton: 'pause',
          playButton: 'play',
          volumeDown: 'volume down',
          volumeUp: 'volume up'
        }
      }
    })
  };
  return DocumentedGrommet;
};

exports.doc = doc;
var themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
};
exports.themeDoc = themeDoc;