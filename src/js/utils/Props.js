// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

export default {
  pick (props, fields) {
    const has = (p) => props.hasOwnProperty(p);
    const obj = {};
    (fields || []).forEach((field) => {
      if (has(field))
        obj[field] = props[field];
    });
    return obj;
  }
};
