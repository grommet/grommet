// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var Develop = React.createClass({

  render: function() {
    var className = 'icon-design';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" version="1.1">
        <g stroke="none">
          <title>Documentation</title>
          <path d="M2.1,13.8l1.1,7.6h17.7l1.1-7.6H2.1z M12.5,18.3h-1.3v-3.2h1.3V18.3z"/>
          <polygon points="6.7,7.2 4.9,8.2 4.8,9 2.5,10.4 0.9,7.7 3.2,6.3 3.9,6.6 9.6,3.2 11.9,4 8.4,6.2 12.2,12.5
            12.9,12.5 9.2,6.4 13.4,3.8 9.6,2.5 3.9,5.9 3.1,5.7 0,7.5 2.3,11.3 5.4,9.4 5.5,8.6 6.4,8 9.1,12.5 9.9,12.5   "/>
          <g>
            <path d="M17.8,10.2c1.2,0.3,2.4,0,3.3-1c0.9-0.9,1-2.2,0.6-3.4l-1.7,1.8H18l-0.3-2.1l1.6-1.8
              c-1.1-0.3-2.4,0.1-3.2,1c-0.8,0.9-1,2.2-0.7,3.3l-4,4.5h4.2L17.8,10.2z"/>
          </g>
        </g>
      </svg>
    );
  }

});

module.exports = Develop;
