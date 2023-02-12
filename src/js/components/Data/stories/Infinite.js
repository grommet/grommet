import React, { useEffect, useState } from 'react';

import { Box, DataTable, Data, Grid, Notification, Text, Tip } from 'grommet';

import { StatusCritical } from 'grommet-icons';

const buildQuery = (view) => {
  const query = {};
  const properties = view?.properties || [];
  Object.keys(properties).forEach((property) => {
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
  if (view?.search) query.$text = { $search: view.search };
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
    },
    query,
  };
  return fetch('https://api.spacexdata.com/v4/launches/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

const fetchRockets = async () => {
  const body = {
    options: {
      sort: { name: 'asc' },
      select: ['name', 'id'],
    },
  };
  return fetch('https://api.spacexdata.com/v4/rockets/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
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
    render: (datum) => {
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

const STEP = 10;

export const Table = () => {
  const [data, setData] = useState();
  const [rockets, setRockets] = useState();
  const [view, setView] = useState({ search: '' });
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [limit, setLimit] = useState(STEP);

  const search = view.search || '';

  useEffect(() => {
    fetchRockets().then((d) => setRockets(d));
  }, []);

  useEffect(() => {
    fetchLaunches({
      search,
      limit,
      sort,
      properties: view.properties,
    }).then((d) => setData(d));
  }, [search, limit, sort, view.properties]);

  const numberItems = data?.totalDocs || 0;

  const rocketOptions =
    rockets?.docs?.map(({ name, id }) => ({ value: id, label: name })) || [];

  const docs = data?.docs || [];

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Grid
      flex={false}
      pad="large"
      columns={[['small', 'large']]}
      justifyContent="center"
      gap="large"
    >
      <Notification
        status="info"
        message="Data is in 'beta'. The API surface is subject to change."
      />
      <Box>
        <Data
          properties={{
            rocket: { label: 'Rocket', options: rocketOptions },
            success: { label: 'Success', options: ['Successful', 'Failed'] },
          }}
          data={docs}
          total={numberItems}
          view={view}
          onView={(nextView) => setView(nextView)}
          toolbar
        >
          <DataTable
            columns={columns}
            sort={{ ...sort, external: true }}
            onSort={(opts) => setSort(opts)}
            step={STEP}
            onMore={() => {
              if (limit < numberItems) {
                setLimit(limit + STEP);
              }
            }}
          />
        </Data>
      </Box>
    </Grid>
    // </Grommet>
  );
};

Table.storyName = 'Infinite Scroll';

Table.args = {
  full: true,
};

export default {
  title: 'Data/Data/Infinite Scroll',
};
