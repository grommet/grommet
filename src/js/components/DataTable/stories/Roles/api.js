import { roleAssignments, roles as roleList } from "./subjects";

const buildGroups = (items, groupBy) => {
  const groupMap = {};
  const groups = [];
  items.forEach((item) => {
    const groupValue = item[groupBy];
    if (!groupMap[groupValue]) {
      groupMap[groupValue] = [];
    }
    groupMap[groupValue].push(item);
  });

  Object.keys(groupMap).forEach((key) => {
    const members = groupMap[key];
    groups.push({
      id: key,
      [groupBy]: key,
      memberCount: members.length,
    });
  });
  return [groups, groupMap];
};


export const getRoles = (opts) =>
  roleList.map((role) => ({ id: role, role})).sort((a, b) => {
    const dir =
      opts?.sort?.property === "role"
        ? opts.sort.direction || "asc"
        : "asc";
    const result = a.id.localeCompare(b.id, "en", { sensitivity: "base" });
    return dir === "desc" ? -result : result;
  });

export const getRoleAssignments = (opts, expand, groupBy = "subject") => {
  // new Promise((resolve) => {
    console.log("getRoleAssignments", opts, expand, groupBy);
    const results = roleAssignments.filter((item) => {
      let matches = true;
      // first see if we match values in properties
      if (opts?.properties) {
        Object.keys(opts.properties).forEach((key) => {
          const values = opts.properties[key];
          if (Array.isArray(values)) {
            matches = matches &&values.includes(item[key]);
          }
        });
      }
      // then see if we match search criteria
      if (opts?.search) {
        matches =
          matches &&
          Object.values(item).some(
            (value) =>
              value &&
              value.toLowerCase().indexOf(opts.search.toLowerCase()) >= 0,
          );
      }
      return matches;
    });

    // sort by the groupBy property first then by the sort criteria
    const sort = {
      properties: [groupBy],
      direction: opts?.sort?.direction || "asc",
    };
    if (opts?.sort?.property) {
      sort.properties.push(opts.sort.property);
    }

    results.sort((a, b) => {
      const values = sort.properties.map((property) => [
        a[property],
        b[property],
      ]);
      let comparison = 0;
      let i = 0;
      while (comparison === 0 && i < values.length) {
        if (values[i][0] === values[i][1]) {
          comparison = 0;
        } else if (values[i][0] > values[i][1]) {
          comparison = 1;
        } else if (values[i][0] < values[i][1]) {
          comparison = -1;
        }
        i += 1;
      }

      return sort.direction === "desc" ? comparison * -1 : comparison;
    });

    // Figure out what groups we have and their members. This will give us
    // member counts (after filtering).
    const [groups, groupMap] = buildGroups(results, groupBy);
    console.log("groups", groups, groupMap);

    // now make header rows and for expanded items, member rows
    const rows = [];
    groups.forEach((group) => {
      rows.push(group);
      const groupValue = group[groupBy];
      if (expand && expand.includes(groupValue)) {
        const members = groupMap[groupValue] || [];
        members.forEach((member) => {
          rows.push(member);
        });
      }
    });

    let start = 0;
    let limit = 0;
    if (opts?.step && opts?.page) {
      start = (opts.page - 1) * opts.step;
      limit = opts.step;
    }
    // resolve(
    return {
      groupIds : groups.map((group) => (group.id)),
      items: limit ? rows.slice(start, start + limit) : rows,
      unfilteredTotal: roleAssignments.length + groups.length,
      total: rows.length,
      limit: opts?.step,
    };
  };
    // });
  // });

