function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps } from '../../utils/prop-types';
import { getAvailableAtBadge } from '../../utils/mixins';
export var doc = function doc(Pagination) {
  var DocumentedPagination = describe(Pagination).availableAt(getAvailableAtBadge('Pagination', 'Controls')).description("A control that enables selection of a single page from a \n      range of pages.").usage("import { Pagination } from 'grommet';\n      <Pagination />").intrinsicElement('nav');
  DocumentedPagination.propTypes = _extends({}, genericProps, {
    numberEdgePages: PropTypes.number.description("The number of pagination buttons visible at the start and end of page \n        range.").defaultValue(1),
    numberItems: PropTypes.number.description('The total number of items to paginate.').defaultValue(undefined),
    numberMiddlePages: PropTypes.number.description("The number of pagination buttons visible in the middle of the \n        controls.").defaultValue(3),
    onChange: PropTypes.func.description("Function called when the user clicks a page or arrow button. The \n        single argument is an event containing the target page via \n        `event.page`, and the startIndex and endIndex for items contained \n        in the target page via `event.startIndex` and `event.endIndex`, \n        respectively.").defaultValue(undefined),
    page: PropTypes.number.description("The default page. If used with onChange, it can be used to control the \n        active page via state.").defaultValue(undefined),
    size: PropTypes.oneOf(['small', 'medium', 'large']).description('Specifies what size the pagination control buttons should be.').defaultValue('medium'),
    step: PropTypes.number.description('The number of items per page.').defaultValue(10)
  });
  return DocumentedPagination;
};
export var themeDoc = {
  'pagination.button': {
    description: 'Any valid Button theming to apply on the pagination buttons.',
    type: 'object',
    defaultValue: "{\n      active: {\n        background: {\n          color: 'active-background',\n        },\n      },\n      color: 'text-strong',\n      hover: {\n        background: {\n          color: 'background-contrast',\n        },\n        color: undefined,\n      },\n      size: {\n        small: {\n          border: {\n            radius: 3px,\n            width: 2px,\n          },\n          pad: {\n            vertical: 4px,\n            horizontal: 4px,\n          },\n          font: 14px,\n          height: 30px,\n          width: 30px,\n        },\n        medium: {\n          border: {\n            radius: 4px,\n            width: 2px,\n          },\n          pad: {\n            vertical: 4px,\n            horizontal: 4px,\n          },\n          font: 18px,\n          height: 36px,\n          width: 36px,\n        },\n        large: {\n          border: {\n            radius: 6px,\n            width: 2px,\n          },\n          pad: {\n            vertical: 4px,\n            horizontal: 4px,\n          },\n          font: 22px,\n          height: 48px,\n          width: 48px,\n        },\n      },\n    }"
  },
  'pagination.container': {
    description: "Any valid Box props for the Box wrapping the \n    pagination controls.",
    type: 'object'
  },
  'pagination.container.extend': {
    description: "Any additional style for the Box wrapping \n    the pagination controls.",
    type: 'string | (props) => {}'
  },
  'pagination.controls.align': {
    description: "How the pagination controls should be aligned \n    within the containing Box.",
    type: 'string',
    defaultValue: 'center'
  },
  'pagination.controls.direction': {
    description: "Direction in which the containing Box should \n    display the pagination controls.",
    type: 'string',
    defaultValue: 'row'
  },
  'pagination.controls.gap': {
    description: "Amount of gap spacing between each control.",
    type: 'string',
    defaultValue: 'xxsmall'
  },
  'pagination.controls.margin': {
    description: "Amount of margin surrounding the controls.",
    type: 'string',
    defaultValue: 'none'
  },
  'pagination.controls.pad': {
    description: "Amount of pad surrounding the controls.",
    type: 'string',
    defaultValue: 'none'
  },
  'pagination.icons.color': {
    description: "The color used for the icon.",
    type: 'string | { dark: string, light: string }'
  },
  'pagination.icons.next': {
    description: "Icon to use as the 'next page' control.",
    type: 'element',
    defaultValue: '<Next />'
  },
  'pagination.icons.previous': {
    description: "Icon to use as the 'previous page' control.",
    type: 'element',
    defaultValue: '<Previous />'
  }
};