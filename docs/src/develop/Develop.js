// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var DocsSplit = require('../DocsSplit');
var DocsArticle = require('../DocsArticle');
var DocsHtmlArticle = require('../DocsHtmlArticle');
var Menu = require('grommet/components/Menu');
var Anchor = require('grommet/components/Anchor');

var HelloWorld = require('./HelloWorld');
var Tutorial = require('./Tutorial');
var ModularGrommet = require('./ModularGrommet');
var GetStarted = require('./GetStarted');
var Architecture = require('./Architecture');
var Integration = require('./Integration');
var Accessibility = require('./Accessibility');

var ActionsDoc = require('./patterns/ActionsDoc');
var AnchorDoc = require('./components/AnchorDoc');
var AppDoc = require('./components/AppDoc');
var ArticleDoc = require('./components/ArticleDoc');
var BoxDoc = require('./components/BoxDoc');
var ButtonDoc = require('./components/ButtonDoc');
var CalendarDoc = require('./components/CalendarDoc');
var CarouselDoc = require('./components/CarouselDoc');
var ChartDoc = require('./components/ChartDoc');
var CheckBoxDoc = require('./components/CheckBoxDoc');
var DashboardDoc = require('./patterns/DashboardDoc');
var DistributionDoc = require('./components/DistributionDoc');
var FooterDoc = require('./components/FooterDoc');
var FormDoc = require('./components/FormDoc');
var FormFieldDoc = require('./components/FormFieldDoc');
var HeaderDoc = require('./components/HeaderDoc');
var IconDoc = require('./components/IconDoc');
var LayerDoc = require('./components/LayerDoc');
var ListDoc = require('./components/ListDoc');
var LoginFormDoc = require('./components/LoginFormDoc');
var MapDoc = require('./components/MapDoc');
var MenuDoc = require('./components/MenuDoc');
var MeterDoc = require('./components/MeterDoc');
var NavigationDoc = require('./patterns/NavigationDoc');
var ParagraphDoc = require('./components/ParagraphDoc');
var RadioButtonDoc = require('./components/RadioButtonDoc');
var RestDoc = require('./utils/RestDoc');
var RestWatchDoc = require('./utils/RestWatchDoc');
var SearchDoc = require('./components/SearchDoc');
var SearchInputDoc = require('./components/SearchInputDoc');
var SectionDoc = require('./components/SectionDoc');
var SidebarDoc = require('./components/SidebarDoc');
var SplitDoc = require('./components/SplitDoc');
var StatusDoc = require('./components/StatusDoc');
var TabsDoc = require('./components/TabsDoc');
var TableDoc = require('./components/TableDoc');
var TilesDoc = require('./components/TilesDoc');
var TitleDoc = require('./components/TitleDoc');
var TopologyDoc = require('./components/TopologyDoc');

//hjjs configuration
var hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));

