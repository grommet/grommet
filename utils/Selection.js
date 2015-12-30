// (C) Copyright 2014 Hewlett Packard Enterprise Development LP

// Ensures it is an array.
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function normalize(selectedIndexes) {
  var result;
  if (undefined === selectedIndexes || null === selectedIndexes) {
    result = [];
  } else if (typeof selectedIndexes === 'number') {
    result = [selectedIndexes];
  } else {
    result = selectedIndexes;
  }
  return result;
}

// Clears any selected items
// options: {containerElement: , selectedClass: }
function clear(options) {
  var items = options.containerElement.querySelectorAll("." + options.selectedClass);
  for (var i = 0; i < items.length; i++) {
    items[i].classList.remove(options.selectedClass);
  }
}

// Sets the selectedClass on all children whose index is in selectedIndexes.
// options: {containerElement: , childSelector: , selectedClass: , selectedIndexes: []}
function set(options) {
  clear(options);
  if (options.selectedIndexes) {
    (function () {
      var items = options.containerElement.querySelectorAll(options.childSelector);
      options.selectedIndexes.forEach(function (index) {
        if (items[index]) {
          items[index].classList.add(options.selectedClass);
        }
      });
    })();
  }
}

// Returns a new selectedIndexes array with the latest selected indexes
// options: {containerElement: , childSelector: , selectedClass: ,
//   multiSelect: true|false, priorSelectedIndexes: []}
function click(event, options) {

  var item = event.target;
  while (item && !item.matches(options.childSelector)) {
    item = item.parentNode;
  }

  // determine the index of the clicked element
  var itemIndex = 0;
  var previousItem = item.previousSibling;
  while (previousItem != null) {
    previousItem = previousItem.previousSibling;
    itemIndex += 1;
  }

  var selectedIndexes = options.priorSelectedIndexes.slice(0);
  var selectedIndex = selectedIndexes.indexOf(itemIndex);

  if (options.multiSelect && event.shiftKey) {

    // select from nearest selected item to the currently selected item
    var closestIndex = -1;
    selectedIndexes.forEach(function (selectIndex, arrayIndex) {
      if (-1 === closestIndex) {
        closestIndex = selectIndex;
      } else if (Math.abs(itemIndex - selectIndex) < Math.abs(itemIndex - closestIndex)) {
        closestIndex = selectIndex;
      }
    });
    for (var i = itemIndex; i !== closestIndex;) {
      selectedIndexes.push(i);
      if (closestIndex < itemIndex) {
        i -= 1;
      } else {
        i += 1;
      }
    }

    // Remove text selection. This often happens when multi-selecting
    window.getSelection().removeAllRanges();
  } else if ((options.multiSelect || -1 !== selectedIndex) && (event.ctrlKey || event.metaKey)) {

    // toggle
    if (-1 === selectedIndex) {
      item.classList.add(options.selectedClass);
      selectedIndexes.push(itemIndex);
    } else {
      item.classList.remove(options.selectedClass);
      selectedIndexes.splice(selectedIndex, 1);
    }
  } else {

    clear(options);
    selectedIndexes = [itemIndex];
    item.classList.add(options.selectedClass);
  }

  return selectedIndexes;
}

exports["default"] = {
  normalize: normalize,
  clear: clear,
  set: set,
  click: click
};
module.exports = exports["default"];