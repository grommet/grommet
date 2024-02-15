import React, {
  Children,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Filter } from 'grommet-icons/icons/Filter';
import { Close } from 'grommet-icons/icons/Close';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataClearFilters } from '../DataClearFilters';
import { DataFilter } from '../DataFilter';
import { DataForm } from '../Data/DataForm';
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

const defaultTouched = {};
export const DataFilters = ({
  drop,
  children,
  clearFilters = true,
  heading,
  layer,
  updateOn,
  ...rest
}) => {
  const {
    id: dataId,
    messages,
    properties,
    unfilteredData,
    filtersCleared,
    setFiltersCleared,
    view,
  } = useContext(DataContext);
  const { format } = useContext(MessageContext);
  const theme = useContext(ThemeContext);
  const [showContent, setShowContent] = useState();
  // touched is a map of property to its value based on if user interacts
  // with a filter or a view applies of set of filters
  const [touched, setTouched] = useState(defaultTouched);

  // if filters have been applied by this DataFilters, update
  // the DataContext that filters are not in a "cleared" state
  useEffect(() => {
    setFiltersCleared(!Object.keys(touched).length);
  }, [touched, setFiltersCleared]);

  // if filters have been cleared via clearFilters in DataContext,
  // reset touched to default state so badge is removed
  useEffect(() => {
    if (filtersCleared) {
      setTouched(defaultTouched);
    }
  }, [filtersCleared]);
  const controlled = useMemo(() => drop || layer, [drop, layer]);

  const configured = Children.count(children) === 0;
  useEffect(() => {
    // when view changes via DataView or user interacting with filters,
    // adjust badge to reflect that
    if (controlled && view.properties) {
      const nextTouched = { ...view.properties };
      Object.keys(nextTouched).forEach((k) => {
        if (
          properties?.[k]?.badge === false ||
          (configured && properties && !properties?.[k])
        ) {
          delete nextTouched[k];
        }
      });
      setTouched(nextTouched);
    }
  }, [configured, controlled, properties, view]);

  // generate the badge value based on touched fields that have a value.
  // only show the badge based off of what's included in this DataFilters
  // since multiple DataFilters may exist
  const badge = useMemo(
    () =>
      (controlled && Object.keys(touched).filter((k) => touched[k]).length) ||
      undefined,
    [controlled, touched],
  );

  const clearControl = badge && clearFilters && (
    <Box flex={false} margin={{ start: 'small' }}>
      <DataClearFilters />
    </Box>
  );

  let content = children;
  if (Children.count(children) === 0) {
    let filtersFor;
    if (!properties && unfilteredData && unfilteredData.length)
      // build from a piece of data, ignore object values
      filtersFor = Object.keys(unfilteredData[0]).filter(
        (k) => typeof unfilteredData[0][k] !== 'object',
      );
    else if (Array.isArray(properties)) filtersFor = properties;
    else if (typeof properties === 'object') {
      filtersFor = Object.keys(properties).filter(
        (property) => !(properties[property]?.filter === false),
      );
    } else filtersFor = [];
    content = filtersFor.map((property) => (
      <DataFilter key={property} property={property} />
    ));
  }

  content = (
    <DataForm
      pad={controlled ? 'medium' : undefined}
      onDone={() => setShowContent(false)}
      updateOn={updateOn}
      {...(!controlled ? rest : { fill: 'vertical' })}
    >
      {layer && (
        <Header>
          <Heading margin="none" level={2}>
            {heading ||
              format({
                id: 'dataFilters.heading',
                messages: messages?.dataFilters,
              })}
          </Heading>
          {!controlled && clearControl}
          <Button icon={<Close />} onClick={() => setShowContent(undefined)} />
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
        kind={theme.data.button?.kind}
        icon={<Filter />}
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
        kind={theme.data.button?.kind}
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
          <Box width={{ min: 'medium' }}>{content}</Box>
        </Layer>
      )}
    </Box>
  );
};

DataFilters.propTypes = DataFiltersPropTypes;
