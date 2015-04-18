// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var ProcessAnimation = React.createClass({
  render: function() {
    var classes = ["process-animation"];
    if (this.props.className) {
      classes.push(this.props.className);
    }
    return (
      <div className={classes.join(' ')}>
        <div className="process-animation__paper">
          <svg className="process-animation__drawing" viewBox="0 0 720 480">
            <g stroke="none" strokeWidth="1" strokeLinecap="round" fill="none" fillRule="evenodd">
              <g className="process-animation__grid">
                <g className="process-animation__grid-columns" stroke="#2AD2C9" strokeLinecap="square">
                  <path d="M1,0 L1,480" className="process-animation__grid-column-1"></path>
                  <path d="M24,0 L24,480" className="process-animation__grid-column-2" ></path>
                  <path d="M96,0 L96,480" className="process-animation__grid-column-3" ></path>
                  <path d="M120,0 L120,480" className="process-animation__grid-column-4" ></path>
                  <path d="M192,0 L192,480" className="process-animation__grid-column-5" ></path>
                  <path d="M216,0 L216,480" className="process-animation__grid-column-6" ></path>
                  <path d="M288,0 L288,480" className="process-animation__grid-column-7" ></path>
                  <path d="M312,0 L312,480" className="process-animation__grid-column-8" ></path>
                  <path d="M384,0 L384,480" className="process-animation__grid-column-9" ></path>
                  <path d="M408,0 L408,480" className="process-animation__grid-column-10" ></path>
                  <path d="M480,0 L480,480" className="process-animation__grid-column-11" ></path>
                  <path d="M504,0 L504,480" className="process-animation__grid-column-12" ></path>
                  <path d="M576,0 L576,480" className="process-animation__grid-column-13" ></path>
                  <path d="M600,0 L600,480" className="process-animation__grid-column-14" ></path>
                  <path d="M672,0 L672,480" className="process-animation__grid-column-15" ></path>
                  <path d="M696,0 L696,480" className="process-animation__grid-column-16" ></path>
                  <path d="M719,0 L719,480" className="process-animation__grid-column-17" ></path>
                </g>
                <g className="process-animation__grid-rows" stroke="#2AD2C9" strokeLinecap="square">
                  <path d="M0,1 L720,1" className="process-animation__grid-row-1" ></path>
                  <path d="M0,24 L720,24" className="process-animation__grid-row-2" ></path>
                  <path d="M0,96 L720,96" className="process-animation__grid-row-3" ></path>
                  <path d="M0,120 L720,120" className="process-animation__grid-row-4" ></path>
                  <path d="M0,192 L720,192" className="process-animation__grid-row-5" ></path>
                  <path d="M0,216 L720,216" className="process-animation__grid-row-6" ></path>
                  <path d="M0,288 L720,288" className="process-animation__grid-row-7" ></path>
                  <path d="M0,312 L720,312" className="process-animation__grid-row-8" ></path>
                  <path d="M0,384 L720,384" className="process-animation__grid-row-9" ></path>
                  <path d="M0,408 L720,408" className="process-animation__grid-row-10" ></path>
                  <path d="M0,456 L720,456" className="process-animation__grid-row-11" ></path>
                  <path d="M0,479 L720,479" className="process-animation__grid-row-12" ></path>
                </g>
              </g>
              <g className="process-animation__rough">
                <rect className="process-animation__rough-header" stroke="#9B9B9B" strokeLinecap="round"  x="0" y="0" width="672" height="74"></rect>
                <rect className="process-animation__rough-left-pane" stroke="#9B9B9B"  x="0" y="0" width="360" height="336"></rect>
                <rect className="process-animation__rough-right-pane" stroke="#9B9B9B" x="0" y="0" width="288" height="336"></rect>
                <path d="M60,60 L300,60" className="process-animation__rough-title" stroke="#4A4A4A" strokeWidth="6" ></path>
                <circle className="process-animation__rough-avatar" stroke="#4A4A4A" strokeWidth="6"  cx="630" cy="60" r="24"></circle>
                <circle className="process-animation__rough-donut" stroke="#4A4A4A" strokeWidth="6"  cx="204" cy="288" r="132"></circle>
                <g className="process-animation__rough-text" strokeWidth="6" stroke="#4A4A4A">
                  <path d="M444,168 L660,168" className="process-animation__rough-text-1" ></path>
                  <path d="M444,240 L660,240" className="process-animation__rough-text-2"></path>
                  <path d="M444,312 L660,312" className="process-animation__rough-text-3"></path>
                  <path d="M444,384 L660,384" className="process-animation__rough-text-4"></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

});

module.exports = ProcessAnimation;
