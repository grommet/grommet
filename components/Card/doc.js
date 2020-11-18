"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var doc = function doc(Card) {
  var DocumentedCard = (0, _reactDesc.describe)(Card).availableAt((0, _utils.getAvailableAtBadge)('Card', 'Layout')).description("A Card is a container of information that provides access to more \n      details. Elements of a Card can include Header, Body, Footer or any \n      other custom component.").usage("import { Card } from 'grommet';\n<Card/>").intrinsicElement('div');
  return DocumentedCard;
};

exports.doc = doc;
var themeDoc = {
  'card.container': {
    description: 'Any valid Box prop for the Card container.',
    type: 'object',
    defaultValue: "{ round: 'small', elevation: 'small' }"
  },
  'card.header': {
    description: 'Any valid Box prop for the CardHeader.',
    type: 'object',
    defaultValue: {}
  },
  'card.body': {
    description: 'Any valid Box prop for the CardBody.',
    type: 'object',
    defaultValue: {}
  },
  'card.footer': {
    description: 'Any valid Box prop for the CardFooter container.',
    type: 'object',
    defaultValue: "{ background: 'background-contrast' }"
  }
};
exports.themeDoc = themeDoc;