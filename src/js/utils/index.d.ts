// colors.js
declare const normalizeColor: (
  color: string | { dark?: string; light?: string },
  theme: object,
  required?: boolean
) => string;

export {normalizeColor}

// object.js
export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
}
export type NonUndefined<T> = T extends undefined ? never: T;
export type NonUndefinedProps<T extends object> = {
  [K in keyof T]?: NonUndefined<T[K]>;
}

export type DeepFreeze = <T extends object>(obj: T) => DeepReadonly<T>;

// overload because generic variadic solution has messy result and all/most mergings are binary
export interface DeepMerge {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object, S extends object[]>(target: T, ...sources: S): T & S[number];
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type PolymorphicType = keyof JSX.IntrinsicElements | React.ComponentType<any>

declare const isObject: (item:any) => boolean;
declare const deepFreeze: DeepFreeze;
declare const deepMerge: DeepMerge;
declare const removeUndefined: <T extends object>(obj: T) => NonUndefinedProps<T>;

export {isObject, deepFreeze, deepMerge, removeUndefined};

// Extracting types for common properties among components
export type A11yTitleType = string;
export type AlignContentType = "start" | "center" | "end" | "between" | "around" | "stretch";
export type AlignSelfType = "start" | "center" | "end" | "stretch";
export type AnimateType = boolean;
export type BackgroundType = string | {color?: string,dark?: boolean | string,image?: string,position?: string,opacity?: "weak" | "medium" | "strong" | number | boolean,repeat?: "no-repeat" | "repeat" | string,size?: "cover" | "contain" | string,light?: string};
export type ColorType = string | {dark?: string,light?: string};
export type FillType = "horizontal" | "vertical" | boolean;
export type GapType = "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string;
export type GridAreaType = string;
export type KeyboardType = ((event: React.KeyboardEvent<HTMLElement>) => void);
export type MarginType = "none" | "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | {bottom?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,horizontal?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,left?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,right?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,top?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string,vertical?: "xxsmall" | "xsmall" | "small" | "medium" | "large" | "xlarge" | string} | string;
export type PlaceHolderType = string | JSX.Element | React.ReactNode;
export type TextAlignType = "start" | "center" | "end";
