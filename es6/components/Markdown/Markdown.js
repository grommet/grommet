function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import Markdown from 'markdown-to-jsx';
import { deepMerge } from '../../utils';
import { Heading } from '../Heading';
import { Paragraph } from '../Paragraph';
import { Anchor } from '../Anchor';
import { Image } from '../Image';
import { Table } from '../Table';
import { TableBody } from '../TableBody';
import { TableCell } from '../TableCell';
import { TableFooter } from '../TableFooter';
import { TableHeader } from '../TableHeader';
import { TableRow } from '../TableRow';

var GrommetMarkdown = function GrommetMarkdown(_ref) {
  var components = _ref.components,
      options = _ref.options,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["components", "options", "theme"]);

  var heading = [1, 2, 3, 4].reduce(function (obj, level) {
    var result = _extends({}, obj);

    result["h" + level] = {
      component: Heading,
      props: {
        level: level
      }
    };
    return result;
  }, {});
  var overrides = deepMerge({
    a: {
      component: Anchor
    },
    img: {
      component: Image
    },
    p: {
      component: Paragraph
    },
    table: {
      component: Table
    },
    td: {
      component: TableCell
    },
    tbody: {
      component: TableBody
    },
    tfoot: {
      component: TableFooter
    },
    th: {
      component: TableCell
    },
    thead: {
      component: TableHeader
    },
    tr: {
      component: TableRow
    }
  }, heading, components, options && options.overrides);
  return /*#__PURE__*/React.createElement(Markdown, _extends({
    options: _extends({}, options, {
      overrides: overrides
    })
  }, rest));
};

var GrommetMarkdownDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  GrommetMarkdownDoc = require('./doc').doc(GrommetMarkdown);
}

var GrommetMarkdownWrapper = GrommetMarkdownDoc || GrommetMarkdown;
export { GrommetMarkdownWrapper as Markdown };