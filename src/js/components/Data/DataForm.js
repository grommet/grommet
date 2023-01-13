import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';

const HideableButton = styled(Button)`
  ${(props) =>
    props.disabled &&
    `
  opacity: 0;`}
`;

const hideButtonProps = {
  'aria-hidden': true,
  disabled: true,
  tabIndex: -1,
};

// We convert the view structure to something more flat to work better
// with the Form inputs. These keys are how we flatten the Form value object
// from the view object.
export const formSearchKey = '_search';
export const formSortKey = '_sort';
export const formRangeKey = '_range';
export const formStepKey = '_step';
export const formPageKey = '_page';
export const formColumnsKey = '_columns';

const viewFormKeyMap = {
  search: formSearchKey,
  sort: formSortKey,
  step: formStepKey,
  page: formPageKey,
  columns: formColumnsKey,
};

// converts from the external view format to the internal Form value format
const viewToFormValue = (view) => {
  const result = { ...(view?.properties || {}) };
  // convert { min: , max: } range to [min, max] for RangeSelector
  Object.keys(result).forEach((key) => {
    if (
      typeof result[key]?.min === 'number' ||
      typeof result[key]?.max === 'number'
    ) {
      result[key] = { [formRangeKey]: [result[key].min, result[key].max] };
    }
  });

  // convert formal view keys to their form '_' prefixed counterparts
  Object.keys(viewFormKeyMap).forEach((key) => {
    if (view?.[key]) result[viewFormKeyMap[key]] = view[key];
  });
  // always have some blank search text
  if (!result[formSearchKey]) result[formSearchKey] = '';

  if (view?.columns) result[formColumnsKey] = view.columns;

  return result;
};

// converts from the internal Form value format to the external view format
const formValueToView = (value) => {
  const result = {};

  const valueCopy = { ...value };

  Object.keys(viewFormKeyMap).forEach((key) => {
    if (valueCopy[viewFormKeyMap[key]]) {
      result[key] = valueCopy[viewFormKeyMap[key]];
      delete valueCopy[viewFormKeyMap[key]];
    }
  });

  result.properties = valueCopy;

  // convert any ranges
  Object.keys(result.properties).forEach((key) => {
    if (result.properties[key][formRangeKey]) {
      result.properties[key] = {
        min: result.properties[key][formRangeKey][0],
        max: result.properties[key][formRangeKey][1],
      };
    }
  });

  return result;
};

// remove any empty arrays of property values by deleting the key for
// that property in the view properties
const clearEmpty = (properties) => {
  Object.keys(properties)
    .filter((k) => k !== formSearchKey)
    .forEach((k) => {
      if (Array.isArray(properties[k]) && properties[k].length === 0)
        // eslint-disable-next-line no-param-reassign
        delete properties[k];
    });
};

// if paging, when anything other than the page changes, reset the page to 1
const resetPage = (nextFormValue, prevFormValue) => {
  if (prevFormValue[formPageKey] && prevFormValue[formPageKey] > 1)
    // eslint-disable-next-line no-param-reassign
    nextFormValue[formPageKey] = 1;
};

const transformTouched = (touched, value) => {
  const result = {};
  Object.keys(touched).forEach((key) => {
    result[key] = value[key];
  });
  return result;
};

export const DataForm = ({
  children,
  footer,
  gap,
  onDone,
  onTouched,
  pad,
  ...rest
}) => {
  const { messages, onView, updateOn, view } = useContext(DataContext);
  const { format } = useContext(MessageContext);
  const [formValue, setFormValue] = useState(viewToFormValue(view));
  const [changed, setChanged] = useState();

  useEffect(() => setFormValue(viewToFormValue(view)), [view]);

  return (
    <Form
      {...rest}
      value={formValue}
      onSubmit={
        updateOn === 'submit'
          ? ({ value: nextValue, touched }) => {
              clearEmpty(nextValue);
              resetPage(nextValue, formValue);
              setFormValue(nextValue);
              setChanged(false);
              if (onTouched) onTouched(transformTouched(touched, nextValue));
              onView(formValueToView(nextValue));
              if (onDone) onDone();
            }
          : undefined
      }
      onChange={(nextValue, { touched }) => {
        clearEmpty(nextValue);
        resetPage(nextValue, formValue);
        setFormValue(nextValue);
        setChanged(true);
        if (updateOn === 'change') {
          if (onTouched) onTouched(transformTouched(touched, nextValue));
          onView(formValueToView(nextValue));
        }
      }}
    >
      <Box flex={false} pad={pad} gap={gap}>
        {children}
        {footer !== false && updateOn === 'submit' && (
          <Footer>
            <Button
              label={format({
                id: 'dataForm.submit',
                messages: messages?.dataForm,
              })}
              type="submit"
              primary
            />
            <HideableButton
              label={format({
                id: 'dataForm.reset',
                messages: messages?.dataForm,
              })}
              type="reset"
              onClick={() => {
                setFormValue(viewToFormValue(view));
                setChanged(false);
              }}
              {...(!changed ? hideButtonProps : {})}
            />
          </Footer>
        )}
      </Box>
    </Form>
  );
};
