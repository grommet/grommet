# Focus Management & Placeholder Rendering: Grommet vs MUI

## Problem Statement

When a user tabs into Grommet's TimeInput field, there is:

1. **No visual indication** of which segment is active/focused
2. **No automatic selection** of the first segment (HH)
3. **Placeholder text disappears** as user types instead of persisting
4. **Unclear where typing will begin** — poor UX vs industry standard (MUI)

---

## Comparison: Grommet vs MUI

### Current Grommet Behavior

**Focus Handler (Missing):**

```javascript
// TimeInput.js: TextInput component
<TextInput
  // NO onFocus handler defined!
  // onFocus from user props passes through via restOfInputProps
  {...restOfInputProps}
  onBlur={(event) => {
    /* blur logic */
  }}
/>
```

**Placeholder Rendering (Current):**

```javascript
// Line 66-71: Default placeholder
const getDefaultSpacedValue = ({ timeFormat, showSeconds }) => {
  if (timeFormat === '24hr') {
    return showSeconds ? 'hh : mm : ss' : 'hh : mm';
  }
  return showSeconds ? 'hh : mm : ss am' : 'hh : mm am';
};

// Line 116: Used as placeholder
const resolvedPlaceholder = placeholder || getDefaultSpacedValue(...);

// Line 1232: Passed to TextInput
<TextInput placeholder={resolvedPlaceholder} ... />
// ↑ Placeholder is HTML5 placeholder attribute
// ✗ Problem: Disappears on ANY input, even if field is empty
```

**Result on Focus:**

- User tabs into field
- Sees placeholder text "hh : mm : aa"
- NO visual indication which segment is focused
- NO selection/highlighting of first segment
- First keystroke deletes placeholder and fills that position

---

### MUI Implementation

**Focus Handler (Automatic):**

```typescript
// useField.ts: Triggered when field receives focus
function focusField(newSelectedSections = 0) {
  setFocused(true);
  // Parse the selectedSections to get first segment index
  const parsedIndex = parseSelectedSections(0, state.sections); // 0 = HH segment

  // Get the DOM element for that segment and focus it
  sectionListRef.current.getSectionContent(parsedIndex).focus();
  // ↑ This causes DOM to highlight that specific section
}

const handleRootFocus = (event) => {
  rootProps.onFocus(event);

  // If focus is coming from OUTSIDE the field, set selectedSections = 0 (HH segment)
  const previous = event.relatedTarget;
  if (!(previous instanceof Node && rootRef.contains(previous))) {
    focusField(0); // ← Auto-select first segment on external focus
  }
};
```

**Placeholder Rendering (Per-Segment):**

```typescript
// buildSectionsFromFormat.ts: Each section stores its own placeholder
const getSectionPlaceholder = (sectionConfig, sectionFormat) => {
  switch (sectionConfig.type) {
    case 'hours':
      return 'HH';  // For 2-digit hour format
    case 'minutes':
      return 'MM';  // For 2-digit minute format
    case 'meridiem':
      return 'aa';  // For 12-hour marker
  }
};

// useFieldSectionContentProps.ts: Render section with fallback to placeholder
{
  children: section.value || section.placeholder,
  // ↑ Shows "HH" when value empty, "14" when user types "14"
  // ✓ Placeholder persists as user types because it's per-segment
}
```

**Visual Distinction (DOM Selection):**

```typescript
// syncSelectionToDOM.ts: Makes the active segment VISUALLY HIGHLIGHTED
const range = new window.Range();
const section = state.sections[parsedSelectedSections];
const target = domGetters.getSectionContent(parsedSelectedSections);

range.selectNodeContents(target); // ← Select all text in the segment
target.focus();
selection.removeAllRanges();
selection.addRange(range); // ← Browser highlights the selected text
// Result: User sees "HH" with white background (text selected)
```

**Result on Focus:**

- User tabs into field
- Sees "HH : MM : aa" with HH portion highlighted (text selected)
- Clear indication: user is in the HH segment
- First keystroke replaces the HH placeholder with typed digit
- Placeholder persists in MM and aa segments

---

## Architectural Differences

| Aspect                    | Grommet Current                               | MUI X                                                | Impact                                                               |
| ------------------------- | --------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------- |
| **Segment Focus State**   | Global `activeSegment` (used for picker only) | Per-field `selectedSections` state                   | Grommet can't track keyboard focus independently of picker           |
| **Focus Event Handler**   | Missing onFocus for TextInput                 | `handleRootFocus` + `focusField(0)`                  | Grommet doesn't auto-select first segment on tab                     |
| **Placeholder Rendering** | HTML5 `placeholder` attribute                 | Per-segment `section.value \|\| section.placeholder` | Grommet loses placeholder on first keystroke; MUI persists it        |
| **Selection Mechanism**   | Browser default (no manipulation)             | `window.Range` + `window.Selection` API              | Grommet doesn't highlight active segment; MUI visually highlights it |
| **Segment DOM Structure** | Single `<TextInput>` field                    | Multiple `<span contentEditable>` elements           | Grommet has one flat value; MUI has structured sections              |

---

## Implementation Plan for Grommet

### Phase 1: Add Focus Handler & Segment Selection (Low Risk)

**Changes to TimeInput.js:**

