function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { colorPropType, genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
import { themeDocUtils } from '../../utils/themeDocUtils';
export var doc = function doc(Paragraph) {
  var DocumentedParagraph = describe(Paragraph).availableAt(getAvailableAtBadge('Paragraph', 'Type')).description('A paragraph of text.').usage("import { Paragraph } from 'grommet';\n<Paragraph />").intrinsicElement('p');
  DocumentedParagraph.propTypes = _extends({}, genericProps, {
    color: colorPropType.description('A color identifier to use for the text color.'),
    fill: PropTypes.bool.description('Whether the width should fill the container.').defaultValue(undefined),
    responsive: PropTypes.bool.description("Whether margin should be scaled for mobile environments.").defaultValue(true),
    size: PropTypes.oneOfType([PropTypes.oneOf(['small', 'medium', 'large', 'xlarge', 'xxlarge']), PropTypes.string]).description('The size of the Paragraph text.').defaultValue('medium'),
    textAlign: PropTypes.oneOf(['start', 'center', 'end']).description('How to align the text inside the paragraph.').defaultValue('start')
  });
  return DocumentedParagraph;
};
export var themeDoc = _extends({
  paragraph: {
    description: "The possible sizes of the paragraph in terms of its max-width,\n     font-size and line-height.",
    type: 'object',
    defaultValue: "{\n      small: {\n        size: '14px',\n        height: '20px',\n        maxWidth: '336px',\n       },\n      medium: {\n        size: '18px',\n        height: '24px',\n        maxWidth: '432px',\n      },\n      large: {\n        size: '22px',\n        height: '28px',\n        maxWidth: '528px',\n      },\n      xlarge: {\n        size: '26px',\n        height: '32px',\n        maxWidth: '624px',\n      },\n      xxlarge: {\n        size: '34px',\n        height: '40px',\n        maxWidth: '816px',\n      },\n    }"
  },
  'paragraph.font.family': {
    description: 'The font family to use for Paragraph.',
    type: 'string',
    defaultValue: undefined
  },
  'paragraph.textAlign': {
    description: "How to align the text inside the Paragraph.",
    type: 'string',
    defaultValue: 'start'
  },
  'paragraph.extend': {
    description: 'Any additional style for the Paragraph.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
}, themeDocUtils.edgeStyle('The possible sizes for margin.'));