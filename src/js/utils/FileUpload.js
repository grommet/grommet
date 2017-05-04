export function isImage(path) {
  return (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(path);
}

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
  if (typeof document !== 'undefined') {
    const element = document.createElement('div');
    return ('draggable' in element) ||
      ('ondragstart' in element && 'ondrop' in element);
  }
  return false;
}
