## AccordionPanel
An Accordion panel.


## Properties

**label**

The panel label.

```
string
node
```

**header**

If specified, the entire panel header will be managed by the caller.

```
node
```
  
## Intrinsic element

```
div
```
## Theme
  
**accordion.heading.level**

The heading level used for the accordion. Expects `number`.

Defaults to

```
4
```

**accordion.icons.collapse**

The icon to use when the panel is expanded. Expects `React.Element`.

Defaults to

```
<FormUp />
```

**accordion.icons.color**

The icon color to use in the accordion. Expects `string | { dark: string, light: string }`.

Defaults to

```
control
```

**accordion.icons.expand**

The icon to use when the panel is collapsed. Expects `React.Element`.

Defaults to

```
<FormDown />
```

**accordion.border.color**

The panel border color to use in the accordion panel. Expects `string | { dark: string, light: string }`.

Defaults to

```
border
```

**accordion.border.side**

The panel border side to use in the accordion panel. Expects `string`.

Defaults to

```
bottom
```

**accordion.outer.border.color**

The outer border color around to use in the accordion. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**accordion.outer.border.side**

The outer border side to use in accordion. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```
