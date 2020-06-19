import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormPrevious, FormNext } from 'grommet-icons';

import { Box } from 'mnet-ui-base';
import { Pagination } from '../Pagination';

const PaginationPreview = () => {
  return (
    <div>
      <Box align="center" pad="large">
        <Pagination
          leftIcon={<FormPrevious />}
          rightIcon={<FormNext />}
          pages={3}
          currentPage={2}
          onClick={page => console.log(page)}
        />
      </Box>
    </div>
  );
};

storiesOf('Pagination', module).add('Pagination', () => <PaginationPreview />);
