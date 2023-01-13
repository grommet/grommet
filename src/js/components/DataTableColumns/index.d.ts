import * as React from 'react';

export interface DataTableColumnsProps {
  drop: boolean;
  options: (string | { property: string; label: string })[];
}

declare const DataTableColumns: React.FC<DataTableColumnsProps>;

export { DataTableColumns };
