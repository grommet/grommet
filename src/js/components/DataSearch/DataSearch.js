import React, { useContext, useEffect, useState } from 'react';
import { Search } from 'grommet-icons/icons/Search';
import { ThemeContext } from 'styled-components';
import { Box } from '../Box';
import { DataContext } from '../../contexts/DataContext';
import { DropButton } from '../DropButton';
import { DataFormContext } from '../../contexts/DataFormContext';
import { FormField } from '../FormField';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { ResponsiveContext } from '../../contexts/ResponsiveContext';
import { DataSearchPropTypes } from './propTypes';
import { isSmall } from '../../utils/responsive';
import { useDebounce } from '../../utils';

const dropProps = {
  align: { top: 'bottom', left: 'left' },
};

// 300ms was chosen empirically as a reasonable default
const DEBOUNCE_TIMEOUT = 300;

export const DataSearch = ({ drop, id: idProp, responsive, ...rest }) => {
  const {
    id: dataId,
    messages,
    addToolbarKey,
    onView,
    view,
  } = useContext(DataContext);
  const { inDataForm } = useContext(DataFormContext);
  const { format } = useContext(MessageContext);
  const theme = useContext(ThemeContext);
  const size = useContext(ResponsiveContext);
  const skeleton = useSkeleton();
  const debounce = useDebounce(DEBOUNCE_TIMEOUT);
  const [showContent, setShowContent] = useState();
  const [value, setValue] = useState(view?.search);
  const id = idProp || `${dataId}--search`;

  useEffect(() => {
    if (!inDataForm) addToolbarKey('_search');
  }, [addToolbarKey, inDataForm]);

  useEffect(() => setValue(view?.search), [view.search]);

  const onChange = (e) => {
    setValue(e.target?.value);
    debounce(() => () => onView({ ...view, search: e.target?.value }));
  };

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
      value={value}
      onChange={onChange}
      {...rest}
    />
  );

  if (!inDataForm)
    // likely in Toolbar.
    // Wrap in Box to give it a reasonable width
    content = <Box>{content}</Box>;
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

  if (!drop && (!responsive || !isSmall(size))) return content;

  const control = (
    <DropButton
      id={`${dataId}--search-control`}
      aria-label={format({
        id: 'dataSearch.open',
        messages: messages?.dataSort,
      })}
      kind={theme.data.button?.kind}
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
