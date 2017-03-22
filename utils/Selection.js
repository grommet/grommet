"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// (C) Copyright 2015 Hewlett Packard Enterprise Development LP

// Functions to manage selection via both child index and a specific class name.

// Ensures it is an array.
function normalizeIndexes(selectedIndexes) {
  var result = void 0;
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
function clearClass(options) {
  if (options && options.containerElement) {
    var items = options.containerElement.querySelectorAll("." + options.selectedClass);
    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove(options.selectedClass);
    }
  }
}

// Sets the selectedClass on all children whose index is in selectedIndexes.
// options: {containerElement: , childSelector: , selectedClass: ,
//    selectedIndexes: []}
function setClassFromIndexes(options) {
  clearClass(options);
  if (options && options.containerElement && options.selectedIndexes) {
    var items = options.containerElement.querySelectorAll(options.childSelector);
    options.selectedIndexes.forEach(function (index) {
      if (items[index]) {
        items[index].classList.add(options.selectedClass);
      }
    });
  }
}

// Gets the selected selectedClass on all children whose index is in
// selectedIndexes.
// options: {containerElement: , childSelector: , selectedClass: }
function getIndexesFromClass(options) {
  var items = options.containerElement.querySelectorAll(options.childSelector);
  var selectedIndexes = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].classList.contains(options.selectedClass)) {
      selectedIndexes.push(i);
    }
  }
  return selectedIndexes;
}

// Returns a new selectedIndexes array with the latest selected indexes
// options: {containerElement: , childSelector: , //selectedClass: ,
//   multiSelect: true|false, priorSelectedIndexes: []}
function onClick(event, options) {

  // Go up the DOM tree until we match the childSelector
  var item = event.target;
  var matchFunction = item.matches || item.matchesElement || item.msMatchesSelector;
  while (matchFunction && item && !matchFunction.bind(item, options.childSelector)()) {
    item = item.parentNode;
    matchFunction = item.matches || item.matchesElement || item.msMatchesSelector;
  }

  // determine the index of the clicked element
  var indexInContainer = 0;
  var previousItem = item.previousSibling;
  while (previousItem != null) {
    previousItem = previousItem.previousSibling;
    indexInContainer += 1;
  }

  var selectedIndexes = void 0; // what will be returned

  if (!event.ctrlKey && !event.metaKey && !event.shiftKey) {

    selectedIndexes = [indexInContainer];
  } else {
    // was it selected?
    var indexInPrior = options.priorSelectedIndexes.indexOf(indexInContainer);

    if (!options.multiSelect) {

      if (-1 !== indexInPrior && (event.ctrlKey || event.metaKey)) {
        selectedIndexes = [];
      } else {
        selectedIndexes = options.priorSelectedIndexes;
      }
    } else {
      // multi-select

      // make a copy of the prior list so we can modify it
      selectedIndexes = options.priorSelectedIndexes.slice(0);

      if (event.shiftKey) {

        // select from nearest selected item to the currently selected item
        var closestIndex = -1;
        selectedIndexes.forEach(function (selectIndex, arrayIndex) {
          if (-1 === closestIndex) {
            closestIndex = selectIndex;
          } else if (Math.abs(indexInContainer - selectIndex) < Math.abs(indexInContainer - closestIndex)) {
            closestIndex = selectIndex;
          }
        });

        for (var i = indexInContainer; i !== closestIndex;) {
          selectedIndexes.push(i);
          if (closestIndex < indexInContainer) {
            i -= 1;
          } else {
            i += 1;
          }
        }

        if (indexInPrior > -1) {
          selectedIndexes.splice(indexInPrior, 1);
        }

        // Remove text selection. This often happens when shift multi-selecting
        window.getSelection().removeAllRanges();
      } else {
        // toggle
        if (-1 === indexInPrior) {
          selectedIndexes.push(indexInContainer);
        } else {
          selectedIndexes.splice(indexInPrior, 1);
        }
      }
    }
  }

  return selectedIndexes;
}

exports.default = {
  normalizeIndexes: normalizeIndexes,
  clearClass: clearClass,
  getIndexesFromClass: getIndexesFromClass,
  setClassFromIndexes: setClassFromIndexes,
  onClick: onClick
};
module.exports = exports["default"];