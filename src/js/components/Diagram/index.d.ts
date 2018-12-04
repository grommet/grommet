import * as React from "react";

export interface DiagramProps {
<<<<<<< HEAD
  connections: {anchor?: "center" | "vertical" | "horizontal",color?: string,fromTarget: string | object,label?: string,offset?: "xsmall" | "small" | "medium" | "large" | string,thickness?: "hair" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,toTarget: string | object,type?: "direct" | "curved" | "rectilinear"}[];
=======
  connections: {anchor: "center" | "vertical" | "horizontal",color: string | {dark: string,light: string},fromTarget: string | object,label: string,offset: "xsmall" | "small" | "medium" | "large" | string,thickness: "hair" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,toTarget: string | object,type: "direct" | "curved" | "rectilinear"}[];
>>>>>>> Fixed component warnings
}

declare const Diagram: React.ComponentType<DiagramProps>;

export { Diagram };
