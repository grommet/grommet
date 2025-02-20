import React from 'react';

interface DataContextType {
  data: any[];
  addToolbarKey: (key: string) => void;
}

export const DataContext: React.Context<DataContextType>;
