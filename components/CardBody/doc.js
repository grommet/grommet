"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(CardBody) {
  var DocumentedAccordionPanel = (0, _reactDesc.describe)(CardBody).description('The body of the card. Mostly used for placing content.').intrinsicElement('div');
  return DocumentedAccordionPanel;
};

exports.doc = doc;