// TODO: share with DataTable, List, Cards, etc.
const datumValue = (datum, property) => {
  if (!property) return undefined;
  const parts = property.split('.');
  if (parts.length === 1) return datum[property];
  if (!datum[parts[0]]) return undefined;
  return datumValue(datum[parts[0]], parts.slice(1).join('.'));
};

// This is where we filter the data internally, when the caller doesn't
// provide an onView.
export const filter = (data, view, properties) => {
  // from https://stackoverflow.com/a/6300266/8513067
  const searchExp = view?.search
    ? new RegExp(view.search.replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'), 'i')
    : undefined;
  let searchProperties;
  if (searchExp && properties) {
    // if we know where we want to search, look there
    searchProperties = Object.keys(properties).filter(
      (k) => properties[k].search,
    );
    // if none specified, look in all defined properties
    if (searchProperties.length === 0)
      searchProperties = Object.keys(properties);
  }

  const filteredData = data.filter((datum) => {
    let matched = true;

    // check whether it matches any search
    if (searchExp) {
      const searchWith = (property) => {
        const value = datumValue(datum, property);
        if (value === undefined) return false;
        return searchExp.test(value);
      };

      if (searchProperties) matched = searchProperties.some(searchWith);
      else matched = Object.keys(datum).some(searchWith);
    }

    // check whether it matches any specific values
    if (matched && view?.properties) {
      // if any properties don't match, overall not matched
      matched = !Object.keys(view.properties).some((property) => {
        // returning true means it doesn't match the filter,
        const filterValue = view.properties[property];
        const value = datumValue(datum, property);

        // range case
        if (
          typeof filterValue?.min === 'number' ||
          typeof filterValue?.max === 'number'
        )
          return (
            typeof value !== 'number' ||
            value <= filterValue.min ||
            value >= filterValue.max
          );

        // options case
        if (Array.isArray(filterValue)) {
          return !filterValue.some((f) => {
            // f may be an object with form {label: __, value: __}
            const isObject = typeof f === 'object';
            // match f within data value array using .includes()
            if (Array.isArray(value)) {
              return isObject ? value.includes(f?.value) : value.includes(f);
            }
            // match f with data value using ===
            return isObject ? f?.value === value : f === value;
          });
        }

        // presence case
        if (typeof filterValue === 'boolean') return filterValue === !value;

        // not sure, keep it
        return false;
      });
    }

    return matched;
  });

  if (view?.sort?.property || view?.sort?.direction) {
    const { property, direction } = view.sort;
    const prop =
      property || (filteredData.length && Object.keys(filteredData[0])[0]);
    const sortDesc = direction === 'desc'; // default to asc
    const before = sortDesc ? -1 : 1;
    const after = sortDesc ? 1 : -1;
    filteredData.sort((d1, d2) => {
      const d1Val = datumValue(d1, prop);
      const d2Val = datumValue(d2, prop);
      // sort strings via locale case insensitive
      if (
        (typeof d1Val === 'string' && typeof d2Val === 'string') ||
        (typeof d1Val === 'string' && !d2Val) ||
        (typeof d2Val === 'string' && !d1Val)
      ) {
        const sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base',
        });
        return sortDesc ? -sortResult : sortResult;
      }
      // numbers are easier to sort
      if (d1Val > d2Val) return before;
      if (d1Val < d2Val) return after;

      return 0;
    });
  }

  let pagedData;
  if (view?.step) {
    const start = view.step * ((view?.page ?? 1) - 1);
    pagedData = filteredData.slice(start, start + view.step);
  }

  return {
    unfilteredData: data,
    data: pagedData || filteredData,
    total: data.length,
    filteredTotal: filteredData.length,
  };
};
