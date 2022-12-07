import React, { Children, useContext, useState } from 'react';
import { Close } from 'grommet-icons/icons/Close';
import { Filter } from 'grommet-icons/icons/Filter';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data';
import { DropButton } from '../DropButton';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Layer } from '../Layer';
import { DataContext } from '../../contexts/DataContext';
import { DataFiltersPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', right: 'right' },
};

export const DataFilters = ({
  drop,
  children,
  heading = 'Filters',
  layer,
  ...rest
}) => {
  const { clearFilters, data, properties, view } = useContext(DataContext);
  const [showContent, setShowContent] = useState();
  const controlled = drop || layer;

  const clearControl = clearFilters && (
    <Box flex={false}>
      <Button label="Clear filters" onClick={clearFilters} />
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
            {heading}
          </Heading>
          {layer && (
            <Button
              icon={<Close />}
              hoverIndicator
              onClick={() => setShowContent(false)}
            />
          )}
          {!controlled && clearControl}
        </Header>
      )}
      {filters}
      {children}
    </DataForm>
  );

  if (!controlled) return content;

  let control;
  let badge = 0;
  if (view?.properties) badge += Object.keys(view.properties).length;
  if (view?.search) badge += 1;
  if (!badge) badge = undefined;

  if (layer) {
    control = (
      <Button
        kind="toolbar"
        icon={<Filter />}
        badge={badge}
        onClick={() => setShowContent(!showContent)}
      />
    );
  } else {
    // drop
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

  return (
    <Box flex={false} direction="row" gap="small" {...rest}>
      {control}
      {clearControl}
      {layer && showContent && (
        <Layer
          onClickOutside={() => setShowContent(false)}
          onEsc={() => setShowContent(false)}
        >
          {content}
        </Layer>
      )}
    </Box>
  );
};

DataFilters.propTypes = DataFiltersPropTypes;
