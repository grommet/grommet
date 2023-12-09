import React, { useCallback, useContext, useEffect, useState } from 'react';
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

const MaxForm = styled(Form)`
  max-width: 100%;
  ${(props) => props.fill && 'max-height: 100%;'}
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
export const formGroupByKey = '_groupBy';
export const formViewNameKey = '_view';

const viewFormKeyMap = {
  search: formSearchKey,
  sort: formSortKey,
  step: formStepKey,
  page: formPageKey,
  columns: formColumnsKey,
  groupBy: formGroupByKey,
  view: formViewNameKey,
};

// flatten nested objects.
// For example: { a: { b: v, c: z } } -> { 'a.b': v, 'a.c': z }
const flatten = (formValue, options) => {
  const result = JSON.parse(JSON.stringify(formValue));
  Object.keys(result).forEach((i) => {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    // ignore _range situations
    if (
      typeof result[i] === 'object' &&
      !Array.isArray(result[i]) &&
      (options?.full || !result[i][formRangeKey])
    ) {
      const temp = flatten(result[i], options);
      Object.keys(temp).forEach((j) => {
        // Store temp in result
        // ignore empty arrays
        if (
          !Array.isArray(temp[j]) ||
          (Array.isArray(temp[j]) && temp[j].length)
        )
          result[`${i}.${j}`] = temp[j];
      });
      delete result[i];
    }
  });
  return result;
};

// unflatten nested objects. For example: { 'a.b': v } -> { a: { b: v } }
const unflatten = (formValue) => {
  const result = JSON.parse(JSON.stringify(formValue));
  const specialKeys = Object.values(viewFormKeyMap);
  Object.keys(result)
    .filter((k) => !specialKeys.includes(k))
    .forEach((k) => {
      const parts = k.split('.');
      const val = result[k];
      delete result[k];
      let parent = result;
      while (parts.length > 1) {
        const sub = parts.shift();
        if (!parent[sub]) parent[sub] = {};
        parent = parent[sub];
      }
      parent[parts.shift()] = val;
    });
  return result;
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

  if (view?.sort) result[formSortKey] = view.sort;
  if (view?.name) result[formViewNameKey] = view.name;
  if (view?.columns) result[formColumnsKey] = view.columns;
  if (view?.groupBy) result[formGroupByKey] = view.groupBy;

  return unflatten(result);
};

// converts from the internal Form value format to the external view format
const formValueToView = (value, views) => {
  let result = {};

  // if the user chose a view, use that
  if (value[formViewNameKey])
    result = JSON.parse(
      JSON.stringify(views.find((v) => v.name === value[formViewNameKey])),
    );

  const valueCopy = { ...value };

  Object.keys(viewFormKeyMap).forEach((key) => {
    if (valueCopy[viewFormKeyMap[key]]) {
      result[key] = valueCopy[viewFormKeyMap[key]];
    }
    delete valueCopy[viewFormKeyMap[key]];
  });

  // flatten any nested objects
  const flatValue = flatten(valueCopy);

  result.properties = { ...(result.properties || {}), ...flatValue };

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
const clearEmpty = (formValue) => {
  const value = formValue;
  Object.keys(value).forEach((k) => {
    if (Array.isArray(value[k]) && value[k].length === 0) delete value[k];
  });
  return value;
};

// if paging, when anything other than the page changes, reset the page to 1
const resetPage = (nextFormValue, prevFormValue) => {
  if (prevFormValue[formPageKey] && prevFormValue[formPageKey] > 1)
    // eslint-disable-next-line no-param-reassign
    nextFormValue[formPageKey] = 1;
};

const transformTouched = (touched, value) => {
  // DataFilters expects values for keys touched to evaluate to falsey to 
  // not cause a badge. However any property value that is set back to its
  // default/initial value that isn't undefined/null/false/0 will cause a
  // badge this is particulary true for a 'range' which will always have
  // a value.
  //
  // Should this instead determine touched by comparing against
  // initial/default values?
  //  
  const result = {};
  Object.keys(touched).forEach((key) => {
    result[key] = flatten(value, { full: true })[key];
  });
  return result;
};

// function shared by onSubmit and onChange to coordinate view
// name changes
const normalizeValue = (nextValue, prevValue, views) => {
  if (
    nextValue[formViewNameKey] &&
    nextValue[formViewNameKey] !== prevValue[formViewNameKey]
  ) {
    // view name changed, reset view contents from named view
    return viewToFormValue(
      views.find((v) => v.name === nextValue[formViewNameKey]),
    );
  }
  // something else changed

  // clear empty properties
  const result = clearEmpty(nextValue);

  // if we have a view and something related to it changed, clear the view
  if (result[formViewNameKey]) {
    const view = views.find((v) => v.name === result[formViewNameKey]);
    const viewValue = viewToFormValue(view);
    clearEmpty(viewValue);
    if (
      Object.keys(viewValue).some(
        (k) =>
          // allow mismatch between empty and set strings
          viewValue[k] &&
          result[k] &&
          JSON.stringify(result[k]) !== JSON.stringify(viewValue[k]),
      )
    ) {
      delete result[formViewNameKey];
    }
  }

  return result;
};

// 300ms was chosen empirically as a reasonable default
const DEBOUNCE_TIMEOUT = 300;

const debounce = (func, timeout = DEBOUNCE_TIMEOUT) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

const debounceSearch = debounce((onView, nextValue, views) =>
  onView(formValueToView(nextValue, views)),
);

export const DataForm = ({
  children,
  footer,
  onDone,
  onTouched,
  pad,
  updateOn = 'submit',
  ...rest
}) => {
  const { messages, onView, view, views } = useContext(DataContext);
  const { format } = useContext(MessageContext);
  const [formValue, setFormValue] = useState(viewToFormValue(view));
  const [changed, setChanged] = useState();

  const onSubmit = useCallback(
    ({ value, touched }) => {
      const nextValue = normalizeValue(value, formValue, views);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(false);
      if (onTouched) onTouched(transformTouched(touched, nextValue));
      onView(formValueToView(nextValue, views));
      if (onDone) onDone();
    },
    [formValue, onDone, onTouched, onView, views],
  );

  const onChange = useCallback(
    (value, { touched }) => {
      const nextValue = normalizeValue(value, formValue, views);
      resetPage(nextValue, formValue);
      setFormValue(nextValue);
      setChanged(true);
      if (updateOn === 'change') {
        if (onTouched) onTouched(transformTouched(touched, nextValue));
        // debounce search
        if (touched[formSearchKey]) {
          debounceSearch(onView, nextValue, views);
        } else {
          onView(formValueToView(nextValue, views));
        }
      }
    },
    [formValue, onTouched, onView, updateOn, views],
  );

  const onReset = useCallback(() => {
    setFormValue(viewToFormValue(view));
    setChanged(false);
  }, [view]);

  useEffect(() => setFormValue(viewToFormValue(view)), [view]);

  let content = children;
  if ((footer !== false && updateOn === 'submit') || pad) {
    content = (
      <Box fill="vertical">
        <Box flex overflow="auto" pad={{ horizontal: pad, top: pad }}>
          <Box flex={false}>{content}</Box>
        </Box>
        {footer !== false && updateOn === 'submit' && (
          <Footer
            flex={false}
            margin={{ top: 'medium' }}
            pad={{ horizontal: pad, bottom: pad }}
            gap="small"
          >
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
              onClick={onReset}
              {...(!changed ? hideButtonProps : {})}
            />
          </Footer>
        )}
      </Box>
    );
  }

  return (
    <MaxForm
      {...rest}
      value={formValue}
      onSubmit={updateOn === 'submit' ? onSubmit : undefined}
      onChange={onChange}
    >
      {content}
    </MaxForm>
  );
};
