import React, { Children, useContext, useMemo, useState } from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data/DataForm';
import { DataSort } from '../DataSort';
import { DropButton } from '../DropButton';
import { Header } from '../Header';
import { Heading } from '../Heading';
import { Layer } from '../Layer';
import { DataContext } from '../../contexts/DataContext';
import { MessageContext } from '../../contexts/MessageContext';
import { DataFiltersPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', right: 'right' },
};

const layerProps = {
  full: 'vertical',
  position: 'right',
};

export const DataFilters = ({ drop, children, heading, layer, ...rest }) => {
  const {
    clearFilters,
    data,
    id: dataId,
    messages,
    properties,
    view,
  } = useContext(DataContext);
  const { format } = useContext(MessageContext);
  const [showContent, setShowContent] = useState();
  // touched is a map of form field name to its value, it only has fields that
  // were changed as part of the DataForm here. This is so we can track based
  // on what's inside DataFilters as opposed to trying to track from the view
  // object.
  const [touched, setTouched] = useState({});
  const controlled = useMemo(() => drop || layer, [drop, layer]);
  // generate the badge value based on touched fields that have a value
  const badge = useMemo(
    () =>
      (controlled && Object.keys(touched).filter((k) => touched[k]).length) ||
      undefined,
    [controlled, touched],
  );

  const clearControl = badge && (
    <Box flex={false} margin={{ start: 'small' }}>
      <Button
        label={format({
          id: 'dataFilters.clear',
          messages: messages?.dataFilters,
        })}
        onClick={() => {
          setTouched({});
          clearFilters();
        }}
      />
    </Box>
  );

  let content = children;
  if (Children.count(children) === 0) {
    let filtersFor;
    if (!properties && data && data.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(data[0]).filter(
        (k) => typeof data[0][k] !== 'object',
      );
    else if (Array.isArray(properties)) filtersFor = properties;
    else if (typeof properties === 'object')
      filtersFor = Object.keys(properties);
    else filtersFor = [];
    content = filtersFor.map((property) => (
      <DataFilter key={property} property={property} />
    ));
    if (view?.sort) {
      content.push(<DataSort key="_sort" />);
    }
  }

  content = (
    <DataForm
      pad={controlled ? 'medium' : undefined}
      onDone={() => setShowContent(false)}
      onTouched={
        controlled
          ? (currentTouched) =>
              // we merge this with our prior state to handle the case where the
              // user opens and closes the drop multiple times and we want to
              // track both new changes and prior changes.
              setTouched((prevTouched) => ({
                ...prevTouched,
                ...currentTouched,
              }))
          : undefined
      }
      {...(!controlled ? rest : { fill: 'vertical' })}
    >
      {layer && (
        <Header>
          <Heading margin="none" level={2} size="small">
            {heading ||
              format({
                id: 'dataFilters.heading',
                messages: messages?.dataFilters,
              })}
          </Heading>
          {!controlled && clearControl}
          <Button
            icon={<FormClose />}
            hoverIndicator
            onClick={() => setShowContent(undefined)}
          />
        </Header>
      )}
      {content}
    </DataForm>
  );

  if (!controlled) return content;

  const tip = format({
    id: badge
      ? `dataFilters.openSet.${badge === 1 ? 'singular' : 'plural'}`
      : 'dataFilters.open',
    messages: messages?.dataFilters,
    values: { number: badge },
  });

  let control;
  if (drop) {
    control = (
      <DropButton
        id={`${dataId}--filters-control`}
        tip={tip}
        aria-label={tip}
        kind="toolbar"
        icon={<Filter />}
        hoverIndicator
        dropProps={dropProps}
        dropContent={content}
        badge={badge}
        open={showContent}
        onOpen={() => setShowContent(undefined)}
        onClose={() => setShowContent(undefined)}
      />
    );
  } else if (layer) {
    control = (
      <Button
        id={`${dataId}--filters-control`}
        tip={tip}
        aria-label={tip}
        kind="toolbar"
        hoverIndicator
        icon={<Filter />}
        badge={badge}
        onClick={() => setShowContent(true)}
      />
    );
  }

  return (
    <Box flex={false} direction="row" {...rest}>
      {control}
      {clearControl}
      {layer && showContent && (
        <Layer
          id={`${dataId}--filters-layer`}
          {...(typeof layer === 'object' ? layer : layerProps)}
          onClickOutside={() => setShowContent(undefined)}
          onEsc={() => setShowContent(undefined)}
        >
          {content}
        </Layer>
      )}
    </Box>
  );
};

DataFilters.propTypes = DataFiltersPropTypes;
