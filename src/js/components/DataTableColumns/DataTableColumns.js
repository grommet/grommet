import React, { useCallback, useContext, useMemo, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Splits } from 'grommet-icons/icons/Splits';
import { Box } from '../Box';
import { CheckBoxGroup } from '../CheckBoxGroup';
import { DataForm, formColumnsKey } from '../Data';
import { FormContext } from '../Form/FormContext';
import { DropButton } from '../DropButton';
import { List } from '../List';
import { Tab } from '../Tab';
import { Tabs } from '../Tabs';
import { TextInput } from '../TextInput';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataTableColumnsPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

const tabsProps = {
  drop: { pad: 'small' },
  noDrop: { justify: 'start' },
};

// options can either be an array of property names or an array of objects.
// The form value always uses an array of property names.
const optionsToValue = (options) =>
  options.map((o) => (typeof o === 'object' && o.property) || o) || [];

const optionProperty = (option) =>
  typeof option === 'object' ? option.property : option;

// align the order in value to the order in options, as best we can
const alignOrder = (value, prevValue, options) =>
  value.sort((p1, p2) => {
    // if both are in prevValue, preserve the order from that
    let i1 = prevValue.findIndex((n) => n === p1);
    let i2 = prevValue.findIndex((n) => n === p2);
    if (i1 !== -1 && i2 !== -1) return i1 - i2;
    i1 = options.findIndex((o) => optionProperty(o) === p1);
    i2 = options.findIndex((o) => optionProperty(o) === p2);
    return i1 - i2;
  });

// Content is a separate component since it might be getting its form context
// from the DataForm rendered inside DataTableColumns.
const Content = ({ drop, options, ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { useFormInput } = useContext(FormContext);
  const { format } = useContext(MessageContext);

  // If the user searches for a particular option, render
  // the filtered list of options.
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Note whether options are objects so we can set up the *key properties
  // as needed when rendering.
  const objectOptions = useMemo(
    () => options && options.length && typeof options[0] === 'object',
    [options],
  );

  // 'value' is an array of property names
  const [value, setValue] = useFormInput({
    name: formColumnsKey,
    initialValue: optionsToValue(options),
  });

  // When the user searches, updated the filtered options based on the
  // search string.
  const onSearch = useCallback(
    (nextSearch) => {
      let nextFilteredOptions = options;
      if (nextSearch) {
        const lowerSearch = nextSearch.toLowerCase();
        nextFilteredOptions = options.filter((o) =>
          (o.property ?? o.label ?? o)?.toLowerCase().includes(lowerSearch),
        );
      }
      setSearch(nextSearch);
      setFilteredOptions(nextFilteredOptions);
    },
    [options],
  );

  return (
    <Box>
      <Tabs {...tabsProps[drop ? 'drop' : 'noDrop']} {...rest}>
        <Tab
          id={`${dataId}--select-columns-tab`}
          title={format({
            id: 'dataTableColumns.select',
            messages: messages?.dataTableColumns,
          })}
        >
          <Box pad={{ vertical: 'small' }} gap="xsmall">
            <TextInput
              type="search"
              icon={<Search />}
              placeholder="Search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
            />
            <CheckBoxGroup
              id={`${dataId}--select-columns`}
              name={formColumnsKey}
              aria-labelledby={`${dataId}--select-columns-tab`}
              options={filteredOptions}
              valueKey={(objectOptions && 'property') || undefined}
              labelKey={(objectOptions && 'label') || undefined}
              value={value}
              onChange={({ value: nextValue }) =>
                setValue(alignOrder(nextValue, value, options))
              }
            />
          </Box>
        </Tab>

        <Tab
          id={`${dataId}--order-columns-tab`}
          title={format({
            id: 'dataTableColumns.order',
            messages: messages?.dataTableColumns,
          })}
        >
          <Box pad={{ top: 'small' }}>
            <List
              id={`${dataId}--order-columns`}
              aria-labelledby={`${dataId}--order-columns-tab`}
              // List wants objects if possible to be able to use 'label'
              data={value.map(
                (v) =>
                  (objectOptions && options.find((o) => o.property === v)) || v,
              )}
              onOrder={(nextData) => setValue(optionsToValue(nextData))}
              pad="none"
              primaryKey={(objectOptions && 'label') || undefined}
            />
          </Box>
        </Tab>
      </Tabs>
    </Box>
  );
};

export const DataTableColumns = ({ drop, options, ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const [showContent, setShowContent] = useState();

  const tip = format({
    id: 'dataTableColumns.tip',
    messages: messages?.dataTableColumns,
  });

  let content = <Content drop={drop} options={options} />;
  if (noForm)
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );

  if (!drop) return content;

  const control = (
    <DropButton
      id={`${dataId}--columns-control`}
      aria-label={format({
        id: 'dataTableColumns.open',
        messages: messages?.dataTableColumns,
      })}
      kind="toolbar"
      icon={<Splits />}
      tip={tip}
      dropProps={dropProps}
      dropContent={content}
      open={showContent}
      onOpen={() => setShowContent(undefined)}
      onClose={() => setShowContent(undefined)}
      {...rest}
    />
  );

  return control;
};

DataTableColumns.propTypes = DataTableColumnsPropTypes;
