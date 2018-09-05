import * as React from "react";

export interface ImageProps {
  fit?: "cover" | "contain";
}

declare const Image: React.StatelessComponent<ImageProps>;

export { Image };
