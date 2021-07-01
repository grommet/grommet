import { describe, PropTypes } from 'react-desc';

import { backgroundDoc } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = (Grommet) => {
  const DocumentedGrommet = describe(Grommet)
    .availableAt(getAvailableAtBadge('Grommet', 'Utilities'))
    .description('The top level Grommet container.')
    .usage(
      `import { Grommet } from 'grommet';
<Grommet>...</Grommet>`,
    )
    .intrinsicElement('div');

  DocumentedGrommet.propTypes = {
    background: backgroundDoc,
    dir: PropTypes.oneOf(['rtl']).description(
      'Layout direction for right to left contexts',
    ),
    full: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['min'])])
      .description(
        `Whether to take the whole viewport. 'min' indicates it should
        take at minimum the whole viewport, allowing the viewport to
        control scrolling.`,
      )
      .defaultValue(false),
    options: PropTypes.shape({
      layer: PropTypes.shape({ singleId: PropTypes.bool }),
    })
      .description(
        `Provides a way to assign a unique id to a single DOM node. Currently, 
        this is only supported for Layer. This prop was created to preserve 
        backwards compatibility with existing behavior by allowing users to 
        opt-in to newer behavior.`,
      )
      .defaultValue(undefined),
    plain: PropTypes.bool
      .description(
        `Whether or not Grommet should apply a global font-family, font-size,
        and line-height.`,
      )
      .defaultValue(false),
    cssVars: PropTypes.bool
      .description('Whether to expose the css variables.')
      .defaultValue(false),
    theme: PropTypes.object.description(
      'Custom styles for Grommet app component.',
    ),
    themeMode: PropTypes.oneOf(['dark', 'light']).description(
      `Dark vs. light theme variation. Default is unspecified and left to
      theme.`,
    ),
    userAgent: PropTypes.string.description(
      `User agent used to detect the device width for setting the initial
      breakpoint.`,
    ),
    containerTarget: PropTypes.object.description(
      `The node where Drop and Layer containers are inserted. Defaults to
      document.body which is almost always the right choice. This is used
      for less common cases like rendering within an internal node (e.g.
      shadow root).`,
    ),
    messages: PropTypes.shape({
      format: PropTypes.func.description(
        `A function that will that will be called with an options object
        parameter containing the id of the message needed. This function
        should return the text string for that message. If this format
        function is not defined, messages will be used from the messages
        object below or a default message if the id wasn't defined in
        this object.`,
      ),
      messages: PropTypes.shape({
        fileInput: PropTypes.shape({
          browse: PropTypes.string,
          dropPrompt: PropTypes.string,
          dropPromptMultiple: PropTypes.string,
          files: PropTypes.string,
          remove: PropTypes.string,
          removeAll: PropTypes.string,
        }),
        form: PropTypes.shape({
          invalid: PropTypes.string,
          required: PropTypes.string,
        }),
        menu: PropTypes.shape({
          openMenu: PropTypes.string,
          closeMenu: PropTypes.string,
        }),
        rangeSelector: PropTypes.shape({
          lower: PropTypes.string,
          upper: PropTypes.string,
        }),
        select: PropTypes.shape({
          multiple: PropTypes.string,
        }),
        skipLinks: PropTypes.shape({
          skipTo: PropTypes.string,
        }),
        tabs: PropTypes.shape({
          tabContents: PropTypes.string,
        }),
        textInput: PropTypes.shape({
          enterSelect: PropTypes.string,
          suggestionsCount: PropTypes.string,
          suggestionsExist: PropTypes.string,
          suggestionIsOpen: PropTypes.string,
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
          volumeUp: PropTypes.string,
        }),
      }),
    })
      .description(
        `Custom messages for grommet components. Use this property to
define messages or a function to get localized messages
for any grommet children components.`,
      )
      .defaultValue({
        messages: {
          fileInput: {
            browse: 'browse',
            dropPrompt: 'Drop file here or',
            dropPromptMultiple: 'Drop files here or',
            files: 'files',
            remove: 'remove',
            removeAll: 'remove all',
          },
          form: {
            invalid: 'invalid',
            required: 'required',
          },
          menu: {
            openMenu: 'Open Menu',
            closeMenu: 'Close Menu',
          },
          rangeSelector: {
            lower: 'Lower Bounds',
            upper: 'Upper Bounds',
          },
          select: {
            multiple: 'multiple',
          },
          skipLinks: {
            skipTo: 'Skip To:',
          },
          tabs: {
            tabContents: 'Tab Contents',
          },
          textInput: {
            enterSelect: '(Press Enter to Select)',
            suggestionsCount: 'suggestions available',
            suggestionsExist: `This input has suggestions use arrow keys
            to navigate`,
            suggestionIsOpen: `Suggestions drop is open, continue to use
            arrow keys to navigate`,
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
            volumeUp: 'volume up',
          },
        },
      }),
  };

  return DocumentedGrommet;
};

export const themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
