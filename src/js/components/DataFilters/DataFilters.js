import React, { Children, useContext, useState } from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data';
import { DropButton } from '../DropButton';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataFiltersPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', right: 'right' },
};

export const DataFilters = ({ drop, children, heading, ...rest }) => {
  const { clearFilters, data, messages, properties, view } =
    useContext(DataContext);
  const { format } = useContext(MessageContext);
  const [showContent, setShowContent] = useState();
  const controlled = drop;

  const clearControl = clearFilters && (
    <Box flex={false}>
      <Button
        label={format({
          id: 'dataFilters.clear',
          messages: messages?.dataFilters,
        })}
        onClick={clearFilters}
      />
    </Box>
  );

  let filters;
  if (Children.count(children) === 0) {
    let filtersFor;
    if (!properties && data && data.length) filtersFor = Object.keys(data[0]);
    else if (Array.isArray(properties)) filtersFor = properties;
    else if (typeof properties === 'object')
      filtersFor = Object.keys(properties);
    else filtersFor = [];
    filters = filtersFor.map((property) => (
      <DataFilter key={property} property={property} />
    ));
  }

  const content = (
    <DataForm
      pad={controlled ? 'medium' : undefined}
      gap="small"
      onDone={() => setShowContent(false)}
      {...(!controlled ? rest : {})}
    >
      {!drop && (
        <Header>
          <Heading margin="none" level={2} size="small">
            {heading ||
              format({
                id: 'dataFilters.heading',
                messages: messages?.dataFilters,
              })}
          </Heading>
          {!controlled && clearControl}
        </Header>
      )}
      {filters}
      {children}
    </DataForm>
  );

  if (!controlled) return content;

  let badge = 0;
  if (view?.properties) badge += Object.keys(view.properties).length;
  if (view?.search) badge += 1;
  if (!badge) badge = undefined;

    // drop
  const control = (
      <DropButton
        aria-label={format({
          id: 'dataFilters.open',
          messages: messages?.dataFilters,
        })}
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

  return (
    <Box flex={false} direction="row" gap="small" {...rest}>
      {control}
      {clearControl}
    </Box>
  );
};

DataFilters.propTypes = DataFiltersPropTypes;
