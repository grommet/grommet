import * as React from "react";

export interface ImageProps {
  fit: "cover" | "contain";
}

declare const Image: React.ComponentType<ImageProps>;

export { Image };
