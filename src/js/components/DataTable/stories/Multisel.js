import React, { useMemo, useState } from 'react';
import { Box, Data, DataTable, Pagination } from 'grommet';

const DATA = [];
for (let i = 0; i < 500; i += 1) {
  DATA.push({
    sn: `7846165FS${i.toString().padStart(3, '0')}V`,
    model: 'DL345 Gen11',
    type: 'Server',
    pid: '38:17:C7:B8:90210',
  });
}

const columns = [
  { header: 'Serial number', property: 'sn' },
  { header: 'Model', property: 'model' },
  { header: 'Device type', property: 'type' },
  { header: 'Product ID', property: 'pid' },
];

export const Multisel = () => {
  // Uncomment <Grommet> lines when using outside of storybook
  // <Grommet theme={grommet}>
  const [view, setView] = useState({ step: 20, page: 1, search: '' });
  const [notSelected, setNotSelected] = useState(() => new Set([]));
  console.log('view', view);

  const filteredData = useMemo(
    () =>
      DATA.filter(
        (item) =>
          item.sn.indexOf(view.search) !== -1 ||
          item.model.indexOf(view.search) !== -1 ||
          item.type.indexOf(view.search) !== -1 ||
          item.pid.indexOf(view.search) !== -1,
      ),
    [view.search],
  );

  const data = useMemo(
    () =>
      filteredData.slice((view.page - 1) * view.step, view.page * view.step),
    [view.page, view.step, filteredData],
  );

  const select = data
    .filter(({ sn }) => !notSelected.has(sn))
    .map(({ sn }) => sn);
  const onSelect = (s) => {
    console.log('SELECT', s);
    const pageSelect = new Set(s);
    const pageKeys = new Set(data.map(({ sn }) => sn));
    const pageNotSelected = pageKeys.difference(pageSelect);
    setNotSelected((prev) => prev.difference(pageKeys).union(pageNotSelected));
  };

  return (
    <Box align="center" pad="large">
      <Data
        data={data}
        total={DATA.length}
        filteredTotal={DATA.length}
        toolbar
        view={view}
        onView={setView}
      >
        <DataTable columns={columns} select={select} onSelect={onSelect} />
        <Pagination summary />
      </Data>
    </Box>
  );
  // </Grommet>
};

export default {
  title: 'Visualizations/DataTable/Multisel',
};
