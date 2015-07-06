// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var express = require('express');
var router = express.Router();
var ldap = require('ldapjs');

var client;
var timer;

router.get("/", function(req, res) {
  //console.log('!!! ldap', req.query);

  if (! client) {
    client = ldap.createClient({
      url: req.query.url
    });
  }

  var options = {
    scope: req.query.scope || 'sub',
    filter: req.query.filter,
    attributes: req.query.attributes,
    sizeLimit: req.query.limit || 20
  };

  client.search(req.query.base, options, function (ldapErr, ldapRes) {
    var entries = [];
    if (ldapErr) {
      console.log('client error:', ldapErr);
      client.unbind();
      client = null;
    } else {
      ldapRes.on('searchEntry', function (entry) {
        //console.log('entry: ', JSON.stringify(entry.object));
        entries.push(entry.object);
      });
      ldapRes.on('searchReference', function( referral) {
        //console.log('referral: ', referral.uris.join());
      });
      ldapRes.on('error', function (err) {
        console.log('error:', err.message, ' have ', entries.length);
        res.send(entries);
      });
      ldapRes.on('end', function (result) {
        //console.log('status: ', result.status, ' have ', entries.length);
        res.send(entries);
      });
    }
  });

  // If we're idle for more than 30 seconds. Clean up and start fresh.
  clearTimeout(timer);
  timer = setTimeout(function () {
    //console.log('client cleanup');
    client.unbind();
    client = null;
  }, 30000);
});

module.exports = router;
