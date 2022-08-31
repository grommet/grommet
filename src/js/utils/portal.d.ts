export function createPortal(): void;

interface ExpectPortalReturn {
  toMatchSnapshot: () => void;
}

export function expectPortal(portalId: string): ExpectPortalReturn;
