// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as React from 'react';

export interface MarkdownProps {
  components?: {};
  options?: {};
}

type divProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface MarkdownExtendedProps extends MarkdownProps, divProps {}

declare const Markdown: React.FC<MarkdownExtendedProps>;

export { Markdown };
