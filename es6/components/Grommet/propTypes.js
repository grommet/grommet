import PropTypes from 'prop-types';
import { backgroundDoc } from '../../utils/general-prop-types';
var PropType = {};

if (process.env.NODE_ENV !== 'production') {
  PropType = {
    background: backgroundDoc,
    dir: PropTypes.oneOf(['rtl']),
    full: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['min'])]),
    options: PropTypes.shape({
      layer: PropTypes.shape({
        singleId: PropTypes.bool
      })
    }),
    plain: PropTypes.bool,
    cssVars: PropTypes.bool,
    theme: PropTypes.object,
    themeMode: PropTypes.oneOf(['dark', 'light']),
    userAgent: PropTypes.string,
    containerTarget: PropTypes.object,
    messages: PropTypes.shape({
      format: PropTypes.func,
      messages: PropTypes.shape({
        fileInput: PropTypes.shape({
          browse: PropTypes.string,
          dropPrompt: PropTypes.string,
          dropPromptMultiple: PropTypes.string,
          files: PropTypes.string,
          remove: PropTypes.string,
          removeAll: PropTypes.string
        }),
        form: PropTypes.shape({
          invalid: PropTypes.string,
          required: PropTypes.string
        }),
        menu: PropTypes.shape({
          openMenu: PropTypes.string,
          closeMenu: PropTypes.string
        }),
        rangeSelector: PropTypes.shape({
          lower: PropTypes.string,
          upper: PropTypes.string
        }),
        select: PropTypes.shape({
          multiple: PropTypes.string
        }),
        skipLinks: PropTypes.shape({
          skipTo: PropTypes.string
        }),
        tabs: PropTypes.shape({
          tabContents: PropTypes.string
        }),
        textInput: PropTypes.shape({
          enterSelect: PropTypes.string,
          suggestionsCount: PropTypes.string,
          suggestionsExist: PropTypes.string,
          suggestionIsOpen: PropTypes.string
        }),
        video: PropTypes.shape({
          closeMenu: PropTypes.string,
          fullScreen: PropTypes.string,
          progressMeter: PropTypes.string,
          scrubber: PropTypes.string,
          openMenu: PropTypes.string,
          pauseButton: PropTypes.string,
          playButton: PropTypes.string,
          volumeDown: PropTypes.string,
          volumeUp: PropTypes.string
        })
      })
    })
  };
}

export var GrommetPropTypes = PropType;