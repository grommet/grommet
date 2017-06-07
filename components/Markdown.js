'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _markdownToJsx = require('markdown-to-jsx');

var _markdownToJsx2 = _interopRequireDefault(_markdownToJsx);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _Paragraph = require('./Paragraph');

var _Paragraph2 = _interopRequireDefault(_Paragraph);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _Heading = require('./Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Anchor = require('./Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GrommetMarkdown = function GrommetMarkdown(props) {
  var content = props.content,
      components = props.components;


  var heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(function (heading, current) {
    heading[current] = {
      component: _Heading2.default,
      props: {
        tag: current
      }
    };

    return heading;
  }, {});

  var options = (0, _deepAssign2.default)({
    a: {
      component: _Anchor2.default
    },
    img: {
      component: _Image2.default,
      props: {
        caption: true
      }
    },
    p: {
      component: _Paragraph2.default
    },
    table: {
      component: _Table2.default
    }
  }, heading, components);

  return _react2.default.createElement(
    _markdownToJsx2.default,
    { options: { overrides: options } },
    content
  );
}; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

GrommetMarkdown.propTypes = {
  content: _propTypes2.default.string,
  components: _propTypes2.default.shape({
    props: _propTypes2.default.object
  })
};

GrommetMarkdown.defaultProps = {
  components: {},
  content: ''
};

exports.default = GrommetMarkdown;
module.exports = exports['default'];