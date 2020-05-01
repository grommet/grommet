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
  
**accordion.hover.color**

The hover color used for an accordion panel control. Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: "light-4", light: "dark-3" }
```

**accordion.heading.level**

The heading level used for the accordion. Expects `number`.

Defaults to

```
4
```

**accordion.heading.margin**

The margin size around heading in accordion. Expects `string`.

Defaults to

```
undefined
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

**accordion.pad**

The pad size around the accordion. Expects `string`.

Defaults to

```
{ horizontal: xsmall }
```

**accordion.border.color**

The border color to use in the accordion. Expects `string | { dark: string, light: string }`.

Defaults to

```
border
```

**accordion.border.side**

The border side to use in the accordion. Expects `string`.

Defaults to

```
bottom
```
