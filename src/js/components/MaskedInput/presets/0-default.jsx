import * as React from 'react';
import MaskedInput from '../MaskedInput';

export default (
  <MaskedInput
    uxpId="maskedInput0"
    mask={[
      {
        length: [1, 2],
        options: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
        regexp: `/^1[1-2]$|^[0-9]$/`,
        placeholder: 'hh',
      },
      { fixed: ':' },
      {
        length: 2,
        options: ['00', '15', '30', '45'],
        regexp: `/^[0-5][0-9]$|^[0-9]$/`,
        placeholder: 'mm',
      },
      { fixed: ' ' },
      {
        length: 2,
        options: ['am', 'pm'],
        regexp: `/^[ap]m$|^[AP]M$|^[aApP]$/`,
        placeholder: 'ap',
      },
    ]}
  />
);