1. **Add onFocus handler to TextInput:**

```javascript
const handleTextInputFocus = useCallback(
  (event) => {
    // Set active segment to 'hour' (first segment)
    setActiveSegment('hour');

    // Select the first segment text in the input
    // Get the input element and its value
    const input = ref.current;
    if (input && input.value) {
      const rangeEnd = 2;  // "hh" is 2 characters
      input.setSelectionRange(0, rangeEnd);
    }

    // Call user's onFocus if provided
    if (onFocus) onFocus(event);
  },
  [onFocus],
);

// In TextInput component:
<TextInput
  {...restOfInputProps}
  onFocus={handleTextInputFocus}  // ← Add this
  onBlur={...}
/>
```

2. **Apply visual selection indicator:**

```javascript
// Use CSS to highlight selected segment
// In StyledTimeInput.js
const StyledTimeInputInputWrapper = styled(Box)`
  position: relative;

  /* When HH segment is selected, highlight it */
  input::selection {
    background-color: var(--grommet-global-colors-focus, #4173b3);
    color: white;
  }
`;
```

---

### Phase 2: Preserve Placeholder During Typing (Medium Risk)

**Challenge:** HTML5 `placeholder` attribute is lost on input.
**Solution:** Use `defaultValue` + `value` pattern with placeholder state.

```javascript
// In TimeInput.js state:
const [placeholderState, setPlaceholderState] = useState(
  getDefaultSpacedValue({ timeFormat: resolvedTimeFormat, showSeconds })
);

// In TextInput component:
<TextInput
  placeholder={textValue ? '' : placeholderState}  // ← Hide placeholder when has value
  value={textValue}
  onChange={(event) => {
    // When user clears field, restore placeholder state
    if (!event.target.value) {
      setPlaceholderState(getDefaultSpacedValue(...));
    }
  }}
/>
```

---

### Phase 3: Segment-Aware DOM Selection (Higher Risk)

**Goal:** Make each segment visually distinct and selectable.

**Option A (Conservative):** Keep single input, improve text selection:

```javascript
// When activeSegment changes, update input selection
useEffect(() => {
  if (!ref.current || !textValue) return;

  const ranges = getSegmentRanges({
    value: textValue,
    timeFormat,
    showSeconds,
  });

  const range = ranges[activeSegment];
  if (range) {
    ref.current.setSelectionRange(range.start, range.end);
  }
}, [activeSegment, textValue]);
```

**Option B (Ambitious):** Create structured section DOM like MUI:

- Split `<TextInput>` into multiple `<span>` elements (one per segment)
- Make each segment independently focusable
- Implement contentEditable-style editing
- ⚠️ **Not recommended:** Breaking change to DOM structure

---

## Recommended Implementation Path

### Priority 1 (Ship First):

✅ **Add onFocus handler** — Auto-select first segment on focus

```
Lines to modify:
- TimeInput.js: Add handleTextInputFocus
- TimeInput.js: Pass onFocus to TextInput
- getSegmentRanges(): Use to find HH position
```

**Effort:** ~30 min  
**Risk:** Low (only adds behavior, doesn't remove)  
**User Impact:** Immediate clarity on where focus is

### Priority 2 (Validate UX):

✅ **Improve placeholder visibility**

- Keep HTML5 placeholder but make it more visible
- OR implement segment-specific placeholders with visual feedback

```
Lines to modify:
- StyledTimeInput.js: Enhance placeholder styling
- TimeInput.js: Add placeholder state management
```

**Effort:** ~45 min  
**Risk:** Low-Medium (CSS/styling changes)  
**User Impact:** Better visual feedback during typing

### Priority 3 (Future):

❓ **Segment-aware DOM** (only if Phase 1+2 insufficient)

- Evaluate if visual selection + placeholder improvements solve UX issue
- Only pursue structured sections if keyboard navigation needs major overhaul
  **Effort:** 4-6 hours  
  **Risk:** High (major DOM refactor)

---

## Testing Strategy

**Manual Testing (Browser):**

1. Tab into empty field → should show "hh : mm : aa" with HH highlighted
2. Type "1" → should show "1h : mm : aa" (1 replaces HH placeholder)
3. Type "2" → should show "12 : mm : aa" (2 replaces h)
4. Continue typing "30" → should auto-advance to MM segment
5. Tab to different field, tab back → HH should be highlighted again

**Automated Testing:**

- Test focus event handler with `@testing-library/react`
- Test selection range with `userEvent.type()`
- Verify activeSegment state changes on focus

---

## Decision Gate

**Question for user:** Which implementation level do you want?

**Option A (Quick Win):** Phase 1 only

- Auto-select HH segment on focus
- Minimal code changes
- Addresses the core UX issue
- Implementation: 30 minutes

**Option B (Complete Fix):** Phase 1 + 2

- Auto-select + placeholder persistence
- Better visual feedback
- Industry-standard behavior
- Implementation: 1.5 hours

**Option C (Full Parity):** Phase 1 + 2 + segment restructuring

- Matches MUI's structured section approach
- Best UX but highest risk
- Breaking DOM changes
- Implementation: 4-6 hours

**Recommendation:** Start with **Option A**, validate with user, then add Phase 2 if needed.
