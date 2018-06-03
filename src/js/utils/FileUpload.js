export function isImage(path) {
  return (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(path);
}

export function supportsDragDrop() {
  if (typeof document !== 'undefined') {
    const element = document.createElement('div');
    return ('draggable' in element) ||
      ('ondragstart' in element && 'ondrop' in element);
  }
  return false;
}

export default class FileUploader {
  constructor(event, allowMultiple) {
    this.event = event;
    this.allowMultiple = allowMultiple;
  }
  getFileTransfer() {
    let items = [];
    if (this.event.dataTransfer) {
      const dataTransfer = this.event.dataTransfer;
      if (dataTransfer.files && dataTransfer.files.length) {
        items = dataTransfer.files;
      } else if (dataTransfer.items && dataTransfer.items.length) {
        items = dataTransfer.items;
      }
    } else if (this.event.target && this.event.target.files) {
      items = this.event.target.files;
    }

    if (items.length > 0) {
      if (this.allowMultiple) {
        return Array.prototype.slice.call(items);
      } else {
        return [items[0]];
      }
    }
    return [];
  }
}
