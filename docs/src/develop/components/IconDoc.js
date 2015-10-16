// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var DocsArticle = require('../../DocsArticle');
var Header = require('grommet/components/Header');
var SearchInput = require('grommet/components/SearchInput');
var Tiles = require('grommet/components/Tiles');
var Tile = require('grommet/components/Tile');
var iconsMap = require('./iconsMap');
var iconNames = Object.keys(iconsMap);

//hjjs configuration
var hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));

var IconDoc = React.createClass({

  getInitialState: function () {
    return {
      value: '',
      inputData: '',
      icons: iconNames,
      pageIndex: 1
    };
  },

  componentDidMount: function () {
    this._highlightCode();
  },

  componentDidUpdate: function () {
    this._highlightCode();
  },

  _onChange: function (value) {
    var icons = iconNames.filter(function (icon) {
      return icon.match(value);
    });

    this.setState({
      value: value,
      inputData: value,
      icons: icons,
      pageIndex: 1
    });
  },

  _highlightCode: function () {
    var domNode = this.getDOMNode();
    var nodes = domNode.querySelectorAll('pre code');
    for (var i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i]);
    }
  },

  _onIconSelect: function (e) {
    var parentNode = e.currentTarget;
    var textNode = parentNode.getElementsByTagName('span')[0];

    this.setState({value: textNode.textContent});
  },

  _onMoreIcons: function () {
    var pageIndex = this.state.pageIndex;
    this.setState({pageIndex: pageIndex + 1});
  },

  render: function() {
    var componentName = (this.state.value || '$iconName')
      .replace(/^(.)|-([a-z])/g, function (g) {
        return g.length > 1 ? g[1].toUpperCase() : g.toUpperCase();
      });

    var inline = [
      "var " + componentName + " = require('grommet/components/icons/base/" + componentName + "');",
      "//or var " + componentName + " = Grommet.Icons.Base." + componentName,
      "<" + componentName + " />"
    ].join("\n");

    var endIndex = this.state.pageIndex * 50;
    var currentIcons = this.state.icons.slice(0, endIndex);
    var tiles = currentIcons.map(function (iconName, index) {

      var iconText = iconName.replace(this.state.inputData, function (g) {
        return g ? '<strong>' + g + '</strong>' : '';
      });

      var IconInstance = iconsMap[iconName];
      return (
        <Tile key={'tile_' + index} direction="row"
          align="start" justify="start">
          <div onClick={this._onIconSelect}>
            <IconInstance />
            <span dangerouslySetInnerHTML={{__html: iconText}} />
          </div>
        </Tile>
      );
    }.bind(this));

    var moreIcons;
    if (this.state.icons.length > 50 &&
      endIndex < this.state.icons.length) {
      moreIcons = this._onMoreIcons;
    }

    var Icon;
    if (iconsMap.hasOwnProperty(this.state.value)) {
      Icon = iconsMap[this.state.value];
    } else {
      Icon = iconsMap.cloud; // just picking one as an example
    }

    return (
      <DocsArticle title="Icon" colorIndex="neutral-3">

        <p>Load icons inside your Grommet application.</p>
        <pre><code className="html hljs xml">{inline}</code></pre>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>colorIndex   {"{category}-{index}"}</code></dt>
            <dd>The color identifier to use for the stroke color.
              For example: <code>"brand"</code></dd>
            <dt><code>iconName     string</code></dt>
            <dd>Name of the icon (e.g. 'SocialGithub').</dd>
            <dt><code>large        true|false</code></dt>
            <dd>Larger sized version.</dd>
          </dl>
        </section>

        <section>
          <h2>Examples</h2>

          <h3>Default</h3>
          <div className="example">
            <Icon />
          </div>
          <pre><code className="html hljs xml">{"<SomeIcon /> ..."}</code></pre>

          <h3>Large, colored</h3>
          <div className="example">
            <Icon large={true} colorIndex="brand" />
          </div>
          <pre><code className="html hljs xml">{"<SomeIcon large={true} colorIndex=\"brand\" /> ..."}</code></pre>

        </section>

        <section>
          <Header tag="h2">
            Icons
            <SearchInput id="iconSearchInput" name="iconSearchInput"
              onChange={this._onChange} value={this.state.inputData} />
          </Header>
          <Tiles flush={true} onMore={moreIcons}>
            {tiles}
          </Tiles>
        </section>

      </DocsArticle>
    );
  }
});

module.exports = IconDoc;
