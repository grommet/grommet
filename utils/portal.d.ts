// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export function createPortal(): void;

interface ExpectPortalReturn {
  toMatchSnapshot: () => void;
}

export function expectPortal(portalId: string): ExpectPortalReturn;
