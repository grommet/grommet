'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _Rest = require('./Rest');

var _Rest2 = _interopRequireDefault(_Rest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECONNECT_TIMEOUT = 5000; // 5s
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var POLL_TIMEOUT = 10000; // 10s

var state = {
  ws: null,
  wsReady: false,
  timer: null,
  requests: [], // {message: , context: }
  nextRequestId: 1,
  initialized: false,
  socketUrl: null
};

exports.default = {
  _sendMessage: function _sendMessage(op, id, url, params) {
    state.ws.send((0, _stringify2.default)({
      op: op,
      id: id,
      url: url,
      params: params
    }));
  },
  _onOpen: function _onOpen() {
    state.wsReady = true;
    // send any requests we have queued up
    state.requests.forEach(function (request) {
      this._sendMessage('start', request.id, request.url, request.params);
    }, this);
  },
  _onError: function _onError(error) {
    console.log('!!! RestWatch _onError TODO', error);
  },
  _onMessage: function _onMessage(event) {
    var message = JSON.parse(event.data);
    // Figure out which message this corresponds to so we
    // know which action to deliver the response with.
    state.requests.some(function (request) {
      if (request.id === message.id) {
        request.handler(message.result);
      }
    });
  },
  _onClose: function _onClose() {
    // lost connection, retry in a bit
    state.ws = null;
    state.wsReady = false;
    state.initialized = false;
    state.timer = setTimeout(this.initialize.bind(this), RECONNECT_TIMEOUT);
  },
  _getREST: function _getREST(request) {
    request.pollBusy = true;
    _Rest2.default.get(request.url, request.params).end(function (err, res) {
      if (err) {
        throw err;
      }

      if (res.ok) {
        request.handler(res.body);
      }
      request.pollBusy = false;
    });
  },
  _poll: function _poll() {
    state.requests.forEach(function (request) {
      if (!request.pollBusy) {
        this._getREST(request);
      }
    });
  },
  initialize: function initialize(socketUrl) {
    if (!state.initialized && !state.ws && this.available() && (state.socketUrl || socketUrl)) {
      state.socketUrl = state.socketUrl || socketUrl;
      state.ws = new WebSocket(state.socketUrl);
      state.ws.onopen = this._onOpen.bind(this);
      state.ws.onerror = this._onError.bind(this);
      state.ws.onmessage = this._onMessage.bind(this);
      state.ws.onclose = this._onClose.bind(this);
      state.initialized = true;
    }
  },
  available: function available() {
    return 'WebSocket' in window || 'MozWebSocket' in window;
  },
  start: function start(url, params, handler) {
    this.initialize();
    var request = {
      id: state.nextRequestId,
      url: url,
      params: params,
      handler: handler
    };
    state.nextRequestId += 1;
    state.requests.push(request);

    if (state.wsReady) {
      this._sendMessage('start', request.id, request.url, request.params);
    } else if (!this.available()) {
      // no web sockets, fall back to polling
      this._getREST(request);
      clearTimeout(state.timer);
      state.timer = setTimeout(this._poll.bind(this), POLL_TIMEOUT);
    }
    return request.id;
  },
  stop: function stop(requestId) {
    state.requests = state.requests.filter(function (request) {
      if (request.id === requestId) {
        if (state.wsReady) {
          this._sendMessage('stop', request.id);
        }
        return false;
      } else {
        return true;
      }
    }, this);
  }
};
module.exports = exports['default'];