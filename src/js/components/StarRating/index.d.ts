// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';
import { RadioButtonGroupExtendedProps } from '../RadioButtonGroup/index';

type RadioButtonGroup = Omit<RadioButtonGroupExtendedProps, 'options'>;
declare const StarRating: React.FC<RadioButtonGroup>;

export { StarRating };
