export const datumValue = (datum, property) => {
  const parts = property.split('.');
  if (parts.length === 1) {
    return datum[property];
  }
  if (!datum[parts[0]]) {
    return undefined;
  }
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

const sumReducer = (accumulated, next) => accumulated + next;
const minReducer = (accumulated, next) =>
  accumulated === undefined ? next : Math.min(accumulated, next);
const maxReducer = (accumulated, next) =>
  accumulated === undefined ? next : Math.max(accumulated, next);

const reducers = {
  max: maxReducer,
  min: minReducer,
  sum: sumReducer,
};

const aggregateColumn = (column, data) => {
  let value;
  if (column.aggregate === 'avg') {
    value = data.map(d => datumValue(d, column.property)).reduce(sumReducer);
    value /= data.length;
  } else {
    value = data
      .map(d => datumValue(d, column.property))
      .reduce(reducers[column.aggregate], 0);
  }
  return value;
};

const findPrimary = (nextProps, prevState, nextState) => {
  const { columns, primaryKey } = nextProps;

  let primaryProperty;
  columns.forEach(column => {
    // remember the first key property
    if (column.primary && !primaryProperty) {
      primaryProperty = column.property;
    }
  });
  if (!primaryProperty && columns.length > 0) {
    primaryProperty = primaryKey || columns[0].property;
  }

  return { ...nextState, primaryProperty };
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
const escapeRegExp = input => input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const filter = (nextProps, prevState, nextState) => {
  const { columns, onSearch } = nextProps;
  const { data, filters } = nextState;

  let nextFilters;
  let regexps;
  columns.forEach(column => {
    if (column.search) {
      if (!nextFilters) {
        nextFilters = {};
        regexps = {};
      }
      nextFilters[column.property] = filters
        ? filters[column.property] || ''
        : '';
      // don't do filtering if the caller has supplied onSearch
      if (nextFilters[column.property] && column.search && !onSearch) {
        regexps[column.property] = new RegExp(
          escapeRegExp(nextFilters[column.property]),
          'i',
        );
      }
    }
  });

  let nextData = data;
  if (nextFilters) {
    nextData = data.filter(
      datum =>
        !Object.keys(regexps).some(
          property => !regexps[property].test(datumValue(datum, property)),
        ),
    );
  }

  return { ...nextState, filters: nextFilters, data: nextData };
};

const aggregate = (nextProps, prevState, nextState) => {
  const { columns } = nextProps;
  const { data } = nextState;

  const aggregateValues = {};
  columns.forEach(column => {
    if (column.aggregate) {
      aggregateValues[column.property] = aggregateColumn(column, data);
    }
  });

  return { ...nextState, aggregateValues };
};

const buildFooterValues = (nextProps, prevState, nextState) => {
  const { columns } = nextProps;
  const { aggregateValues } = nextState;

  let showFooter;
  const footerValues = {};
  columns.forEach(column => {
    if (column.footer) {
      showFooter = true;
      if (typeof column.footer === 'string') {
        footerValues[column.property] = column.footer;
      } else if (column.footer.aggregate) {
        footerValues[column.property] = aggregateValues[column.property];
      }
    }
  });

  return { ...nextState, footerValues, showFooter };
};

const sortData = (nextProps, prevState, nextState) => {
  const { sort } = prevState;
  const { data } = nextState;

  let nextData = data;
  if (sort) {
    const { property, ascending } = sort;
    nextData = [...data];
    const before = ascending ? 1 : -1;
    const after = ascending ? -1 : 1;
    nextData.sort((d1, d2) => {
      if (d1[property] > d2[property]) return before;
      if (d1[property] < d2[property]) return after;
      return 0;
    });
  }

  return { ...nextState, data: nextData };
};

const groupData = (nextProps, prevState, nextState) => {
  const { columns, groupBy } = nextProps;
  const { data } = nextState;

  let groups;
  let groupState;
  let expandedState;
  if (groupBy) {
    groups = [];
    groupState = {};
    const groupMap = {};
    data.forEach(datum => {
      const groupByProperty = groupBy.property ? groupBy.property : groupBy;
      const groupValue = datumValue(datum, groupByProperty);
      if (!groupMap[groupValue]) {
        const group = { data: [], datum: {}, key: groupValue };
        group.datum[groupByProperty] = groupValue;
        groups.push(group);
        if (groupBy.expand) {
          expandedState = groupBy.expand.some(key => key === groupValue);
        } else {
          expandedState =
            prevState.groupState && prevState.groupState[groupValue]
              ? prevState.groupState[groupValue].expanded
              : false;
        }
        groupState[groupValue] = { expanded: expandedState };
        groupMap[groupValue] = group;
      }
      groupMap[groupValue].data.push(datum);
    });

    // calculate any aggregates
    columns.forEach(column => {
      if (column.aggregate) {
        groups.forEach(group => {
          group.datum[column.property] = aggregateColumn(column, group.data); // eslint-disable-line
        });
      }
    });
  }

  return { ...nextState, groups, groupState };
};

export const buildState = (nextProps, prevState) => {
  const { data } = nextProps;
  const { filters, sort, widths } = prevState;

  let nextState = {
    data,
    filters,
    sort,
    widths,
  };
  nextState = findPrimary(nextProps, prevState, nextState);
  nextState = filter(nextProps, prevState, nextState);
  nextState = aggregate(nextProps, prevState, nextState);
  nextState = buildFooterValues(nextProps, prevState, nextState);
  nextState = sortData(nextProps, prevState, nextState);
  nextState = groupData(nextProps, prevState, nextState);

  return nextState;
};
