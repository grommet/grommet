var _excluded = ["children", "components", "options", "theme"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { forwardRef, Fragment } from 'react';
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
import { MarkdownPropTypes } from './propTypes';
var GrommetMarkdown = /*#__PURE__*/forwardRef(function (_ref, ref) {
  var children = _ref.children,
    components = _ref.components,
    options = _ref.options,
    theme = _ref.theme,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
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
      component: TableCell,
      props: {
        plain: true
      }
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

  // we use Fragment as the wrapper so we can assign the ref with the div
  // wrapper can still be overridden with the options.
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref
  }, rest), /*#__PURE__*/React.createElement(Markdown, {
    children: children,
    options: _extends({
      wrapper: Fragment
    }, options, {
      overrides: overrides
    })
  }));
});
GrommetMarkdown.propTypes = MarkdownPropTypes;
export { GrommetMarkdown as Markdown };