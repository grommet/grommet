// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

// Overlay is a mixin for ensuring components layerd on top align with their initiating controls underneath.
var Overlay = {

  _overlayControlElement: null,
  _overlayLayerElement: null,

  _findScrollParent: function (element) {
    var parent = element.parentNode;
    while (parent) {
      // account for border the lazy way for now
      if (parent.scrollHeight > (parent.offsetHeight + 10)) {
        break;
      }
      parent = parent.parentNode;
    }
    return parent;
  },

  startOverlay: function (controlElement, layerElement) {
    this._overlayControlElement = controlElement;
    this._overlayLayerElement = layerElement;

    var scrollParent = this._findScrollParent(this._overlayControlElement);
    if (scrollParent) {
      scrollParent.addEventListener('scroll', this.positionOverlay);
    }
    window.addEventListener('resize', this.positionOverlay);

    this.positionOverlay();
  },

  stopOverlay: function () {
    if (this._overlayControlElement) {
      var scrollParent = this._findScrollParent(this._overlayControlElement);
      if (scrollParent) {
        scrollParent.removeEventListener('scroll', this.positionOverlay);
      }
      window.removeEventListener('resize', this.positionOverlay);
      this._overlayControlElement = null;
      this._overlayLayerElement = null;
    }
  },

  positionOverlay: function () {
    var controlElement = this._overlayControlElement;
    var layerElement = this._overlayLayerElement;

    var controlRect = controlElement.getBoundingClientRect();
    var windowWidth = window.innerWidth;

    // clear prior styling
    layerElement.style.left = '';
    layerElement.style.width = '';
    layerElement.style.top = '';

    var width = Math.min(
      Math.max(controlElement.offsetWidth, layerElement.offsetWidth),
        windowWidth);
    // align right edge and make at least as wide as the control
    // TODO: handle being on the right edge of the window with an icon control, go left
    var left = (controlRect.left + layerElement.offsetWidth) - width;
    if ((left + width) > windowWidth) {
      left -= ((left + width) - windowWidth);
    }
    if ('left' === this.props.direction) {
      // align right edge
      left = (controlRect.left + controlElement.offsetWidth) -
        layerElement.offsetWidth;
    }
    var top = controlRect.top;
    if ('up' === this.props.direction) {
      // align bottom edge
      top = (controlRect.top + controlElement.offsetHeight) -
        layerElement.offsetHeight;
    }

    layerElement.style.left = '' + left + 'px';
    layerElement.style.width = '' + width + 'px';
    layerElement.style.top = '' + top + 'px';
  },

  componentWillUnmount: function () {
    this.stopOverlay();
  }
};

module.exports = Overlay;
