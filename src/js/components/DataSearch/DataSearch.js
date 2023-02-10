import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DataForm } from '../Data/DataForm';
import { DropButton } from '../DropButton';
import { FormContext } from '../Form/FormContext';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

const Content = ({ id, ...rest }) => {
  const { id: dataId, messages, addToolbarKey } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const skeleton = useSkeleton();
  const { format } = useContext(MessageContext);

  useEffect(() => {
    if (noForm) addToolbarKey('_search');
  }, [addToolbarKey, noForm]);

  let content = skeleton ? null : (
    <TextInput
      aria-label={format({
        id: 'dataSearch.label',
        messages: messages?.DataSearch,
      })}
      id={id || `${dataId}--search`}
      name="_search"
      icon={<Search />}
      type="search"
      {...rest}
    />
  );

  if (noForm)
    content = (
      <DataForm footer={false} updateOn="change">
        {content}
      </DataForm>
    );

  return content;
};

export const DataSearch = ({ drop, id, responsive, ...rest }) => {
  const { id: dataId, messages } = useContext(DataContext);
  const { noForm } = useContext(FormContext);
  const { format } = useContext(MessageContext);
  const size = useContext(ResponsiveContext);
  const [showContent, setShowContent] = useState();

  let content = <Content id={drop ? undefined : id} />;

  if (noForm) content = <DataForm footer={false}>{content}</DataForm>;

  if (!drop && (!responsive || (size !== 'small' && size !== 'xsmall')))
    return content;

  const control = (
    <DropButton
      id={id || `${dataId}--search-control`}
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
