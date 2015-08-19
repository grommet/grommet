// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var theme = module.exports = {};

theme.picker = function( ip ) {
  var theme;

  //
  // Automatically detect the them based on the requestor's IP
  // with the following network address assumptions. 
  // HPInc theme:   15.0.0.0 - 15.103.255.255
  // HPE theme:     15.104.0.0 - 16.x.x.x
  // Grommet theme: anything else
  //
  // Generated these regex using http://www.analyticsmarket.com/freetools/ipregex
  //
  if( ip.match(/^15\.([0-9]|[1-9][0-9]|1(0[0-3]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))$/) ) {
  	theme = "hpinc";
  }
  else if ( ip.match(/^16\./) ||
  			ip.match(/^15\.(1(0[4-9]|[1-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))\.([0-9]|[1-9][0-9]|1([0-9][0-9])|2([0-4][0-9]|5[0-5]))$/) ) {
    theme = "hpe";
	
  }
  else {
  	theme = "";
  }

  return theme;
}
