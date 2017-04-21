export function getFileTransfer(event, allowMultiple) {
  let items = [];
  if (event.dataTransfer) {
    const dataTransfer = event.dataTransfer;
    if (dataTransfer.files && dataTransfer.files.length) {
      items = dataTransfer.files;
    } else if (dataTransfer.items && dataTransfer.items.length) {
      items = dataTransfer.items;
    }
  } else if (event.target && event.target.files) {
    items = event.target.files;
  }

  if (items.length > 0) {
    if (allowMultiple) {
      return Array.prototype.slice.call(items);
    } else {
      return [items[0]];
    }
  }
  return [];
};

export function supportsDragDrop() {
  if (document) {
    const element = document.createElement('div');
    return ('draggable' in element) ||
      ('ondragstart' in element && 'ondrop' in element);
  }
  return false;
}

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
