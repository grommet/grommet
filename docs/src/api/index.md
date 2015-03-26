---
label: Ligo API
id: ligo-api
documentRank: 2

Ligo API
=========

- Renderable Components

  - Layout
    - [`App`](/docs/api/components/App.md)
    - [`FixedHeader`](/docs/api/components/FixedHeader.md)
    - [`Form`](/docs/api/components/Form.md)
    - [`Header`](/docs/api/components/Header.md)

  - Controls
    - [`Link`](/docs/api/components/Link.md)
    - [`SearchCombo`]()
    - [`Toggle`]()
    - [`TokenText`]()

  - [`Icons`](/docs/api/Icons.md)

  - Graphics
    - [`Chart`]()
    - [`Device`]()
    - [`Donut`](/docs/api/components/Donut.md)
    - [`Meter`](/docs/api/components/Meter.md)
    - [`Progress`]()
    - [`Sparkline`]()
    - [`TimeSeries`]()

- Mixins
  - [`KeyboardAccelerators`](/docs/api/mixins/KeyboardAccelerators.md)
  - [`ReactLayeredComponent`](/docs/api/mixins/ReactLayeredComponent.md)

- Utilities
  - [`Api`](/docs/api/utils/Api.md)
  - [`Router`](/docs/api/utils/Router.md)

Public Modules
--------------

While there are many modules in this repository, only those found on the
default export are considered public.

```js
var LigoCore = require('ligo-core');
var Menu = LigoCore.Menu // yes
var Menu = require('ligo-core/components/Menu') // no
```