import React, { useEffect, useMemo, useState } from 'react';

import {
  Box,
  DataTable,
  Data,
  Footer,
  FormField,
  Select,
  CheckBox,
  Grid,
  Notification,
  Pagination,
  Text,
  Tip,
  Toolbar,
  DataSearch,
  DataFilters,
  DataSummary,
} from 'grommet';

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
      limit: view?.step || 10,
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

const defaultView = {
  search: '',
  sort: { property: 'name', direction: 'asc' },
  step: 10,
};

export const SpaceX = () => {
  const [total, setTotal] = useState(0);
  const [result, setResult] = useState({ data: [] });
  const [rockets, setRockets] = useState([]);
  const [view, setView] = useState(defaultView);
  const [selected, setSelected] = useState([]);
  const [showSelectedSummary, setShowSelectedSummary] = useState(false);
  const [shortFormat, setShortFormat] = useState(false);

  useEffect(() => {
    fetchRockets().then((response) =>
      setRockets(
        response.docs.map(({ name, id }) => ({ value: id, label: name })),
      ),
    );
  }, []);

  useEffect(() => {
    fetchLaunches(view).then((response) => {
      setResult({
        data: response.docs,
        filteredTotal: response.totalDocs,
        page: response.page,
      });
      // The REST API doesn't return the unfiltered total in responses.
      // Since the first request likely has no filtering, we'll likely use
      // response.totalDocs the first time and prevTotal thereafter.
      setTotal((prevTotal) => Math.max(prevTotal, response.totalDocs));
    });
  }, [view]);

  const pageBounds = useMemo(() => {
    if (result?.page)
      return [
        (result.page - 1) * view.step + 1,
        Math.min(result.page * view.step, result.filteredTotal),
      ];
    return [];
  }, [result, view]);

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
      <Box align="start">
        <FormField label="Default DataSummary format">
          <Select
            options={['X results of Y items', 'X of Y items']}
            onChange={({ option }) =>
              option === 'X results of Y items'
                ? setShortFormat(false)
                : setShortFormat(true)
            }
            defaultValue="X results of Y items"
          />
        </FormField>
        <FormField>
          <CheckBox
            label="Show selected summary"
            toggle
            reverse
            onClick={() => setShowSelectedSummary(!showSelectedSummary)}
          />
        </FormField>
      </Box>

      <Box>
        <Data
          properties={{
            rocket: { label: 'Rocket', options: rockets },
            success: { label: 'Success', options: ['Successful', 'Failed'] },
          }}
          data={result.data}
          total={total}
          filteredTotal={result.filteredTotal}
          defaultView={defaultView}
          view={view}
          onView={setView}
        >
          <Toolbar>
            <DataSearch />
            <DataFilters layer />
          </Toolbar>
          {selected.length && showSelectedSummary ? (
            <Text margin={{ vertical: 'xsmall' }}>
              {selected.length} selected
            </Text>
          ) : (
            <DataSummary
              messages={
                shortFormat
                  ? {
                      filtered: '{filteredTotal} of {total} items',
                      filteredSingle: '{filteredTotal} of {total} items',
                    }
                  : undefined
              }
            />
          )}
          <DataTable
            columns={columns}
            sortable
            onSelect={setSelected}
            select={selected}
          />
          {result.filteredTotal > view.step && (
            <Footer
              border="top"
              pad={{ vertical: 'xsmall', horizontal: 'small' }}
            >
              <Text>
                Showing {pageBounds[0]}-{pageBounds[1]} of{' '}
                {result.filteredTotal}
              </Text>
              <Pagination />
            </Footer>
          )}
        </Data>
      </Box>
    </Grid>
    // </Grommet>
  );
};

SpaceX.storyName = 'SpaceX';

SpaceX.args = {
  full: true,
};

export default {
  title: 'Data/Data/SpaceX',
};
