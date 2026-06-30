# Grommet TimeInput vs MUI TimeField — Keyboard Input Handling Analysis

## Issue Summary

Grommet's TimeInput has fundamental keyboard input problems that differ significantly from MUI's TimeField:

- User reports: "type digit, get second digit and colon; type 3-digit, it ignores it but moves cursor after colon"
- Root cause: **Non-segment-aware, global digit parsing** vs MUI's **segment-specific accumulation**

---

## Problem Breakdown

### Grommet's Current Approach (Line 217-290, TimeInput.js)

**Algorithm: Extract all digits globally, then format with separators**

```javascript
const formatTypedTimeInput = ({ value, timeFormat, showSeconds }) => {
  // PROBLEM 1: Extract ALL digits first, ignoring segment context
  const digits = normalized.replace(/\D/g, '').slice(0, maxDigitLength); // Line 221

  // PROBLEM 2: Simple position-based logic for adding colons
  if (digits.length <= 1) {
    formatted = digits; // "1"
  } else if (digits.length <= 2) {
    formatted = isTwoDigitHourValid ? `${digits}:` : digits; // "12:" ← AUTO-COLON
  } else if (!showSeconds && digits.length === 3) {
    // PROBLEM 3: Unclear behavior - which segment are we in?
    formatted = isTwoDigitHourValid
      ? `${digits.slice(0, 2)}:${digits.slice(2, 3)}` // "12:3"
      : `${digits.slice(0, 1)}:${digits.slice(1, 3)}`; // "1:23"
  } else if (!showSeconds && digits.length === 4) {
    formatted = isTwoDigitHourValid
      ? `${digits.slice(0, 2)}:${digits.slice(2, 4)}` // "12:34"
      : `${digits.slice(0, 1)}:${digits.slice(1, 3)}`; // "1:23" (4th digit ignored!)
  }
};
```

**Problems with this approach:**

| Issue                          | Grommet Behavior                          | MUI Behavior                                 | Impact                                             |
| ------------------------------ | ----------------------------------------- | -------------------------------------------- | -------------------------------------------------- |
| **No segment context**         | Treats all digits as a global stream      | Tracks segment state (hour/minute/period)    | User can't control which segment they're typing in |
| **Premature colon insertion**  | Auto-adds colon after 2 digits            | Only adds separator when segment is complete | User can't continue editing the same segment       |
| **Invalid 3rd digit handling** | "1:23" if hour invalid, ignores 4th digit | Replaces instead of concatenates             | User sees silent failures                          |
| **No digit accumulation**      | Global digit pool                         | Per-segment digit accumulation               | No smart validation per segment                    |
| **Auto-advance logic missing** | Cursor moves but segment doesn't          | Auto-advances when segment complete          | Unpredictable cursor behavior                      |

---

## MUI's Segment-Based Approach (from test patterns)

**Algorithm: Track segment context, accumulate digits within segment, validate, then auto-advance**

```typescript
// MUI test case: typing "1" then "4" in hours segment
it('should concatenate the digit pressed to the current section value if the output is valid', async () => {
  await testFieldChange({
    format: 'kk:mm',
    keyStrokes: [
      { value: '1', expected: '01:mm' }, // ← Segment=hour, digit=1 → "01"
      { value: '4', expected: '14:mm' }, // ← Segment=hour, digit=4 → "14" (not "01:4")
    ],
  });
});

// MUI test case: typing "7" then "2" should replace 7 with 2 (exceeds max)
it('should set the minute to the digit pressed if the concatenate exceeds the maximum value', async () => {
  await testFieldChange({
    format: adapter.formats.minutes,
    defaultValue: adapter.date('2022-06-15T14:12:25'),
    keyStrokes: [
      { value: '7', expected: '07' }, // ← Segment=minute, digit=7 → "07"
      { value: '2', expected: '02' }, // ← "07" + "2" = "072" > 59, so replace: "02"
    ],
  });
});

// MUI behavior: Two-digit hour format, auto-moves to minutes when complete
it('should go to the next section when pressing 2 in a 12-hours format', async () => {
  // When hour is complete (2 digits) and valid, auto-advance to minutes
  // User types: 1 → 2 → 3 → 4
  // Result: hours=12, minutes=34 (auto-advanced after hour complete)
});
```

**MUI's key principles:**

1. **Segment Awareness**: Knows which field user is in (hour/minute/second/meridiem)
2. **Digit Accumulation**: For segment "hour" with 1 digit already ("1"), typing "2" → "12", not "01:2"
3. **Smart Validation**:
   - If `hour + digit > max`, replace instead of concat
   - If `hour + digit < max` and valid, concat and stay in segment
   - If `hour + digit == max` (complete), auto-advance to next segment
4. **Clear Boundaries**:
   - Hour segment: 2 digits max
   - Minute segment: 2 digits max
   - Clear "when to advance" rules
5. **No premature separators**: Colons added only after user completes segment, not during typing

