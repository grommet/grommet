import * as React from "react";

export interface FormProps {
  errors?: {};
  onChange?: ((...args: any[]) => any);
  onSubmit?: ((...args: any[]) => any);
  value?: {};
}

declare const Form: React.ComponentType<FormProps>;

export { Form };
