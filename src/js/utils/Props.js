// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

export default {
  pick (props, fields) {
    const has = (p) => props.hasOwnProperty(p);
    const obj = {};
    (fields || []).forEach((field) => {
      if (has(field))
        obj[field] = props[field];
    });
    return obj;
  },
  omit (props, fields) {
    const obj = {};
    Object.keys(props).forEach((p) => {
      if ((fields || []).indexOf(p) === -1) {
        obj[p] = props[p];
      }
    });
    return obj;
  }
};
