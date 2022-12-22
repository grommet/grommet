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
const formSearchKey = '_search';
const formSortKey = '_sort';
const formRangeKey = '_range';
const formViewKey = '_view';

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

  result[formSearchKey] = view?.search || '';

  if (view?.sort) result[formSortKey] = view.sort;
  if (view?.name) result[formViewKey] = view.name;

  return result;
};

// converts from the internal Form value format to the external view format
const formValueToView = (value, views) => {
  // if the user chose a view, use that
  if (value[formViewKey])
    return views.find((v) => v.name === value[formViewKey]);

  const properties = { ...value };

  const searchText = value[formSearchKey];
  delete properties[formSearchKey];
  const sort = value[formSortKey];
  delete properties[formSortKey];
  delete properties[formViewKey];

  const result = {
    properties,
    search: searchText,
    ...(sort ? { sort } : {}),
  };

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
  const result = properties;
  Object.keys(result)
    .filter((k) => k !== formSearchKey)
    .forEach((k) => {
      if (Array.isArray(result[k]) && result[k].length === 0) delete result[k];
    });
  return result;
};

export const DataForm = ({
  children,
  footer,
  gap,
  onDone,
  pad,
  updateOn: updateOnProp,
  ...rest
}) => {
  const {
    messages,
    onView,
    updateOn: updateOnData,
    view,
    views,
  } = useContext(DataContext);
  const updateOn = updateOnProp ?? updateOnData;
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
          ? ({ value: nextValue }) => {
              clearEmpty(nextValue);
              setFormValue(nextValue);
              setChanged(false);
              onView(formValueToView(nextValue, views));
              if (onDone) onDone();
            }
          : undefined
      }
      onChange={(nextValue) => {
        clearEmpty(nextValue);
        setFormValue(nextValue);
        setChanged(true);
        if (updateOn === 'change') onView(formValueToView(nextValue, views));
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
