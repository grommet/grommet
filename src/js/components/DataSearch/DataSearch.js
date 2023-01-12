import React, { useContext } from 'react';
import styled from 'styled-components';
import { Search } from 'grommet-icons/icons/Search';
import { Box } from '../Box';
import { Button } from '../Button';
import { DataForm } from '../Data';
import { DataContext } from '../../contexts/DataContext';
import { FormContext } from '../Form/FormContext';
import { useSkeleton } from '../Skeleton';
import { TextInput } from '../TextInput';
import { MessageContext } from '../../contexts/MessageContext';
import { controlBorderStyle } from '../../utils';
import { DataSearchPropTypes } from './propTypes';

const SubmitContainer = styled(Box)`
  ${(props) => !props.skeleton && controlBorderStyle}
`;

export const DataSearch = ({ ...rest }) => {
  const skeleton = useSkeleton();
  const { format } = useContext(MessageContext);
  const { updateOn } = useContext(DataContext);
  const { id: dataId, messages, noForm } = useContext(FormContext);
  const addSubmit = noForm && updateOn === 'submit';

  let content = skeleton ? null : (
    <TextInput
      aria-label={format({
        id: 'dataSearch.label',
        messages: messages?.DataSearch,
      })}
      id={`${dataId}--search`}
      name="_search"
      icon={!addSubmit ? <Search /> : undefined}
      type="search"
      plain={addSubmit}
      {...rest}
    />
  );

  if (noForm) {
    if (addSubmit) {
      content = (
        <SubmitContainer direction="row" align="center" skeleton={skeleton}>
          {content}
          <Button type="submit" icon={<Search />} hoverIndicator />
        </SubmitContainer>
      );
    }
    content = <DataForm footer={false}>{content}</DataForm>;
  }

  return content;
};

DataSearch.propTypes = DataSearchPropTypes;