var CONTENTS = [
  {label: 'Guides',
    contents: [
      {route: 'develop_helloworld', label: 'Hello World',
        component: DocsHtmlArticle.wrap(HelloWorld, 'neutral-1')},
      {route: 'develop_getstarted', label: 'Get Started',
        component: DocsHtmlArticle.wrap(GetStarted, 'neutral-1')},
      {route: 'develop_tutorial', label: 'Tutorial',
        component: DocsHtmlArticle.wrap(Tutorial, 'neutral-1')},
      {route: 'develop_modulargrommet', label: 'Modular Grommet',
        component: DocsHtmlArticle.wrap(ModularGrommet, 'neutral-1')}
    ]
  },
  {label: 'Patterns',
    contents: [
      {route: 'develop_dashboard', label: 'Dashboard', component: DashboardDoc},
      {route: 'develop_navigation', label: 'Navigation', component: NavigationDoc},
      {route: 'develop_actions', label: 'Actions', component: ActionsDoc}
    ]
  },
  {label: 'Components',
    contents: [
      {route: 'develop_anchor', label: 'Anchor', component: AnchorDoc},
      {route: 'develop_app', label: 'App', component: AppDoc},
      {route: 'develop_article', label: 'Article', component: ArticleDoc},
      {route: 'develop_box', label: 'Box', component: BoxDoc},
      {route: 'develop_button', label: 'Button', component: ButtonDoc},
      {route: 'develop_calendar', label: 'Calendar', component: CalendarDoc},
      {route: 'develop_carousel', label: 'Carousel', component: CarouselDoc},
      {route: 'develop_chart', label: 'Chart', component: ChartDoc},
      {route: 'develop_check-box', label: 'CheckBox', component: CheckBoxDoc},
      {route: 'develop_distribution', label: 'Distribution', component: DistributionDoc},
      {route: 'develop_footer', label: 'Footer', component: FooterDoc},
      {route: 'develop_form', label: 'Form', component: FormDoc},
      {route: 'develop_form-field', label: 'FormField', component: FormFieldDoc},
      {route: 'develop_header', label: 'Header', component: HeaderDoc},
      {route: 'develop_icon', label: 'Icon', component: IconDoc},
      {route: 'develop_layer', label: 'Layer', component: LayerDoc},
      {route: 'develop_list', label: 'List', component: ListDoc},
      {route: 'develop_login-form', label: 'LoginForm', component: LoginFormDoc},
      {route: 'develop_map', label: 'Map', component: MapDoc},
      {route: 'develop_menu', label: 'Menu', component: MenuDoc},
      {route: 'develop_meter', label: 'Meter', component: MeterDoc},
      {route: 'develop_paragraph', label: 'Paragraph', component: ParagraphDoc},
      {route: 'develop_radio-button', label: 'RadioButton', component: RadioButtonDoc},
      {route: 'develop_search', label: 'Search', component: SearchDoc},
      {route: 'develop_search-input', label: 'SearchInput', component: SearchInputDoc},
      {route: 'develop_section', label: 'Section', component: SectionDoc},
      {route: 'develop_sidebar', label: 'Sidebar', component: SidebarDoc},
      {route: 'develop_split', label: 'Split', component: SplitDoc},
      {route: 'develop_status', label: 'Status', component: StatusDoc},
      {route: 'develop_tabs', label: 'Tabs', component: TabsDoc},
      {route: 'develop_table', label: 'Table', component: TableDoc},
      {route: 'develop_tiles', label: 'Tiles', component: TilesDoc},
      {route: 'develop_title', label: 'Title', component: TitleDoc},
      {route: 'develop_topology', label: 'Topology', component: TopologyDoc}
    ]
  },
  {label: 'Utils',
    contents: [
      {route: 'develop_rest', label: 'Rest', component: RestDoc},
      {route: 'develop_rest-watch', label: 'RestWatch', component: RestWatchDoc}
    ]
  },
  {label: 'Reference',
    contents: [
      {route: 'develop_architecture', label: 'Architecture',
        component: DocsHtmlArticle.wrap(Architecture, 'neutral-5')},
      {route: 'develop_integration', label: 'Integration',
        component: DocsHtmlArticle.wrap(Integration, 'neutral-5')},
      {route: 'develop_accessibility', label: 'Accessibility', component: Accessibility}
    ]
  }
];

var Develop = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function () {
    var title = <Link to="develop">Develop</Link>;
    return (
      <DocsSplit title={title} contents={CONTENTS} onChange={this._highlightCode}>
        <DocsArticle title="Develop" colorIndex="neutral-1">
          <section>
            <p>Grommet was created to give developers and designers alike access to tools
            that otherwise are out of reach of most product teams. Grommet’s goal is to
            assist in creating experiences that work accross the many different interaction
            methods and screen sizes.</p>
            <Menu direction="column">
              <Link to='develop_helloworld'>
                <Anchor tag="span" primary={true}>Hello Grommet!</Anchor>
              </Link>
              <Link to='develop_getstarted'>
                <Anchor tag="span" primary={true}>Get Started</Anchor>
              </Link>
              <Link to='develop_tutorial'>
                <Anchor tag="span" primary={true}>Tutorial</Anchor>
              </Link>
              <Link to='develop_modulargrommet'>
                <Anchor tag="span" primary={true}>Modular Grommet</Anchor>
              </Link>
            </Menu>
          </section>
        </DocsArticle>
      </DocsSplit>
    );
  }
});

var DevelopDocument = React.createClass({

  componentDidMount: function () {
    this._highlightCode();
  },

  componentDidUpdate: function () {
    this._highlightCode();
  },

  _highlightCode: function () {
    var domNode = this.getDOMNode();
    var nodes = domNode.querySelectorAll('pre code');
    for (var i = 0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i]);
    }
  },

  render: function () {
    var title = <Link to="develop">Develop</Link>;
    return (
      <DocsSplit title={title} contents={CONTENTS} onChange={this._highlightCode}>
        <RouteHandler />
      </DocsSplit>
    );
  }
});

function createContentRoutes(contents) {
  var result = [];
  contents.forEach(function (content) {
    result.push(
      <Route key={content.label} name={content.route}
        path={content.label.toLowerCase().replace(/ /g, "-")}
        handler={content.component} />
    );
    if (content.hasOwnProperty('contents')) {
      result = result.concat(createContentRoutes(content.contents));
    }
  });
  return result;
}

Develop.routes = function () {
  var routes = createContentRoutes(CONTENTS);
  return [
    <Route key="top" name="develop" handler={Develop} />,
    <Route key="docs" path="develop" handler={DevelopDocument}>{routes}</Route>
  ];
};

module.exports = Develop;
