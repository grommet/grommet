## Button
A button.

You can provide a single function child that will be called with
      'disabled', 'hover' and 'focus' keys. 
      This allows you to customize the rendering of the Button in those cases.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Controls-Button&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/button&module=%2Fsrc%2FButton.js)
## Usage

```javascript
import { Button } from 'grommet';
<Button primary label='Label' />
```

## Properties

**a11yTitle**

Custom label to be used by screen readers. When provided, an aria-label will
   be added to the element.

```
string
```

**alignSelf**

How to align along the cross axis when contained in
      a Box or along the column axis when contained in a Grid.

```
start
center
end
stretch
```

**gridArea**

The name of the area to place
    this inside a parent Grid.

```
string
```

**margin**

The amount of margin around the component. An object can
    be specified to distinguish horizontal margin, vertical margin, and
    margin on a particular side.

```
none
xxsmall
xsmall
small
medium
large
xlarge
{
  bottom: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  end: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  horizontal: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  left: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  right: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  start: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  top: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string,
  vertical: 
    xxsmall
    xsmall
    small
    medium
    large
    xlarge
    string
}
string
```

**children**

Function that can be called to render the visual representation.
      Button can take in Children as a function, node, or object. 
      For example, 'disabled', 'hover', and 'focus' can be passed as an 
      argument that would then return a react element.
      `children={({ disabled, hover, focus }) => <Box...>{...}</Box>}`. 
      When Button has children, it is styled as a `plain` button.
      

```
function
object
node
```

**active**

Whether the button is active.

```
boolean
```

**as**

The DOM tag or react component to use for the element.

```
string
function
```

**color**

Fill color for primary, label color for plain, border color otherwise.

```
string
{
  dark: string,
  light: string
}
```

**disabled**

Whether the button is disabled.

```
boolean
```

**fill**

Whether the button expands to fill all of the available width and/or 
        height.

```
horizontal
vertical
boolean
```

**focusIndicator**

Whether when 'plain' it should receive a focus outline. Defaults to `true`.

```
boolean
```

**gap**

The amount of spacing between icon and label in the button. Defaults to `small`.

```
none
xxsmall
xsmall
small
medium
large
xlarge
string
```

**hoverIndicator**

The hover indicator to apply when the user is mousing over the
button. An object can be also be specified for color index support:
{background: 'neutral-2'}. This prop is meant to be used only
with plain Buttons.

```
boolean
string
background
{
  color: string,
  dark: 
    boolean
    string,
  image: string,
  light: string,
  position: string,
  opacity: 
    string
    boolean
    number
    weak
    medium
    strong,
  repeat: 
    no-repeat
    repeat
    string,
  size: 
    cover
    contain
    string
}
```

**href**

If specified, the button will behave like an anchor tag.

```
string
```

**icon**

Icon element to place in the button.

```
element
```

**label**

Label text to place in the button.

```
node
```

**onClick**

Click handler. Not setting this property and not specifying a href
        causes the Button to be disabled.

```
function
```

**plain**

Whether this is a plain button with no border or pad.
          Non plain button will show both pad and border.
          The plain button has no border and unless the icon prop exist it has 
          no pad as well. 
          When using the kind button (i.e. button.default on the theme), 
          the usage of plain is deprecated.

```
boolean
```

**primary**

Whether this is a primary button. There should be at most one per page
            or screen.

```
boolean
```

**reverse**

Whether an icon and label should be reversed so that the icon is at the
              end of the anchor.

```
boolean
```

**secondary**

Whether this is a secondary button.

```
boolean
```

**size**

The possible sizes of Button, that impacts the overall Button 
      padding, border radius, text size and line height. 
      'size' will not impact any icon related sizing.

```
small
medium
large
```

**target**

Specifies where to display the URL defined in the href property.

```
_self
_blank
_parent
_top
string
```

**tip**

tooltip or a hint when hovering over the button.

```
{
  content: 
    node
    string,
  dropProps: 
    {

    },
  plain: boolean
}
string
```

**type**

The type of button. Set the type to submit for the default button on 
                forms. Defaults to `button`.

