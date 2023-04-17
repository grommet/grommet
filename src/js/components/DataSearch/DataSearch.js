import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form/FormContext';
import { FormField } from '../FormField';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

export const DataSearch = ({ drop, id: idProp, responsive, ...rest }) => {
  const { id: dataId, messages, addToolbarKey } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const size = useContext(ResponsiveContext);
  const skeleton = useSkeleton();
  const [showContent, setShowContent] = useState();
  const id = idProp || `${dataId}--search`;

  useEffect(() => {
    if (noForm) addToolbarKey('_search');
  }, [addToolbarKey, noForm]);

  let content = skeleton ? null : (
    <TextInput
      aria-label={format({
        id: 'dataSearch.label',
        messages: messages?.dataSearch,
      })}
      id={id}
      name="_search"
      icon={<Search />}
      type="search"
      {...rest}
    />
  );

  if (noForm)
    // likely in Toolbar
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );
  else
    content = (
      <FormField
        htmlFor={id}
        label={format({
          id: 'dataSearch.label',
          messages: messages?.dataSearch,
        })}
      >
        {content}
      </FormField>
    );

  if (!drop && (!responsive || (size !== 'small' && size !== 'xsmall')))
    return content;

  const control = (
    <DropButton
      id={`${dataId}--search-control`}
      aria-label={format({
        id: 'dataSearch.open',
        messages: messages?.dataSort,
      })}
      kind="toolbar"
      icon={<Search />}
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

DataSearch.propTypes = DataSearchPropTypes;
