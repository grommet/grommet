// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
    host: 'url/to/stmp',
    port: 25
  }));

  var toGrommetConfig = {
    from: data.email, 
    to: 'asouza@hp.com', 
    subject: 'Evaluate access to ' + data.email,
    text: data.name + ' with this email: '+ data.email + ' want to access Grommet for this reason: '+ data.businessPurpose
  };

  var toRequesterConfig = {
    from: 'grommet@hp.com', 
    to: data.email, 
    subject: 'Welcome to Grommet!',
    text: 'Thanks for signing-up for early access to Grommet. We are going evaluate your request and will get back to you soon.'
  };

  transport.sendMail(toGrommetConfig, handleEmailResponse);
  transport.sendMail(toRequesterConfig, handleEmailResponse);

  res.sendStatus(200);
});

module.exports = router;