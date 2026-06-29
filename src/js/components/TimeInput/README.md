## TimeInput

`TimeInput` is a structured time-only input that supports 12-hour and 24-hour formats,
optional seconds, and min/max bounds. Users can interact with TimeInput through:
- **Direct text input**: Type time directly in the format shown by the placeholder
- **Interactive picker**: Click the clock icon to open a scrollable time picker
- **Keyboard navigation**: Use arrow keys to adjust values when the picker is open

### Basic Usage

```jsx
import { TimeInput } from 'grommet';

<TimeInput value="09:30" onChange={({ value }) => console.log(value)} />;
```

### Direct Text Editing

Users can type time values directly into the input field. The component automatically parses and validates the input:

```jsx
// User types "9:05" → emits { value: "09:05" }
// User types "14:30" → emits { value: "14:30" } (24hr format)
<TimeInput 
  timeFormat="24hr" 
  onChange={({ value }) => console.log(value)} 
/>

// In 12hr mode, include am/pm in the input text
// User types "3:30 pm" → emits { value: "03:30 PM" }
<TimeInput
  timeFormat="12hr"
  onChange={({ value }) => console.log(value)}
/>
```

### Interactive Time Picker

Click the clock icon to open an interactive picker with scrollable columns for hours, minutes, seconds (optional), and period (12hr mode):

```jsx
<TimeInput 
  timeFormat="12hr"
  showSeconds={true}
  onChange={({ value }) => console.log(value)} 
/>
```

### With FormField

```jsx
import { Form, FormField, TimeInput } from 'grommet';

<Form>
  <FormField name="startTime" htmlFor="startTime" required>
    <TimeInput id="startTime" name="startTime" />
  </FormField>
</Form>;
```

### Validation and Bounds

```jsx
<TimeInput 
  timeFormat="24hr"
  min="08:00"
  max="18:00"
  minuteStep={15}
  onChange={({ value }) => console.log(value)} 
/>
```

### Core Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string \| Date` | - | Controlled value |
| `defaultValue` | `string \| Date` | - | Uncontrolled initial value |
| `onChange` | `({ value: string }) => void` | - | Emits normalized time string |
| `timeFormat` | `'12hr' \| '24hr'` | browser locale-derived | Display and parsing format |
| `showSeconds` | `boolean` | `false` | Adds seconds segment |
| `minuteStep` | `number` | - | Minute increment validation |
| `secondStep` | `number` | - | Seconds increment validation |
| `min`, `max` | `string` | - | Boundaries in selected format |
| `readOnly`, `disabled` | `boolean` | `false` | Interaction restrictions |

### Theme Keys Used

- `timeInput.container.round`
- `timeInput.icon.size`
- `timeInput.drop.height`
- `timeInput.drop.option.pad`
- `timeInput.drop.option.width`
- `timeInput.drop.options.gap`
