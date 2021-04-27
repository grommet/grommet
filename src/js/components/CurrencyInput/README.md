## CurrencyInput
An input field with localized currency format.

[![](https://cdn-images-1.medium.com/fit/c/120/120/1*TD1P0HtIH9zF0UEH28zYtw.png)](https://storybook.grommet.io/?selectedKind=Input-CurrencyInput&full=0&stories=1&panelRight=0) [![](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/grommet/grommet-sandbox?initialpath=/currencyinput&module=%2Fsrc%2FCurrencyInput.js)
## Usage

```javascript
import { CurrencyInput } from 'grommet';
<CurrencyInput value={40.12} locale="pt-BR" currency="USD" />
```

## Properties

**currency**

Any valid BCP 47 language tag.
       Defaults to local navigator locale.

```
string
```

**locale**

Any valid ISO 4217 currency code.
       Defaults to local navigator currency.

```
string
```

**numberFormatOptions**

Any valid Intl.NumberFormat() option

```
object
```
  
## Intrinsic element

```
input
```