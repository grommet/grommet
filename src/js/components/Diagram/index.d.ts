import * as React from "react";

import { 
  ColorType 
} from "../../utils";
export interface DiagramProps {
  connections: {
    anchor?: "center" | "vertical" | "horizontal", 
    color?: ColorType,
    fromTarget: string | object,
    label?: string,
    offset?: "xsmall" | "small" | "medium" | "large" | string,
    thickness?: "hair" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | string,
    toTarget: string | object,
    type?: "direct" | "curved" | "rectilinear"}[];
}

declare const Diagram: React.FC<DiagramProps & JSX.IntrinsicElements['svg']>;

export { Diagram };
