# 2.56.1

General:

- Fixed Cards rendering issue when no children prop is passed. (https://github.com/grommet/grommet/pull/8005)
- Fixed an issue with global.input.readOnly.background leaking onto non-input children of FormField. (https://github.com/grommet/grommet/pull/7997)
- Enhanced FormField so that screen readers automatically read error text when the invalid field is focused. (https://github.com/grommet/grommet/pull/7931)

Beta - APIs are subject to change:

- Added Wizard component (https://github.com/grommet/grommet/pull/7990).
- Added DateTimeInput component (https://github.com/grommet/grommet/pull/7994).
- Fixed a bug in TimeInput where a stale "pending first digit" overlay could get stuck and mask later updates to the same time section. (https://github.com/grommet/grommet/pull/8008)
- Fixed Stepper from leaking direction prop onto DOM elements (https://github.com/grommet/grommet/pull/8017).

# 2.56.0

General:

- Added options.button.childrenPlain to Grommet options prop to allow for control whether children automatically force plain styling on Button. (https://github.com/grommet/grommet/pull/7993)
- Enhanced Tabs accessibility keyboard support. (https://github.com/grommet/grommet/pull/7967)
- Fixed an issue in Tabs by removing state variables from useLayoutEffect dependencies to prevent infinite loops. (https://github.com/grommet/grommet/pull/7912)

Beta - APIs are subject to change:

- Added new Stepper component. (https://github.com/grommet/grommet/pull/7963)
- Added a new TimeInput component. (https://github.com/grommet/grommet/pull/7976)

# 2.55.0

General:

- Added children prop for fully custom Tag content and expanded the name and value props to allow a node to be passed. (https://github.com/grommet/grommet/pull/7952)
- Enhanced Cards to have onOrder prop enabling drag-and-drop and keyboard (arrow key) reordering. Added sizeKey prop to allow individual cards to span multiple grid columns and/or rows. (https://github.com/grommet/grommet/pull/7959)
- Fixed pad, margin, and other edge-size props generating incorrect responsive CSS overrides when a theme token is not defined for a given breakpoint. (https://github.com/grommet/grommet/pull/6969)
- Fixed Calendar reference prop being ignored when used in controlled mode (reference + onReference). Also added activeDate as a second argument to onSelect to simplify dual-calendar range implementations. (https://github.com/grommet/grommet/pull/7915)
- Fixed DataFilter filter controls not rendering for numeric properties that have only one unique value. (https://github.com/grommet/grommet/pull/7853)
- Fixed Drop placement when a component is near the viewport edge. (https://github.com/grommet/grommet/pull/7954)
- Fixed FileInput clearing a previously selected file when the user opens and then cancels the browser file picker dialog. (https://github.com/grommet/grommet/pull/7958)
- Fixed resize handler crash in Grommet component when document.body is null, falling back to window.innerWidth. (https://github.com/grommet/grommet/pull/7923)
- Fixed TextInput width prop being ignored when readOnly or readOnlyCopy is enabled. (https://github.com/grommet/grommet/pull/7919)

DateInput:

- Fixed clearing typed values that fall outside calendarProps.bounds. The input now keeps the value, sets aria-invalid, and shows a validation error message when inside a Form. (https://github.com/grommet/grommet/pull/7957)
- Fixed Calendar overflowing outside its constrained Drop container. (https://github.com/grommet/grommet/pull/7961)

TypeScript:

- Added index signature to breakpointEdgeSize and global.edgeSize type declarations to support custom string size values. (https://github.com/grommet/grommet/pull/7953)

# 2.54.0

- Added theme.menu.disabled.icons.color to allow defining an icon color in a disabled Menu. (https://github.com/grommet/grommet/pull/7881)
- Fixed an issue with the readOnlyCopy behavior in TextInput and DateInput. (https://github.com/grommet/grommet/pull/7911)
- Fixed TextInput issue where icon was being hidden when readOnly is applied. (https://github.com/grommet/grommet/pull/7904)
- Fixed issue with TextInput inside of Tabs where the cursor was jumping to the end of the input. (https://github.com/grommet/grommet/pull/7914)

# 2.53.0

- Added `activePanel` prop to DataTableColumns component to enable only showing either the order columns or select columns panel. (https://github.com/grommet/grommet/pull/7703)
- Added `theme.dataChart.colors` to enable theme-based color specification for DataChart components. (https://github.com/grommet/grommet/pull/7864)
- Fixed `gap` type to be optional in TypeScript definitions for List component. (https://github.com/grommet/grommet/pull/7857)

# 2.52.0

- Added support for theme.meter.background. (https://github.com/grommet/grommet/pull/7842)
- Added the ability to mark background, color, and Button kind as deprecated. (https://github.com/grommet/grommet/pull/7842)
- Fixed read only behavior on Calendar with range when onSelect is not provided. (https://github.com/grommet/grommet/pull/7830)

# 2.51.0

- Fixed a Pagination regression in the List component that was introduced in v2.48.0 where onClickItem was returning incorrect items and indices when paginate prop is set. (https://github.com/grommet/grommet/pull/7834)
- Added an aria-label to the search input in Select. This label can be customized via the Grommet messages prop, messages.select.searchA11y. (https://github.com/grommet/grommet/pull/7836)
- Added aria-labels to the listboxes in Select and SelectMultiple. These labels can be customized via the Grommet messages prop, messages.select.optionsA11y and messages.selectMultiple.optionsA11y. (https://github.com/grommet/grommet/pull/7836)
- Added the Search icon to the search input in Select and SelectMultiple. This icon can be customized via the theme prop, select.icons.search. (https://github.com/grommet/grommet/pull/7836)

# 2.50.0

DataTable:

- Fixed position offset bug in DataTable for columns with pin and resizeable. (https://github.com/grommet/grommet/pull/7801)
- Fixed support for theme.dataTable.resize.border.side = 'end'. (https://github.com/grommet/grommet/pull/7804)
- Fixed bug in DataTable where the resizer gets visually cut off. (https://github.com/grommet/grommet/pull/7804)

Beta:

- Added theme.dataTable.resize.padding.vertical to control the vertical padding on the DataTable resize control. (https://github.com/grommet/grommet/pull/7804)

# 2.49.0

General:

- Added `theme.meter.gap` between meter segments to improve visual differentiation and accessibility. (#7712)

Beta:
Added theme support for the following:

- `theme.tag.hover` (#7781)
- `theme.dataChart.granularity.y` (#7779)
- `theme.spinner.responsive` (#7775)
- `theme.table.caption.margin` (#7773)
- `theme.accordion.label.container.pad` and `theme.accordion.icon.container.pad` (#7732)
- `theme.box.border.offset` (#7733)
- `theme.checkbox.gap` and `theme.checkBoxGroup.container.gap` (#7735)
- `theme.toolbar.gap` and `theme.toolbar.small.gap` (#7737)
- `theme.notification.actions.margin`, `theme.notification.message.text.margin`, and `theme.notification.gap` (#7746)
- `theme.footer.gap` (#7753)
- `theme.dataFilter.rangeSelector.size`, `theme.dataFilter.rangeSelector.round` and `theme.dataFilter.selectMultiple.dropHeight` (#7738)
- `theme.video.scrubber.thickness`, and `theme.video.time.container.pad` (#7736)
- `theme.data.drop.pad` (#7739)
- `theme.paragraph.skeleton.gap` (#7745)
- `theme.nav.gap` (#7747)
- `theme.distribution.gap` (#7752)
- `theme.list.item.gap` (#7754)
- `theme.header.gap` (#7755)
- `theme.select.search.pad` (#7759)
- `theme.cards.grid.gap` and `theme.cards.grid.column` (#7757)
- `theme.rangeSelector.label.margin` (#7742)
- `theme.dataTableColumns.tabs.pad`, `theme.dataTableColumns.selectColumns.pad`, `theme.dataTableColumns.selectColumns.gap` and `theme.dataTableColumns.orderColumns.pad` (#7750)
- `theme.dataSummary.margin` and `theme.dataSummary.separator.margin` (#7749)
- `theme.radioButtonGroup.container.gap` (#7744)
- `theme.sidebar.gap` and `theme.sidebar.pad` (#7743)
- `theme.calendar.title.container.pad.horizontal` (#7734)
- `theme.tabs.header.previousButton.pad` and `theme.tabs.header.nextButton.pad` (#7741)
- `theme.dataFilters.clearControl.margin`, `theme.dataFilters.pad` and `theme.dataFilters.width` (#7758)
- `theme.fileInput.anchor.margin` and `theme.fileInput.label.gap` (#7763)
- `theme.selectMultiple.summary.showSelectedInline.pad`, `theme.selectMultiple.summary.pad`, `theme.selectMultiple.summary.gap`, `theme.selectMultiple.summary.height`, `theme.selectMultiple.help.container.pad`, `theme.selectMultiple.search.pad`, `theme.selectMultiple.option.pad`, and `theme.selectMultiple.showMore.pad` (#7756)
- `theme.dateInput.icon.size` and `theme.dateInput.button.margin` (#7751)
- `theme.pagination.container.gap` and `theme.pagination.step.container.gap` (#7760)
- `theme.data.toolbar.gap` and `theme.dataFilters.footer.actions.margin`, and `theme.dataFilters.footer.actions?.gap` (#7768)
- `theme.dataTable.expand.size`, `theme.dataTable.sort.gap`, `theme.dataTable.search.pad`, and `theme.dataTable.search.text.pad` (#7764)
- `theme.button.busy.gap` (#7770)
- `theme.layer.container.height` (#7772)
- `theme.anchor.iconOnly.pad` (#7771)
- `theme.dataChart.thickness`, `theme.chart.width`, `theme.chart.height`, `theme.dataChart.size.height`, `theme.dataChart.gap`, `theme.dataChart.detail.gap`, `theme.dataChart.legend.margin`, `theme.dataChart.legend.gap`, `theme.dataChart.legend.item.pad`, `theme.dataChart.legend.item.gap`, `theme.dataChart.thicknessPad`. (#7762),
- `theme.dataChart.detail.pad`,`theme.dataChart.halfPad`, and `theme.dataChart.orderedSizes` (#7778)
- `theme.button.busy.icons.success` (#7784)
- `theme.dataFilters.icons.close and dataFilters.icons.filter` (#7784)
- `theme.dateInput.icon.calendar` (#7784)
- `theme.dataSearch.icons.search` (#7784)
- `theme.dataSort.icons.control` (#7784)
- `theme.dataTable.icons.resizeDecrease`, `dataTable.icons.resizeIncrease`, and `dataTable.icons.search` (#7784)
- `theme.dataTableColumns.icons.control`, `dataTableColumns.icons.pinned`, and `dataTableColumns.icons.search` (#7784)
- `theme.fileInput.icons.error` (#7784)
- `theme.starRating.icons.selected`, `theme.starRating.icons.unselected` (#7784)
- `theme.tabs.header.previousButton.icon`, `theme.tabs.header.nextButton.icon` (#7784)
- `theme.textInput.icons.copy` (#7784)
- `theme.thumbsRating.icons.like`, `theme.thumbsRating.icons.likeSelected`, `theme.thumbsRating.icons.dislikeSelected` (#7784)

# 2.48.0

General:

- Added FormField labels with CheckBoxGroup for screen reader support. (#7695)
- Added `theme.global.focus.inset` to support focus indicators in overflow-hidden components. (#7697)
- Added default close `message` to Notification. (#7667)
- Fixed Skeleton accessibility by marking it as `aria-hidden`. (#7656)
- Fixed toast Notification bug that incorrectly restored focus after disappearing. (#7683)
- Fixed incorrect formatting of Video time display. (#7690)
- Fixed Layer auto-focus behavior — pressing `esc` now exits layer. (#7709)
- Fixed Calendar to use roving tab index with focus on individual dates. (#7612)
- Enhanced screen reader reliability for repeated polite announcements in AnnounceContext. (#7708)

DataTable:

- Added support for `aria-expanded` on ExpanderCell for clearer screen reader feedback. (#7686)
- Added screen reader messages when row count changes. (#7687)
- Added `expandLabel` prop for accessible labeling of expandable rows and groups. (#7707)
- Added keyboard support for column `resize` via arrow keys. (#7702)
- Fixed to support roving tab index and visual focus on rows for `onClickRow`. (#7692)
- Enhanced `search/sort` aria support with better labeling and announcements. (#7688)
- Enhanced header `search` focus behavior — returns focus to button on `esc`. (#7694)
- Enhanced column `resizer` for touch support and WCAG-compliant alternatives to dragging. (#7714)
- Fixed target size of `resizer` to meet 24×24px minimum and improved visual alignment. (#7716)

DateInput:

- Improved DateInput focus handling — returns focus to input when drop closes. (#7612)
- Fixed DateInput so the Calendar button is disabled when the input is `disabled`. (#7719)

FileInput:

- Fixed internal button and anchor behavior and styling when input is disabled. (#7718)
- Fixed accessibility issues with screen reader announcements. (#7679)

Select / SelectMultiple:

- Added `focusIndicator` to SelectMultiple options for better keyboard navigation. (#7651)
- Added theme support via `theme.select.clear.container` for customizing focus state of clear selection button. (#7662)
- Enhanced SelectMultiple to use roving tab index for WCAG alignment. (#7673)
- Enhanced Select to retain `focus` in the drop using tab index adjustments. (#7675)
- Ensured DataSort and DataFilter correctly associate FormField labels with Select. (#7661)
- Fixed screen reader labeling when used inside FormField without `placeholder`. (#7369, #7211)

List:

- Enhanced to use roving tab index pattern for improved keyboard and mouse accessibility. (#7684)
- Added `message` support to `pinned` List items, including `pinned` columns in DataTableColumns. (#7665)

RadioButton / RadioButtonGroup:

- Added FormField labels with RadioButtonGroup for screen reader support. (#7695)
- Fixed alignment of checked icon in Safari. (#7655)

RangeSelector:

- Added theme value for customizing edge size. (#7676)
- Added a hidden input to support Safari VoiceOver for announcing slider values. (#7698)

# 2.47.0

- Added support for React 19.(https://github.com/grommet/grommet/pull/7532)
- Added aria-label to Pagination controls.(https://github.com/grommet/grommet/pull/7590)
- Added combobox props to MaskedInput with suggestions.(https://github.com/grommet/grommet/pull/7588)
- Added aria-label to the remove Button in Tag.(https://github.com/grommet/grommet/pull/7571)
- Added imageProps to Avatar.(https://github.com/grommet/grommet/pull/7570)
- Enhanced TextInput suggestions to inform button if mouse or keyboard.(https://github.com/grommet/grommet/pull/7576)
- Fixed Tip hover behavior to ensure that if additional content appears on pointer hover, users can move the pointer over the content without it disappearing. (WCAG 1.4.13 compliance).(https://github.com/grommet/grommet/pull/7596)
- Fixed Calendar responsiveness in order to scale down correctly on smaller viewports.(https://github.com/grommet/grommet/pull/7583)
- Fixed DataTable rowDetails expansion to be tracked by primary key.(https://github.com/grommet/grommet/pull/7547)

# 2.46.1

- Fixed Tip to close when escape key is pressed (https://github.com/grommet/grommet/pull/7566)
- Fixed a responsive container issue for sized boxes (https://github.com/grommet/grommet/pull/7565)

# 2.46.0

- Improved how `column` widths are tracked in a DataTable and how they are used to pin columns. (#7503)
- Added an option for `max` and `min` to pass through `width` of NameValueList. (#7509)
- Added `responsive='container'` prop to Box which sets up the ResponsiveContext and any responsive descendants such that their breakpoints are based on the width of this container rather than the entire window. Note: this feature can only be used with styled components v6 or above.
- Fixed the `remove` button in FileInput to be `disabled` when the input is `disabled`. (#7512)
- Fixed the Pagination typescript types to include `BoxTypes`. (#7524)
- Fixed the DateInput container to have `disabled` input styling when `disabled` and outside of a FormField. (#7523)
- Fixed an issue where `gap` for Box is specified as an object it won’t be adjusted at the `small` breakpoint. (#7546)

# 2.45.1

- Bumped grommet-icons dependency to v4.12.4 to resolve a bug introduced in v4.12.2. https://github.com/grommet/grommet/pull/7502

# 2.45.0

General:

- Added `theme.toggleGroup.container.extend` to allow passing custom styles to the ToggleGroup container. (https://github.com/grommet/grommet/pull/7487)
- Added `theme.dataTable.body.row.extend` to enable passing custom styles to DataTable `rows`. (https://github.com/grommet/grommet/pull/7489)
- Added ability for a compound focus indicator approach. Opt in to this approach with `theme.global.focus.twoColor`. (https://github.com/grommet/grommet/pull/7479)
- Added `theme.select.listbox.extend` and `theme.selectMultiple.listbox.extend` to allow styling of the listbox container around the `options` in Select and SelectMultiple. (https://github.com/grommet/grommet/pull/7496)
- Added `theme.notification.message.fill` to allow opt-in of the notification message filling the container instead of having a `max-width` when `direction: column`. (https://github.com/grommet/grommet/pull/7488)
- Added `theme.anchor.size[size].gap` to enable defining a `gap` for anchor based on the anchor `size`. (https://github.com/grommet/grommet/pull/7491)
- Added `theme.menu.container` to enable passing any Box props to the container around the Menu `options`. (https://github.com/grommet/grommet/pull/7494)
- Added `theme.global.radius and theme.global.breakpoint[size].radius` to allow for `radius` values to be styled independently from `edgeSize`. (https://github.com/grommet/grommet/pull/7499)
- Fixed an issue with Select hover styles still being applied after `mouseOut` event. (https://github.com/grommet/grommet/pull/7469)

FormField:

- Added `theme.formField.disabled.help.color` and `theme.formField.disabled.info.color` to the theme to allow styling the text color of the `help` and `info` sections in FormField. (https://github.com/grommet/grommet/pull/7484)
- Added `theme.formField[inputName].container.extend` to allow passing custom styles to the formField container based on the input type. (https://github.com/grommet/grommet/pull/7498)
- Added `theme.formField.focus.containerFocus` to enable an opt-in where in some cases based on if it makes sense for the input type the `focus` is managed by the child component instead of the FormField. (https://github.com/grommet/grommet/pull/7490)

# 2.44.0

General:

- Fixed console log warning with Layer. (https://github.com/grommet/grommet/pull/7460)
- Fixed StarRating to include a focus indicator when navigating with keyboard. (https://github.com/grommet/grommet/pull/7466)
- Fixed ThumbsRating to include a focus indicator when navigating with keyboard. (https://github.com/grommet/grommet/pull/7466)
- Fixed Notification status colors to meet WCAG contrast requirements. (https://github.com/grommet/grommet/pull/7472)
- Fixed FormField error text color to meet WCAG contrast requirements. (https://github.com/grommet/grommet/pull/7472)

Calendar:

- Added level prop to control the size of Heading. (https://github.com/grommet/grommet/pull/7456)
- Added calendar.day.adjacent.color to theme to enable changing the color of the text for days displayed that are outside of the current month whenshowAdjacentDays is true. (https://github.com/grommet/grommet/pull/7473)
- Fixed colors to meet WCAG contrast requirements. (https://github.com/grommet/grommet/pull/7473)

# 2.43.0

General:

- Added messages on Meter. (https://github.com/grommet/grommet/pull/7445)
- Added an announcement for max character count in FormField. (https://github.com/grommet/grommet/pull/7446)
- Fixed issue in typescript environments with Accordion useId. (https://github.com/grommet/grommet/pull/7444)
- Fixed incorrect role usage on Calendar. (https://github.com/grommet/grommet/pull/7437)
- Fixed TextInput text alignment with long options. (https://github.com/grommet/grommet/issues/7419)

List:

- Fixed accessibility violations with onOrder on List. (https://github.com/grommet/grommet/pull/7433)
- Fixed keyboard behavior so the active item is always in view. (https://github.com/grommet/grommet/pull/7448)

# 2.42.0

General:

- Added `cssGap` to propTypes and typescript for Box.(#7383)
- Enhanced Notification theme for status/kind `message` and `title` colors.(#7411)
- Enhanced Button theme with `elevation`.(#7408)
- Fixed the use of `useId` within Accordion to use a polypill `useId`.(#7405)
- Fixed the typescript for `onChange` in FileInput.(#7400)
- Fixed accessibility for Pagination to ensure that that `<ul>` does not contain any `div` elements.(#7379)
- Fixed DataSort to use the labels defined in the Data `properties`. (#7416)
- Fixed nested interactive elements accessibility issue on SelectMultiple component. (#7430)

Calendar:

- Added bolding to Calendar range of dates to meet accessibility requirements.(#7402)
- Enhanced Calendar to support additional state styles and rounding.(#7402)
- Fixed Calendar to allow for space key to be used to select dates.(#7357)

DataTable:

- Enhanced DataTable with `theme.dataTable.body.selected`.(#7384)
- Fixed space key interaction for clickable DataTable rows. (#7363)

List:

- Improved keyboard behavior by only calling `event.preventDefault()` when `onClickItem` or `onOrder` is used.(#7415)

Select:

- Added `theme.select.clear.container.hover` for Select.(#7397)
- Fixed the typescript for `onMore` in Select.(#7395)
- Fixed `aria-label` for Select.(#7376)
- Fixed a bug in Select to allow for jsx elements to be passed in Select `options` prop.(#7333)
- Fixed Select to ensure `focusIndicator` prop only works if `plain=true`. (#7353)
- Fixed nested interactive elements accessibility issue on Select component. (#7420)

Tag:

- Added a default size of `medium` for Tag to default.(#7398)
- Enhanced Tag theme for `remove` Buttons.(#7386)

ToggleGroup:

- Enhanced theme with `toggleGroup.button.kind`.(#7409)
- Enhanced ToggleGroup theme to allow divider to be removed and rounding on individual Buttons.(#7390)
- Fixed `aria-pressed` and `aria-checked` being set at the same time. (#7428)

# 2.41.0

General:

- Added `theme.button.intelligentPad` to Button. (#7307)
- Added announce feature to DataChart for `series` labels. (#7310)
- Fixed order preservation for selection in Select and SelectMultiple. (#7291)
- Fixed issue with `options` being passed as objects in SelectMultiple within DataFilter. (#7313)

Drop:

- Added a check to respect the `autoFocus` setting within Drop. (#7322)
- Fixed `trapFocus` behavior to ensure focus remains within the container. (#7324)
- Fixed Drop positioning. (#7320)

# 2.40.2

- Removed the use of the useId hook, which is only available in React 18. (https://github.com/grommet/grommet/pull/7345)

# 2.40.1

- Resolved a performance issue cause by the styled components attrs function. ([#7304](https://github.com/grommet/grommet/pull/7304))
- Fixed an issue with Drop to prevent clicks on target from triggering onClickOutside. ([#7300](https://github.com/grommet/grommet/pull/7300))
- Fixed an accessibility issue with Accordion so that the AccordionPanel region has an accessible name. ([#7295](https://github.com/grommet/grommet/pull/7295))

# 2.40.0

- Added defaultVisible prop to Tip to control the initial visibility of the tooltip. (https://github.com/grommet/grommet/pull/7255)
- Added showIndex boolean prop to List to control whether the index number for the list item is displayed when using onOrder. (https://github.com/grommet/grommet/pull/7271)
- Added view.columns to Data to track the visibility of columns in DataTableColumns and DataTable. (https://github.com/grommet/grommet/pull/7281)

# 2.39.0

- Added theme option of anchor.icon.color. (https://github.com/grommet/grommet/pull/7236)
- Added tip to options for ToggleGroup. (https://github.com/grommet/grommet/pull/7258)
- Added support for React 18.3.0. (https://github.com/grommet/grommet/pull/7257)

# 2.38.0

- Added support for styled-components v6.

This release is compatible with both styled components v5 and v6. Please note that if you are upgrading to styled components v6 there are various changes to be aware of. Refer to the styled components migration guide: https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v6.
One major difference in styled-components v6 is the removal of CSS vendor prefixes by default since most CSS styles have broad cross-browser support. If you’d like to enable vendor prefixes for your project, you can do so following the steps provided in the [styled components migration guide](https://styled-components.com/docs/faqs#vendor-prefixes-are-omitted-by-default).

# 2.37.0

- NEW ToggleGroup component. (https://github.com/grommet/grommet/pull/7172)
- Added pinned to DataTableColumns options to allow pinning of specific columns in “Order columns”. (https://github.com/grommet/grommet/pull/7193)
- Enhanced List pinned to accept object containing icon, background, color, and items. (https://github.com/grommet/grommet/pull/7213)
- Added extend to Skeleton theme. (https://github.com/grommet/grommet/pull/7176)
- Fixed FormField error when child is null. (https://github.com/grommet/grommet/pull/7181)
- Fixed Regex for autofocusing tags. (https://github.com/grommet/grommet/pull/7174)
- Fixed List TypeScript types. (https://github.com/grommet/grommet/pull/7164)
- Fixed Box round not respecting responsive={false}. (https://github.com/grommet/grommet/pull/7187)
- Fixed select all behavior across Data views. (https://github.com/grommet/grommet/pull/7200)
- Fixed DataSearch to ensure search event returns to page 1 of matched search results. (https://github.com/grommet/grommet/pull/7208)
- Fixed Pagination step to allow it to be controlled. (https://github.com/grommet/grommet/pull/7188)

# 2.36.0

General:

- Added rangeInput.wheel to theme to allow for opting out of the scroll wheel behavior on RangeInput. (https://github.com/grommet/grommet/pull/7130)
- Added summary and stepOptions to Pagination. (https://github.com/grommet/grommet/pull/7133)
- Added a readOnlyCopy boolean prop to TextInput and DateInput to support a copy to clipboard button within a readOnly input. (https://github.com/grommet/grommet/pull/7123)
- Enhanced validation prop in FormField to allow easier implementation of a character counter by passing an object with max and threshold to the validate prop (https://github.com/grommet/grommet/pull/6550)
- Enhanced Box gap to accept an object with row and column. (https://github.com/grommet/grommet/pull/7147)
- Enhanced TextInput and DateInput to allow for readOnly styling through the theme property global.input.readOnly. (https://github.com/grommet/grommet/pull/7123)
- Fixed Form submit validation to run when submit if fired directly on an input. (https://github.com/grommet/grommet/pull/7148)
- Fixed an issue where Anchor with an icon contains extra space. (https://github.com/grommet/grommet/pull/6534)
- Fixed dropHeight of SelectMultiple in DataFilter. (https://github.com/grommet/grommet/pull/7157)

List:

- Added list.primaryKey to theme to enable primaryKey styling. (https://github.com/grommet/grommet/pull/7136)
- Enhanced to prevent scrolling when interacting with onOrder button via keyboard. (https://github.com/grommet/grommet/pull/7144)
- Enhanced keyboard accessibility when using onOrder. (https://github.com/grommet/grommet/pull/7140)

# 2.35.0

NEW Data components for turn-key implementations of complex filtering, searching, and sorting data collections.

The following components have now been move out of “beta” and are available for production use:

- Data
- DataClearFilters
- DataFilter
- DataFilters
- DataSearch
- DataSort
- DataSummary
- DataTableColumns
- DataTableGroupBy
- DataView
- Toolbar
- Cards

General:

- Added Typescript types for Tag component. [(#7099](https://github.com/grommet/grommet/pull/7099))
- Fixed `label` leaking as attribute in Checkbox. ([#7101](https://github.com/grommet/grommet/pull/7101))
- Fixed groupHeader theming properties for DataTable. ([#6986](https://github.com/grommet/grommet/pull/6986))

SelectMultiple:

- Enhanced to enable more options to be added via `onSearch`. ([#7079](https://github.com/grommet/grommet/pull/7079))
- Added configurable i18n support. ([#7009](https://github.com/grommet/grommet/pull/7009))

StarRating:

- Fixed the Typescript issue where not all RadioButtonGroup props were supported. ([#7073](https://github.com/grommet/grommet/pull/7073))
- Fixed issue where value was not synced with Form. ([#7077](https://github.com/grommet/grommet/pull/7077))

# 2.34.2

General:

- Fixed Typescript type for Box `onClick` prop. ([#7018](https://github.com/grommet/grommet/pull/7018))
- Fixed Select focus when using `search` in Select. ([#6901](https://github.com/grommet/grommet/issues/6901))
- Fixed NameValueList to account for theme-defined breakpoints. ([#7047](https://github.com/grommet/grommet/pull/7047))

Beta:

- Added NEW DataClearFilters component. ([#7025](https://github.com/grommet/grommet/pull/7025))
- Added default `aria-label` for DataFilter inputs. ([#7038](https://github.com/grommet/grommet/pull/7038))
- Enhanced Data to include screen reader announcements when data changes. ([#7010](https://github.com/grommet/grommet/pull/7010))
- Enhanced DataFilter range to allow users to specify `step`. (https://github.com/grommet/grommet/pull/6942)
- Enhanced DataSummary `message` to better support plural and singular grammar. ([#7022](https://github.com/grommet/grommet/pull/7022/files))
- Enhanced DataFilter range to be inclusive of bounds. ([#7026](https://github.com/grommet/grommet/pull/7026))
- Enhanced the DataFilter and RangeSelector to better handle floating point values. ([#7033](https://github.com/grommet/grommet/pull/7033))
- Changed DataFilters default presentation to be `layer` when presented using Data `toolbar` prop to align with design best practices. ([#7057](https://github.com/grommet/grommet/pull/7057))
- Fixed handling of multi-level property names that are used as RangeSelectors in filters. ([#7049](https://github.com/grommet/grommet/pull/7049))
- Fixed DataSearch within a Layer to render with the correct form label. ([#7053](https://github.com/grommet/grommet/pull/7053))
- Fixed RangeSelector to render with no errors when used in a controlled form. ([#7045](https://github.com/grommet/grommet/pull/7045))
- Updated DataTableColumns prop types and typescript types. ([#7028](https://github.com/grommet/grommet/pull/7028))

# 2.34.1

- Fixed keyboard focus issue on RadioButtonGroup. (https://github.com/grommet/grommet/pull/7011)
- Fixed Form submission bubbling issue when a portal containing a Form is the child of another Form. (https://github.com/grommet/grommet/pull/7005)

# 2.34.0

General:

- Added radiobutton.check.background.color to RadioButton. (https://github.com/grommet/grommet/pull/5243)
- Added level prop to PageHeader. (https://github.com/grommet/grommet/pull/6952)
- Added tag.icon.remove to Tag to allow the remove icon to be provided from the theme. (https://github.com/grommet/grommet/pull/6960)
- Added allowSelectAll prop to DataTable to have the option to not have the select all CheckBox in the header cell. (https://github.com/grommet/grommet/issues/6843)
- Fixed DataFilter to show all filter options. (https://github.com/grommet/grommet/pull/6943)
- Fixed DropContainer position. (https://github.com/grommet/grommet/pull/6097)

Typescript:

- Fixed types for onChange RangeSelector. (https://github.com/grommet/grommet/pull/6970)
- Fixed types for Grommet messages. (https://github.com/grommet/grommet/pull/6956)
- Fixed types for Box onClick. (https://github.com/grommet/grommet/pull/6983)
- Fixed types for Chart onClick and onHover. (https://github.com/grommet/grommet/pull/6984)

# 2.33.2

General:

- Fixed issue on Layer component when removing a Layer. (#6889)
- Fixed an issue where the MaskedInput value shows as undefined when the value property isn’t supplied and a non-matching character is input. (#6900)
- Fixed re-sizing issue in TextArea where the TextArea can be stretched horizontally beyond the parent container size. (#6924)
- Fixed Drop positioning when scrolling. (#6933)
- Fixed bug where Menu groups were collapsing when Menu had a scroll due to limited vertical space. (#6931)

Beta:

- Fixed Data’s flatten function to allow filtering on multiple sub properties of same parent property. (#6934)

# 2.33.1

- Fixed issue in SelectMultiple with empty options. (https://github.com/grommet/grommet/pull/6895)
- Fixed issue with filtering DataTableColumns. (https://github.com/grommet/grommet/pull/6881)

# 2.33.0

General:

- Added direction prop to DataChart to support displaying charts horizontally. (#6799)
- Added menu.item.align property to the theme. (#6835)
- Updated DataTable primaryKey behavior to align behavior for undefined and null. (#6865)
- Fixed an issue in Select with the display of the valueLabel when value={0}. (#6833)
- Fixed issue with Menu control displaying twice when align.bottom = 'top'. (#6844)
- Fixed an issue in DateInput where the value is not reset in an uncontrolled Form. (#6834)

Beta:

- Changed DataFilter to automatically add search to SelectMultiple when more than 10 options. (#6802)
- Fix issue in DataSort when data is empty. (#6866)

# 2.32.2

- Added theme.select.emptySearchMessage prop to allow styling of the empty search message container and text in Select and SelectMultiple. (https://github.com/grommet/grommet/pull/6815)
- Added RTL support to Meter with the reverse prop. (https://github.com/grommet/grommet/pull/6398)
- Fixed typescript type for Select searchPlaceholder. (https://github.com/grommet/grommet/pull/6811)
- Fixed issue with displaying truncated text showing in a Tip in DataTable. (https://github.com/grommet/grommet/pull/6682)
- Fixed issue introduced in v2.30.0 where the Layer would not restrict scroll when modal={true}. (https://github.com/grommet/grommet/pull/6801)
- Fixed issue in CheckBox where check mark was exceeding parent bounds when padding applied with fill={true}. (https://github.com/grommet/grommet/pull/6819)

# 2.32.1

General:

- Fixed an issue with DataTable `groupBy` when `value` is 0 (#6770).
- Fixed issue when RadioButtonGroup `defaultValue` is 0 and retrieve correct selected value in `onChange` using `event.value` instead of `event.target.value` (#6752).
- Fixed issue that caused an infinite loop when updating component state on ref callback (#6793).
- Fixed an issue in Drop where we tried to access `dropRef.current.style` without first checking if `dropRef.current` is defined (#6804).
- Specified `use client` when exporting Grommet components so that they can be imported into a project using React Server Components (#6797).

Beta:

- Changed DataContext to fix an issue with using the default value (#6775).
- Changed DataFilter to handle properties with zero or one values (#6795).

# 2.32.0

General:

- Added support to Box for using `border` between in a `border` array. ([#6642](https://github.com/grommet/grommet/pull/6642))
- Added `level` prop to Accordion to control what semantic heading should be rendered. ([#6754](https://github.com/grommet/grommet/pull/6754))
- Added `busy`, `messages`, and `success` props to Button to support an animation while button is loading and when the button action succeeds. ([#6656](https://github.com/grommet/grommet/pull/6656))
- Changed `status-error` color to meet accessibility contrast requirements. ([#6690](https://github.com/grommet/grommet/pull/6690))
- Enhanced FormField to allow triggering validation at the FormField level. ([#5943](https://github.com/grommet/grommet/pull/5943))
- Fixed issues using Grommet in a shadow root. ([#6698](https://github.com/grommet/grommet/pull/6698))
- Fixed issue in DateInput when deselecting a date. ([#6693](https://github.com/grommet/grommet/pull/6693))
- Fixed display of NameValueList with gird layout in Safari. ([#6691](https://github.com/grommet/grommet/pull/6691))
- Fixed FileInput focus traversal. ([#6391](https://github.com/grommet/grommet/pull/6391))
- Fixed issue where NameValueList’s align prop was ignored. ([#6722](https://github.com/grommet/grommet/pull/6722))

DataTable:

- Changed DataTable to use a primaryKey value as the row key. ([#6742](https://github.com/grommet/grommet/pull/6742))
- Fixed an issue with disabled rows and lazy loading. ([#6706](https://github.com/grommet/grommet/pull/6706))
- Fixed issue where `border` is not applied to CheckBox cells. ([#6718](https://github.com/grommet/grommet/pull/6718))
- Fixes an issue where the second argument (‘datum’) passed to `onSelect` was always undefined. ([#6750](https://github.com/grommet/grommet/pull/6750))

SelectMultiple:

- Fixed a bug where the drop would scroll back to the top after selecting an option. ([#6735](https://github.com/grommet/grommet/pull/6735))
- Fixed an issue when using object options and `showSelectedInline`. ([#6738](https://github.com/grommet/grommet/pull/6738))

Typescript:

- Fixed type error on List’s `children` prop. ([#6687](https://github.com/grommet/grommet/pull/6687))

Data: (beta)

- Changed DataFilters to use Tip. ([#6707](https://github.com/grommet/grommet/pull/6707))
- New DataTableGroupBy component. ([#6749](https://github.com/grommet/grommet/pull/6749))
- Fixed an issue in Data with filtering when filter value is an object. ([#6725](https://github.com/grommet/grommet/pull/6725))
- Added support to Data’s filtering for when a property is an array. ([#6704](https://github.com/grommet/grommet/pull/6704))
- Added a default tooltip to DataTableColumns. ([#6746](https://github.com/grommet/grommet/pull/6746))

# 2.31.0

General:

- Added theme.icon.matchSize to use a component’s size property as the size property value on its icon. (https://github.com/grommet/grommet/pull/6653)
- Added theme.icon.disableScaleDown to theme Typescript definition. (https://github.com/grommet/grommet/pull/6668)
- Added responsive behavior to PageHeader subtitle so it sizes down to medium at small breakpoint. (https://github.com/grommet/grommet/pull/6689)
- Fixed Checkbox children Typescript definition. (https://github.com/grommet/grommet/pull/6648)
- Fixed FormField to allow fields to flex. (https://github.com/grommet/grommet/issues/6669)

Button:

- Added pad property. (https://github.com/grommet/grommet/pull/6686)
- Added theme.button.badge.align to allow a theme to specify if the badge should align to the button’s edge. (https://github.com/grommet/grommet/pull/6692)
- Fixed a bug with calculation of badge dimensions. (https://github.com/grommet/grommet/pull/6692)
- Fixed a bug with how Safari renders SVGs in icon-only buttons to ensure no additional vertical height is added. (https://github.com/grommet/grommet/pull/6666, https://github.com/grommet/grommet/pull/6702)

SelectMultiple:

- Fixed to use theme-defined icon in dropdown. (https://github.com/grommet/grommet/pull/6680)
- Fixed styling of help text. (https://github.com/grommet/grommet/pull/6685)

Beta features:

- Updated DataView placeholder to ”Select view” to align with placeholder conventions. (https://github.com/grommet/grommet/pull/6673)
- Fixed a bug with DataForm overflow. (https://github.com/grommet/grommet/pull/6672)

# 2.30.0

General:

- Fixed DropButton to use the correct `dropTarget` when opened. ([#6613](https://github.com/grommet/grommet/pull/6613))
- Fixed Drop `position` to display correctly on the screen when a portion of the Drop is not visible. ([#6611](https://github.com/grommet/grommet/pull/6611))
- Fixed error on FormField when focus leaves a field and doesn’t move to a new element. ([#6592](https://github.com/grommet/grommet/pull/6592))
- Fixed WorldMap so `places` show in the correct position after a re-render. ([#6587](https://github.com/grommet/grommet/pull/6587))
- Enhanced `header.skeleton.width` in the theme to have a `min` and `max` width. ([#6603](https://github.com/grommet/grommet/pull/6603))
- Enhanced Calendar to allow the user to specify different Text properties for the month and year with the theme property `calendar[size].title`. ([#6639](https://github.com/grommet/grommet/pull/6639))
- Enhanced Anchor theme to support `anchor.size[size].color`, `anchor.size[size].fontWeight` and `anchor.size[size].textDecoration` at different Anchor sizes. ([#6643](https://github.com/grommet/grommet/pull/6643))
- Added `width` prop to TextInput. ([#6624](https://github.com/grommet/grommet/pull/6624))
- Added `theme.tabs.header.alignSelf` to allow the theme to drive alignment of Tabs header along axis. ([#6649](https://github.com/grommet/grommet/pull/6649))
- Changed Distribution to handle undefined values better. ([#6650](https://github.com/grommet/grommet/pull/6650))

Button:

- Fixed text color when `background` is dark. ([#6629](https://github.com/grommet/grommet/pull/6629))
- Added `theme.button[kind].direction` to allow the theme to drive the direction of icon + label. ([#6606](https://github.com/grommet/grommet/pull/6606))
- Added `theme.button.size[size].iconOnly.pad` which allows the caller to specify padding for icon only Buttons across different Button sizes. ([#6604](https://github.com/grommet/grommet/pull/6604))

DataTable:

- Fixed DataTable to not default `height` to 100%. ([#6590](https://github.com/grommet/grommet/pull/6590))
- Enhanced `rowProps` to target group header rows. ([#6627](https://github.com/grommet/grommet/pull/6627))
- Fixed `size` to accept any CSS string. ([#6622](https://github.com/grommet/grommet/pull/6622))

Layer:

- Added `layer.overlay.backdropFilter` to the theme which supports passing a string value for any CSS supported backdrop-filter. ([#6605](https://github.com/grommet/grommet/pull/6605))
- Fixed an issue where scrolling is disabled at certain viewport widths. ([#6632](https://github.com/grommet/grommet/pull/6632))

Beta:

- Fixed DataFilter to accept the `range` prop and convert the correct values. ([#6631](https://github.com/grommet/grommet/pull/6631))
- Fixed Pagination with propagating step and page properties to Data view. ([#6616](https://github.com/grommet/grommet/pull/6616))
- Fixed DataTableColumns behavior when Data does not contain `updateOn=’change’`([#6617](https://github.com/grommet/grommet/pull/6617))
- Enhanced DataSearch to add `drop` and `responsive` props. ([#6633](https://github.com/grommet/grommet/pull/6633))
- Added `overflow` prop to DataFilters. ([#6634](https://github.com/grommet/grommet/pull/6634))
- Added `drop` prop to DataSort. ([#6628](https://github.com/grommet/grommet/pull/6628))
- Added `layer` prop to DataFilters. ([#6600](https://github.com/grommet/grommet/pull/6600))
- Changed Data to handle property paths. ([#6645](https://github.com/grommet/grommet/pull/6645))

# 2.29.1

General:

- Fixed regression in FormField where autoFocus attribute causes TypeError. ([#6577](https://github.com/grommet/grommet/pull/6577))
- Fixed an issue where Drop’s scroll position gets reset after a style change occurs in the drop. ([#6575](https://github.com/grommet/grommet/pull/6575))
- Fixed an issue where onBlur validation was running prematurely on components with drops. ([#6566](https://github.com/grommet/grommet/pull/6566))
- Fixed bug in SelectMultiple where ‘Clear All’ does not work with reduce: true in valueKey . ([#6557](https://github.com/grommet/grommet/pull/6557))
- Removed unnecessary focus on List click. ([#6579](https://github.com/grommet/grommet/pull/6579))

TypeScript:

- Fixed DataTable onSearch argument to use object type. ([#6582](https://github.com/grommet/grommet/pull/6582))

Beta:

- New DataTableColumns component. ([#6558](https://github.com/grommet/grommet/pull/6558))

# 2.29.0

General:

- NEW StarRating component. (https://github.com/grommet/grommet/pull/6529)
- NEW ThumbsRating component. (https://github.com/grommet/grommet/pull/6529)
- Added kind prop to Form. (https://github.com/grommet/grommet/pull/6529)
- Added option to use CSS gap with Box. (https://github.com/grommet/grommet/pull/6181)
- Fixed issue in DataTable where search causes large horizontal shift in the header. (https://github.com/grommet/grommet/pull/6536)
- Fixed issue with animation when Collapsible is initially set to open. (https://github.com/grommet/grommet/pull/6535)
- Fixed an issue with useForwardedRef that was causing an unnecessary re-render. (https://github.com/grommet/grommet/pull/6564)
- Enhanced DOM functions to fix shadow root bug in FormField. (https://github.com/grommet/grommet/pull/6562)
- Enhanced accessibility for FormFields with requiredIndicator. (https://github.com/grommet/grommet/pull/6540)

Typescript:

- Fixed Select typing to omit readOnly. (https://github.com/grommet/grommet/pull/6538)
- Fixed Select value type definition to include number. (https://github.com/grommet/grommet/pull/6537)

Beta:

This release includes some new components that are in Beta mode. These components are not yet documented as we are anticipating that we will be making adjustments to them. We reserve the right to change the API structure without following semantic versioning rules. Feel free to test out the components and provide any feedback through GitHub tickets or Slack.
New Beta components: Cards, Data, DataFilter, DataFilters, DataSearch, DataSort, DataSummary, Toolbar. (https://github.com/grommet/grommet/pull/6343)

# 2.28.0

General:

- NEW Skeleton component. ([#6318](https://github.com/grommet/grommet/pull/6318))
- Added auto as option for Grommet’s themeMode prop. ([#6397](https://github.com/grommet/grommet/pull/6397))
- Added baseline as an accepted value for the alignSelf prop. ([#6413](https://github.com/grommet/grommet/pull/6413))
- Enhanced FileInput to recognize user operating system for maxSize calculation. ([#6427](https://github.com/grommet/grommet/pull/6427))
- Changed DataChart to better align legend style with chart style. ([#6411](https://github.com/grommet/grommet/pull/6411))
- Changed Table to accept a ref. ([#6416](https://github.com/grommet/grommet/pull/6416))
- Changed SelectMultiple’s select all and clear all buttons to show when searching. ([#6456](https://github.com/grommet/grommet/pull/6456))
- Changed Select to fix an issue with null value. ([#6479](https://github.com/grommet/grommet/pull/6479))
- Fixed SkipLinks to filter out undefined children. ([#6402](https://github.com/grommet/grommet/pull/6402))
- Fixed issues with itemKey being a function when ordering in List. ([#6478](https://github.com/grommet/grommet/pull/6478))
- Fixed an issue with Layer when using a custom containerTarget. ([#6457](https://github.com/grommet/grommet/pull/6457))
- Fixed issue where RangeInput within a FormField was off-center. ([#6494](https://github.com/grommet/grommet/pull/6494))
- Fixed an issue when using border=‘between’ and gap size in pixels on Box. ([#6490](https://github.com/grommet/grommet/pull/6490))
- Fixed an issue with Drop when using a custom containerTarget. ([#6450](https://github.com/grommet/grommet/pull/6450))
- Fixed DataTable with pinned header and paginate. ([#6501](https://github.com/grommet/grommet/pull/6501))

Calendar:

- Fixed issue where the incorrect timezone offset was being applied. ([#6424](https://github.com/grommet/grommet/pull/6424))
- Fixed on blur validation. ([#6436](https://github.com/grommet/grommet/pull/6436))
- Fixed next/back arrows disabled when date is out of bounds. ([#6156](https://github.com/grommet/grommet/pull/6156))

DateInput:

- Fixed issue with range format and no value. ([#6408](https://github.com/grommet/grommet/pull/6408))
- Fixed issue where bounds were not respected. ([#6438](https://github.com/grommet/grommet/pull/6438))
- Fixed issue where the incorrect timezone offset was being applied. ([#6424](https://github.com/grommet/grommet/pull/6424))

Notification:

- Added time prop. ([#6462](https://github.com/grommet/grommet/pull/6462))
- Added icon prop. ([#6389](https://github.com/grommet/grommet/pull/6389))

Typescript:

- Fixed typescript definition of zIndex theme property of Drop. ([#6472](https://github.com/grommet/grommet/pull/6472))
- Fixed typescript definition for rowDetails in DataTable. ([#6486](https://github.com/grommet/grommet/pull/6486))
- Fixed typescript definition for Tip’s dropProps. ([#6431](https://github.com/grommet/grommet/pull/6431))
- Fixed typescript definition for FileInput’s onChange prop. ([#6418](https://github.com/grommet/grommet/pull/6418))
- Fixed typescript definition of drop props in various components. ([#6463](https://github.com/grommet/grommet/pull/6463))

# 2.27.0

General:

- Updated to Webpack 5. (https://github.com/grommet/grommet/pull/6329)
- Added global.font.variant to theme. (https://github.com/grommet/grommet/pull/6327)
- Added a11yTitle prop to Avatar. (https://github.com/grommet/grommet/pull/6353)
- Enhanced Notification to accept a node type for message prop. (https://github.com/grommet/grommet/issues/6320)
- Enhanced CheckBox to accept theme.checkBox.hover. (https://github.com/grommet/grommet/pull/6355)
- Enhanced DateInput to accept theme.dateInput.container.round to control rounding. (https://github.com/grommet/grommet/pull/6385)
- Fixed RadioButton to accept a custom theme icon. (https://github.com/grommet/grommet/issues/6263)
- Fixed Select bug when valueKey is not specified. (https://github.com/grommet/grommet/pull/6392)
- Fixed DataChart to not show detail for missing value. (https://github.com/grommet/grommet/pull/6404)

SelectMultiple:

- Fixed object comparison. (https://github.com/grommet/grommet/pull/6403)
- Fixed behavior when providing array of objects to options. (https://github.com/grommet/grommet/pull/6359)

List:

- Fixed layout when action and onOrder are defined. (https://github.com/grommet/grommet/pull/6350)
- Fixed onOrder dragging behavior bug. (https://github.com/grommet/grommet/pull/6386)

TypeScript:

- Fixed DataTable groupBy keys to optional. (https://github.com/grommet/grommet/pull/6400)

# v2.26.0

General:

- NEW SelectMultiple component. (https://github.com/grommet/grommet/pull/6275)
- Added global.backgrounds to the theme allowing theme-defined backgrounds. (https://github.com/grommet/grommet/pull/6310)
- Added defaultValue prop to CheckBoxGroup. (https://github.com/grommet/grommet/pull/6331)
- Added pinned prop to List allowing list items to be pinned in place when reordering. (https://github.com/grommet/grommet/pull/6249)
- Fixed Heading text to wrap by default. (https://github.com/grommet/grommet/pull/6296)
- Fixed Notification theme’s default to have proper background. (https://github.com/grommet/grommet/pull/6336)

Select:

- Fixed Select to trigger validation when value is an array. (https://github.com/grommet/grommet/pull/6316)
- Fixed Select to allow initial value to be null. (https://github.com/grommet/grommet/pull/6324)

# v2.25.3

- Moved TestCafe dependencies into devDependencies. (https://github.com/grommet/grommet/pull/3612)

# v2.25.2

General:

- Added formField.checkBox.pad as a theme option to add pad to CheckBox when wrapped in FormField. (https://github.com/grommet/grommet/pull/6300)
- Added weight prop to Heading. (https://github.com/grommet/grommet/pull/6294)
- Added size to PageHeader. (https://github.com/grommet/grommet/pull/6279)
- Fixed Menu types and added menu.item prop for Menu theme. (https://github.com/grommet/grommet/pull/6241)
- Fixed Spinner to obtain the correct size on different screen sizes. (https://github.com/grommet/grommet/pull/6277)
- Fixed circle Meter angle calculation for larger values. (https://github.com/grommet/grommet/pull/6293)
- Enhanced Tab to be resilient to not be contained in Tabs. (https://github.com/grommet/grommet/pull/6274)

Button:

- Enhanced Button to allow the user to specify icon for kind in theme. (https://github.com/grommet/grommet/pull/6297)
- Fixed TypeScript theme type for Button. (https://github.com/grommet/grommet/pull/6298)

DataTable:

- Fixed TS error for border in DataTable. (https://github.com/grommet/grommet/pull/6253)
- Fixed DataTable sort when some attributes are null. (https://github.com/grommet/grommet/pull/6282)
- Fixed sort icon to update on re-render. (https://github.com/grommet/grommet/pull/6307)

Select:

- Fixed an issue when options are set to objects and no labelKey or valueKey is provided. (https://github.com/grommet/grommet/pull/6299)
- Fixed an issue where all the options were not being loaded when clear={true}. (https://github.com/grommet/grommet/pull/6285)

# v2.25.1

General:

- Added focus to the Video progress bar. [#6195](https://github.com/grommet/grommet/pull/6195)
- Fixed CheckBox aria-label to be directly on input. [#6215](https://github.com/grommet/grommet/pull/6215)
- Fixed Image onLoad. [#6217](https://github.com/grommet/grommet/pull/6217)
- Fixed Form validation for added/removed inputs. [#6227](https://github.com/grommet/grommet/pull/6227)
- Fixed FormField debounce function to not execute if the FormField is unmounted. [#6226](https://github.com/grommet/grommet/pull/6226)
- Fixed rendering of Tab header in a fixed height container. [#6239](https://github.com/grommet/grommet/pull/6239)
- Fixed Calendar and DateInput timezone/daylight savings bugs. [#6214](https://github.com/grommet/grommet/pull/6214)

Typescript:

- Added digital Clock type. [#6220](https://github.com/grommet/grommet/pull/6220)
- Added support for string to theme.focus.shadow. [#6234](https://github.com/grommet/grommet/pull/6234)
- Fixed TypeScript definition on Menu items. [#6237](https://github.com/grommet/grommet/pull/6237)
- Fixed TypeScript definition for Card. [#6203](https://github.com/grommet/grommet/pull/6203)

DataChart:

- Fixed detail pad. [#6206](https://github.com/grommet/grommet/pull/6206)
- Fixed support of negative values. [#6246](https://github.com/grommet/grommet/pull/6246)
- Removed IE11 specific support.[#6240](https://github.com/grommet/grommet/pull/6240)

FileInput:

- Fixed cursor behavior. [#6154](https://github.com/grommet/grommet/pull/6154)
- Fixed scroll behavior when pressing space. [#6194](https://github.com/grommet/grommet/pull/6194)

# v2.25.0

General:

- Enhanced Menu items to allow for grouped items ([#6162](https://github.com/grommet/grommet/pull/6162)).
- Enhanced FileInput to include event.target.files in onRemove ([#6136](https://github.com/grommet/grommet/pull/6136)).
- Added reverse to DateInput to allow control of icon placement ([#6160](https://github.com/grommet/grommet/pull/6160)).
- Added accordion.hover.background to theme ([#6177](https://github.com/grommet/grommet/pull/6177)).
- Added new responsive behavior for Tabs ([#6137](https://github.com/grommet/grommet/pull/6137)).
- Added maxLines prop to Paragraph ([#6207](https://github.com/grommet/grommet/pull/6201)).
- Added info as status type on Notification ([#6211](https://github.com/grommet/grommet/pull/6201)).
- Improved DataChart rendering of swatches for detail and legend ([#6173](https://github.com/grommet/grommet/pull/6173)).
- Changed MaskedInput to restore to prior value when mask does not match ([#6174](https://github.com/grommet/grommet/pull/6174)).
- Changed Meter to handle floating point precision issues better ([#6191](https://github.com/grommet/grommet/pull/6191)).
- Fixed PageHeader typescript export ([#6180](https://github.com/grommet/grommet/pull/6180))
- Fixed Button to allow as to accept elementType ([#6172](https://github.com/grommet/grommet/pull/6172)).
- Fixed incorrect row highlight behavior in DataTable ([#6189](https://github.com/grommet/grommet/pull/6189)).

# v2.24.0

General:

- NEW PageHeader Component. [#6071](https://github.com/grommet/grommet/pull/6071)
- Enhanced TextInput accessibility by adding combobox and listbox ARIA roles. [#6079](https://github.com/grommet/grommet/pull/6079)
- Enhanced Anchor theme with anchor.gap. [6114](https://github.com/grommet/grommet/pull/6114)
- Enhanced Video to support audio description track. [#6080](https://github.com/grommet/grommet/pull/6080)
- Fixed Notifications to pass additional properties. [#6139](https://github.com/grommet/grommet/pull/6139)
- Fixed Tip to respect onMouseEnter, onMouseLeave onFocus and onBlurfunctions from its child. [#6109](https://github.com/grommet/grommet/pull/6106)
- Fixed DataTable layout in Firefox to not set the table-layout to fixed by default. [#6108](https://github.com/grommet/grommet/pull/6108)
- Fixed Layer and Drop onClickOutside so that click location is properly registered in shadow DOM. [#6120](https://github.com/grommet/grommet/pull/6120)
- Fixed onChange type for FileInput. [#6145](https://github.com/grommet/grommet/pull/6145)

List:

- Added onActive. [#6103](https://github.com/grommet/grommet/pull/6103)
- Added disabled. [#6111](https://github.com/grommet/grommet/pull/6111)

Select:

- Fixed bug so search term persists after an option is selected when closeOnChange={false}. [#6147](https://github.com/grommet/grommet/pull/6147)
- Fixed keyboard navigation in Select with search. [#6101](https://github.com/grommet/grommet/pull/6101)

# v2.23.0

General:

- Added support for React 18. (#6066)
- Dropped support for Node 12. (#6069)
- Added ability to pass in a11yTitle or aria-label for List. (#6048)
- Added ability to pass in a11yTitle in dropProps for Menu. (#6033)
- Added sticky prop to Header. (#6024)
- Fixed RTL support for CheckBox when toggle={true}. (#6074)
- Fixed as prop on Box to accept any React element. (#6038)

DataChart:

- Added offset gap. (#6041)
- Fixed an issue when there is only one datum. (#6082)

DataTable:

- Enhanced to allow both onClickRow and onSelect. (#6084)
- Added verticalAlign prop. (#6076)
- Added disabled prop. (#6070)
- Changed sortable icon to appear after the column units. (#6063)
- Fixed hover indicator to fill header cell. (#6086)

Select:

- Fixed clear button filling vertically on Firefox. (#6095)
- Fixed search to handle fast typing. (#6030)
- Fixed clear button to only show when Select has a value. (#6042)

Video:

- Enhanced to allow moving along Video timeline with keyboard. (#6035)
- Fixed captions to correctly display. (#6072)
- Fixed pause control to be disabled if Video is already paused or disable play if Video is already playing. (#6037)

# v2.22.0

General:

- NEW! Page and PageContent components. (#5960)
- Fixed DataTable placeholder to be visible. (#5987)
- Fixed typescript typing for radioButton.check.color. (#6014)
- Fixed issue where a RangeInput within a FormField received double focus. (#6004)
- Changed Box to fix an issue with desired height using an object. (#5996)
- Changed Tip to not crash without children. (#5969)
- Changed Drop to add container inline. (#6034)
- Allow for TableCell to receive an array of objects as border prop. (#5774)
- Added restrictToOptions to mask object in MaskedInput to restrict continued invalid typing. (#5894)
- Improved how Calendar handles daylight savings time. (#5997)
- Improved Select accessibility by allowing keyboard access to clear button. (#5972)
- Improved Menu accessibility through defining ARIA roles and attributes. (#5982)

DateInput:

- Changed DateInput to prevent it from scrolling down the page when opening with space. (#6022)
- Improved logic for when to normalize the date in DateInput. (#5942)

Select:

- Fixed name prop in Select component when using valueLabel. (#6031)
- Enhanced valueLabel in Select to accept a function. (#6020)
- Fixed display of selected option when labelKey is a function. (#6020)

Notification:

- Changed Notification to include event in onClose. (#5975)
- Enhanced Notification to support onClick, href, truncation, and directional layout of title/message. (#5958)
- Added global prop. (#5958)
- Fixed position of toast Notification when viewed on a small screen. (#6008)

DataChart:

- Changed DataChart to add placeholder prop. (#5977)
- Changed DataChart to insure guide for the y-dimension encompasses thickness. (#5980)
- Changed DataChart to align placeholder styling with DataTable. (#5981)

# v2.21.0

General:

- Added itemKey prop to List to allow users to specify a key for list items. (#5872)
- Added size prop to Tag. (#5914)
- Added the ability to change the gap between an icon and label in a Button through button.gap in the theme. (#5906)
- Fixed TextInput jumping scroll behavior. (#5927)
- Fixed Markdown options.wrapper so it is not overridden as a Fragment. (#5946)
- Enhanced RangeInput to handle an undefined value. (#5931)
- Enabled onClick prop in Tab. (#5937)
- Added arrow key functionality to Menu. (#5944)

DataChart:

- Added ‘lines’ option to chart.type. (#5953)
- Added ‘areas’ option to chart.type. (#5932)
- Added offset prop. (#5941)
- Fixed an issue when using areas and passing chart props per property. (#5951)
- Fixed an issue with x-axis alignment. (#5959)
- Enhanced DataChart to be more resilient to an empty property array. (#5957)

DateInput:

- Added icon prop. (#5911)
- Fixed an issue with setting the icon through inputProps. (#5911)

Notification:

- Enhanced toast prop to allow a position object to be passed in. (#5926)
- Enhanced toast prop to allow setting autoClose. (#5730)

Select:

- Fixed screenreader behavior to read out correct number of options. (#5924)
- Improved the screenreader and keyboard navigation experience. (#5934)

# v2.20.1

- Fixed double focus on FormField with Select and search. (#5895)
- Fixed DateInput bug with "yyyy/mm/dd" format. (#5893)
- Fixed Button icon alignment. (#5892 and #5885)
- Fixed TextInput suggestions styling. (#5880)
- Added Form validation onMount for controlled input forms. (#5881)

# v2.20.0

General:

- NEW Tag component. (#5778)
- Enhanced Form to support an array of field values. (#5630)
- Enhanced Carousel to have a smooth transition. (#5839)
- Enhanced Video to be able to customize controls. (#5658)
- Enhanced DateInput to open when Calendar icon is clicked. (#5838)
- Fixed Anchor’s `as` prop type. (#5823)
- Fixed Select to clear search content when drop closes. (#5866)
- Fixed Text to show Tip when truncated and observe resize. (#5855)
- Fixed Button icon alignment while using `small` icon size. (#5856)
- Fixed TextInput suggestions closing incorrectly. (#5860)
- Fixed Clock to handle when the hour is not given. (#5850)

Calendar:

- Enhanced Calendar to handle changes with time zones.(#5837)
- Enhanced Calendar accessibility for screen readers. (#5849)
- Fixed Typescript definition for Calendar `messages` prop. (#5836)

# v2.19.1

General:

- Fixed DateTable `onSelect` bug.

# v2.19.0

General:

- NEW NameValueList component. (#5626)
- Enhanced DataTable lazy loading with `onUpdate`. (#5716)
- Enhanced Text to accept dropProps when `truncate=”tip”`. (#5637)
- Enhanced WorldMap to improve placement of places. (#5712)
- Added value types on Anchor `weight` propTypes. (#5484)
- Added `theme.card.hover.container.elevation` to Card. (#5736)
- Added `a11yTitle` Typescript support on MaskedInput. (#5751)
- Fixed Calendar hover behavior and active day styling. (#5784)
- Fixed Carousel transition bug. (#5678)
- Fixed Pagination to account for changing data. (#5683)
- Fixed Spinner to allow `color` prop to override theme. (#5631)
- Fixed Video `volumeDown` Typescript definition. (#5760)
- Fixed InfiniteScroll last page calculation. (#5806)

Button:

- Added `hasLabel` and `hasIcon` prop to Button. (#5628)
- Fixed TypeScript support for Button. (#5651)

CheckBox:

- Fixed `theme.checkBox.label.align` to apply only when label is string. (#5800)
- Fixed focus state to not apply when `disabled`. (#5658)

DateInput:

- Enhanced behavior to align with native HTML. (#5667)
- Added `size` to TypeScript definitions. (#5687)
- Added checks for leap year. (#5717)
- Fixed `value` bug. (#5632)

FileInput:

- Added `confirmRemove` prop. (#5711)
- Fixed `maxSize` conversion factor. (#5775)

FormField:

- Added option to remove required indicator for individual FormField. (#5713)
- Fixed theme styling on required indicator. (#5709)

RangeInput:

- Added `theme.rangeInput.pad`. (#5666)
- Added `disabled` prop. (#5660)
- Enhanced RangeInput to be controlled by mouse wheel. (#5693)

# v2.18.0

General:

- NEW Notification component. (#5450)
- Added `gap` prop to Anchor. (#5541)
- Added `defaultItemProps` prop to List to allow styling of list item layouts. (#5573)
- Added `color` prop to RangeInput allowing track color to be specified. (#5275)
- Changed zIndex for RangeSelector’s edge controls. (#5564)
- Enhanced `weight` values supported by Text. (#5606)
- Fixed InfiniteScroll bug related to passing an empty array when using `onMore` callback. (#5636)
- Fixed missing TypeScript type for Grid. (#5561)
- Fixed RadioButton theme `radioButton.check.background.color` to accept symbolic colors. (#5621)
- Fixed Table TableCell `rowSpan` so that it is applied to the proper DOM element. (#5489)
- Fixed TextInput `placeholder` value not clearing when value is a JSX.Element. (#5571)

Button:

- Added `justify` prop to Button. (#5591)
- Fixed missing TypeScript type `rel` on Button. (#5582)

Calendar:

- Fixed Calendar to properly announce selected dates and date ranges and to screen readers. (#5575)
- Fixed Calendar keyboard behavior to properly keep active date in view when using arrow keys. (#5588)

Carousel:

- Fixed Carousel keyboard accessibility by limiting focus to only visible children. (#5552)
- Fixed Carousel animation direction when set to autoplay. (#5603)

DateInput:

- Added `messages` prop to DateInput to allow for accessibility announcements to be read by screen readers. (#5471)
- Enhanced DateInput keyboard behavior to align with native HTML input. (#5550)
- Fixed missing TypeScript type `className` on DateInput. (#5561)

DataTable:

- Fixed missing `defaultProps` on DataTable. (#5572)
- Fixed DataTable footer to allow rendering of a custom node. (#5563)
- Fixed DataTable to properly pin the checkbox column when using `onSelect`. (#5547)

FileInput:

- Added `maxSize` prop to FileInput to limit allowed file size. (#5457)
- Enhanced FileInput to limit the allowed number of files to be uploaded. (#5218)

Markdown:

- Enhanced Markdown to support `ref`s. (#5587)
- Fixed unintentional line break when italics were used in Markdown. (#5581)
- Fixed Markdown to properly support `onClick`. (#5614)

Meter:

- Fixed Meter `size=”full”` bug. (#5597)
- Fixed missing TypeScript `semicircle` type on Meter. (#5601)

Select:

- Fixed missing support for `onBlur` and `onFocus` on Select. (#5590)
- Fixed missing TypeScript type `className` on Select. (#5561)

# v2.17.5

General:

- Component documentation has moved to Grommet-Site. All `doc.js` files have been deprecated. Documentation pull requests can now be submitted to the Grommet-Site repository.
- Enhanced CheckBox to accept children.
- Enhanced CheckBoxGroup to accept children.
- Enhanced Meter to accept `type=”semicircle”`.
- Enhanced Select `emptySearchMessage` to accept JSX elements.
- Fixed missing TypeScript type for Button `kind`.
- Fixed missing TypeScript type for Markdown `options`.
- Fixed Form validation to exclude `disabled` inputs from validation results.
- Fixed Menu to exclude extraneous Button when drop direction is flipped vertically.

Accessibility:

- Fixed Calendar accessibility issue by properly traversing cells with populated dates.
- Fixed Carousel accessibility issue by clearly labeling the currently displayed slide.
- Fixed RangeInput accessibility issue by properly placing focus on the input’s thumb control.
- Fixed RangeSelector accessibility issue by properly specifying `role=”slider”`.

DateInput:

- Fixed ability to reset DateInput value with `” ”` or `[ ]`.
- Fixed situation where DateInput calendar would not open properly.

Layer:

- Fixed missing `extend` for ThemeType `layer.container.extend`.
- Fixed bug where Layer could not be used outside of Grommet block.

# v2.17.4

General:

- Added `animation` prop to Diagram.
- Added `onChange` to FileInput.
- Added support for `textAlign=“justify”` to Heading.
- Added selected styling to custom child in Select.
- Enhanced support for `aria-label` in all components where `a11yTitle` is accepted.
- Enhanced Grid `align` and `alignContent` to support any valid CSS `align-items` and `align-content` strings.
- Enhanced MaskedInput `size` to accept additional t-shirt sizes.
- Enhanced TextArea `size` to accept additional t-shirt sizes.
- Enhanced TextInput `size` to accept additional t-shirt sizes.
- Fixed styling for Button hover state.
- Fixed initial image displayed in Carousel.
- Fixed DataChart detail display when rendering large data sets.
- Fixed values retained in uncontrolled Form when inputs are dynamically removed.
- Fixed active style for List so that the style is retained when a user is interacting with other components on the page.
- Fixed RadioButtonGroup to properly pass focus state to children.
- Fixed TableCell rendering performance when theme background is changed.
- Fixed theme to accept custom pixel values when specifying input font sizes.

Box:

- Enhanced `align` and `alignContent` to support any valid CSS `align-items` and `align-content` strings.
- Fixed Box rendering performance when theme background is changed.

Calendar:

- Enhanced Calendar accessibility by announcing the selected date upon selection.
- Fixed Calendar accessibility to properly read only the active date as a user tabs through calendar dates.
- Fixed Enter key behavior for Calendar.

DataTable:

- Enhanced DataTable to apply case-insensitive sorting.
- Enhanced DataTable `groupBy` to leverage InfiniteScroll.
- Fixed DataTable cell styling to better support custom styling of grouped rows.
- Fixed active style for DataTable so that the style is retained when a user is interacting with other components on the page.

DateInput:

- Added `size` prop to DateInput.
- Fixed DateInput to set `value` properly when implemented as a controlled component.

FormField:

- Fixed FormField theme property to use `error.border.color`.
- Fixed FormField validation when supplied an empty array as `value`.

Grommet:

- Added global `messages` prop to Grommet.
- Added ability to pass dynamic values to messages.

Paragraph:

- Added support for `textAlign=“justify”` to Paragraph.
- Fixed ability of `size` to accept a custom pixel value.

Text:

- Added `tip` and smart aria-label default to Text.
- Added `truncate=“tip”` to display the entirety of truncated text within a Tip.
- Added support for `textAlign=“justify”` to Text.

# v2.17.3

General:

- Specified Node engine >=12 in preparation for future project enhancements.
- Added `textAlign` prop to MaskedInput.
- Enhanced Carousel so that it may be implemented as a controlled component.
- Enhanced DateInput to create smarter masks for MaskedInput.
- Enhanced Calendar `date` to accept an array of dates.
- Enhanced Chart `opacity` to support boolean value.
- Enhanced List to add `onOrder` allowing for list items to be re-ordered.
- Enhanced DataTable to support pinning multiple columns.
- Fixed AccordionPanel icon position when `label` contains truncated text.
- Fixed bug in Collapsible where content would not render smoothly.
- Fixed Layer component animation bug when at mobile width.
- Fixed Pagination to update active page when `page` prop changes.
- Fixed RangeSelector to respond to mobile touch gestures.
- Fixed SkipLinks to support having just a single SkipLink.

Accessibility:

- Added `role=”radiogroup”` to RadioButtonGroup and `role=”group”` to CheckBoxGroup to improve screen reader interaction.
- Fixed RadioButtonGroup keyboard interaction to align with WCAG standards.
- Fixed focus behavior on Button-reliant components so focus outline only appears in response to keyboard interaction.

CheckBox:

- Fixed theme property for CheckBox’s toggle color.
- Fixed CheckBox/CheckBoxGroup duplicate focus styling when contained within a FormField.

Grid:

- Added `height` and `width` to allow easier control of Grid dimensions.
- Enhanced Grid’s `columns` capabilities to support a wider range of min-max width values.

Grommet:

- Added `options` prop to Grommet to provide a way to assign a unique id to a single DOM node.
- Enhanced Grommet to support `full=”min”`.

Meter:

- Added `type=”pie”`.
- Added `direction` to allow Meter of type bar to display in either horizontal or vertical direction.

Select:

- Enhanced Select event handling to support Preact.
- Fixed issue where change event not called when `valueLabel` is used.
- Fixed issue where `a11yTitle` was not being applied.
- Fixed scroll behavior of Select’s drop options when using the keyboard.

# v2.17.2

General:

- Enhanced Drop to account for `align` when assigning margin.
- Fixed Layer elevation styling, should not apply when `plain`.
- Fixed Box to always render `ThemeContext.Provider`.
- Fixed Typescript definition for CheckBoxGroup `options`.
- Fixed server side rendering warnings.
- Fixed bug with Select when JSX is passed to `options`.
- Changed RadioButtonGroup to add `defaultValue`.
- Changed Form to run validations when component mounts.

Button:

- Allowed use of `aria-label` prop on Button.
- Changed Button to use tip string for `a11yTitle` default value unless otherwise provided.

CheckBox:

- Enhanced CheckBox theming to allow `checkBox.pad` and added `pad` prop.
- Added new `fill` prop to CheckBox.
- Changed React events to apply on Checkbox container level.

DataTable:

- Enhanced DataTable to support use of `groupBy` and `onSelect`/`select` together.
- Enhanced DataTable columns to allow for `plain` render of column data.
- Improved DataTable rendering of CheckBox with `onSelect` to accommodate pad on CheckBox.
- Fixed error that occurred when `paginate` was used with `onClickRow` on DataTable.
- Fixed Typescript for `paginate` on DataTable.

DateInput:

- Fixed bug in DateInput to allow value to be initialized as `[]`, which allows range of dates to start empty.
- Changed DateInput to allow for a leading zero and a 2 digit year in the display format.

# v2.17.1

- Fixed issue where Layer was not animating on exit.
- Fixed InfiniteScroll functionality when the length of the data changes.
- Added additional Typescript extended props interfaces to Box, Button, Calendar, DataTable, Drop, Grid, Grommet, Spinner, and
  MaskedInput.
- Fixed Anchor props that are leaking to Dom when using styled-components.

# v2.17.0

General:

- NEW FileInput component.
- NEW Pagination component.
- NEW Spinner component.
- Added ability to use `theme.formField.label.requiredAsterisk` to have a \* or custom element appear next to the label on required FormFields.
- Added `defaultChecked` prop to CheckBox.
- Changed DataChart to be more resilient to empty properties.
- Ensured that TextInput respects the `defaultSuggestion` prop when the input's onChange is triggered.
- Fixed Keypress functionality in Select when `labelKey` is specified.
- Fixed ResponsiveContext device breakpoints to determine viewport size without scrollbars and borders.
- Fixed `focusIndicator` on TextInput, TextArea, and MaskedInput to only be valid if `plain` is also set.
- Changed Box `hoverIndicator` to accept elevation.
- Added `theme.menu.drop` to allow theming of Menu's drop alignment.
- Changed Tip to use explicit props setting of Drop instead of using `plain`.
- Added additional sizes to Avatar (2xl, 3xl, 4xl, 5xl).
- Fixed Calendar right side border to display when `fill` is set.
- Fixed FormField to only set focus when it also has focus in the DOM.

DataTable:

- Changed DataTable to allow setting the pinned background from the background context.
- Added `rowDetails` prop to enable expansion of DataTable rows.

Drop:

- Added Drop props and theme support for `margin`, `round`, `background` & `elevation`.
- Fixes scroll bug where Drop would not always scroll with its target.

Form:

- Added `onChange` validation option to Form.
- Fixed timing on Form when `validate="blur"`.
- Added valid to `onValidate` in Form to let user know if Form is valid.
- Changed Form to fix blur validation and dynamic fields.

Layer:

- Fixed Layer responsive positioning.
- Enhanced Layer `target` scroll behavior to remove scroll lag.

DEV:

- Upgraded to React 17 add added peer-dependency support.
- Typescript is now supported for component Extended props.

# v2.16.3

- Changed Calendar to fix an issue with disabling kind Buttons and with bounds without timezones.
- Added `defaultValue` prop to Select.
- Added `onChild` function to Carousel.
- Changed Grid to restrict repeated column minimum size to not exceed total width.
- Changed Text to add more sizes.
- Changed Chart to support `pattern` area fill.
- Changed Distribution to fix an issue with undefined values.
- Fixed Button `pad` to be based on the size.

DataTable:

- Fixed DataTable Header/Footer to adjust on body overflow.
- Changed DataTable to use `onMouseEnter` for hover detection.

Form:

- Improved Form `onBlur` validation.
- Fixed component update behavior when used inside an uncontrolled Form.

Layer:

- Added `container.elevation` to layer’s theme.
- Allow `onEsc` to be applied to Layer when `modal={false}`.
- Enhanced Layer to accept background prop and grommet sizes for `layer.border.radius`.

Menu:

- Fixed Menu’s drop positioning.
- Changed the Menu `children` prop to be typed as either a func or node.

TextInput:

- Removed custom JSX placeholder from TextInput when input has a value.
- Added `highlightFirstSuggestion` prop to TextInput.

# v2.16.2

- Fixed Select selection when using search

# v2.16.1

- Fixed Select on lazy loading
- Fixed `detail` alignment on DataChart.
- Changed List to consider false `border` prop.
- Added `textAlign` prop to TextInput.
- Fixed uncontrolled input values to reset properly when Form is reset.
- Aligned the `zindex` value of Layer and Drop.
  DataTable:
- Fixed issue with `pin` on DataTable Footer showing background when it is not pinned.
- Added `placeholder` prop to DataTable.
- Added a units string to the `column` prop in DataTable.
- [Typescript] Fixed type of onSelect.

# v2.16.0

General:

- NEW Tip component.
- Added `tip` prop to button.
- Added `clear` prop to Select that clears all selections.
- Button kind automatically set to `plain` style when it has children.
- Added support for width object on `width` prop on Box.
- Fixed Text truncation when `align="end"`.
- Added `fill` prop to Heading.
- Accessibility fix for AnnounceContext default id.
- Added `disabled` prop to Button children.
- Added `dropProps` and `dropHeight` props for Drop customization on MaskedInput.
- Added support for `border` on Grid.
- Fixed rgb and rgba linear-gradient backgrounds.
- Added `weight` prop to Anchor.
- Added touched option for `onChange` in Form.
- Added new theme `extend` for List and List item.
- Fixed `background-contrast` to support dark and light more accurately.
- Changed InfiniteScroll to handle variable item heights.
- Added support for dark and light mode to Drop and Layer.
- Fixed keyboard focus when Layer is a modal.
- Fixed `onClickOutside` for non-modal Layer.
- Enhanced CheckBoxGroup theming with `checkBoxGroup.container`.
- Fixed issue with TextInput when there is a non-string placeholder.
- Fixed Select allow multiple values to be selected when using search.

Calendar:

- Enhanced Calendar logic when using `range`.
- Fixed timezone handling.
- Added `activeDate` prop.

Clock:

- Added more theme sizes to analog Clock.
- Fixed Clock when size prop is undefined or incomplete.

DataChart:

- Fixed a color issue when type: 'bars' and the color is set in a property.
- Changed DataChart to be more resilient to invalid properties when using type: 'bars'.

DataTable:

- Fixed generation of medium granularity x-axis labels.
- Accessibility fix of `aria-label`.
- Added support for hover styling on DataTable when resizing.

DateInput:
Added support for trimming adjacent days in the 6th row.
Fixed DateInput resetting in Forms.

Dev:
Storybook stories organization by component type.

# v2.15.0

General:

- NEW Card component
- NEW DateInput component

- Updated Box to allow opacity to impact background image
- Fixed bug with Select where `onOpen` was being called twice
- Added a default mask to MaskedInput
- Changed ResponsiveContext to address breakpoint issue
- Added option to Menu to allow different icons for open and close
- Updated Text, Grid, and Heading to accept React `ref` prop
- Added new prop `trapFocus` to Drop and DropButton
- Added theming for RadioButtonGroup container under `radioButtonGroup.container`

Accessibility:

- Added `a11yTitle` support to TextArea
- Added `messages` prop to Video to support accessibility standards
- Improved List focus behavior with keyboard to align with WCAG accessibility guidelines
- Improved SkiplLinks component

SkipLinks:

- Allows SkipLinks layer to open with a keyboard tab
- Allows users to skip SkipLinks layer and tab to header
- Allows users to edit SkipLinks `messages`
- Allows cyclic navigation of page with keyboard
- Enables access to rest of interactive elements when the SkipLinks layer is shown
- Changed DOM behavior to prepend Layer to DOM so tabIndex order will behave correctly

Form:

- Added `onValidate`, allows users to access `infos` and `errors` when a form validates
- `contentProps` prop added to FromField which allows props to be set directly on content Box. When present, overrides props from theme or `pad` prop. `overflow="hidden"` will no longer be passed in but can be added in `contentProps`

InfiniteScroll:

- Fixed show prop behavior
- Fixed InfiniteScroll duplicate key

RadioButton:

- Added `background.color` option in RadioButton theme
- Added ability to set the `font-weight` of the label from the theme

Chart:

- Updated Chart to add per-value color and thickness for bar and point types
- Changed Chart to add `point` types
- Added `animate` prop to Chart

DataChart:

- Added a `series` prop that encapsulates things previously in chart, `xAxis` and `yAxis`
- Added `axis` prop to replace xAxis and yAxis
- Added `guide` prop to replace the guide from xAxis and yAxis
- Added `detail` prop to provide hover interaction details for horizontal bands
- Added `granularity` concept for axis and guide
- New `legend` prop provides a legend

Theming:

- Allowed users to specify FormField `margin` via theme
- Allowed for disabled tab state to be styled via theme
- Fixed `plain` Buttons active styling for themes that define button.default

TypeScript:

- Updated RangeInput `onChange` to use intrinsic HTML input `onChange` type
- Fixed Clock `onChange` to accept a string as an argument
- Improved Form `onSubmit` handling of value key of form event
- Added type definitions for `day` in Calendar
- Defined missing `action` prop type
- Fixed Calendar `onSelect` type

# v2.14.0

General:

- New CheckBoxGroup component.
- New DataChart component.
- Changed Button to have kind behavior for default and secondary kind.
- Fixed Preact Compatibility.
- Allowed theme to specify the size, height, and weight of an input.
- Fixed Clock countdown timer.
- Fixed missing forwardRef for DataTable, Diagram, Image, Menu, TableBody, TableCell, and Tabs.
- Enhanced focus theme styling to have outline and shadow props.
- Added disabled theme styling to MaskedInput.
- Fixed scrolling issues with TextInput.
- Changed Select and TextInput to accept `a11yTitle` prop as aria-label.
- Fixed an issue with caller controlling state in DropButton.
- Added `rotateLeft` and `rotateRight` to Box animation.
- Changed RangeInput to support bounds.
- Fixed `onKeyDown` event for TextArea.

RadioButtonGroup:

- Changed RadioButtonGroup to support numeric and boolean values.
- Fix the responsive behavior of RadioButtonGroup.

Form:

- Changed Form and FormField to fix some issues with state and events.
- Updated FormField to allow for disabled state styling via the theme.
- Added `background` and `border` options in FormField theme.

Accordion:

- Changed hover, focus, and border in Accordion theme.
- Added hover color theming for Accordion.

Menu:

- Added color theme styling for Menu icons.
- Fixed `dropProps` in Menu to work with RTL.

Select:

- Fixed `onClick` propagation in Select component.
- Fixed display of Select value when equal to zero.
- Fixed an issue with Select multiple.
- Fixed console error thrown by Select component.
- Fixed an issue with `onSearch` being called multiple times.

Tab/Tabs:

- Added `icon` and `reverse` props to Tab.
- Fixed focus toggling on Tab.
- Added `responsive` prop to Tabs.
- Added `alignControls` prop to Tabs.
- Added tabs header border theming to Tabs.

TypeScript:

- Fixed AnnounceContext to accept timeout as a parameter.
- Fixed TypeScript declaration of onChange in Form.
- Improved DataTable types.
- Added extend type to Text.

Hooks:

- Removing HOC from List.
- Changed SelectContainer to use hooks.
- Changed Collapsible to use hooks.
- Removed higher-order components.
- Changed Video to use hooks.
- Changed Select to fix an issue with callback hooks.

Dev:

- Replaced css package with PostCSS.
- Remove recompose dependency.
- Fixed security warning from the markdown-to-jsx package by updating to 6.11.4.
- Add jest-axe library for advanced accessibility testing.
- Fixed and cleaned code coverage references.

# v2.13.0

- NEW Sidebar component.
- Improved Form documentation.
- Changed Accordion to fix an issue with wrapped children panels.
- Changes Select to fix an issue with `onChange` value.
- Added `containerTarget` to Grommet, for enhanced Drop/Layer containers positioning.
- Changed InfiniteScroll to address issues with React.StrictMode.
- Fixed console warning of List.
- Fixed `a11yTitle` support of Image.
- Added `ref` support to Paragraph.
- Added ‘size’ option to ‘columns’ prop of DataTable.
- Fixed the sort icon switch in DataTable.
- Enhanced global.input.padding on the theme to accept an object.
- Changed CheckBox `checked` to default to false as documented.
- Changed TextInput, MaskedInput, and TextArea to work as uncontrolled components.
- Changed Form to fire `onChange` once per change.
- Changed Form to fix caret issue on input fields.
- Fixed warning with FormField on react-dom 16.13.1.
- Fixed an issue with `gap=“none”` on RadioButtonGroup.
- Added `icon` support for Select to enable icon switches when the drop opens or closes.
- Added extensive theme styling for `disabled` Button.
- Changed Menu to propagate `dropProps` to DropButton.
- Changed DropButtton to fix an issue with function refs.
- Added theme properties for primary and active Button.

TypeScript:

- Fixed types For Border style.
- Fixed types of Avatar to include IntrinsicElements.
- Fixed theme property type for Select `control.open`.



Hooks Refactoring:

- WorldMap to use hooks.

# v2.12.0

- New Avatar component.
- Changed Form to fix some issues with various control patterns.
- Changed Form to fix an issue with `required` Checkbox.
- Changed Select to fix an issue with clearing multiple
- Fixed Calendar issues with selecting multiple dates and selecting a date with `range`.

# v2.11.3

- Added `name` prop for FormField.
- Changed Image to allow `fill` to be horizontal or vertical.
- Added `dash` prop to Chart.
- Changed DataTable to add `verticalAlign` under columns.
- Added DataTable support for `primarykey` false.
- Changed Layer to enable the `target` to work for non-modal layers.
- Changed Form to fix an issue with controlled components.
- Changed Select to fix an issue with value propagation.
- Changed Grid to fix an issue with flex columns and numeric count.
- Fixed an issue with dark mode color of Box.
- Fixed Form FormContext to fix an issue with caret positioning.
- Changed TextInput to fix an issue with drop opening (fix requires TextInput suggestions to not change on every render, and should be placed on the state or useMemo instead)

TypeScript:

- Fix type error in theme breakpoints.
- Development - Fix TypeScript errors on Storybook.

Hooks:

- Refactor Class Children story to functional components.
- Changed Accordion and AccordionPanel to use hooks.
- Refactor DataTable Resizer to use hooks.

# v2.11.2

- Added `margin` prop to List.
- Added `target` prop to Layer.
- Added `icon` and `reverse` props to TextInput and MaskedInput.
- Added `responsive` prop for Grid.
- Added `sort` and `onSort` to DataTable.
- Added `transition` styling to the Button theme.

- Changed DataTable to handle an empty column definition.
- Fixed an issue with `border=“between”`.
- Fixed Drop issue with onSuggestionOpen/Close.
- Fixed Layer background issue on IE11.
- Fixed mask enforcement on MaskedInput.
- Fixed issue with Select InfiniteScroll when reaching to the end of the container.

- Changed FormField to propagate `disabled` and `required` to a created input element.
- Changed FormField to remove validation when unmounted.
- Changed Form to fix an issue with setting value from a component.
- Changed FormField to allow react nodes for help, error, and info.

- Refactoring Drop, Layer, Carousel class components to use React hooks.

- TypeScript support:
- Improved types for theme breakpoints.

# v2.11.1

- Fixed issue with Select setValue.

# v2.11.0

General

- Added new colors to theme: `background-contrast`, `background-front`, `background-back`, `text-weak`, `text-strong`, `text-xweak`, `active-background`, `selected-background`, `selected-text`, `graph-0`, `graph-1`, `graph-2`, `graph-3`.
- Added RTL support by adding pad, margin, and border ‘start’ and ‘end’.
- Added `size` prop to Button to support ‘small’, ‘medium’ and ‘large’ sizes.
- Removed unmounted Layer component from the DOM.
- Added `pad` prop to Grid.
- Changed Chart to allow `onClick` to work on ‘bar’ and ‘point’ types.
- Added `background` prop to Grommet component.
- Fixed Box `direction` of ‘column-reverse’ to calculate `gap` height.
- Changed Select and RangeInput to fix an issue with setting value.
- Added `border=‘between’` to Box.
- Fixed restoration of `tabIndex` values for outer focus components.
- Fixed `onChange` update on Clock.

FormField

- Added `round` to FormField border theme.
- Added `status` to FormField `validate`.
- Changed FormField `validate` to accept an array and set `aria-invalid` when validation fails.
- Changed FormField to support background styling tied to error and disabled states.
- Changed FormField to associate rest props with container when not used to automatically render input element.

Form

- Added `validate` prop to Form.
- Added `touched` attribute for Form `onSubmit` event.
- Changed Form to re-run all failed validations on any field update.

TextInput

- Fixed `ref` focus issue for TextInput.
- Improved TextInput suggestions keyboard accessibility.
- Fixed TextInput cursor positioning.

RadioButtonGroup

- Changed RadioButtonGroup to forward props.
- Added `disable` prop to RadioButtonGroup.

TypeScript

- Fixed type of Diagram connections.
- Fixed Menu icon type.
- Fixed `onChange` type of RangeInput.
- Extend RadioButtonGroup `value` type to include object.

Dev

- Upgraded ‘styled-components’ to 5.0.1 and more packages with minor changes (make sure you have a clean installation and updated npm version).
- Changed webpack loaders to work on both windows and \*nix on dev mode.



Note: Due to the new color additions of  `graph-0`, `graph-1`, `graph-2`, `graph-3`, the logic of color calculations on visual components had changed. You wouldn’t tell the difference unless you are using a Meter with an array of more than two default grommet colors.

# v2.10.0

- Added Nav Component.
- Fixed clickable area for CheckBox and RadioButton.
- Fixed Box background issue on dark mode.
- Changed RadioButtonGroup to set option ids based on group id.
- Fixed non-modal Layer accessibly issue.
- Fixed issue with `placeholder` of TextInput.
- Removed styled-components from being included in the grommet package and is now a peer dependency.
  As indicated in the getting started documentation, styled-components should be included in your
  package.json, just like react and react-dom.

TypeScript:

- Fixed Calendar type of `onSelect`.
- Fixed type of Menu component to include all Button props.
- Extended type of color and size styles on the theme.

Hooks:

- Refactor Searcher and DataTable components.

# v2.9.0

- New Header component.
- New Main component.
- New Footer component.
- Added `type=‘point’` to Chart.
- Fixed an issue with Chart re-rendering when no values are provided.
- Changed Chart to take a color array to describe a gradient.
- Fixed `reverse` prop on Menu items.
- Improved TypeScript for DataTable, Distribution, FormField, and List.
- Added `max` prop for Meter.
- Fixed an issue with dark background detection when using alpha.
- Added `focusIndicator` prop to Box.

# v2.8.1

- Fixed overflow of search on DataTable.
- Fixed `gap` of Menu items.
- Fixed `onClickItem` on List.
- Added `a11yTitle` prop to Menu.
- Added `onClick` to Box.
- Changed DataTable to pass index to `onClickRow`.
- Changed RadioButton to add children rendering.Changed RadioButtonGroup to support children rendering.
- Improved TypeScript support
- Added `fill` prop to Image

# v2.8.0

- Added new List component.
- Improved TypeScript support.
- Fixed `caption` behavior for Table.
- Add `hoverIndicator` for Menu.
- Fixed color calculations.
- Changed Chart to add auto width and gap.
- Added `themeMode` prop to Grommet.
- Changed DataTable to fix header layout.
- Added `a11ytitle` support for Grid.
- Note: Deployed typescript in Grommet for storybook tsx files.
- Note: More refactoring of Class components to use react hooks.

# v2.7.11

- Fixed theme typing.

# v2.7.10

- Fixed RangeSelector `step` issue.
- Improved TypeScript support for theme, props, and events.
- Added the prop `fill` to WorldMap.
- Fixed Menu onClick for Firefox.

# v2.7.9

- Improved TypeScript support.
- Added Keyboard accessibility for Menu.
- Removed padding for a plain Menu.
- Added custom Heading styling for Calendar.
- Added ref support for Image.
- Added DataTable virtualization with a `replace` prop.
- Fixed RangeSelector mouse events on Edge.
- Added custom individual borders for Box.

# v2.7.8

- Added min & max support for Box `height` and `width`.
- Changed Layer to fix an issue with animating close.
- Improved Typescript support.
- Added `margin` prop to FormField.
- Added expansion of group keys on DataTable.
- Changed DataTable to add `background`, `border`, `pad`, and `rowProps`.

# v2.7.7

- Improved TypeScript support.
- Fixed false responsive for Box.
- Added ability to hide Carousel controls.
- Improved keyboard accessibility on MaskedInput.
- Fixed Calendar rendering when the first day of the month is Sunday and `firstDayOfWeek` is Monday.
- Improved Grid `areas` prop to receive an array of rows.
- Added `fill` support for Paragraph.
- Added animation to Layer on close.
- Added `onClickRow` to DataTable.
- Changed DataTable to allow columns properties to traverse data object properties.
- Applied Button transitions to act only on Button color styling (color, background-color, border-color, box-shadow). Note that in case you have an extensive custom theme that relies on Button transitions of non-color properties, you might be required to add these extensions to your custom theme manually. For more info see issue #3145 and feel free to reach out.

# v2.7.6

- Fixed TypeScript issue.

# v2.7.5

- Improved and Refactored TypeScript support.
- Added `initialChild` prop to Carousel.
- Fixed `fill` on Carousel.
- Fixed event handler issue of RangeSelector.
- Improved consistent `hover` functionality across the components.
- Fixed custom style support of `gap` for Grid.
- Improved IE support.

# v2.7.4

- Improved TypeScript support.
- Improved focus on DataTable search.
- Added theme customization for Select on `open`.
- Improved Esc handling for TextInput.
- Improved blur and focus handling for MaskedInput.
- Added animation property to Layer.
- Changed Select to allow more types of options.

# v2.7.3

- Fixed focus behavior on Layer

# v2.7.2

- Improved TypeScript support.
- Fixed MaskedInput theme support.
- Fixed MaskedInput event.target props to be available.
- Added `size` prop to TextArea.
- Added `onMore` and `replace` props to Select.
- Enhanced Carousel behavior to support icon colors and animation.
- Changed DropButton to allow the caller to pass `onClick`.
- Changed Menu to pass more items properties through to Button.
- Changed color parsing to be more resilient.
- Improved DataTable groupby and search functionality.
- Improved Layer support on Gatsby.js.

# v2.7.1

- Increased TypeScript support
- Added `step` prop support to DataTable
- Improved `extend` support for input components
- Fixed arbitrary `size` support for Meter, Heading
- Fixed `onChange` issue on Form
- Fixed controlled `open` state on Select
- Fixed Form race condition issue

# v2.7.0

- Increased TypeScript support
- Improved accessibility of TextInput
- Allowed Select `icon` prop to accept a node
- Improved Drop and Table `height` calculations
- Added `gap` customization for Button
- Fixed styling of font-family on inputs
- Added support for hsl() background color
- Added customization for Button `color` on plain
- Added `open` support in Menu
- Added edge-control customization for RangeSelector
- Fixed InfiniteScroll behavior on IE
- Added `wordBreak` support for Text
- Improved `fill` support for Button
- Changed FormField to handle required with an initial value

# v2.6.6

- Increased TypeScript support
- Added deprecation warnings on the usage of Routed components
- Fixed theme issue on grommet button
- Fixed DataTable overflow issue
- Improved Search functionality for multi options Select
- Improved `active` support on the theme
- Added `wrap-reverse` flex support for Box
- Fixed FormContext update on FormField onChange

# v2.6.5

- Bundle size improvements.
- Enabled ParcelJS.
- Improved Calendar daylight saving calculations.
- Added `daysOfWeek` prop to Calendar.
- Added `fallback` prop to Image.
- Added `opacity` prop to Image.
- Added `cssVars` prop to Grommet component.
- Added `onReset` prop to Form.
- Added disable styling for TextArea & TextInput.
- Added theme Heading customization to Accordion.
- Added support for custom drop overflow.
- Added `open` prop for Select.
- Added `icon` prop for Select.
- Removed padding of Button icon on `plain`.
- Improved CheckBox styling.
- Improved TypeScript support.
- Changed Chart to add pad to calcs.
- Fixed overflow issue on Accordion.
- Fixed dark theme issues.

# v2.5.0

- Increased TypeScript support
- Improved scrolling of Accordion
- Improved `elevation` of Box
- Added extend support for RangeInput
- Added extend support for FormField
- Added theme support for Select
- Added size and repeat support for Box `background`
- Added child render function to Menu
- Added disabled option to Menu `items` prop
- Added `size` support for Chart
- Added InfinteScroll handling for multi-column Grid
- Fixed onMore with InfinteScroll of Grid
- Fixed initial load of InfinteScroll
- Changed Button to pass interactive state to children render function
- Fixed CheckBox toggling and shrinking.
- Fixed Select hover Button
- Fixed alignment of an icon within Button
- Fixed propagation of events with Drop

# v2.4.0

- Increased TypeScript support
- Added RadioButtonGroup component
- Added extend support for TextInput
- Added around and evenly support for the Box `justify` prop
- Added style support for the Box `gap` prop
- Added `colspan` support for TableCell
- Added `justifyContent` prop to
- Added `onBlur` prop to MaskedInput
- Added `interactiveChild` prop to Stack
- Added `id` prop to Select
- Added real-time support for Diagram updates
- Improved accessibility for TextInput, FormField, MaskedInput, TextArea
- Improved responsive for Grid columns
- Added non-shaking-tree support
- Fixed Form validation for values
- Fixed Extend on ThemeContext
- Fixed scrubber for Video

# v2.3.1

- Fixed typescript definitions for Form

# v2.3.0

- Fixed accessibility for Select
- Increased TypeScript support
- Added `dropHeight` prop to TextInput
- Updated Grommet component to remove browser default margin when `full` is true
- Added pixel size support for the Box `round` prop
- Added style support to for the Box `border` prop
- Added grow and shrink support to Box `flex` prop
- Allowing `thickness` size in Meter
- Added custom font weight for each level support to Heading
- Added levels 5 and 6 to Heading
- Added `animate` prop and corner options to `position` prop on Layer
- Added Form component
- Added extend support for Calendar day
- Added `primaryKey`, `resize`, `sortable` props to DataTable
- Added HTML tags support to Markdown

# v2.2.1

- Fixed Select onChange not triggering for multiple with custom options
- Fixed Select dropHeight to use max-height instead of height
- Added withTheme proxy inside grommet to avoid libraries breaking after remove withTheme in Grommet

# v2.2.0

- Fix Anchor style inside markdown
- Added dropHeight, emptySearchMessage props to Select
- Fix target object inside Select onChange
- Fixed accessibility and keyboard operability for Select
- Fixed accessibility for CheckBox
- Updated base theme colors
- Integration with grommet-icons v4
- Moved grommet-icons and grommet-styles from peerDependency to dependency
- Added MaskedInput
- Fixed SkipLinks not showing when pressing tabs

# v2.1.1

- Fix regression with Layer margin with centered position
- Fix Typescript support to allow for intrinsic elements

# v2.1.0

- DataTable now allows falsey values
- Select now allows ‘extend’ for container
- Removed Firefox outline from focused elements.
- Added ability to scroll tabs independently
- Theme font object now allows weight
- Improved accessibility for Layer, Select, TextArea and TextInput
- Add `replace` prop to InfiniteScroll
- Add `labelKey`, `disabledKey`, `valueLabel`, `valueKey` props to Select
- Add `tag` prop to Button
- Theme now allows custom debounce time
- Fixed drop container height
- Deprecate `tag` prop in favor of styled component `as`
- Heading theme allows font object in every level
- Flexible zIndex for Drop and Layer.
- Add indeterminate state for checkbox
- Add `elevation` and `plain` props to Drop
- Select uses InfiniteScroll `replace`
- Fix `margin` on Layer
- Better Server-Side Rendering support for Grommet
- Grommet leverages styled-components ThemeContext
- Improved typescript support
- Better boundary conditions for RangeSelector

# v2.0.0

- Allowing pixel value padding on margins
- Added xlarge size to Paragraph and Heading
- Updated to use system-ui font in the Grommet theme
- Added size prop to Anchor
- Added fill to TextArea
- Changed base theme elevation values
- Fixed daylight savings in Calendar
- Fixed RangeSelect to fix an issue with step
- Add plain prop to Grommet
- Fixed Layer on mobile
- Changed base theming for Tabs
- Fixed TextInput and TextArea to not close the Layer on pressing esc
- Fixed performance on Select and preventing scrolling to the top when selecting an option

# v1.13.0

- remove keyboard handlers when unmounting
- Allow default messages for Intl util
- Menu allow a custom DOM element to be the parent
- Infinite scrolling with support for moreAbove
- Allow a custom message to be passed to Notification

# v1.11.0

- **Enhanced Components**: Accordion, Layer, Header
- Header: fixed z-index to make sure body goes behind float
- Accordion: fix conditionally render of AccordionPanels
  - Layer: fix bug where keyboard events would not be triggered
- Added DXC minified to Grommet bundle

# v1.10.1

- **Enhanced Components**: Select, Toast, Video
- Fixed Select drop placement and styling issues
- Fixed Toast console warning and improved test coverage
- Fixed an issue with Video event property propagation
- Fixed an SCSS selector issue related to animation

# v1.10.0

- **Enhanced Components**: Chart, DateTime, FormField, Layer, Menu, Toast, WorldMap
- Added `overlayClose` to Layer
- Fixed WorldMap IE11 styling issues
- Fixed Chart single value rendering issue
- Restyled FormField input elements to simplify
- Improved Menu drop layout when not overlapping control
- Fixed a Toast status styling issue
- Localized DateTimeDrop

# v1.9.0

- **Enhanced Components**: Card, FormField, Form, Layer, Search, Select, Toast
- Added `duration` prop to Toast
- Fixed font issue inside Toast content
- Added hebrew language support
- Removed Card markdown dependency
- Added initial DXC theme
- Fix status icons in dark context
- Skipped processing tab if Layer is hidden
- Fixed `inline` Select height problem inside FormField
- Fixed Search console warning in mobile

# v1.8.3

- Allow Tiles to be used conditionally

# v1.8.2

- Removing react-dom from dependencies to avoid duplicate react copies

# v1.8.1

- Hot fix for drop what would not render in the right location

# v1.8.0

- **Enhanced Components**: Anchor, Animate, Carousel, FormField, LoginForm, Markdown, Menu, Meter, Select, Spinning, Table, TextInput, Tile
- Welcome React 16 (now as a peerDependency) 🎉
- Fixed double border issue with text input
- Fixed problem with Meter cropping
- IE11 Spinning fix
- Carousel fixed autoplay
- Fixed suggestions for TextInput when array is empty
- Deprecate Card description with Markdown support
- Fixed accessibility issue with LoginForm
- Fixed mirror click for Table

# v1.7.0

- **Enhanced Components**: Animate, Box, Button, TableHeader, TextInput, Tiles, Toast, WorldMap
- Fixed animation inside Split
- Added `justify=around` for Box
- Changed TableHeader to allow columns to be individually sorted
- Added `type=text` to TextInput
- Fixed input border

# v1.6.0

- **New Components:** PasswordInput
- **Enhanced Components**: Anchor, Animate, CheckBox, Chart, Distribution, Layer, Menu, RadioButton, Range, Select, Table, TextInput, Toast
- Added Russian translation
- Added Accessibility and touch events to Chart Range
- Enhanced Accessibility for both RadionButton and CheckBox
- Fixed erroneous warning on Table regarding mismatch cells
- Added `searchPlaceholder` prop to Select that allows to change the default search placeholder
- Added `onAppear` and `onLeave` for Animate component
- Anchor now does invoke `onClick` if disabled is passed

# v1.5.0

- **Enhanced Components**: Anchor, Box, Button, Carousel, CheckBox, DateTime, Distribution, Header, Image, LoginForm, Menu, Notification, Search, Select, SVGIcon, Table, TextInput, Timestamp, WorldMap, Value
- Allow Anchor and Button links to be opened in a new tab with CMD + Click
- Removed whitespace trimming from LoginForm password
- Changed LoginForm to allow error to be any JSX element
- Changed LoginForm to disabled submit button if onSubmit is not defined
- Added support for reverse in Value component
- Updated CheckBox to have full clickable area
- Updated Carousel to animate transition only after first load
- Fixed infinite scroll problems when having multiple scroll parents
- Reverted Select to use value instead of label as the selected value
- Changed Image component to set full to true if fit is defined
- Allow TextInput to accept copy from clipboard in IE11
- Replaced `react-addons-transition-group` with `react-transition-group`
- Better IE11 support
- Added colorIndex support to input placeholder

# v1.4.1

- Table: Added error message for cell header mismatch
- Added localization keys for Form
- Timestamp: added IE 11 support
- Box: added responsive flag for full option
- Fix backward compatibility issues with Chart import statements

# v1.4.0

- **Enhanced Components**: Anchor, Box, Button, DateTime, Distribution, Menu, Meter, Search, Select, Split, SunBurst, Toast.
- Make Button compatible with React Router v4
- Enable reset/submit Button even without onClick
- Added hover support for Button
- Added support for Critical status Button
- Added support for `box` prop on Button
- Search now allows to override autoComplete option
- Allow custom icon with label inside Menu
- Removed double margin inside CheckBox and Radio buttons
- Fix DateTime format issue
- Migrated to React 15.5 with support for prop-types as a separate module
- Updated react-intl to latest version

# v1.3.4

- Fixed ES6 imports
- Fixed TextInput with empty suggestions (thanks @monte-hayward for the contribution)
- Search now correctly invokes onSelect callback when pressing enter (thanks @raphi011 for the contribution)

# v1.3.3

- Added support for React Router 4
- Removed Icon suffix from Icons for backward compatibility
- Updated markdown-to-jsx to version 5
- Fixed animationIcon inconsistencies with Anchor
- Fixed scroll to top problem on Article

# v1.3.2

- Fixed problem with Table where multiple rows does not render
- Added the right support for `import Grommet from 'grommet'` and `import { Icon } from 'grommet'`

# v1.3.1

- Better localization support
- Fixed icon warning for xsmall size
- Fixed Grommet import to be backwards compatible
- Fixed issue with dark color context on Menu drop
- Added support for colSpan on Tables

# v1.3.0

- **Enhanced Components**: Anchor, Box, Button, Calendar, Carousel, Chart, CheckBox, Columns, Distribution, Drop, Image, Grid, Label, Legend, Menu, Meter, Notification, RadioButton, Search, Select, Spinning, Status, Tab, Table, Tiles, Timestamp, Tip, Toast, Topology
- Added !default to a number of SCSS variables
- Added responsive flag to Table and Legend
- Added size support to Spinning and Toast
- Added new style for Spinning icon
- Added align support to Label
- Added id support to CheckBox
- Added Dutch translation for messages and icons
- Added onActive support to Carousel
- Added xsmall and medium size to Grommet icons
- Improved the way we identify scroll parents
- Better word wrapping for CheckBox and RadioButton
- Better scroll support for Select

# v1.2.1

- Updated Aruba brand colors
- TextInput: fixed focus jump between multiple elements.
- Changed Layer to not close when the user clicks outside it
- Changed Meter and Bar to not have a minimum bar thickness
- Refactored Drop to handle better initial focus
- Sidebar: fixed IE11 problem with fill option
- Added `plain` prop to Form component
- Updated en-US icon keys
- Table: fixed IE11 problem where onMore is not invoked

# v1.2.0

- **Enhanced Components**: Anchor, Animate, Article, Box, DateTime, Drop, Header, Hero, Legend, Menu, Meter, Notification, Search, SearchInput, Select, TextInput, Tiles,
- Added 'jiggle' animation
- Using Vanilla theme for bower distribution
- Moved Gulp to devDependencies so that people not using it don't have to install
- Anchor and Button now pass onClick arguments

# v1.1.0

**New components**: TableHeader
**Enhanced Components**: Accordion, Anchor, Box, Button, Chart, Checkbox, Columns, Distribution, Drop, Footer, Form, Header, Layer, LoginForm, Menu, Notification, Search, Select, Split, Tabs, TextInput, Tiles, Timestamp, Tip, Topology

- Added xxsmall size for Chart
- Changed the small padding breakpoint for Graph in Chart
- Added xsmall size to Sidebar
- IE11 Fixes
- Added a delay on Box background color check to avoid issues with color index
- Removed deprecated icons from 1.0.0 release
- Fixed Drop position issues in Firefox
- Added truncate property to Title, Heading, and Label
- Switch Vanilla theme to use Work Sans font
- Improved algorithm for checking dark background context
- Fixed race condition issue with Drop component
- Fixed width issues with Forms inside Layer in IE11
- Updated original colors for social and brand icons
- Better support for dark context
- Added fill option to Menu
- **Removed Header and Footer dependency from Sidebar (Use Menu fill)**
- Added align option to Anchor
- Removed 'max' size option for Box
- Fixed Button border color on dark and light context
- Added Black as a dark color for all themes
- Enhanced accessibility for Layer
- Changed default size of Hero to medium
- **Deprecated Hero properties**: backgroundImage, backgroundPosition, backgroundVideo, colorIndex, flush, image, justify, responsiveBackgroundPosition, separator
- Added fit option to Video
- Added align option to Image and Video

# v1.0.1

- **Enhanced components**: Anchor, Box, Button, Card, Chart, CheckBox, DateTime, Drop, Footer, Heading, Hero, HotSpots, Label, Layer, List, Map, MarkerLabel, Menu, Meter, Notification, Pulse, Quote, RadioButton, Select, SunBurst, Table, Tiles, Toast
- Added few missing components to the main index.js file
- Few new icons added to the set
- Added more locales to the i18n set
- Updated Table minimum cell width from 96px to 120px

# v1.0.0

- **New Components**: Select, TextInput
- **Deprecated Components**: SearchInput
- Refactored all components to be accessible
- Removed deprecated code
- Refactored all components to work well in dark mode
- Include new icon set that are pixel perfect

# v0.6.12

- **Enhanced components**: Accordion, AccordionPanel, Animate, App, Box, Card, Carousel, Chart, CheckBox, Columns, DateTime, Distribution, Footer, Header, Headline, Image, Layer, Legend, List, ListItem, Markdown, Menu, Meter, Notification, Quote, SocialShare, Split, Table, Tabs, Tile, Tiles, Timestamp, Tip, Title, Value, Video
- **New Components**: Pulse, Toast
- **Deprecated Components**: Attribute, Brick, Bricks, Calendar, Chart (v1)
- Enhanced Box, Tiles, and Columns layout capabilities
- Aligned sizing across Box, Tile, Columns, Image, Video, Quote, Chart, Meter, Distribution
- Added support for markdown in Card
- Added many tests
- Fixed some Meter drawing issues
- Fixed some infinite scroll issues
- IE 11 fixes
- Added deprecation warnings in preparation for release 1.0

# v0.6.11

- **Enhanced components**: Anchor, App, Article, Box, Calendar, Carousel, CheckBox, DateTime, Drop, FormField, Hero, Label, Layer, Legend, List, Map, Menu, Meter, Notification, NumberInput, Search, Tabs, Tiles, Topology, Value, Video
- **New Components**: Accordion, Animate, Announcer, Chart, Card, Range, SunBurst, Tip
- IE fixes
- Improved Accessibility
- Deprecated init command. Use [grommet-cli](https://github.com/grommet/grommet-cli) to create new projects.
- New site live using github.io pages
- Updated Aruba theme
- Propagate props and context for existing constructors
- Added more tests to existing components

# v0.6.10

- **Enhanced Components**: Article, Anchor, Box, Checkbox, Header, InfinityScroll, Layer, Notification, Search, Split, StatusIcon, Tile, Tiles,
- IE Fixes
- Added babel-runtime
- Accessibility Enhancements
- Added Stop icon

# v0.6.9

- **Enhanced Components**: Box, Button, Columns, Date, DateTime, Footer, Header, Menu, Meters, NumberInput, SearchInput, Table, Title, Value
- **New Component**: SVGIcon
- Important IE11 and Edge fixes
- Added `grommetux-` css namespace to avoid conflict with existing styles
- Improved CLI to be more resilient with non-existing tasks

# v0.6.7

- **Enhanced Components**: Anchor, Article, Box, Button, Chart, DOMUtils, Footer, Header, KeyboardAccelerator, Layer, Meter, SearchInput, Tile
- **New Component**: ImageField
- Important IE11 and Edge fixes
- Proper use of console.warn
- Deprecated superagent in favor of fetch api
- Added Brick and Bricks to Bower

# v0.6.6

- Fixed blocking issue with `grommet init` command

# v0.6.5

- **Enhanced Components**: Article, Box, Chart, Distribution, Footer, Header, Image, Layer, List, Markdown, Menu, Meter, Selection, Status, Table, Tile, Video
- Important IE11 and Edge fixes
- Welcome React 15!

# v0.6.2

- **Enhanced Components**: Article, Box, Button, Chart, CheckBox, Distribution, FormField, Header, Image, Label, Layer, Menu, Meter, Paragraph, SkipLinks, Tags, Tile, Video
- **New Components**: Markdown, WorldMap, SocialShare, Quote, Value
- New set of icons
- Removed deprecated features
- Added support for `grommet-toolbox`
- Accessibility improvements to Icons
- Added tint (t) option to colored box

See [grommet-toolbox](https://github.com/grommet/grommet-toolbox) documentation for reference on how to migrate.

# v0.5.5

Fixed issues with missing icons for NPM release.

# v0.5.4

- **Enhanced Components**: Anchor, Attribute, Box, Brick, Button, Calendar, Carousel, Drop, Footer, Heading, Headline, Image, Label, Layer, ListItem, Locale, LoginForm, Menu, Notification, Paragraph, RadioButton, Search, SearchInput, Section, Sidebar, SkipLinkAnchor, Table, TableRow, Tag, Video
- **New Components**: Columns
- Added support for huge icons
- Updated Metric font
- Performance improvements: Removal of lodash, optimized Uglify code.

# v0.5.3

- **Enhanced Components**: Button, Chart, CheckBox, Distribution, Label, Legend, LoginForm, Menu, Meter, NumberInput, Tile, Tiles
- **New Component**: Article, Brick, Tag/Tags,
- Initial Right to Left (RTL) support

# v0.5.2

- **Enhanced Components**: Box, Distribution, ListItem, Meter, Notification, SkipLinkAnchor, SkipLinks, StatusIcon

# v0.5.1

- Added padding to SkipLink container
- Fixed a11y issues with Chart and Meter

# v0.5.0

Welcome Babel 6! Follow these [instructions](https://github.com/grommet/grommet/wiki/Grommet-0.5.0-and-Babel-6) to update your project to Grommet 0.5.0.

# v0.4.2

- **Enhanced components**: Anchor, Article, Box, Button, Chart, Distribution, FormFields, Icons, Layer, List, Locale, Meter, Search, SearchInput, Status, Table, Tiles, Menu
- **New components**: Image, NumberInput,
- [DEPRECATED] ListItem component
- Fixed issue with Hot Reload
- Updated Grommet code base to ES6
- Added more tests

# v0.4.1

- **Enhanced components**: LoginForm, Meter, Legend, Icons, Anchor, Box, Menu, Calendar, Gravatar, Carousel, Split, Layer, Form, Table, Nav, Search, Layer, Button, Article, Footer, Notification, Chart
- **New components**: Video and CarouselControls
- Added a11y support for Chart and MenuDrop
- Enhanced styling for different themes
- Improved Infinite Scroll behavior for mobile
- Fixed blocking issue with Tabs in 0.4.0 (see https://github.com/grommet/grommet/issues/253)

# v0.4.0

Follow instructions [here](https://github.com/grommet/grommet/wiki/Grommet-0.4.0-and-React-0.14) to update your project to Grommet 0.4.0

# v0.3.8

- **Enhanced components**: Box, List, Sidebar, Menu, Anchor, Layer, LoginForm, Tiles,
- Added Icons as React components: see [Icons Documentation](http://grommet.io/docs/develop/icon)
- Styling updates for base elements like: h1-h5 and paragraphs
- Updated Design assets
- Enhanced documentation
- Moved all example apps to separate repositories
- Removed support for `grommet export` command-line
- Added support to run Grommet as a library
- If you are using Grommet Developer environment you can have your `package.json` like this now:

```
{
 "name": "sample-app",
 "version": "0.0.1",
 "main": "src/js/index.js",
 "dependencies": {
   "grommet": "0.3.8",
   "gulp": "^3.9.0"
 },
 "engines": {
   "node": ">= 0.10",
   "npm": ">= 1.4"
 }
}
```

Webpack and Grommet will take care of loading all the other dependencies for you, such as: React, Gulp libraries, Intl, Inuit, and many others...

# v0.3.7

- **New components**: [tab bar](http://grommet.io/docs/develop/tabs)
- **Enhanced components**: Title, Menu, Table, Header, Article, Anchor, Meter, Login, Clear
- **Enhanced examples apps**: medium-app, people-finder, sample-app, todo-app-modular
- Added more unit tests to Grommet
- Added server-side rendering to http://grommet.io
- Removed node-uuid from Grommet to better support server-side rendering
- Better path resolving for Grommet global installation
- Removed react-time dependency in favor of Grommet i18n formatted date
- Fixed outdated eslint rules that prevented errors to show up
- Better a11y support for Meter, Clear Icon, and Layer
- Better accessibility support for SkipLinks
- Enhanced documentation
- Refactored sticker sheet for HPE

# v0.3.6

- **Enhanced examples apps**: cabler, medium-app
- **Enhanced components**: Topology, Textarea, Button, FormField, Split, Layer, Meter, CheckBox, RadioButton, Chart, Box, Distribution, Table
- Added `node-clean` to remove node_modules
- Removed deprecated react-tools (using Babel now)
- Added version check for Node and NPM.
- Added multi-select support for Table
- Enhanced overall experience for grommet.io
- Add error logs for Grommet NODE_PATH issues
- Added the ability to add extra eslint rules
- Added theme for Aruba
- Enhanced experience for Firefox, Internet Explorer
- Added better theme detection using IP range
- Added id to button for better automation support
- Updated HPE theme
- Enhanced documentation
- Better accessibility support for SkipLinks

# v0.3.2

- **Enhanced examples apps**: Cabler, People Finder,
- **Enhanced components**: SkipLink, Distribution, Menu, Box, Topology, Meter, Tile, Footer, Split, Chart, SearchInput, Calendar, List, ListItem, FormField, Anchor, Button
- Fixed version of Grommet for `grommet init` task
- Added float support for the Footer
- Updated NPM dependencies and added integration with [David](https://david-dm.org/hewlettpackard/grommet)
- Refactored the design assets structure (separate files for icons, general, and templates)
- Enhanced documentation
- Added Accessibility Documentation

# v0.3.1

- **New example app**: cabler
- **New components**: Distribution, Carousel, Topology
- **Enhanced components**: Split, Header, Box, Chart, Menu, Tiles, Table, List, Meter, DropCaret
- Added PDF version of Grommet for Adobe Illustrator
- Added better support for server-side rendering and isomorphic react
- Added Skip-To link
- Optimized images for Grommet using TinyPNG
- Refactored Grommet source code for better separation of responsibilities
- Better accessibility support
- Enhanced all sample apps
- Enhanced Documentation
- Enhanced design assets

# v0.3.0

- **New components**: ConfirmationForm, Calendar,
- **Enhanced components**: RadioButton, CheckBox, input, Button, FormField, Menu, Table, Status, Layer, Meter, Form, Chart, Header, Split
- New sample applications: todo-app-modular, people-finder
- Added the fonts as CDN
- Added lang attribute to Grommet for better Accessibility support
- Added accessibility navigation to the Calendar
- Added accessibility to icon
- New website published
- Integrated with Sauce Labs
- Added Integration Tests for Grommet
- Better compatibility with Node 0.10
- Moved from `jsdom` to` jsdom-no-contextify`
- Moved from `blanket` to `instabul` from code coverage
- Added `devServerHost` key to gulpfile.js options to allow remote development
- Added HP Software showcase examples
- Added tests for Calendar
- Enhanced Documentation
- Enhanced design assets

# v0.2.4

- **Enhanced components**: FormField, RadioButton
- **IMPORTANT**: Fixing blocking issue after Webpack released version 1.9.11.
- Added Slackin integration
- Added version check from Grommet as in `grommet --version`
- Enhanced documentation
- Added `--skipMinify` option to `gulp dist` to avoid minifying Javascript files.
- Enhanced design assets

# v0.2.3

- **New components**: Button, Distribution
- **Enhanced components**: Meter, Legend, Chart, Menu
- Added todo-app-modular as an example app
- Added README.md for example apps
- Improvements for examples apps
- Performance Optimization for the Server (added gzip compression)
- Performance Optimization for Images (via ImageOptim)
- Fixed some reports for static code analysis in Code Climate
- Added Code Climate support
- Added new Grommet logo
- Added more tests for existing components
- Enhancements for mobile experience
- Added more examples to the grommet server
- Enhancements in documentation

# v0.2.2

- **New components**: IndexList, RestWatch, Meter (now Donut has been deprecated)
- **Added documentation for**: Split, Sidebar, Status, Map
- **Enhanced components**: Left, Right, Split, Sidebar, Donut, Chart, Tile, Menu, Search, Legend, ResourceNotifications, CheckBox, RadioButton, FormField, Documentation, Section
- Replaced JSHint with ESLint (now we validate code format issues)
- Added more tests to Grommet
- Added feature to export example app from Grommet (e.g. medium-app)
- Renamed tour to medium-app and added enhancements to it
- Added the cto-app-tuner sample application
- Added i18n support
- Enhanced Illustrator Sticker Sheet

# v0.2.0

- Enhancements in the following components: Title, Donut, Menu, Chart, and gulp-tasks
- New components: Split, Map, and Sidebar
- New version of the FormField component
- Refactored folder structure of gulp-tasks and test files
- Enhanced Documentation
- Adjustments in the HPInc theme

# v0.1.2

- Added HPInc Theme
- Added the initial testing framework for Grommet core
- Enhanced Documentation
- Enhanced Forms
- Hot fixes for Windows environment
- Reduced the number of NPM dependencies
- Enhanced version of the Tour
- Refactored Header component

# v0.1.1

- Fixes for loading fonts

# v0.1.0

- First version for initial feedback
