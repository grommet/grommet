import React, { useEffect, useMemo, useState } from 'react';

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

const processData = (
  {
    /* expanded, */
    show = 0,
    count = 20,
  },
  groups = [],
  data = [],
) => {
  const items = [];
  groups.forEach((group) => {
    items.push(group);
    const groupItems = data
      .filter((item) => item.rocket?.id === group.id)
      .map(({ id, name, rocket, success, failures }) => ({
        id,
        name,
        rocket: rocket.name,
        rocketId: rocket.id,
        success,
        failures,
      }));
    items.push(...groupItems);
  });

  // TODO support paginate
  let start = show || 0;
  if (start + count > items.length) {
    start = Math.max(items.length - count, 0);
  }
  const result = count ? items.slice(start, start + count) : items;
  return result;
};

export const SpaceX = () => {
  const [groups, setGroups] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [sort, setSort] = useState({ property: 'name', direction: 'asc' });
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(20);

  const expandable = useMemo(() => groups.map(({ id }) => id), [groups]);

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        options: {
          select: ['name'],
        },
      };
      fetch('https://api.spacexdata.com/v4/rockets/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      })
        .then((response) => response.json())
        .then((d) => {
          setGroups(d.docs);
        })
        .catch((error) => console.error('Unable to get groups:', error));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (groups.length === 0 || expanded.length === 0) {
        setData(
          processData(
            {
              expanded,
              show: 0,
              count: limit,
            },
            groups,
            [],
          ),
        );
        return;
      }
      const query = {
        options: {
          populate: [
            {
              path: 'rocket',
              select: { name: 1 },
            },
          ],
          sort: {
            rocket: 'asc',
            [sort.property || 'name']: sort.direction || 'asc',
          },
          select: ['name', 'success', 'failures'],
          limit,
        },
        query: {
          rocket: {
            $in: expanded,
          },
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
        .then((d) => {
          setData(
            processData(
              {
                expanded,
                show: 0,
                count: limit,
              },
              groups,
              d.docs,
            ),
          );
        })
        .catch((error) => console.error('Unable to get data:', error));
    };

    fetchData();
  }, [expanded, groups, limit, sort]);

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
        groupBy={{
          expandable,
          expand: expanded,
          property: 'rocketId',
        }}
        onUpdate={(opts) => {
          setExpanded(opts.expanded);
          setLimit(opts.count);
          if (opts.sort) setSort(opts.sort);
        }}
        step={20}
      />
    </Box>
    // </Grommet>
  );
};

SpaceX.storyName = 'SpaceX Grouped';
SpaceX.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Visualizations/DataTable/SpaceX Grouped',
};
