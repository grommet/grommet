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
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g className="process-animation__grid">
                <g className="process-animation__grid-columns" stroke="#2AD2C9" strokeLinecap="square">
                  <path d="M1,0 L1,480" className="process-animation__grid-column-1"></path>
                  <path d="M60,0 L60,480" className="process-animation__grid-column-2" ></path>
                  <path d="M120,0 L120,480" className="process-animation__grid-column-3" ></path>
                  <path d="M180,0 L180,480" className="process-animation__grid-column-4" ></path>
                  <path d="M240,0 L240,480" className="process-animation__grid-column-5" ></path>
                  <path d="M300,0 L300,480" className="process-animation__grid-column-6" ></path>
                  <path d="M360,0 L360,480" className="process-animation__grid-column-7" ></path>
                  <path d="M420,0 L420,480" className="process-animation__grid-column-8" ></path>
                  <path d="M480,0 L480,480" className="process-animation__grid-column-9" ></path>
                  <path d="M540,0 L540,480" className="process-animation__grid-column-10" ></path>
                  <path d="M600,0 L600,480" className="process-animation__grid-column-11" ></path>
                  <path d="M660,0 L660,480" className="process-animation__grid-column-12" ></path>
                  <path d="M719,0 L719,480" className="process-animation__grid-column-13" ></path>
                </g>
                <g className="process-animation__grid-rows" stroke="#2AD2C9" strokeLinecap="square">
                  <path d="M0,1 L720,1" className="process-animation__grid-row-1" ></path>
                  <path d="M0,60 L720,60" className="process-animation__grid-row-2" ></path>
                  <path d="M0,120 L720,120" className="process-animation__grid-row-3" ></path>
                  <path d="M0,180 L720,180" className="process-animation__grid-row-4" ></path>
                  <path d="M0,240 L720,240" className="process-animation__grid-row-5" ></path>
                  <path d="M0,300 L720,300" className="process-animation__grid-row-6" ></path>
                  <path d="M0,360 L720,360" className="process-animation__grid-row-7" ></path>
                  <path d="M0,420 L720,420" className="process-animation__grid-row-8" ></path>
                  <path d="M0,479 L720,479" className="process-animation__grid-row-9" ></path>
                </g>
              </g>
              <g className="process-animation__rough">
                <rect className="process-animation__rough-header" stroke="#9B9B9B" strokeLinecap="round"  x="0" y="0" width="672" height="74"></rect>
                <rect className="process-animation__rough-left-pane" stroke="#9B9B9B"  x="0" y="0" width="312" height="312"></rect>
                <rect className="process-animation__rough-right-pane" stroke="#9B9B9B" x="0" y="0" width="312" height="312"></rect>
                <path d="M60,60 L300,60" className="process-animation__rough-title" stroke="#4A4A4A" strokeWidth="6" ></path>
                <circle className="process-animation__rough-avatar" stroke="#4A4A4A" strokeWidth="6"  cx="630" cy="60" r="24"></circle>
                <circle className="process-animation__rough-donut" stroke="#4A4A4A" strokeWidth="6"  cx="180" cy="300" r="120"></circle>
                <g className="process-animation__rough-text" strokeWidth="6" stroke="#4A4A4A">
                  <path d="M420,180 L660,180" className="process-animation__rough-text-1" ></path>
                  <path d="M420,240 L660,240" className="process-animation__rough-text-2"></path>
                  <path d="M420,300 L660,300" className="process-animation__rough-text-3"></path>
                  <path d="M420,360 L660,360" className="process-animation__rough-text-4"></path>
                  <path d="M420,420 L660,420" className="process-animation__rough-text-5"></path>
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
