
// TODO: handle '.' delimited property names via sub objects

export const filter = (data, view) => {
  const searchExp = (view?.search?.text || view?.search)
    ? new RegExp(view.search.text || view.search, 'i')
    : undefined;
  const searchProperty = view?.search?.property;

  const result = data.filter((datum) => {
    let matched = true;

    // check whether it matches any search
    if (searchExp) {
      matched = Object.keys(datum).some((property) => {
        if (
          !searchProperty ||
          searchProperty === property ||
          (Array.isArray(searchProperty) && searchProperty.includes(property))
        )
          return searchExp.test(datum[property]);
        return false;
      });
    }

    // check whether it matches any specific values
    if (matched && view?.properties) {
      // if any properties don't match, overall not matched
      matched = !Object.keys(view.properties).some((property) => {
        // returning true means it doesn't match the filter,
        const filterValue = view.properties[property];
        const value = datum[property];
        if (Array.isArray(filterValue) && typeof filterValue[0] === 'number')
          return value < filterValue[0] || value > filterValue[1];
        if (Array.isArray(filterValue)) return !filterValue.includes(value);
        return filterValue !== value;
      });
    }

    return matched;
  });

  if (view?.sort?.property && view?.sort?.direction) {
    const { property, direction } = view.sort;
    const sortAsc = direction === 'asc';
    const before = sortAsc ? 1 : -1;
    const after = sortAsc ? -1 : 1;
    result.sort((d1, d2) => {
      const d1Val = d1[property];
      const d2Val = d2[property];
      // sort strings via locale case insensitive
      if (
        (typeof d1Val === 'string' && typeof d2Val === 'string') ||
        (typeof d1Val === 'string' && !d2Val) ||
        (typeof d2Val === 'string' && !d1Val)
      ) {
        const sortResult = (d1Val || '').localeCompare(d2Val || '', undefined, {
          sensitivity: 'base',
        });
        return sortAsc ? sortResult : -sortResult;
      }
      // numbers are easier to sort
      if (d1Val > d2Val) return before;
      if (d1Val < d2Val) return after;

      return 0;
    });
  }

  return result;
};
