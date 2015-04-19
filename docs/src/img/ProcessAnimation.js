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
              <g className="process-animation__code">
                <rect opacity="1" fill="#000000" x="0" y="0" width="720" height="480"></rect>
                <text fontFamily="Source Sans Pro" fontSize="20" fontWeight="normal" fill="#CCCCCC">
                  <tspan x="24" y="44">&lt;Grommet.App&gt;</tspan>
                  <tspan x="24" y="69">	   &lt;Header&gt;</tspan>
                  <tspan x="24" y="94">		     &lt;h1&gt;My Application&lt;/h1&gt;</tspan>
                  <tspan x="24" y="119">		   &lt;Menu&gt;</tspan>
                  <tspan x="24" y="144">		       &lt;Session /&gt;</tspan>
                  <tspan x="24" y="169">		   &lt;/Menu&gt;</tspan>
                  <tspan x="24" y="194">	  &lt;/Header&gt;</tspan>
                  <tspan x="24" y="219">	  &lt;Tiles&gt;</tspan>
                  <tspan x="24" y="244">		    &lt;Tile&gt;</tspan>
                  <tspan x="24" y="269">			      &lt;Donut /&gt;</tspan>
                  <tspan x="24" y="294">		    &lt;/Tile&gt;</tspan>
                  <tspan x="24" y="319">		    &lt;Tile&gt;</tspan>
                  <tspan x="24" y="344">			      ...</tspan>
                  <tspan x="24" y="369">		    &lt;/Tile&gt;</tspan>
                  <tspan x="24" y="394">	  &lt;/Tiles&gt;</tspan>
                  <tspan x="24" y="419">&lt;/Grommet.App&gt;</tspan>
                </text>
              </g>
              <g className="process-animation__final" >
                <rect id="Rectangle-5" fill="#FFFFFF" x="0" y="0" width="720" height="480"></rect>
                <text id="My-Application" fontFamily="Source Sans Pro" fontSize="48" fontWeight="526" fill="#000000">
                  <tspan x="49" y="75">My Application</tspan>
                </text>
                <g className="final-text" transform="translate(410.000000, 194.000000)">
                  <text id="The-coffee-pot-needs" fontFamily="Source Sans Pro" fontSize="16" fontWeight="normal" fill="#000000">
                    <tspan x="21" y="16">The coffee pot needs to be cleaned.</tspan>
                    <tspan x="21" y="36"></tspan>
                    <tspan x="21" y="56">It’s going to be a sunny day </tspan>
                    <tspan x="21" y="76">tomorrow.</tspan>
                    <tspan x="21" y="96"></tspan>
                    <tspan x="21" y="116">Don’t forget your anniversary in two </tspan>
                    <tspan x="21" y="136">weeks.</tspan>
                  </text>
                  <g className="status-error" transform="translate(0.000000, 7.000000)" fill="#DC462F">
                    <circle id="Oval" cx="4" cy="4" r="4"></circle>
                  </g>
                  <g className="status-normal" transform="translate(0.000000, 47.000000)" fill="#43A547">
                    <rect id="Rectangle-path" x="0" y="0" width="8" height="8"></rect>
                  </g>
                  <g className="status-warning" transform="translate(0.000000, 107.000000)" fill="#F3B51D">
                    <path d="M0,9 L5,0 L10,9 L0,9 Z" id="Shape"></path>
                  </g>
                </g>
                <g className="final-donut" transform="translate(122.000000, 209.000000)">
                  <g id="Group">
                    <path className="status-error" d="M92.1338481,0.778554501 C88.4452163,0.260151111 84.7248821,0 81,0" stroke="#DC442F" strokeWidth="40"></path>
                    <path className="status-warning" d="M116.069692,8.0964763 C109.365713,4.82672731 102.237397,2.5105972 94.8918542,1.21537976" id="Shape" stroke="#F4B51E" strokeWidth="20"></path>
                    <path className="status-normal"d="M78.2080403,0.0487338385 C38.0860059,1.44982615 5.21617473,32.3706757 1.36830413,72.3323398 C-2.47956647,112.294004 23.8863771,148.91861 63.0039157,157.949605 C102.121454,166.980601 141.874178,145.620692 155.933775,108.016591 C169.993372,70.4124893 154.004972,28.2118282 118.557725,9.36419257" id="Shape" stroke="#42A425" strokeWidth="20"></path>
                  </g>
                  <text id="2" fontFamily="Source Sans Pro" fontSize="72" fontWeight="normal" lineSpacing="89" fill="#000000">
                    <tspan x="64" y="93">2</tspan>
                    <tspan x="60" y="122" fontSize="16" lineSpacing="16">errors</tspan>
                  </text>
                </g>
                <path d="M631.250593,63.205 C624.148593,63.205 618.394593,56.307 618.394593,47.804 C618.394593,39.302 624.148593,33 631.250593,33 C638.353593,33 644.112593,39.302 644.112593,47.804 C644.112593,56.307 638.353593,63.205 631.250593,63.205 L631.250593,63.205 Z M611.252593,84.025 C611.252593,84.025 608.525593,84.205 607.324593,82.55 C606.675593,81.656 607.127593,79.844 607.571593,78.833 L608.658593,76.356 C608.658593,76.356 611.664593,69.633 615.086593,65.737 C617.188593,63.348 619.688593,63.892 621.305593,64.669 C622.301593,65.147 623.427593,66.54 624.250593,67.278 C625.384593,68.295 627.386593,69.451 630.659593,69.516 L632.667593,69.516 C635.938593,69.451 637.940593,68.295 639.073593,67.278 C639.895593,66.54 640.990593,65.104 641.977593,64.61 C643.461593,63.867 645.720593,63.41 647.767593,65.737 C651.190593,69.633 653.901593,76.478 653.901593,76.478 L655.015593,78.907 C655.476593,79.911 655.948593,81.714 655.317593,82.62 C654.191593,84.24 651.663593,84.025 651.663593,84.025 L611.252593,84.025 L611.252593,84.025 Z" fill="#999999"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  }

});

module.exports = ProcessAnimation;
