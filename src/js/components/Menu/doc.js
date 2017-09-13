import { schema, PropTypes } from 'react-desc';

const VERTICAL_ALIGN_OPTIONS = ['top', 'bottom'];
const HORIZONTAL_ALIGN_OPTIONS = ['right', 'left'];

export default Menu => schema(Menu, {
  description: `Presents a list of choices within a drop down behind a control that
  opens it.`,
  usage: `import { Menu } from 'grommet';
  <Menu/>`,
  props: {
    color: [
      PropTypes.string,
      'Background color when drop is active',
    ],
    dropAlign: [
      PropTypes.shape({
        top: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
        bottom: PropTypes.oneOf(VERTICAL_ALIGN_OPTIONS),
        left: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
        right: PropTypes.oneOf(HORIZONTAL_ALIGN_OPTIONS),
      }),
      `Where to place the drop down. The keys correspond to a side of the drop down.
      The values correspond to a side of the control. For instance,
      {left: 'left', top: 'bottom'} would align the left edges and the top of 
      the drop down to the bottom of the control. At most one of left or right and
      one of top or bottom should be specified.`,
    ],
    icon: [
      PropTypes.node,
      `Indicates that the menu should be collapsed and the icon shown as a 
      control top open it.`,
    ],
    items: [
      PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        onClick: PropTypes.func,
        icon: PropTypes.node,
      })),
      'Menu items to be placed inside the drop down. All button properties should be supported.', {
        required: true,
      },
    ],
    label: [
      PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      `Indicates that the menu should be collapsed and the label shown as a
      control top open it.`,
    ],
    messages: [
      PropTypes.shape({
        closeMenu: PropTypes.string,
        openMenu: PropTypes.string,
      }),
      'Custom messages for Menu. Used for accessibility by screen readers.',
    ],
  },
});
