// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var express = require('express');
var router = express.Router();
var data = require('./data');
var generator = require('./generator');
var filter = require('./filter');
var map = require('./map');
var nodemailer = require('nodemailer');
var path = require('path');
var templatesDir = path.resolve(__dirname, 'templates');
var emailTemplates = require('email-templates');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

generator.generate();

router.post('/login-sessions', function(req, res) {
  if ('error' === req.body.userName) {
    res.status(400).send({
      message: "Invalid username or password or directory.",
      recommendedActions: "Enter correct credentials and try again." +
        " To obtain a username or password, contact your security administrator."
    });
  } else {
    res.json({
      sessionID: 'abc123'
    });
  }
});

router.delete('/login-sessions', function(req, res) {
  res.json(null);
});

function handleEmailResponse(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info.response);
  }
}

router.post('/request-access', function(req, res) {

  var data = req.body;

  if (!data.name || !data.email || !data.businessPurpose) {
    res.status(400).send({
      message: "Invalid payload.",
      recommendedActions: "Enter name, email, and businessPurpose and try again."
    });
  }

  var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp1.hp.com',
    port: 25
  }));

  var toGrommetConfig = {
    from: data.email,
    to: 'uxgroup@hp.com',
    subject: 'Evaluate access for ' + data.email,
    text: data.name + ' with this email: ' + data.email + ' wants to access Grommet for this reason: ' + data.businessPurpose
  };

  emailTemplates(templatesDir, function(err, template) {
    if (err) {
      console.log(err);
    } else {
      template('welcome', data, function(err, html, text) {
        if (err) {
          console.log(err);
        } else {
          var toRequesterConfig = {
            from: 'grommet@hp.com',
            to: data.email,
            subject: 'Welcome to Grommet!',
            text: text,
            html: html
          };

          transport.sendMail(toRequesterConfig, handleEmailResponse);
        }
      });
    }
  });

  transport.sendMail(toGrommetConfig, handleEmailResponse);

  res.sendStatus(200);
});

router.get('/index/resources/aggregated', function(req, res) {
  var members = data.getMembers(req.query.category) || [];

  if (req.query.userQuery) {
    members = filter.filterUserQuery(members, req.query.userQuery);
  }

  if (req.query.query) {
    members = filter.filterQuery(members, req.query.query);
  }

  var attributes;
  if (Array.isArray(req.query.attribute)) {
    attributes = req.query.attribute;
  } else {
    attributes = [req.query.attribute];
  }
  var result = attributes.map(function(attribute) {
    return {
      attribute: attribute,
      counts: []
    };
  });

  members.some(function(resource) {
    result.forEach(function(attributeResult) {
      var value;
      if (resource.hasOwnProperty(attributeResult.attribute)) {
        value = resource[attributeResult.attribute];
      } else if (resource.attributes &&
        resource.attributes.hasOwnProperty(attributeResult.attribute)) {
        value = resource.attributes[attributeResult.attribute];
      }
      if (undefined !== value) {
        var counts = attributeResult.counts;
        var found = false;
        for (var i = 0; i < counts.length; i++) {
          if (value === counts[i].value) {
            counts[i].count += 1;
            found = true;
            break;
          }
        }
        if (!found) {
          counts.push({
            value: value,
            count: 1
          });
        }
      }
    });
  });

  res.json(result);
});

router.get('/index/resources', function(req, res) {
  var members = data.getMembers(req.query.category);
  var unfilteredTotal = members.length;

  if (req.query.userQuery) {
    members = filter.filterUserQuery(members, req.query.userQuery);
  }

  if (req.query.query) {
    members = filter.filterQuery(members, req.query.query);
  }

  if (req.query.sort) {
    filter.sort(members, req.query.sort);
  }

  var startIndex = req.query.start;
  if (req.query.referenceUri) {
    members.some(function(member, index) {
      if (req.query.referenceUri === member.uri) {
        startIndex = Math.max(index - 3, 0);
        return true;
      }
    });
  }

  // prune for start+count
  var total = members.length;
  members = members.slice(startIndex, startIndex + req.query.count);

  res.json({
    category: req.query.category,
    start: startIndex,
    count: members.length,
    total: total,
    unFilteredTotal: unfilteredTotal,
    members: members
  });
});

router.get(/^\/index\/trees\/aggregated(.+)$/, function(req, res) {
  var uri = req.params[0];
  res.json(map.build(uri));
});

router.get('/:categoryName/*', function(req, res) {
  var resource = data.getResource('/rest' + req.url);
  if (resource) {
    res.json(resource);
  } else {
    res.status(404).send();
  }
});

router.post('/:categoryName', function(req, res) {
  var categoryName = req.params.categoryName;
  var now = new Date();

  var resource = _.extend({
    category: categoryName,
    uri: '/rest/' + categoryName + '/' + now.getTime(),
    status: 'OK',
    state: 'Normal',
    created: now.toISOString(),
    modified: now.toISOString()
  }, req.body);
  data.addResource(categoryName, resource);

  var task = {
    category: 'tasks',
    uri: '/rest/tasks/' + now.getTime(),
    name: 'Add',
    status: 'Unknown',
    state: 'Running',
    attributes: {
      associatedResourceUri: resource.uri,
      associatedResourceName: resource.name,
      associatedResourceCategory: categoryName,
      hidden: false
    },
    created: now.toISOString(),
    modified: now.toISOString()
  };
  data.addResource('tasks', task);

  setTimeout(function() {
    task.status = 'OK';
    task.state = 'Completed';
    task.modified = (new Date()).toISOString();
  }, 10000);

  res.json({
    taskUri: task.uri
  });
});

module.exports = router;