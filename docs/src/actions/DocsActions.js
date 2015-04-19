var Constants = require('../constants/AppConstants');
var Api = require('grommet/utils/api');

module.exports = {
  requestAccess: function(data) {
    Api.post(Constants.ActionTypes.REQUEST_ACCESS, '/rest/request-access', data, data);
  }
};