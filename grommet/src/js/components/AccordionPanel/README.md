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

**accordion.icons.expand**

The icon to use when the panel is collapsed. Expects `React.Element`.

Defaults to

```
<FormDown />
```

**accordion.border**

The border to use in the accordion. Expects `React.Element`.

Defaults to

```
side: bottom, color: border
```
