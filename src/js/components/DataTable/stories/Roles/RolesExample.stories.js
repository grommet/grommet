import React, { useState, useEffect, useMemo } from 'react';
import {
  Anchor,
  Box,
  Button,
  Data,
  DataTable,
  Grommet,
  Page,
  PageContent,
  PageHeader,
  Pagination,
  Text,
  ThemeContext,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';

import { Edit, CircleInformation, Trash, User } from "grommet-icons";

import { getRoleAssignments, getRoles } from "./api";
import { names } from './subjects';

const roles = getRoles();

const isHeader = (datum) => datum.memberCount !== undefined;

const Actions = () => (
  <Box direction="row">
    <Button icon={<Edit />} />
    <Button icon={<CircleInformation />} />
    <Button icon={<Trash />} />
  </Box>
);

const Subject = ({ data }) => (
  <Anchor icon={<User color="text-strong" />} label={data.subject} />
);

const Role = ({ data }) => (
  isHeader(data) ? (
    <Text size="small">{`${data.memberCount} role assignments`}</Text>
  ) : (
    <Anchor>{data.role}</Anchor>
  )
);

const Service = ({ data }) => (
    <Text size="small">
      {data.role?.indexOf('Aruba') === 0
          ? 'Aruba Central'
          : 'HPE GreenLake Platform'
      }
    </Text>
  );

// const columns = [
//   {
//     header: "Role",
//     property: "role",
//     render: (datum) =>
//       isHeader(datum) ? <Anchor label={datum.role} /> : "" ,
//   },
//   {
//     header: "Service",
//     property: "service",
//     render: (datum) => 
//       (isHeader(datum) ? <Service role={datum.role} /> : ""),
//   },
//   {
//     header: "Subject",
//     property: "subject",
//     render: (datum) => <Subject data={datum} />,
//   },
//   {
//     header: "Scope",
//     property: "scope",
//   },
//   {
//     header: "Source",
//     property: "source",
//   },
//   {
//     header: "Actions",
//     property: "actions",
//     render: (datum) => isHeader(datum) ? null : <Actions />,
//   },
// ];
const columns = [
  {
    header: "Subject",
    property: "subject",
    render: (datum) => isHeader(datum) ? <Subject data={datum} /> : "",
  },
  {
    header: "Role",
    property: "role",
    render: (datum) => <Role data={datum} />,
  },
  {
    header: "Service",
    property: "service",
    render: (datum) => isHeader(datum) ? "" : <Service data={datum} />,
  },
  {
    header: "Scope",
    property: "scope",
  },
  {
    header: "Source",
    property: "source",
  },
  {
    header: "Actions",
    property: "actions",
    render: (datum) => isHeader(datum) ? "" : <Actions />,
  },
];

const dataTableTheme = {
  dataTable: {
    groupHeader: {
      background: "background-contrast",
    },
  },
};

const defaultView = {
  search: "",
  sort: { property: "subject", direction: "asc" },
  step: 10,
  page: 1,
};

const defaultData = { items: [], total: 0, unfilteredTotal: 0, groupIds: [] };

const AccessTable = () => {
  const [view, setView] = useState(defaultView);
  const [data, setData] = useState(defaultData);
  const [expand, setExpand] = useState([]);

  const groupByProperty = "subject";

  useEffect(() => {
    console.log("view", view);
    const result = getRoleAssignments(view, expand, groupByProperty);
    // .then((result) => {
      console.log("result", result);
      setData(result);
    // });
  }, [view, expand]);

  const groupBy = useMemo(
    () => ({
      expandable: data.groupIds,
      expand,
      expandLabel: (row) => `${row.role} role`, // TODO
      property: groupByProperty,
    }),
    [expand, data.groupIds],
  );

  return (
    <ThemeContext.Extend value={dataTableTheme}>
      <Data
        toolbar
        properties={{
          role: { label: 'Role', options: roles.map(({ role }) => role) },
          subject: { label: 'Subject', options: names },
          scopes: {
            label: 'Scopes',
            options: [
              { label: 'Entire Workspace', value: 'Entire Workspace' },
              { label: 'None', value: '' },
            ],
          },
        }}
        view={view}
        onView={(newView) => {
          console.log('onview', newView);
          setView(newView);
        }}
        total={data.unfilteredTotal}
        filteredTotal={data.total}
      >
        <DataTable
          data={data.items}
          columns={columns}
          primaryKey="id"
          groupBy={groupBy}
          onUpdate={(opts) => {
            console.log('onUpdate', opts);
            setExpand(opts.expanded);
          }}
          resizeable
          sortable
        />
        {data.total > view.step && (
          <Pagination summary border="top" pad={{ vertical: 'xsmall' }} />
        )}
      </Data>
    </ThemeContext.Extend>
  );
};

export const RolesExample = () => (
  <Grommet theme={hpe}>
    <Page>
      <PageContent>
        <PageHeader title="Roles in a grouped DataTable" />
        <AccessTable />
      </PageContent>
    </Page>
  </Grommet>
);

RolesExample.storyName = 'Roles Example';

RolesExample.parameters = {
  chromatic: { disable: true },
};

RolesExample.args = {
  full: true,
};

export default {
  title: 'Visualizations/DataTable/Roles',
};
