import React, { useState, useEffect } from 'react';
import {
  Data,
  DataTable,
  DataSearch,
  DataFilters,
  Toolbar,
  Pagination,
} from 'grommet';

export const TEMP = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState({
    // poperties: { properties },
    search: '',
    sort: { property: 'req_timestamp', direction: 'desc' },
    step: 10,
    page: 1,
  });
  const [, setResult] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      // const response = await fetch('/API/Data');
      // const jsonData = await response.json();
      const jsonData = [
        { ID: 1, name: 'one' },
        { ID: 2, name: 'two' },
        { ID: 3, name: 'three' },
        { ID: 4, name: 'four' },
        { ID: 5, name: 'five' },
        { ID: 6, name: 'six' },
        { ID: 7, name: 'seven' },
        { ID: 8, name: 'eight' },
        { ID: 9, name: 'nine' },
        { ID: 10, name: 'ten' },
      ];
      setData(jsonData);
      setTotal(jsonData.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setResult(view);
  }, [view]);

  return (
    <Data
      // properties={properties}
      data={data}
      total={total}
      view={view}
      onView={(nextView) => setView(nextView)}
    >
      <Toolbar>
        <DataSearch />
        <DataFilters layer />
      </Toolbar>
      <DataTable
        // columns={columns}
        primaryKey="ID"
        step={10}
        // paginate={{
        //   onChange: (event) => {},
        //   numberItems: 11,
        // }}
      />
      <Pagination onChange={() => {}} />
    </Data>
  );
};

TEMP.storyName = 'TEMP';

TEMP.args = {
  full: true,
};

export default {
  title: 'Data/Data/TEMP',
};
