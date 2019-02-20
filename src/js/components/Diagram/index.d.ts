import * as React from "react";

export interface DiagramProps {
  connections: {anchor?: "center" | "vertical" | "horizontal",color?: string | {dark?: string,light?: string},fromTarget: string | object,label?: string,offset?: "xsmall" | "small" | "medium" | "large" | string,thickness?: "hair" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,toTarget: string | object,type?: "direct" | "curved" | "rectilinear"}[];
}

declare const Diagram: React.ComponentClass<DiagramProps & JSX.IntrinsicElements['svg']>;

export { Diagram };
