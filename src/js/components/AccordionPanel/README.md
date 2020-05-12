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
  
**accordion.hover.heading.color**

The text color of the heading when hovered. 
    backward compatible with accordion.hover.color Expects `string | { dark: string, light: string }`.

Defaults to

```
{ dark: "light-4", light: "dark-3" }
```

**accordion.heading.level**

The heading level. Expects `number`.

Defaults to

```
4
```

**accordion.heading.margin**

The margin size around the heading. Expects `string`.

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

**accordion.border.color**

The border color to use in the accordion panel content. Expects `string | { dark: string, light: string }`.

Defaults to

```
border
```

**accordion.border.side**

The border side to use in the accordion panel content. Expects `string`.

Defaults to

```
bottom
```

**accordion.panel.border.color**

The border color to use on the accordion panel. Expects `string | { dark: string, light: string }`.

Defaults to

```
undefined
```

**accordion.panel.border.side**

The border side to use on the accordion panel. Expects `string`.

Defaults to

```
undefined
```

**accordion.panel.border.size**

The border size of the accordion panel. Expects `xsmall | small | medium | large | xlarge`.

Defaults to

```
undefined
```

**accordion.panel.border.style**

The border style of the accordion panel. Expects `solid | dashed | dotted | double| groove | ridge 
      | inset | outset | hidden`.

Defaults to

```
undefined
```
