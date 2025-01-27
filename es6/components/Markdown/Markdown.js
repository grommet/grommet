var _excluded = ["children", "components", "options", "theme"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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