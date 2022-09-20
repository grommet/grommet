import React, { useContext, useEffect, useState } from 'react';
import { Close } from 'grommet-icons/icons/Close';
import { Filter } from 'grommet-icons/icons/Filter';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataSearch } from '../DataSearch';
import { DropButton } from '../DropButton';
import { Footer } from '../Footer';
import { Form } from '../Form';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Layer } from '../Layer';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataFiltersPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', right: 'right' },
};

const formSearchKey = '_search';

const filtersToFormValue = (filters) => ({
  ...filters.properties,
  [formSearchKey]: filters.search.text,
});

const formValueToFilters = (value) => {
  const properties = value;
  const searchText = value[formSearchKey];
  delete properties[formSearchKey];
  return { properties, search: { text: searchText } };
};

const clearEmpty = (properties) => {
  const result = properties;
  Object.keys(result).forEach((k) => {
    if (Array.isArray(result[k]) && result[k].length === 0) delete result[k];
  });
  return result;
};

export const DataFilters = ({
  children,
  kind = 'drop',
  messages,
  search,
  toolbar = true,
  ...rest
}) => {
  const { format } = useContext(MessageContext);
  const { data, filters, clearFilters, onChange, onSubmit, total } =
    useContext(DataContext);
  const [formValue, setFormValue] = useState(filtersToFormValue(filters));
  const [showContent, setShowContent] = useState();

  useEffect(() => setFormValue(filtersToFormValue(filters)), [filters]);

  const clearControl = clearFilters && (
    <Box flex={false}>
      <Button label="Clear filters" onClick={clearFilters} />
    </Box>
  );

  let content;
  if (!toolbar || (toolbar && children)) {
    content = (
      <Form
        value={formValue}
        onSubmit={
          onSubmit
            ? ({ value: nextValue }) => {
                clearEmpty(nextValue);
                setFormValue(nextValue);
                onSubmit(formValueToFilters(nextValue));
                setShowContent(false);
              }
            : undefined
        }
        onChange={(nextValue) => {
          clearEmpty(nextValue);
          setFormValue(nextValue);
          if (onChange) onChange(formValueToFilters(nextValue));
        }}
      >
        <Box pad={toolbar ? 'medium' : undefined} gap="small">
          <Header>
            <Heading margin="none" level={2} size="small">
              Filters
            </Heading>
            {toolbar && kind === 'layer' && (
              <Button
                icon={<Close />}
                hoverIndicator
                onClick={() => setShowContent(false)}
              />
            )}
            {!toolbar && clearControl}
          </Header>
          {children}
          {onSubmit && (
            <Footer>
              <Button label="Apply Filters" type="submit" primary />
              <Button
                label="Reset Filters"
                type="reset"
                onClick={() => setFormValue(filtersToFormValue(filters))}
              />
            </Footer>
          )}
        </Box>
      </Form>
    );
  }

  if (!toolbar) return content;

  let control;

  if (content) {
    let badge = 0;
    if (filters.properties) badge += Object.keys(filters.properties).length;
    if (filters.search.text) badge += 1;
    if (!badge) badge = undefined;

    if (kind === 'layer') {
      control = (
        <Button
          kind="toolbar"
          icon={<Filter />}
          badge={badge}
          onClick={() => setShowContent(!showContent)}
        />
      );
    } else {
      control = (
        <DropButton
          kind="toolbar"
          icon={<Filter />}
          dropProps={dropProps}
          dropContent={content}
          badge={badge}
          open={showContent}
          onOpen={() => setShowContent(undefined)}
          onClose={() => setShowContent(undefined)}
        />
      );
    }
  }

  let inlineSearch;
  if (search) {
    inlineSearch = (
      <Form
        value={formValue}
        onSubmit={
          onSubmit ? () => onSubmit(formValueToFilters(formValue)) : undefined
        }
        onChange={(nextValue) => {
          setFormValue(nextValue);
          if (onChange) onChange(formValueToFilters(nextValue));
        }}
      >
        <DataSearch />
      </Form>
    );
  }

  return (
    <Box flex={false} gap="xsmall" {...rest}>
      {(search || control) && (
        <Box flex={false} direction="row" gap="small">
          {inlineSearch}
          {control}
          {clearControl}
        </Box>
      )}

      {kind === 'layer' && showContent && (
        <Layer
          onClickOutside={() => setShowContent(false)}
          onEsc={() => setShowContent(false)}
        >
          {content}
        </Layer>
      )}

      <Box flex={false}>
        {total !== data.length
          ? format({
              id: 'dataFilters.filtered',
              messages,
              values: { filtered: data.length, total },
            })
          : format({
              id: 'dataFilters.total',
              messages,
              values: { total },
            })}
      </Box>
    </Box>
  );
};

DataFilters.propTypes = DataFiltersPropTypes;
