// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var DocsHeader = require('./DocsHeader');
var Footer = require('grommet/components/Footer');
var Section = require('grommet/components/Section');
var Headline = require('grommet/components/Headline');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var Menu = require('grommet/components/Menu');
var Button = require('grommet/components/Button');
var Link = require('react-router').Link;
var GrommetLogo = require('grommet/components/icons/Grommet');

var HomeSection = React.createClass({
  render: function () {
    return (
      <Section {...this.props}
        appCentered={true} justify="center" align="center" full={true}
        textCentered={true} pad={{vertical: "large"}}>
        {this.props.children}
      </Section>
    );
  }
});

var Home = React.createClass({

  _onClick: function () {
    // no-op
  },

  render: function() {
    return (
      <Article className="home" scrollStep={true}>

        <DocsHeader float={true} />

        <HomeSection texture={'url(img/home_intro.png)'} primary={true}>
          <GrommetLogo large={true} a11yTitle=""/>
          <Headline large={true}>Grommet</Headline>
          <Headline small={true}>The most advanced open source UX framework for
            enterprise applications.</Headline>
        </HomeSection>

        <HomeSection colorIndex="neutral-1">
          <Headline>Create once and deliver everywhere.</Headline>
          <Headline small={true}>Application experiences that look great while solving problems.</Headline>
          <Menu direction="row" justify="center">
            <Link to="design">
              <Button label="See more examples" onClick={this._onClick} large={true} primary={true} />
            </Link>
            <Link to="develop_getstarted">
              <Button label="Test our demo app" onClick={this._onClick} large={true} />
            </Link>
          </Menu>
          <p></p>
          <img src="img/home_scale.png" alt="Tablet and Phone" />
        </HomeSection>

        <HomeSection colorIndex="neutral-2" texture={'url(img/home_features.png)'}>
          <Headline>So little gets you sooooooo much!</Headline>
          <Headline small={true}>We’ve tried it all in enterprise and we think we’ve got a good foundation.</Headline>
          <Menu direction="row" justify="center">
            <Link to="develop_architecture">
              <Button label="Our architecture" onClick={this._onClick} large={true} primary={true} />
            </Link>
            <Link to="develop_getstarted">
              <Button label="How to use" onClick={this._onClick} large={true} />
            </Link>
          </Menu>
        </HomeSection>

        <HomeSection texture={'url(img/home_design.png)'}>
          <Headline>Ready for your Design Workflow.</Headline>
          <Headline small={true}>All the resources you could possibly need! Sticker sheets, Stencils,
            PSDs, and more.</Headline>
          <Menu direction="row" justify="center">
            <Link to="design">
              <Button label="Start designing" onClick={this._onClick} large={true} primary={true} />
            </Link>
            <Link to="design_resources">
              <Button label="All resources" onClick={this._onClick} large={true} />
            </Link>
          </Menu>
          <p>or, grab your favorite sticker sheet:</p>
          <Tiles small={true} fill={true}>
            <Tile align="center">
              <img src="img/Adobe_Illustrator.png" title="Adobe Illustrator" />
              <label>Adobe Illustrator</label>
            </Tile>
            <Tile align="center">
              <img src="img/Adobe_Photoshop.png" title="Adobe Photoshop" />
              <label>Adobe Photoshop</label>
            </Tile>
            <Tile align="center">
              <img src="img/Sketch.png" title="Sketch" />
              <label>Sketch</label>
            </Tile>
            <Tile align="center">
              <img src="img/Axure.png" title="Axure" />
              <label>Axure</label>
            </Tile>
            <Tile align="center">
              <img src="img/Balsamiq.png" title="Balsamiq" />
              <label>Balsamiq</label>
            </Tile>
          </Tiles>
        </HomeSection>

        <HomeSection colorIndex="neutral-3">
          <Headline>Develop your next project with Grommet.</Headline>
          <Headline small={true}>Let’s get an application on your local environment!</Headline>
          <Menu direction="row" justify="center">
            <Link to="develop_getstarted">
              <Button label="Start project" onClick={this._onClick} large={true} primary={true} />
            </Link>
            <Link to="develop_tutorial">
              <Button label="View tutorial" onClick={this._onClick} large={true} />
            </Link>
          </Menu>
          <p>or, just copy and paste into terminal:</p>
          <div className="console">
            <h2>Hello Grommet!</h2>
            <p>
              The easiest way to learn a new framework is by writing a simple
              application on top of it. Grommet depends
              on <a href="https://nodejs.org/"
              target="_blank">Node</a> and <a href="http://gulpjs.com/"
              target="_blank">Gulp</a>.
            </p>
            <pre><code>
              {"$ npm install -g grommet\n$ grommet init sample-app"}
            </code></pre>
          </div>
        </HomeSection>

        <HomeSection>
          <Headline>Built with the best stuff.</Headline>
          <Headline small={true}>The tools you know and love, all packaged together in one
            easy-to-use solution.</Headline>
          <Menu direction="row" justify="center">
            <a href="https://github.com/HewlettPackard/grommet">
              <Button label="View project on Github" onClick={this._onClick} large={true} primary={true} />
            </a>
          </Menu>
          <p>or, check out their sites, they have some cool stuff too...</p>
          <Tiles small={true} fill={true} flush={false}>
            <Tile>
              <a href="http://www.w3.org/TR/html5/">
                <img src="img/HTML5.png" title="HTML5" />
              </a>
            </Tile>
            <Tile>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3">
                <img src="img/CSS3.png" title="CSS3" />
              </a>
            </Tile>
            <Tile>
              <a href="https://nodejs.org">
                <img src="img/NodeJS.png" title="NodeJS" />
              </a>
            </Tile>
            <Tile>
              <a href="https://github.com/inuitcss">
                <img src="img/InuitCSS.png" title="InuitCSS" />
              </a>
            </Tile>
            <Tile>
              <a href="http://facebook.github.io/react/">
                <img src="img/reactjs.png" title="ReactJS" />
              </a>
            </Tile>
            <Tile>
              <a href="http://gulpjs.com">
                <img src="img/gulp.png" title="Gulp" />
              </a>
            </Tile>
            <Tile>
              <a href="http://webpack.github.io">
                <img src="img/webpack.png" title="Webpack" />
              </a>
            </Tile>
          </Tiles>
        </HomeSection>

        <HomeSection colorIndex="neutral-2">
          <Headline>Let’s keep in touch!</Headline>
          <Headline small={true}>Follow us on the Grommet blog to get the latest updates.</Headline>
          <Menu direction="row" justify="center">
            <Link to="develop_getstarted">
              <Button label="Grommet blog" onClick={this._onClick} large={true} primary={true} />
            </Link>
          </Menu>
          <p>We also pop our heads out at these place as well...</p>
          <Tiles fill={true}>
            <Tile>
              <a href="http://grommet.io/slackin">
                <img src="img/slack.png" title="Slack" />
                <div>grommet</div>
              </a>
            </Tile>
            <Tile>
              <a href="https://twitter.com/grommetux">
                <img src="img/twitter.png" title="Twitter" />
                <div>@grommetux</div>
              </a>
            </Tile>
            <Tile>
              <a href="https://www.facebook.com/grommetux">
                <img src="img/facebook.png" title="Facebook" />
                <div>grommetux</div>
              </a>
            </Tile>
            <Tile>
              <a href="https://vimeo.com/grommetux">
                <img src="img/vimeo.png" title="Vimeo" />
                <div>grommetux</div>
              </a>
            </Tile>
            <Tile>
              <a href="http://youtube.com">
                <img src="img/youtube.png" title="Youtube" />
                <div>grommetux</div>
              </a>
            </Tile>
          </Tiles>
        </HomeSection>

        <Footer className="docs__footer"
          appCentered={true} direction="column" align="center" pad="large"
          colorIndex="grey-1">
          <h3>Build your ideas with Grommet!</h3>
          <p>
            This work is licensed under the <a href="http://creativecommons.org/licenses/by/4.0/legalcode">Creative Commons Attribution 4.0 International License</a>.
          </p>
          <Menu label="Theme">
            <a href="/docs/" className={this.props.theme === 'generic' ? 'active' : ''}>Grommet</a>
            <a href="/docs/hpe/" className={this.props.theme === 'hpe' ? 'active' : ''}>HPE</a>
            <a href="/docs/hpinc/" className={this.props.theme === 'hpinc' ? 'active' : ''}>HPInc</a>
            <a href="/docs/aruba/" className={this.props.theme === 'aruba' ? 'active' : ''}>Aruba</a>
          </Menu>
        </Footer>

      </Article>
    );
  }

});

module.exports = Home;
