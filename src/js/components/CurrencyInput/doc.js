import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils/mixins';

export const doc = CurrencyInput => {
  const DocumentedCurrencyInput = describe(CurrencyInput)
    .availableAt(getAvailableAtBadge('CurrencyInput', 'Input'))
    .description('An input field with localized currency format.')
    .usage(
      `import { CurrencyInput } from 'grommet';
<CurrencyInput value={40.12} locale="pt-BR" currency="USD" />`,
    )
    .intrinsicElement('input');

  DocumentedCurrencyInput.propTypes = {
    currency: PropTypes.string.description(
      `Any valid BCP 47 language tag.
       Defaults to local navigator locale.`,
    ),
    locale: PropTypes.string.description(
      `Any valid ISO 4217 currency code.
       Defaults to local navigator currency.`,
    ),
    numberFormatOptions: PropTypes.object.description(
      'Any valid Intl.NumberFormat() option',
    ),
  };

  return DocumentedCurrencyInput;
};
