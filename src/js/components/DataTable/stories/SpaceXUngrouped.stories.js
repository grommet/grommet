import React, { useEffect, useState } from 'react';

import { Box, DataTable, Text, Tip } from 'grommet';
import { StatusCritical } from 'grommet-icons';

const columns = [
  {
    property: 'name',
    header: 'Name',
    size: 'medium',
  },
  {
    property: 'rocket',
    header: 'Rocket',
    size: 'small',
    render: (datum) => <Text key={datum.rocket.name}>{datum.rocket.name}</Text>,
  },
  {
    property: 'success',
    header: 'Success',
    size: 'xsmall',
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

export const SpaceXUngrouped = () => {
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        options: {
          populate: [
            {
              path: 'rocket',
              select: { name: 1 },
            },
          ],
          sort: {
            [sort.property || 'name']: sort.direction || 'asc',
          },
          select: ['name', 'success', 'failures'],
          limit,
        },
      };
      fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      })
        .then((response) => response.json())
        .then(({ docs }) => {
          setData(docs || []);
        })
        .catch((error) => console.error('Unable to get data:', error));
    };

    fetchData();
  }, [limit, sort]);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={grommet}>
    <Box align="center" pad="large">
      <DataTable
        primaryKey="id"
        columns={columns}
        data={data}
        sortable
        replace
        onUpdate={(opts) => {
          console.log('onUpdate', opts);
          setLimit(opts.count);
          if (opts.sort) setSort(opts.sort);
        }}
        step={20}
      />
    </Box>
    // </Grommet>
  );
};

SpaceXUngrouped.storyName = 'SpaceX Ungrouped';
SpaceXUngrouped.parameters = {
  chromatic: { disable: true },
};
export default {
  title: 'Visualizations/DataTable/SpaceX Ungrouped',
};
