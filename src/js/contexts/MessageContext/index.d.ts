import * as React from 'react';

export interface FormatOptions {
  id?: string;
  messages?: Record<string, any>;
  values?: Record<string, any>;
  defaultMessage?: string;
}

export type FormatFunction = (options: FormatOptions, messages?: any) => string;

export interface MessageContextValue {
  messages: any;
  format: (options: FormatOptions) => string;
}

export function format(options: FormatOptions, messages?: any): string;

export const MessageContext: React.Context<MessageContextValue>;