```
button
reset
submit
```
  
## Intrinsic element

```
button
```
## Theme
  
**global.active.background.color**

The background color when using active prop. Expects `string | { dark: string, light: string }`.

Defaults to

```
active
```

**global.active.background.opacity**

The value used for active button background opacity. Expects `number | string`.

Defaults to

```
medium
```

**global.active.color**

The text color when using active prop. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**global.hover.background**

The background style when hovering. Expects `string | { color: string, opacity: string }`.

Defaults to

```
{ color: 'active', opacity: 'medium' }
```

**global.hover.color**

The text color when hovering. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'white', light: 'black' }
```

**global.edgeSize.small**

The padding around an icon-only button. Expects `string | { dark: string, light: string }`.

Defaults to

```
12px
```

**global.colors.control**

The color of the border. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: 'accent-1', light: 'brand', }
```

**global.colors.brand**

The light version of the border. Expects `string`.

Defaults to

```
#7D4CDB
```

**global.colors.text**

The color of the text label. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: '#f8f8f8', light: '#444444' }
```

**text.medium.size**

The font size of the text label. Expects `string`.

Defaults to

```
18px
```

**text.medium.height**

The line height of the text label. Expects `string`.

Defaults to

```
24px
```

**button.active.background.color**

Background color when the button is active. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.active.border.color**

The border color when the button is active. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.active.color**

Label color when the button is active. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.active.extend**

Any additional style for an active Button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.active.default**

Adjustments to the default Button style when the Button is active. Expects `object`.

Defaults to

```
undefined
```

**button.active.primary**

Adjustments to the primary Button style when the Button is active. Expects `{}`.

Defaults to

```
undefined
```

**button.active.secondary**

Adjustments to the secondary Button style when the Button is active. Expects `{}`.

Defaults to

```
undefined
```

**button.border.color**

The color of the border. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.border.radius**

The corner radius. Expects `string`.

Defaults to

```
18px
```

**button.border.width**

The border width. Expects `string`.

Defaults to

```
2px
```

**button.color**

The color of the text label. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.default.background.color**

The color of the background for default buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.default.background.opacity**

The value used for default button background opacity. Expects `number | string`.

Defaults to

```
undefined
```

**button.default.border.color**

The color of the border for default buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.default.color**

The color of the label for default buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.default.font.weight**

The weight of the text label for default buttons. Expects `string | number`.

Defaults to

```
undefined
```

**button.default.extend**

Any additional style for a default button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.default.padding.horizontal**

The horizontal padding for a default button. Expects `string`.

Defaults to

```
22px
```

**button.default.padding.vertical**

The vertical padding for a default button. Expects `string`.

Defaults to

```
4px
```

**button.disabled.color**

Label color when the button is disabled. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.disabled.border.color**

The border color when the button is disabled. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.disabled.background.color**

Background color when the button is disabled. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.disabled.opacity**

The opacity when the button is disabled. Expects `number`.

Defaults to

```
0.3
```

**button.disabled.extend**

Any additional style for a disabled Button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.disabled.default**

Adjustments to the default Button style when the Button is disabled. Expects `{}`.

Defaults to

```
undefined
```

**button.disabled.primary**

Adjustments to the primary Button style when the Button is disabled. Expects `{}`.

Defaults to

```
undefined
```

**button.disabled.secondary**

Adjustments to the secondary Button style when the Button is disabled. Expects `{}`.

Defaults to

```
undefined
```

**button.hover.color**

Label color when the button is hovered. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.hover.border.color**

The border color when the button is hovered. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.hover.background.color**

Background color when the button is hovered. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.hover.extend**

Any additional style for a hovered Button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.hover.default**

Adjustments to the default Button style when the Button is hovered. Expects `{}`.

Defaults to

```
undefined
```

**button.hover.primary**

Adjustments to the primary Button style when the Button is hovered. Expects `{}`.

Defaults to

```
undefined
```

**button.hover.secondary**

Adjustments to the secondary Button style when the Button is hovered. Expects `{}`.

Defaults to

```
undefined
```

**button.padding.horizontal**

The horizontal padding. Expects `string`.

Defaults to

```
22px
```

**button.padding.vertical**

The vertical padding. Expects `string`.

Defaults to

```
4px
```

**button.primary.background.color**

The color of the background for primary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.primary.background.opacity**

The value used for primary button background opacity. Expects `number | string`.

Defaults to

```
undefined
```

**button.primary.border.color**

The color of the border for primary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.primary.color**

The color of the label for primary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.primary.font.weight**

The weight of the text label for primary buttons. Expects `string | number`.

Defaults to

```
undefined
```

**button.primary.padding.horizontal**

The horizontal padding for a primary button. Expects `string`.

Defaults to

```
22px
```

**button.primary.padding.vertical**

The vertical padding for a primary button. Expects `string`.

Defaults to

```
4px
```

**button.primary.extend**

Any additional style for a primary button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.secondary.background.color**

The color of the background for secondary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.secondary.background.opacity**

The value used for secondary button background opacity. Expects `number | string`.

Defaults to

```
undefined
```

**button.secondary.border.color**

The color of the border for secondary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.secondary.color**

The color of the label for secondary buttons. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**button.secondary.font.weight**

The weight of the text label for secondary buttons. Expects `string | number`.

Defaults to

```
undefined
```

**button.secondary.padding.horizontal**

The horizontal padding for a secondary button. Expects `string`.

Defaults to

```
22px
```

**button.secondary.padding.vertical**

The vertical padding for a secondary button. Expects `string`.

Defaults to

```
4px
```

**button.secondary.extend**

Any additional style for a secondary button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**button.size.small.border.radius**

The border corner radius. Expects `string`.

Defaults to

```
18px
```

**button.size.small.pad.horizontal**

The pad Expects `string`.

Defaults to

```
20px
```

**button.size.small.pad.vertical**

The pad Expects `string`.

Defaults to

```
4px
```

**button.size.medium.border.radius**

The border corner radius. Expects `string`.

Defaults to

```
18px
```

**button.size.medium.pad.horizontal**

The pad Expects `string`.

Defaults to

```
22px
```

**button.size.medium.pad.vertical**

The pad Expects `string`.

Defaults to

```
4px
```

**button.size.large.border.radius**

The border corner radius. Expects `string`.

Defaults to

```
24px
```

**button.size.large.pad.horizontal**

The pad Expects `string`.

Defaults to

```
32px
```

**button.size.large.pad.vertical**

The pad Expects `string`.

Defaults to

```
8px
```

**button.transition.duration**

The length of time it will take for the element to transition
between two states. Expects `number`.

Defaults to

```
0.1
```

**button.transition.properties**

The CSS properties you want to add the transition to. Expects `string[]`.

Defaults to

```
['color', 'background-color', 'border-color', 'box-shadow']
```

**button.transition.timing**

Describes how a transition will progress over one cycle of its
duration and allowing it to change speed during its course. Expects `string`.

Defaults to

```
ease-in-out
```

**button.extend**

Any additional style for the Button. Expects `string | (props) => {}`.

Defaults to

```
undefined
```

**tip.content**

When using tip prop, any valid Box property for the Tip container. Expects `object`.

Defaults to

```
{ background: 'background-contrast', elevation: 'small', 
    margin: 'xsmall', pad: { vertical: 'xsmall', horizontal: 'small' }, 
    round: 'small'}
```

**tip.drop**

When using tip prop, any valid Drop property for the Tooltip. Expects `object`.

Defaults to

```
{align: { top: 'bottom' }}
```

**global.focus.border.color**

The border color of the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.focus.outline.color**

The outline color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**global.focus.outline.size**

The size of the outline around the component when in focus. Expects `string`.

Defaults to

```
undefined
```

**global.focus.shadow.color**

The shadow color around the component when in focus. Expects `string | { dark: string, light: string }`.

Defaults to

```
focus
```

**global.focus.shadow.size**

The size of the shadow around the component when in focus. Expects `string`.

Defaults to

```
2px
```

**global.control.disabled.opacity**

The opacity when a component is disabled. Expects `number`.

Defaults to

```
0.3
```
