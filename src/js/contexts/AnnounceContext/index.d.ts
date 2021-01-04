import * as React from 'react';

export type AnnounceMessage = string;
export type AnnounceMode = 'off' | 'polite' | 'assertive';
export type Timeout = number;
export type AnnounceValue = (
  message: AnnounceMessage,
  mode: AnnounceMode,
  timeout: Timeout,
) => void;

declare const AnnounceContext: React.Context<AnnounceValue>;

export { AnnounceContext };
