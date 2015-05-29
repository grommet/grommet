// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var state = {
  ws: null,
  ready: false,
  timer: null,
  requests: [], // {message: , context: }
  nextRequestId: 1
};

var RestWatch = {

  _sendRequest: function (op, id, url, params) {
    state.ws.send(JSON.stringify({
      op: op,
      id: id,
      url: url,
      params: params
    }));
  },

  _onOpen: function () {
    state.ready = true;
    // send any requests we have queued up
    state.requests.forEach(function (request) {
      this._sendRequest('start', request.id, request.url, request.params);
    }, this);
  },

  _onError: function (error) {
    console.log('!!! RestWatch _onError TODO', error);
  },

  _onMessage: function (event) {
    var message = JSON.parse(event.data);
    // Figure out which message this corresponds to so we
    // know which action to deliver the response with.
    state.requests.some(function (request) {
      if (request.id === message.id) {
        request.handler(message.result);
      }
    });
  },

  _onClose: function () {
    // lost connection, retry in a bit
    state.ws = null;
    state.ready = false;
    state.timer = setTimeout(this.initialize.bind(this), 5000);
  },

  initialize: function () {
    if (! state.ws) {
      var path = 'ws://' + window.location.host + '/rest/ws';
      state.ws = new WebSocket(path);
      state.ws.onopen = this._onOpen.bind(this);
      state.ws.onerror = this._onError.bind(this);
      state.ws.onmessage = this._onMessage.bind(this);
      state.ws.onclose = this._onClose.bind(this);
    }
  },

  available: function () {
    return ('WebSocket' in window || 'MozWebSocket' in window);
  },

  start: function (url, params, handler) {
    this.initialize();
    var request = {
      id: state.nextRequestId,
      url: url,
      params: params,
      handler: handler
    };
    state.nextRequestId += 1;
    state.requests.push(request);

    if (state.ready) {
      this._sendRequest('start', request.id, request.url, request.params);
    }
    return request.id;
  },

  stop: function (requestId) {
    state.requests = state.requests.filter(function (request) {
      if (request.id === requestId) {
        if (state.ready) {
          this._sendRequest('stop', request.id);
        }
      } else {
        return true;
      }
    }, this);
  }
};

module.exports = RestWatch;