---

## Comparison: Step-by-Step Typing Sequence

### Scenario: User types "09:30 am" in 12hr format

#### Grommet's behavior:

```
Type "0" → "0"                    ✓ (correct display)
Type "9" → "09:"                  ✗ (colon auto-added, user didn't type it)
Type "3" → "09:3"                 ✓ (looks right)
Type "0" → "09:30"                ✓ (looks right)
Type " " → display updates        ✗ (space handling unclear)
Type "a" → "09:30 am"             ✓ (meridiem added)

PROBLEM: User had to type around auto-added colons; cursor placement unpredictable
```

#### MUI's behavior:

```
Type "0" → [hour field] "0_" (placeholder visible)
Type "9" → [hour field] "09" (complete, auto-advance to minute)
Type "3" → [minute field] "03" (digit in new segment)
Type "0" → [minute field] "30" (complete, auto-advance to meridiem)
Type "a" → [meridiem field] "AM" (meridiem set)

Result: User always knows which segment they're typing in; predictable behavior
```

---

## Root Causes (Grommet Code Analysis)

### 1. **Global Digit Extraction (Line 221)**

```javascript
const digits = normalized.replace(/\D/g, '').slice(0, maxDigitLength);
// Extracts ALL digits: "09:30am" → "0930"
// Lost context: was the user editing the hour or the minute?
```

### 2. **Position-based Logic Instead of Segment Logic (Lines 260-276)**

```javascript
} else if (!showSeconds && digits.length === 3) {
  // GUESSING: if 3 digits, split as "HH:M" or "H:MM"
  // But which segment is the user in? Unknown!
  formatted = isTwoDigitHourValid
    ? `${digits.slice(0, 2)}:${digits.slice(2, 3)}`
    : `${digits.slice(0, 1)}:${digits.slice(1, 3)}`;
}
```

### 3. **No Per-Segment State Tracking**

Grommet's state (line 1081):

```javascript
const [pickerParts, setPickerParts] = useState(...)  // Only used for PICKER
// No keyboard-specific segment state for input field!
```

MUI tracks:

```typescript
selectedSections: hours | minutes | meridiem; // Which segment user is in
```

### 4. **Auto-colon Too Aggressive (Line 268)**

```javascript
} else if (digits.length <= 2) {
  formatted = isTwoDigitHourValid ? `${digits}:` : digits;
  // ADDS COLON AFTER 2 DIGITS
  // User sees "09:" and might expect to continue editing "09", not move to minutes
}
```

MUI adds separator only when:

- Segment is complete with max digits AND
- Segment value is valid AND
- Next segment exists

---

## Required Architectural Changes

### Minimal Changes (Short-term fix):

1. **Add segment-aware state**: Track `currentInputSegment` separately from picker
2. **Implement per-segment digit accumulation**:
   ```javascript
   if (currentSegment === 'hour') {
     const hourDigits = extractSegmentDigits(textValue, 'hour');
     const newHourDigits = hourDigits + newDigit;
     if (newHourDigits valid for format) {
       setHourDigits(newHourDigits);
     } else if (newDigit valid for hour) {
       setHourDigits(newDigit);  // Replace, not concat
     }
   }
   ```
3. **Delay colon insertion**: Only add after user completes segment
4. **Auto-advance logic**: When segment complete, move to next

### Proper Solution (Long-term):

1. **Migrate to field section pattern** (like MUI's FieldSection model)
2. **Build "field manager" abstraction** (similar to MUI's useField)
3. **Implement proper masking/formatting** (like `rifm` library pattern)
4. **Add comprehensive keyboard tests** (matching MUI's test coverage)

---

## Impact for Users

### Current (Broken) Behavior:

- ✗ Typing "123" ignores the 3rd digit
- ✗ Cursor jumps unpredictably
- ✗ User must work around auto-colon placement
- ✗ No clear indication of which segment accepts input
- ✗ 3-digit input causes silent failures

### After Fix (Expected):

- ✓ Each digit accumulates in current segment
- ✓ Cursor placement predictable
- ✓ Auto-advance to next segment when complete
- ✓ Invalid input rejected with visual feedback
- ✓ User always knows which segment is active
- ✓ Keyboard patterns match industry standard (MUI, web standards)

---

## Related Issues

- **Focus management** (already fixed this session): Now works ✓
- **Selected text color styling** (already fixed this session): Now uses tokens ✓
- **Keyboard digit input**: **FUNDAMENTAL ARCHITECTURAL ISSUE** ← This is blocking

---

## Recommendation

**This is not a quick styling fix.** The keyboard digit handling needs:

1. Redesign the input state machine
2. Implement segment-aware accumulation
3. Add comprehensive keyboard tests
4. Verify against MUI's test patterns

**Effort estimate**: 3-5 hours for complete fix + testing

**Complexity**: HIGH (state machine redesign)

**Priority**: HIGH (blocks production use of TimeInput for keyboard input)
