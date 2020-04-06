"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(InfiniteScroll) {
  var DocumentedInfiniteScroll = (0, _reactDesc.describe)(InfiniteScroll).availableAt((0, _utils.getAvailableAtBadge)('InfiniteScroll')).description('A container that lazily renders items.').usage("import { InfiniteScroll } from 'grommet';\n<InfiniteScroll />");
  DocumentedInfiniteScroll.propTypes = {
    children: _reactDesc.PropTypes.func.description("Function that will be called when each item is rendered. It will be\n      called with three arguments, the item to render, the index of the item,\n      and a ref that should be applied to the element. For example:\n      {(item, index, ref) => <li key={index} ref={ref}>{item}</li>}"),
    items: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.any).description('The children callback will be called to render each item.'),
    onMore: _reactDesc.PropTypes.func.description("Use this to indicate that 'items' doesn't contain all that it could.\n      It will be called when the entire list of items has been rendered.\n      This might be used when the total number of items that could be retrieved\n      is more than you'd want to load into the browser. 'onMore' allows you\n      to lazily fetch more from the server only when needed."),
    renderMarker: _reactDesc.PropTypes.func.description("Function that will be called to render the marker element that\n      is inserted into the DOM to track when scrolling nears the end of the\n      rendered items. It will be called with a single element that should\n      be wrapped appropriately. This is needed when the default\n      element, a <span>, isn't sufficient, such as a row of a table body."),
    replace: _reactDesc.PropTypes.bool.description("Whether to replace previously rendered items with a generic spacing\n      element when they have scrolled out of view. This is more performant but\n      means that in-page searching will not find elements that have been\n      replaced. In general, this should be set to true within Drop containers\n      and false otherwise.").defaultValue(false),
    scrollableAncestor: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.node, _reactDesc.PropTypes.oneOf(['window'])]).description("A custom ancestor to determine if the marker is visible in it.\n      This is useful in cases where you do not want the immediate\n      scrollable ancestor to be the container. For example, when your\n      marker is in a div that has overflow auto but you are detecting\n      visibility based on the window.\n      This should typically be a reference to a DOM node, but it will\n      also work to pass it the string \"window\" if you are using server\n      rendering."),
    show: _reactDesc.PropTypes.number.description('Ensure that the item at this index is visible initially.'),
    step: _reactDesc.PropTypes.number.description('How many items to render at a time.').defaultValue(50)
  };
  return DocumentedInfiniteScroll;
};

exports.doc = doc;