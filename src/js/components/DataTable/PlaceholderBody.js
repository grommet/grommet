import React, { forwardRef } from 'react';

export const PlaceholderBody = forwardRef(
  ({ columns = [], onSelect, children }, ref) => {
    const colSpan = Math.max(columns.length + (onSelect ? 1 : 0), 1);
    return (
      <tbody ref={ref}>
        <tr>
          <td colSpan={colSpan}>{children}</td>
        </tr>
      </tbody>
    );
  },
);
