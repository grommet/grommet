import React, { useContext, useMemo, useState } from 'react';
import { Descend } from 'grommet-icons/icons/Descend';
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
import { useThemeValue } from '../../utils/useThemeValue';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

const Content = ({ options: optionsArg }) => {
  const { data, id: dataId, messages, properties } = useContext(DataContext);
  const { format } = useContext(MessageContext);

  const selectProps = useMemo(() => {
    let props = {};

    if (optionsArg) {
      props = { options: optionsArg };
    }
    if (properties && Array.isArray(properties)) {
      props = { options: properties };
    } else if (properties && typeof properties === 'object') {
      props = {
        options: Object.entries(properties)
          .filter(([, { sort }]) => !(sort === false))
          .map(([key, { label }]) => ({ key, label: label || key }))
          .sort((a, b) => a.label.localeCompare(b.label)),
        valueKey: {
          key: 'key',
          reduce: true,
        },
        labelKey: 'label',
      };
    } else {
      props = {
        options: (data.length > 0 && Object.keys(data[0]).sort()) || data,
      };
    }
    return props;
  }, [data, optionsArg, properties]);

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
      <Select id={sortPropertyId} name="_sort.property" {...selectProps} />
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
  const { theme } = useThemeValue();
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
