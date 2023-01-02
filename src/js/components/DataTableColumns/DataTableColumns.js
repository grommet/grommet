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

// Content is a separate component since it might be getting its form context
// from the DataForm rendered inside DataTableColumns.
const Content = ({ drop, options, ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { useFormInput } = useContext(FormContext);
  const { format } = useContext(MessageContext);

  // In cases the user searches for a particular option, render
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
    initialValue: optionsToValue(options?.slice(0, 3)),
  });

  // When the user searches, updated the filtered options based on the
  // search string.
  const onSearch = useCallback(
    (nextSearch) => {
      let nextFilteredOptions = options;
      if (nextSearch) {
        const lowerSearch = nextSearch.toLowerCase();
        nextFilteredOptions = options.filter(
          (o) =>
            (!objectOptions && o.toLowerCase().includes(lowerSearch)) ||
            (objectOptions &&
              (o.property.toLowerCase().includes(lowerSearch) ||
                o.label.toLowerCase().includes(lowerSearch))),
        );
      }
      setSearch(nextSearch);
      setFilteredOptions(nextFilteredOptions);
    },
    [objectOptions, options],
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
          <Box pad={{ top: 'small' }}>
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
              onChange={({ value: nextValue }) => setValue(nextValue)}
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
        </Tab>
      </Tabs>
    </Box>
  );
};

export const DataTableColumns = ({ drop, options, ...rest }) => {
  const { messages } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const [showContent, setShowContent] = useState();

  let content = <Content drop={drop} options={options} />;
  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  if (!drop) return content;

  const control = (
    <DropButton
      aria-label={format({
        id: 'dataTableColumns.open',
        messages: messages?.dataTableColumns,
      })}
      kind="toolbar"
      icon={<Splits />}
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
