import React, { useEffect, useState } from 'react';

import {
  Box,
  DataTable,
  Data,
  Grid,
  Pagination,
  Text,
  Tip,
} from 'grommet';

import { StatusCritical } from 'grommet-icons';

const buildQuery = (view) => {
  const query = { };
  const properties = view?.properties || [];
  Object.keys(properties).forEach(property => {
    switch (property) {
      case 'success':
        if (properties.success.length === 1) {
          query[property] = properties.success[0] === 'Successful';
        }
        break;
      case 'rocket':
        query.rocket = {
          $in: properties.rocket,
        };
        break;
      default:
        query[property] = properties[property];
    }
  });
  if (view?.search) query.$text = { "$search": view.search };
  return query;
};

const fetchLaunches = async (view) => {
  const query = buildQuery(view);
  const sort = {
    [view?.sort?.property || 'name']: view?.sort?.direction || 'asc',
  };

  const body = {
    options: {
      populate: [
        {
          path: 'rocket',
          select: { name: 1 },
        },
      ],
      sort,
      select: ['name', 'success', 'failures'],
      limit: view?.limit || 10,
      page: view?.page || 1,
    },
    query,
  };
  return fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

const fetchRockets = async () => {
  const body = {
    options: {
      sort: { name: 'asc' },
      select: ['name', 'id'],
    }
  };
  return fetch('https://api.spacexdata.com/v4/rockets/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(response => response.json());
};

const columns = [
  {
    property: 'name',
    header: 'Name',
    size: 'small',
    primary: true,
  },
  {
    property: 'rocket.name',
    header: 'Rocket',
    size: 'xsmall',
    sortable: false,
  },
  {
    property: 'success',
    header: 'Success',
    size: 'xsmall',
    align: 'center',
    sortable: false,
    render: datum => {
      if (datum.success === false) {
        const content = (
          <Box width={{ max: 'medium' }}>
            {datum.failures?.map(({ reason }) => (
              <Text key={reason}>{reason}</Text>
            ))}
          </Box>
        );
        return (
          <Tip
            plain
            content={content}
            dropProps={{
              round: 'medium',
              pad: 'small',
              background: 'background-back',
            }}
          >
            <Box>
              <StatusCritical color="red" />
            </Box>
          </Tip>
        );
      }
      return undefined;
    },
  },
];

export const Table = () => {
 
  const [data, setData] = useState();
  const [rockets, setRockets] = useState();
  const [view, setView] = useState({ search: '' });
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [page, setPage] = useState(1);
  const limit = 10;

  const search = view.search?.text || '';

  useEffect(() => {
    fetchRockets().then(d => setRockets(d));
  }, []);

  useEffect(() => {
    fetchLaunches({search, limit, page, sort, properties: view.properties })
      .then(d => setData(d));
  }, [search, limit, page, sort, view.properties]);

  const numberItems = data?.totalDocs || 0;
  const pageResultStart = (page - 1) * limit + 1;
  const pageResultEnd = Math.min(page * limit, numberItems);
  
  const rocketOptions = 
    rockets?.docs?.map(({name, id}) => ({ value: id, label:name })) || [];

  const docs = data?.docs || [];

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid flex={false} pad="large" columns={['large']} justifyContent="center">
      <Box>
        <Data 
          properties={{
            "rocket.name": { label: 'Rocket', options: rocketOptions },
            success: { label: 'Success', options: ['Successful', 'Failed'] },
          }}
          data={docs}
          total={numberItems}
          view={view}
          onView={(nextView) => {
            setView(nextView);
            setPage(1);
          }}
          toolbar
        >
          <DataTable 
            columns={columns} 
            sort={{ ...sort, external: true }}
            onSort={opts => setSort(opts)}
          />
        </Data>
        {numberItems > limit && (
          <Box
            direction="row-responsive"
            fill="horizontal"
            border="top"
            justify="end"
            pad={{ vertical: 'xsmall' }}
          >
            <Text>
              Showing {pageResultStart}-{pageResultEnd} of {numberItems}
            </Text>
            <Pagination
              step={limit}
              numberItems={numberItems}
              page={page}
              onChange={(opts) => setPage(opts.page)}
              direction="row"
              flex={false}
            />
          </Box>
        )}
      </Box>
    </Grid>
    // </Grommet>
  );
};

Table.storyName = 'SpaceX';

Table.args = {
  full: true,
};

export default {
  title: 'Layout/Data/SpaceX',
};
