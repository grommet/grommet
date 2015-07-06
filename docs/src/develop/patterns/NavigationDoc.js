// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Sidebar = require('grommet/components/Sidebar');
var Header = require('grommet/components/Header');
var Footer = require('grommet/components/Footer');
var Title = require('grommet/components/Title');
var Menu = require('grommet/components/Menu');
var CloseIcon = require('grommet/components/icons/Clear');
var Gravatar = require('react-gravatar');
var Search = require('grommet/components/Search');

var NavigationDoc = React.createClass({
  render: function() {
    return (
      <Article>
        <header>
          <h1>Navigation</h1>
        </header>

        <section>
          <h2>Primary menu</h2>

          <p>A primary navigation menu provides top level navigation to sub-areas
          of the application. When real estate allows, it can remain open
          for quick, frequent access.</p>

          <div className="example">
            <Sidebar primary={true}>
              <Header large={true} flush={false}>
                <Title>
                  <span>App</span>
                </Title>
                <Menu>
                  <div>
                    <CloseIcon />
                  </div>
                </Menu>
              </Header>
              <Menu direction="column" flush={false}>
                <a>First area</a>
                <a>Second area</a>
                <a>Third area</a>
              </Menu>
              <Footer>
                <Menu icon={<Gravatar email="" default="mm" />} dropAlign={{bottom: 'bottom'}}>
                  <a>Logout</a>
                </Menu>
              </Footer>
            </Sidebar>
          </div>
        </section>

        <section>
          <h2>Search</h2>

          <p>Search is both a primary navigation capability from the dashboard page
          and an integral part of reducing content lists to enable simple navigation
          to a particular item.</p>

          <div className="example">
            <Header>
              <span>
                <Title>App</Title>
                <Search inline={true} />
              </span>
              <Menu>
                <Gravatar email="" default="mm" />
              </Menu>
            </Header>
          </div>
        </section>

      </Article>
    );
  }
});

module.exports = NavigationDoc;
