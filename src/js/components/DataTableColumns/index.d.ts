import * as React from 'react';

export interface DataTableColumnsProps {
  drop: boolean;
  options: (string | { property: string; label: string; disabled?: boolean })[];
}

declare const DataTableColumns: React.FC<DataTableColumnsProps>;

export { DataTableColumns };
