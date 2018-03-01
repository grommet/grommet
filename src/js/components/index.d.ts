import * as React from "react";

// Create a base Props type with the commonly used React attributes
export declare namespace Grommet {
  interface Props extends React.Attributes {
    className?: string;
    onClick?: Function;
    onMouseUp?: Function;
    onMouseEnter?: Function;
    onMouseLeave?: Function;
    onMouseDown?: Function;
    onContextMenu?: Function;
    onDoubleClick?: Function;
    onDrag?: Function;
    onDragEnd?: Function;
    onDragEnter?: Function;
    onDragExit?: Function;
    onDragLeave?: Function;
    onDragOver?: Function;
    onDragStart?: Function;
    onDrop?: Function;
    onMouseMove?: Function;
    onMouseOut?: Function;
    onMouseOver?: Function;
    onTouchCancel?: Function;
    onTouchEnd?: Function;
    onTouchMove?: Function;
    onTouchStart?: Function;
    style?: React.CSSProperties;
  }
}

export default Grommet;
