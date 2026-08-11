// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import styled from 'styled-components';
import { styledComponentsConfig } from '../../utils';

// Programmatic focus target for step transitions (tabIndex={-1}); no visible
// focus indication — screen readers announce via aria-live on this element.
export const StyledWizardFocusAnchor = styled.div.withConfig(
  styledComponentsConfig,
)`
  outline: none;
`;
