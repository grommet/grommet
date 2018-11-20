"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Diagram) {
  var DocumentedDiagram = (0, _reactDesc.describe)(Diagram).availableAt((0, _utils.getAvailableAtBadge)('Diagram')).description("Graphical lines between DOM elements.\n      Diagram is meant to be used with Stack.").usage("import { Diagram } from 'grommet';\n<Diagram />");
  DocumentedDiagram.propTypes = {
    connections: _reactDesc.PropTypes.arrayOf(_reactDesc.PropTypes.shape({
      anchor: _reactDesc.PropTypes.oneOf(['center', 'vertical', 'horizontal']),
      color: _reactDesc.PropTypes.string,
      fromTarget: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.object]).isRequired,
      label: _reactDesc.PropTypes.string,
      // for accessibility
      offset: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']), _reactDesc.PropTypes.string]),
      thickness: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['hair', 'xxsmall', 'xsmall', 'small', 'medium', 'large']), _reactDesc.PropTypes.string]),
      toTarget: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.string, _reactDesc.PropTypes.object]).isRequired,
      type: _reactDesc.PropTypes.oneOf(['direct', 'curved', 'rectilinear'])
    })).description("Array of objects describing the connections.\n      The 'fromTarget' and 'toTarget' may be either DOM element ids or\n      React references.\n      'offset' can be used to shift a bit to reduce the amount of overlap\n      with other connection lines to make the lines easier to distinguish.").isRequired
  };
  return DocumentedDiagram;
};

exports.doc = doc;