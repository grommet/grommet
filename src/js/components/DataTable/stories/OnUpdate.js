import React, { useState } from 'react';

import { Grommet, Box, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';

// Source code for the data can be found here
// https://github.com/grommet/grommet/blob/master/src/js/components/DataTable/stories/data.js
import { groupColumns, locations, DATA } from './data';

const expandable = [...locations];

// copy groupColumns but remove the primaryKey from any that have it.
const columns = groupColumns.map(col => ({ ...col, primary: false}));

const numExtra = 20;
const largeData = [...DATA];
locations.forEach((location,index) => {
  for (let i = 0; i < numExtra * (index+1); i += 1) {
    largeData.push({
      name: `${location[0]}Name${i}`,
      location,
      date: DATA[index % DATA.length].date,
      percent: DATA[index % DATA.length].percent,
      paid: DATA[index % DATA.length].paid,
    });
  }
});
const allData = largeData;

const getData = ({ expanded, sort, show, count}) => {
  const items = [];
  const groups = [ '', ...expandable ];
  groups.sort((a,b) => {
    const dir = sort?.property === 'location' ?
      (sort.direction || 'asc') : 'asc';
    const result = a.localeCompare(b, 'en', { sensitivity: 'base' });
    return dir === 'desc' ? -result : result;
  });

  groups.forEach(id => {
    const data = allData.filter( item => item.location === id)
      .map(item => ({ id: item.name, ...item }));
    const paid = data.reduce((prev, curr) => prev + curr.paid, 0);
    if (data.length) {
      if (id) {
        items.push({ id, location: id, paid });
      }
      if (!id || expanded?.includes(id)) {
        if (sort?.property) {
          data.sort((a,b) => {
            const v1 = a[sort.property] || '';
            const v2 = b[sort.property] || '';
            const dir = sort.direction || 'asc';
            let result = 0;
            if (typeof v1 === 'string' && typeof v2 === 'string') {
              result = v1.localeCompare(v2, 'en', { sensitivity: 'base' });
            }
            else if (v1 === v2) {
              result = 0;
            } else if (v1 < v2) {
              result = -1;
            }
            else {
              result = 1;
            }
            return dir === 'desc' ? -result : result;
          });
        }
        items.push(...data);
      }
    }
  });
  // TODO support paginate 
  let start = show || 0;
  if (start + count > items.length) {
    start = Math.max(items.length - count, 0);
  }
  const result = count ? items.slice(start, start + count) : items;
  console.log('getData', groups, expanded, sort, show, count, result);
  return result;
};

export const OnUpdateDataTable = () => {
  const step = 5;
  const [expand, setExpand] = useState(['Boise'] /* expandable */);
  const [data, setData] = useState(() => 
    getData({
      expanded: expand,
      sort: { property: 'name', direction: 'asc'},
      count: step,
      // show: 2,
    }));

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <DataTable
          primaryKey="id"
          columns={columns}
          data={data}
          sortable
          replace
          groupBy={{
            expandable,
            expand,
            property: 'location',
          }}
          onUpdate={opts => {
            console.log('onUpdate', opts);
            setExpand(opts.expanded);
            setData(getData(opts));
          }}
          onSelect={opts => { console.log('onSelect', opts); }}
          step={5}
        />
      </Box>
    </Grommet>
  );
};

OnUpdateDataTable.storyName = 'onUpdate';

export default {
  title: 'Visualizations/DataTable/onUpdate',
};