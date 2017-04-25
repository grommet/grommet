'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-social-codepen', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'social-codepen');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: '#333', fillRule: 'evenodd', d: 'M12.0001023,22.0293246 C6.46990155,22.0293246 1.97088004,17.5301496 1.97088004,12.0001023 C1.97088004,6.4701062 6.46990155,1.97088004 12.0001023,1.97088004 C17.5300984,1.97088004 22.02912,6.4701062 22.02912,12.0001023 C22.02912,17.5301496 17.5300984,22.0293246 12.0001023,22.0293246 M12.0001023,0 C5.37246693,0 0,5.37251809 0,12.0001023 C0,18.6277377 5.37246693,24.0000512 12.0001023,24.0000512 C18.6275331,24.0000512 24,18.6277377 24,12.0001023 C24,5.37251809 18.6275331,0 12.0001023,0 M18.1444674,13.0672488 L16.5492221,12.0001023 L18.1444674,10.933007 L18.1444674,13.0672488 Z M12.6376991,17.5906236 L12.6376991,14.6163967 L15.4022622,12.767488 L17.6339173,14.2599991 L12.6376991,17.5906236 Z M12.0001126,13.5086784 L9.74466695,12.0001023 L12.0001126,10.4915262 L14.2553535,12.0001023 L12.0001126,13.5086784 Z M11.3623214,17.5906236 L6.36605201,14.2599991 L8.59791172,12.767488 L11.3623214,14.6163967 L11.3623214,17.5906236 Z M5.85555304,10.933007 L7.45095183,12.0001023 L5.85555304,13.0672488 L5.85555304,10.933007 Z M11.3623214,6.40958102 L11.3623214,9.38380794 L8.59791172,11.233126 L6.36605201,9.74015443 L11.3623214,6.40958102 Z M12.6376991,6.40958102 L17.6339173,9.74015443 L15.4022622,11.233126 L12.6376991,9.38380794 L12.6376991,6.40958102 Z M19.414166,9.656248 C19.4128358,9.64688527 19.4104823,9.63793184 19.4089475,9.62856911 C19.4057754,9.61055993 19.402501,9.59260191 19.397794,9.57505319 C19.3950313,9.56451372 19.3911429,9.55438356 19.3878685,9.54425339 C19.3827523,9.52859768 19.3776872,9.51299313 19.3714454,9.49779788 C19.3670966,9.48725842 19.3620827,9.47671895 19.3572222,9.46658879 C19.3505199,9.45210981 19.3435618,9.43804014 19.3355293,9.42443092 C19.3296968,9.4142496 19.323455,9.40447757 19.3174178,9.3947567 C19.3088225,9.38145446 19.3000226,9.36856152 19.2904041,9.35607789 C19.283446,9.34671516 19.2760274,9.33735243 19.2686089,9.32834784 C19.2584275,9.3166828 19.2478881,9.3049666 19.2367858,9.29401783 C19.2284463,9.2854737 19.220158,9.27687841 19.2114092,9.26905055 C19.199693,9.25851109 19.1876187,9.24832976 19.1752885,9.23860889 C19.1657723,9.23119034 19.1563584,9.22377178 19.1464329,9.21676253 C19.1426981,9.21440905 19.1394237,9.21128814 19.1358934,9.20893467 L12.3536963,4.687504 C12.1394791,4.54465843 11.8605414,4.54465843 11.646273,4.687504 L4.86412702,9.20893467 C4.86059681,9.21128814 4.85727125,9.21440905 4.85358755,9.21676253 C4.84361088,9.22377178 4.83424815,9.23119034 4.82488542,9.23860889 C4.81240178,9.24832976 4.80027628,9.25851109 4.78881589,9.26905055 C4.7798113,9.27687841 4.7716253,9.2854737 4.76323466,9.29401783 C4.75213241,9.3049666 4.74159294,9.3166828 4.73161626,9.32834784 C4.72399306,9.33735243 4.7165745,9.34671516 4.70956525,9.35607789 C4.70020252,9.36856152 4.69119793,9.38145446 4.68280728,9.3947567 C4.67636081,9.40447757 4.67032365,9.4142496 4.66449113,9.42443092 C4.65666327,9.43804014 4.64965401,9.45210981 4.64279825,9.46658879 C4.63793781,9.47671895 4.63287273,9.48725842 4.62857508,9.49779788 C4.62233326,9.51299313 4.61726818,9.52859768 4.61215194,9.54425339 C4.60882638,9.55438356 4.60514268,9.56451372 4.60222642,9.57505319 C4.59751947,9.59260191 4.59439856,9.61055993 4.591073,9.62856911 C4.58953813,9.63793184 4.58718466,9.64688527 4.58600792,9.656248 C4.58227306,9.68356875 4.5801754,9.7112988 4.5801754,9.73938699 L4.5801754,14.2608177 C4.5801754,14.2889058 4.58227306,14.3166359 4.58600792,14.3443659 C4.58718466,14.3533705 4.58953813,14.3626821 4.591073,14.3716355 C4.59439856,14.3896447 4.59751947,14.4075516 4.60222642,14.4251515 C4.60514268,14.4356909 4.60882638,14.4458211 4.61215194,14.4560024 C4.61726818,14.4715558 4.62233326,14.4872115 4.62857508,14.5028161 C4.63287273,14.5134067 4.63793781,14.5235369 4.64279825,14.533667 C4.64965401,14.5480437 4.65666327,14.5621134 4.66449113,14.576183 C4.67032365,14.5860062 4.67636081,14.5956759 4.68280728,14.6054479 C4.69119793,14.6187502 4.70020252,14.6316431 4.70956525,14.6441268 C4.7165745,14.6538988 4.72399306,14.6628522 4.73161626,14.6718057 C4.74159294,14.6835219 4.75213241,14.6952381 4.76323466,14.7061868 C4.7716253,14.7147309 4.7798113,14.7233262 4.78881589,14.7311029 C4.80027628,14.7417447 4.81240178,14.7518749 4.82488542,14.7615958 C4.83424815,14.7690655 4.84361088,14.7764329 4.85358755,14.7834421 C4.85727125,14.7857956 4.86059681,14.7889165 4.86412702,14.7912188 L11.646273,19.3127007 C11.7534072,19.3841234 11.8767599,19.4200395 12.0001126,19.4200395 C12.1232606,19.4200395 12.2465621,19.3841234 12.3536963,19.3127007 L19.1358934,14.7912188 C19.1394237,14.7889165 19.1426981,14.7857956 19.1464329,14.7834421 C19.1563584,14.7764329 19.1657723,14.7690655 19.1752885,14.7615958 C19.1876187,14.7518749 19.199693,14.7417447 19.2114092,14.7311029 C19.220158,14.7233262 19.2284463,14.7147309 19.2367858,14.7061868 C19.2478881,14.6952381 19.2584275,14.6835219 19.2686089,14.6718057 C19.2760274,14.6628522 19.283446,14.6538988 19.2904041,14.6441268 C19.3000226,14.6316431 19.3088225,14.6187502 19.3174178,14.6054479 C19.323455,14.5956759 19.3296968,14.5860062 19.3355293,14.576183 C19.3435618,14.5621134 19.3505199,14.5480437 19.3572222,14.533667 C19.3620827,14.5235369 19.3670966,14.5134067 19.3714454,14.5028161 C19.3776872,14.4872115 19.3827523,14.4715558 19.3878685,14.4560024 C19.3911429,14.4458211 19.3950313,14.4356909 19.397794,14.4251515 C19.402501,14.4075516 19.4057754,14.3896447 19.4089475,14.3716355 C19.4104823,14.3626821 19.4128358,14.3533705 19.414166,14.3443659 C19.4176962,14.3166359 19.4198962,14.2889058 19.4198962,14.2608177 L19.4198962,9.73938699 C19.4198962,9.7112988 19.4176962,9.68356875 19.414166,9.656248 L19.414166,9.656248 Z', stroke: 'none' })
      );
    }
  }]);

  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _propTypes2.default.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'SocialCodepen';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];