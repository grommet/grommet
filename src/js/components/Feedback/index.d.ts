import * as React from 'react';
import { LayerProps } from '../Layer/index';

export interface FormExtendedEvent<R = Record<string, unknown>, T = Element>
  extends React.FormEvent<T> {
  value: R;
  touched: Record<string, boolean>;
}
export interface FeedbackProps<T> {
  children?: React.ReactNode;
  feedbackButton?: boolean;
  layerProps?: LayerProps;
  onSubmit?: (event: FormExtendedEvent<T>) => void;
  messages?: object;
  modal?: boolean;
  show?: boolean;
  title?: string;
}

type TypedFeedbackProps<T> = FeedbackProps<T> &
  Omit<JSX.IntrinsicElements['form'], 'onChange' | 'onSubmit'>;

declare const Feedback: <T = {}>(
  p: TypedFeedbackProps<T>,
) => React.ReactElement<TypedFeedbackProps<T>>;

export { Feedback };
