// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Section = require('grommet/components/Section');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');
var Link = require('react-router').Link;
var ProcessAnimation = require('./img/ProcessAnimation');
var Semantic = require('./img/Semantic');
var MobileFirst = require('./img/MobileFirst');
var Customizable = require('./img/Customizable');
var Tooling = require('./img/Tooling');
var Console = require('./img/Console');
var NextIcon = require('grommet/components/icons/Right');

var Home = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function() {
    var assetsPath = '/docs/assets/' + __GROMMET__.version + '/';
    return (
      <div className="home">
        <Section className="home__introduction" centered={true}>
          <img className="home__logo" src="img/grommet.svg" title="Grommet" />
          <h1 className="home__title">Grommet</h1>
          <h3>The most advanced UX framework for enterprise applications.</h3>
          <Menu direction="center">
            <span>
              Grab the Grommet <a href={assetsPath + 'grommet_sticker_sheet.ai'} target="_blank">
                Sticker Sheet <NextIcon />
              </a>
            </span>
            <span>
              Check out Grommet on <a href="https://github.com/HewlettPackard/grommet" target="_blank">
                GitHub <NextIcon />
              </a>
            </span>
          </Menu>
        </Section>

        <Section className="home__scale" centered={true} colorIndex="neutral-1">
          <img className="home__scale-graphic" src="img/scale.svg" alt="Scale" />
          <h3>Grommet easily and efficiently scales your project with one code base,
            from phones to desktops, and everything in between.</h3>
          <Menu direction="left" colored={true}>
            <Link to="style guide">
              <Button label="Start Designing" onClick={this._onClick} />
            </Link>
            <Link to="doc_getstarted">
              <Button label="Start Your Project" onClick={this._onClick} />
            </Link>
          </Menu>
        </Section>

        <Section className="home__process" centered={true} colorIndex="neutral-2">
          <ProcessAnimation className="home__process-graphic"/>
          <h2>Prototype your application quickly.</h2>
          <h4>With templates for all your basic layout needs and styling already
            baked in, crafting your application happens in no time.</h4>
        </Section>

        <Section className="home__features" centered={true} colorIndex="neutral-3">
          <Tiles fill={true}>
            <Tile>
              <Semantic />
              <h2>Semantic</h2>
              <h4>Clean markup with all the utility and speed.</h4>
            </Tile>
            <Tile>
              <MobileFirst />
              <h2>Mobile First</h2>
              <h4>Start small and build your way up to larger devices.</h4>
            </Tile>
            <Tile>
              <Customizable />
              <h2>Customizable</h2>
              <h4>Only use what you need and change what you use.</h4>
            </Tile>
            <Tile>
              <Tooling />
              <h2>Tooling</h2>
              <h4>All the toys a designer and developer need to succeed.</h4>
            </Tile>
          </Tiles>

          <h2>Create Once, Deliver Everywhere</h2>
          <h4>With responsive design, it's quicker than ever to get started
            on your next big idea.</h4>
        </Section>

        <Section className="home__designer" centered={true}>
          <h2>Ready for your Design Workflow.</h2>
          <h4>All the resources you could possibly need! Sticker sheets, Stencils,
            PSDs, and more. Simply click the app you use to get started.</h4>
          <Tiles fill={true}>
            <Tile>
              <img src="img/Adobe_Illustrator.png" title="Adobe Illustrator" />
              <div>Adobe Illustrator</div>
            </Tile>
            <Tile>
              <img src="img/Adobe_Photoshop.png" title="Adobe Photoshop" />
              <div>Adobe Photoshop</div>
            </Tile>
            <Tile>
              <img src="img/Axure.png" title="Axure" />
              <div>Axure</div>
            </Tile>
            <Tile>
              <img src="img/Balsamiq.png" title="Balsamiq" />
              <div>Balsamiq</div>
            </Tile>
            <Tile>
              <img src="img/Sketch.png" title="Sketch" />
              <div>Sketch</div>
            </Tile>
          </Tiles>
        </Section>

        <Section className="home__develop" direction="right" colorIndex="neutral-1">
          <Link className="flex-1" to="doc_helloworld">
            <Console />
          </Link>
          <div className="flex-1">
            <h2>Quick Develop</h2>
            <p>The easiest way to learn a new framework is by writing a simple
              application on top of it. Grommet depends on <a href="https://nodejs.org/" target="_blank">Node</a> and <a href="http://gulpjs.com/" target="_blank">Gulp</a>.
            </p>
            <pre className="home__commands"><code>
              {"$ npm install -g grommet\n$ grommet init sample-app"}
            </code></pre>
          </div>
        </Section>

        <Section className="home__developer" centered={true}>
          <h2>Built with the best stuff.</h2>
          <h4>The tools you know and love, all packaged together in one
            easy-to-use solution.</h4>
          <Tiles small={true} fill={true}>
            <Tile>
              <img src="img/HTML5.png" title="HTML5" />
            </Tile>
            <Tile>
              <img src="img/CSS3.png" title="CSS3" />
            </Tile>
            <Tile>
              <img src="img/NodeJS.png" title="NodeJS" />
            </Tile>
            <Tile>
              <img src="img/InuitCSS.png" title="InuitCSS" />
            </Tile>
            <Tile>
              <img src="img/reactjs.png" title="ReactJS" />
            </Tile>
            <Tile>
              <img src="img/gulp.png" title="Gulp" />
            </Tile>
            <Tile>
              <img src="img/webpack.png" title="Webpack" />
            </Tile>
            <Tile>
              <img src="img/GitHub.png" title="GitHub" />
            </Tile>
          </Tiles>
        </Section>

        <RouteHandler />
      </div>
    );
  }

});

module.exports = Home;
