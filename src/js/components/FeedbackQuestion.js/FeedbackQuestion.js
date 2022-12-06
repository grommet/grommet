import React from 'react';
import styled from 'styled-components';

import { normalizeColor } from '../../utils';
import { FormField } from '../FormField';

const StyledFormField = styled(FormField)`
  color: ${(props) =>
    normalizeColor(props.theme.feedback.label.color, props.theme)};
  font-size: ${(props) =>
    props.theme.text[props.theme.feedback.label.font.size].size};
  font-weight: ${(props) => props.theme.feedback.label.font.weight};
  line-height: ${(props) =>
    props.theme.feedback.label.font.height ||
    props.theme.text[props.theme.feedback.label.font.size].height};
`;

export const FeedbackQuestion = (props) => <StyledFormField {...props} />;
