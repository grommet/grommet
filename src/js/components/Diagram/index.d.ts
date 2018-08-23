import * as React from "react";

export interface DiagramProps {
  connections?: {anchor: "center" | "vertical" | "horizontal",color: string,fromTarget: string | object,label: string,offset: "xsmall" | "small" | "medium" | "large",thickness: "hair" | "xxsmall" | "xsmall" | "small" | "medium" | "large",toTarget: string | object,type: "direct" | "curved" | "rectilinear"}[];
}

declare const Diagram: React.ComponentType<DiagramProps>;

export { Diagram };
