import React, { useContext, useMemo, useState } from 'react';
import { Descend } from 'grommet-icons/icons/Descend';
import { ThemeContext } from 'styled-components';
import { DataContext } from '../../contexts/DataContext';
import { Box } from '../Box';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { RadioButtonGroup } from '../RadioButtonGroup';
import { Select } from '../Select';
import { MessageContext } from '../../contexts/MessageContext';
import { DataSortPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

const Content = ({ options: optionsArg }) => {
  const { data, id: dataId, messages, properties } = useContext(DataContext);
  const { format } = useContext(MessageContext);

  const options = useMemo(
    () =>
      optionsArg ||
      (properties &&
        Object.keys(properties)
          .sort()
          .filter((property) => !(properties?.[property]?.sort === false))) ||
      (data.length > 0 && Object.keys(data[0]).sort()) ||
      data,
    [data, optionsArg, properties],
  );

  const directionOptions = [
    {
      label: format({
        id: 'dataSort.ascending',
        messages: messages?.dataSort,
      }),
      value: 'asc',
    },
    {
      label: format({
        id: 'dataSort.descending',
        messages: messages?.dataSort,
      }),
      value: 'desc',
    },
  ];

  const sortPropertyId = `${dataId}--sort-property`;
  const sortDirectionId = `${dataId}--sort-direction`;

  return [
    <FormField
      key="by"
      htmlFor={sortPropertyId}
      label={format({
        id: 'dataSort.by',
        messages: messages?.dataSort,
      })}
    >
      <Select id={sortPropertyId} name="_sort.property" options={options} />
    </FormField>,
    <FormField
      key="dir"
      htmlFor={sortDirectionId}
      label={format({
        id: 'dataSort.direction',
        messages: messages?.dataSort,
      })}
    >
      <RadioButtonGroup
        id={sortDirectionId}
        name="_sort.direction"
        options={directionOptions}
      />
    </FormField>,
  ];
};

export const DataSort = ({ drop, options, ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { inDataForm } = useContext(DataFormContext);
  const { format } = useContext(MessageContext);
  const theme = useContext(ThemeContext);
  const [showContent, setShowContent] = useState();

  let content = <Content options={options} />;

  if (!inDataForm)
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );

  if (!drop) return content;

  const tip = format({
    id: 'dataSort.open',
    messages: messages?.dataSort,
  });

  const control = (
    <DropButton
      id={`${dataId}--sort-control`}
      aria-label={tip}
      tip={tip}
      kind={theme.data.button?.kind}
      icon={<Descend />}
      dropProps={dropProps}
      dropContent={<Box pad="small">{content}</Box>}
      open={showContent}
      onOpen={() => setShowContent(undefined)}
      onClose={() => setShowContent(undefined)}
      {...rest}
    />
  );

  return control;
};

DataSort.propTypes = DataSortPropTypes;
