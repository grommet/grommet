import React, { useEffect, useState } from 'react';

import { Box, DataTable, Data, Text } from 'grommet';

import { StatusCriticalSmall, StatusGoodSmall } from 'grommet-icons';

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
  },
  {
    property: 'success',
    header: 'Success',
    render: (datum) => (
      <Box align="center" direction="row" gap="xsmall">
        {datum.success ? (
          <StatusGoodSmall color="status-ok" />
        ) : (
          <StatusCriticalSmall color="status-critical" />
        )}
        <Text>{datum.success ? 'Successful' : 'Failed'}</Text>
      </Box>
    ),
  },
];

const STEP = 10;
export const Table = () => {
  const [data, setData] = useState();
  const [rockets, setRockets] = useState();
  const [view, setView] = useState({
    search: '',
    sort: {
      property: 'name',
      direction: 'asc',
    },
  });
  const [limit, setLimit] = useState(STEP);

  const search = view.search || '';

  useEffect(() => {
    fetchRockets().then((d) => setRockets(d));
  }, []);

  useEffect(() => {
    fetchLaunches({
      search,
      limit,
      sort: view.sort,
      properties: view.properties,
    }).then((d) => setData(d));
  }, [search, limit, view.sort, view.properties]);

  const numberItems = data?.totalDocs || 0;

  const rocketOptions =
    rockets?.docs?.map(({ name, id }) => ({ value: id, label: name })) || [];

  const docs = data?.docs || [];

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box pad="large">
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
            alignSelf="start"
            columns={columns}
            step={STEP}
            onMore={() => {
              if (limit < numberItems) {
                setLimit(limit + STEP);
              }
            }}
            sortable
          />
        </Data>
      </Box>
    </Box>
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
