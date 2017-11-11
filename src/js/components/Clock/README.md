## Clock
A clock with timezone awareness.

[![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-site?initialpath=clock&amp;module=%2Fscreens%2FClock.js)
## Usage

```javascript
import { Clock } from 'grommet';
<Clock />
```

## Properties

**date**

Date to be used in the Clock.

```
object
string
```

**night**

Whether to force night mode for the Clock.

```
boolean
```

**seconds**

Whether to show seconds hand in the Clock.

```
boolean
```

**size**

Clock size Defaults to `medium`.

```
small
medium
large
xlarge
huge
```

**timezone**

IANA timezone to use in the Clock (e.g. America/Sao_Paulo). Defaults to `America/Los_Angeles`.

```
string
```
  