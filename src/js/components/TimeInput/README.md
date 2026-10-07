## TimeInput
Documentation for this component: https://v2.grommet.io/timeinput

### Theme

TimeInput is in beta, so its theme API is subject to breaking changes. The
theme is organized by the part it styles:

| Theme path | Part and supported values |
| --- | --- |
| `timeInput.container` | The field frame. Supports Box appearance and sizing values such as `background`, `border`, `margin`, `pad`, and `round`. |
| `timeInput.value` | The visible value frame. Supports Box-part appearance and sizing values `background`, `border`, `elevation`, `height`, `margin`, `pad`, `round`, and `width`. |
| `timeInput.segment` | Time sections and separators. Supports Box-part appearance values `background`, `border`, `elevation`, `height`, `margin`, `pad`, `round`, and `width`, plus text `color`, `size`, `weight`, and placeholder `color`, `size`, and `weight`. Its `active` state supports Box-state values `background`, `border`, `elevation`, `pad`, and `round`, plus text `color`, `size`, and `weight`. The active underline is styled through `active.border` (default side: `bottom`). A scalar `pad` applies to all edges; the base theme uses horizontal-only padding to preserve the default appearance. |
| `timeInput.dropButton` | The popup trigger button. Accepts a Button theme object or named Button kind, plus an optional top-level `icon` override; defaults to the clock icon and `toolbar` kind. |
| `timeInput.drop` | The popup frame. Supports Box appearance values, `width` (Box `WidthType`), `height` (including `height.min`), and `gap`. The base theme defines the default width; an omitted `width.max` defaults to `100%` to constrain the popup to available space. |
| `timeInput.drop.column` | Each popup list. Supports Box-part appearance and sizing values (`background`, `border`, `elevation`, `height`, `margin`, `pad`, `round`, and `width`), plus `gap`. When `height` is omitted, the list retains its responsive default max height. |
| `timeInput.drop.option.container` | The Box-backed option surface. Supports Box-part values `background`, `border`, `elevation`, `height`, `margin`, `pad`, `round`, and `width`. Its `hover`, `selected`, and `selected.hover` states support Box-state values `background`, `border`, `elevation`, `pad`, and `round`. Missing selected values inherit the base container style. |
| `timeInput.drop.option.text` | Option label text. Supports `color`, `size`, and `weight`; its `selected` state supports the same values and overrides the base text values individually. |

TimeInput themes only style the parts above. Option role, selection semantics,
layout alignment, and interaction behavior remain implementation-owned.
FormField continues to own its surrounding validation frame; option
focus-visible and general focus indicators continue to use Grommet's global
focus theme. Inline TimeInput styling is used
inside DateTimeInput and shares the popup column and option theme.