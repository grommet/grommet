// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Logo = require('./img/Logo');
var Section = require('grommet/components/Section');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Menu = require('grommet/components/Menu');
var Link = require('react-router').Link;
var Scale = require('./img/Scale');
var ProcessAnimation = require('./img/ProcessAnimation');
var Semantic = require('./img/Semantic');
var MobileFirst = require('./img/MobileFirst');
var Customizable = require('./img/Customizable');
var Tooling = require('./img/Tooling');

var Home = React.createClass({

  render: function() {

  //var texture = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAADRJREFUSA1j/PHjx38GGgImGpo9TIxmHI2DAY/J0TgY8ChgGI2D0TgY+BAYeBeM5oOBjwMAZNAXfV/JDF0AAAAASUVORK5CYII=)";

    return (
      <div className="home">

        <Section className="home__introduction" centered={true}>
          <Logo className="home__logo" />
          <h1 className="home__title">Grommet</h1>
          <h3>The most advanced UI framework for enterprise applications.</h3>
          <Menu direction="left">
            <span>Grab the Grommet <a>Sticker Sheet</a></span>
            <span>Check out Grommet on <a>GitHub</a></span>
          </Menu>
        </Section>

        <Section className="home__scale" centered={true} colorIndex={1}>
          <Scale className="home__scale-graphic" />
          <h3>Grommet easily and efficiently scales your project with one code base,
            from phones to desktops, and everything in between.</h3>
          <Menu direction="left" colored={true}>
            <Link to="style guide" className="button">Start Designing</Link>
            <Link to="doc_getstarted" className="button">Start your Project</Link>
          </Menu>
        </Section>

        <Section className="home__process" centered={true} colorIndex={2}>
          <ProcessAnimation className="home__process-graphic"/>
          <h2>Prototype your template quickly.</h2>
          <h4>With templates for all your basic layout needs and styling already
            baked in, crafting your application happens in no time.</h4>
        </Section>

        <Section className="home__features" centered={true} colorIndex={3}>
          <Tiles>
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
          <h2>Ready for you Design Workflow.</h2>
          <h4>All the resources you could possibly need! Sticker sheets, Stencils,
            PSDs, and more. Simply click the app you use to get started.</h4>
          <Tiles>
            <Tile>
              <img src="img/Adobe_Illustrator.svg" alt="Adobe Illustrator" />
              <p>Adobe Illustrator</p>
            </Tile>
            <Tile>
              <img src="img/Adobe_Photoshop.svg" alt="Adobe Photoshop" />
              <p>Adobe Photoshop</p>
            </Tile>
            <Tile>
              <img src="img/Axure.png" alt="Axure" />
              <p>Axure</p>
            </Tile>
            <Tile>
              <img src="img/Balsamiq.png" alt="Balsamiq" />
              <p>Balsamiq</p>
            </Tile>
            <Tile>
              <img src="img/Sketch.png" alt="Sketch" />
              <p>Sketch</p>
            </Tile>
          </Tiles>
        </Section>

        <Section className="home__develop" direction="right" colorIndex={1}>
          <img src="img/Console.svg" alt="Console" />
          <div>
            <h2>Quick Develop</h2>
            <p>The easiest way to learn a new framework is by writing a simple
              application on top of it. Grommet depends on Node and NPM.
              It's installed globally using NPM.</p>
            <pre className="home__commands"><code>
              {"$ npm install -g grommet\n$ grommet init myNewApp"}
            </code></pre>
          </div>
        </Section>

        <Section className="home__developer" centered={true}>
          <h2>Built with the best stuff.</h2>
          <h4>The tools you know and love, all packaged together in one
            easy-to-use solution.</h4>
          <Tiles small={true}>
            <Tile>
              <img src="img/HTML5.svg" alt="HTML5" />
            </Tile>
            <Tile>
              <img src="img/CSS3.svg" alt="CSS3" />
            </Tile>
            <Tile>
              <img src="img/NodeJS.png" alt="NodeJS" />
            </Tile>
            <Tile>
              <img src="img/InuitCSS.png" alt="InuitCSS" />
            </Tile>
            <Tile>
              <img src="img/reactjs.png" alt="ReactJS" />
            </Tile>
            <Tile>
              <img src="img/gulp.png" alt="Gulp" />
            </Tile>
            <Tile>
              <img src="img/webpack.png" alt="Webpack" />
            </Tile>
            <Tile>
              <img src="img/GitHub.png" alt="GitHub" />
            </Tile>
          </Tiles>
        </Section>

        <RouteHandler />
      </div>
    );
  }

});

module.exports = Home;
