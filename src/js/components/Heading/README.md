## Heading
Heading text structed in levels.

## Usage

```javascript
import { Heading } from 'grommet';
      <Heading/>
```

## Properties

**level**

The heading level. It corresponds to the number after the 'H' for
      the DOM tag. Set the level for semantic accuracy and accessibility.
      The sizing can be further adjusted using the size property.

```
1
2
3
4
```

**margin**

The amount of margin above and/or below the heading. An object can be
      specified to distinguish top margin and bottom margin.

```
none
small
medium
large
{
  bottom: 
    none
    small
    medium
    large,
  top: 
    none
    small
    medium
    large
}
```

**size**

The font size is primarily driven by the chosen tag. But, it can
      be adjusted via this size property. The tag should be set for semantic
      correctness and accessibility. This size property allows for stylistic
      adjustments.

```
small
medium
large
```

**textAlign**

How to align the text inside the heading.

```
start
center
end
```

**truncate**

Restrict the text to a single line and truncate with ellipsis if it
      is too long to all fit.

```
boolean
```
  