module.exports = {
  components: {
    categories: [
      {
        name: 'Type',
        include: [
          'src/js/components/Heading/Heading.js',
          'src/js/components/Markdown/Markdown/Markdown.js',
          'src/js/components/Paragraph/Paragraph.js',
          'src/js/components/Text/Text.js',
        ],
      },
      {
        name: 'Controls',
        include: [
          'src/js/components/Accordion/Accordion.js',
          'src/js/components/AccordionPanel/AccordionPanel.js',
          'src/js/components/Anchor/Anchor.js',
          'src/js/components/Button/Button.js',
          'src/js/components/DropButton/DropButton.js',
          'src/js/components/Menu/Menu.js',
          'src/js/components/Tab/Tab.js',
          'src/js/components/Tabs/Tabs.js',
        ],
      },
      {
        name: 'Input',
        include: [
          'src/js/components/CheckBox/CheckBox.js',
          'src/js/components/MaskedInput/MaskedInput.js',
          'src/js/components/RadioButton/RadioButton.js',
          'src/js/components/RadioButtonGroup/RadioButtonGroup.js',
          'src/js/components/RangeInput/RangeInput.js',
          'src/js/components/RangeSelector/RangeSelector.js',
          'src/js/components/Select/Select.js',
          'src/js/components/TextArea/TextArea.js',
          'src/js/components/TextInput/TextInput.js',
          'src/js/components/FormField/FormField.js',
          'src/js/components/Form/Form.js',
        ],
      },
      {
        name: 'Visualization',
        include: [
          'src/js/components/Calendar/Calendar.js',
          'src/js/components/Chart/Chart.js',
          'src/js/components/Clock/Clock.js',
          'src/js/components/Collapsible/Collapsible.js',
          'src/js/components/Keyboard/Keyboard.js',
          'src/js/components/Meter/Meter.js',
          'src/js/components/WorldMap/WorldMap.js',
        ],
      },
      {
        name: 'Media',
        include: [
          'src/js/components/Carousel/Carousel.js',
          'src/js/components/Image/Image.js',
          'src/js/components/Video/Video/Video.js',
        ],
      },
      {
        name: 'Layout',
        include: [
          'src/js/components/Box/Box/Box.js',
          'src/js/components/Grid/Grid.js',
          'src/js/components/Stack/Stack.js',
        ],
      },
    ],
  },
  name: 'Grommet',
};

/**
 * Unsuported:
 * Drop - not sure how it suppose to work. Example in CodeSandbox doesn't work.
 * Distribution – function passed to children breaks component.
 * Layer – absolute positioning is not supported.
 * Infinite Scroll – function passed to children breaks component.
 * SkipLink, SkipLinks,SkipLinkTarget – not sure how it suppose to work
 * Table - unknown bugs
 * DataTable – not supported yet
 * Diagram – doesn't render content
 *
 * Bugs:
 * Form – doesn't pass children from preset.
 * Keyboard – not sure how it should work.
 * RangeSelector – doesn't render content correctly
 *
 * ToDo:
 * - Controlled Checkbox
 * - Controlled Menu
 * - Controlled Radio
 * - Controlled RadioGroup
 * - Controlled Select
 */
