import * as React from "react";

export interface SkipLinkProps {
  id: string;
  label?: React.ReactNode;
}

declare const SkipLink: React.StatelessComponent<SkipLinkProps>;

export { SkipLink };
