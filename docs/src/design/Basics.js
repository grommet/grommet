// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Section = require('grommet/components/Section');

var CONTROL_ICONS = [
  {component: require('grommet/components/icons/base/Add'), labels: ['Add']},
  {component: require('grommet/components/icons/base/Close'), labels: ['Clear', 'Close', 'Remove']},
  {component: require('grommet/components/icons/base/Edit'), labels: ['Edit', 'Settings', 'Actions']},
  {component: require('grommet/components/icons/base/More'), labels: ['More']},
  {component: require('grommet/components/icons/base/Drag'), labels: ['Drag handle']},
  {component: require('grommet/components/icons/base/Down'), labels: ['Drop caret']},
  {component: require('grommet/components/icons/base/Filter'), labels: ['Filter']},
  {component: require('grommet/components/icons/base/Search'), labels: ['Search']},
  {component: require('grommet/components/icons/base/Calendar'), labels: ['Calendar']},
  {component: require('grommet/components/icons/base/Help'), labels: ['Help']},
  {component: require('grommet/components/icons/base/LinkPrevious'), labels: ['Left', 'Previous']},
  {component: require('grommet/components/icons/base/LinkNext'), labels: ['Right', 'Next']},
  {component: require('grommet/components/icons/base/LinkUp'), labels: ['Up']},
  {component: require('grommet/components/icons/base/LinkTop'), labels: ['Top']},
  {component: require('grommet/components/icons/base/User'), labels: ['User']},
  {component: require('grommet/components/icons/base/Language'), labels: ['Language']},
  {component: require('grommet/components/icons/base/Mail'), labels: ['Mail']},
  {component: require('grommet/components/icons/base/SocialTwitter'), labels: ['Twitter']},
  {component: require('grommet/components/icons/base/SocialLinkedin'), labels: ['LinkedIn']},
  {component: require('grommet/components/icons/base/SocialFacebook'), labels: ['Facebook']}
];

var Spinning = require('grommet/components/icons/Spinning');
var Status = require('grommet/components/icons/Status');

var STATUS_ICONS = [
  {component: Status, value: 'error', labels: ['Error', 'Critical']},
  {component: Status, value: 'warning', labels: ['Warning']},
  {component: Status, value: 'ok', labels: ['OK', 'Normal']},
  {component: Status, value: 'unknown', labels: ['Unknown']},
  {component: Status, value: 'disabled', labels: ['Disabled']},
  {component: Status, value: 'label', labels: ['Label', 'Table header']}
];

var Basics = React.createClass({

  componentDidMount: function () {
    var fontNameElement = this.refs.fontName.getDOMNode();
    var fontFamily = window.getComputedStyle(fontNameElement).fontFamily;
    fontNameElement.innerHTML = fontFamily.split(',')[0];
  },

  render: function () {
    var controlIcons = CONTROL_ICONS.map(function (item) {
      var labels = item.labels.map(function (label) {
        return (<span key={label}>{label}</span>);
      });
      return (
        <div key={item.labels[0]} className="icon-tile">
          {React.createFactory(item.component)()}
          <label>{labels}</label>
        </div>
      );
    });

    var statusIcons = STATUS_ICONS.map(function (item) {
      var labels = item.labels.map(function (label) {
        return (<span key={label}>{label}</span>);
      });
      return (
        <div key={item.labels[0]} className="icon-tile">
          {React.createFactory(item.component)({value: item.value, large: true})}
          {React.createFactory(item.component)({value: item.value})}
          {React.createFactory(item.component)({value: item.value, small: true})}
          <label>{labels}</label>
        </div>
      );
    });

    return (
  <article>
    <header>
      <h1>Basics</h1>
    </header>
    <Section appCentered={true} primary={true}>
      <p>Here you will find the core elements for the application style guide.
      The downloadable assets contain these core elements. Checkboxes, buttons,
      status icons and more are all described in these assets.
      Rather than documenting these in gory detail, we thought you would
      appreciate the brevity. We also think you really just want to see them anyway,
      so why waste your time?</p>
    </Section>
  <section>
    <a className="anchor" id="color"></a>
    <h2>Color</h2>
    <div className="generic-branding">
      <p>These are the generic, or un-branded, colors. It is expected that
        applications will define their own brand color scheme.</p>
    </div>
    <div className="hpe-branding">
    <p>The Hewlett Packard Enterprise color palette is utilized in applications for the
    most part. However there are variances in the palette that apply specifically
    to applications.</p>

    <p>For application design the Hewlett Packard Enterprise orange/salmon accent color
    is modified to be more red so it can be used as a status indicator and it should
    not be used as an accent color in non-status contexts.</p>

    <p>Also, dark yellow color is added for use as a warning status color.</p>
    </div>

    <h3>Primary</h3>
    <span className="swatch brand"></span>
    <h3>Accent</h3>
    <span className="swatch accent-1"></span>
    <span className="swatch accent-2"></span>
    <span className="swatch accent-3"></span>
    <h3>Neutral</h3>
    <span className="swatch neutral-1"></span>
    <span className="swatch neutral-2"></span>
    <span className="swatch neutral-3"></span>
    <span className="swatch neutral-4"></span>
    <span className="swatch neutral-5"></span>

    <h3>Status</h3>
    <p>These colors are used to convey status.</p>
    <span className="swatch status-error"></span>
    <span className="swatch status-warning"></span>
    <span className="swatch status-ok"></span>
    <span className="swatch status-unknown"></span>

    <h3>Graph</h3>
    <p>These colors are used to draw graphs and charts.</p>
    <span className="swatch graph-1"></span>
    <span className="swatch graph-2"></span>
    <span className="swatch graph-3"></span>
    <span className="swatch graph-4"></span>
    <span className="swatch graph-5"></span>
    <span className="swatch graph-6"></span>

  </section>

  <section>
    <a className="anchor" id="text"></a>
    <h2>Text</h2>
    <p>Text and Typography is arguably one of the most important elements of
    style to get right. Ironically, when done well the text styles and typography
    disappear from the users consciousness and they simply enjoy the beautiful
    and fluid experience. However, when done poorly, the typography can be a
    reason an application just doesn’t feel right. Everything from displeasing
    aesthetics, to unclear organization of information, to physical eye strain
    can result from an application with insufficient attention to this detail.</p>

    <a className="anchor" id="typography"></a>
    <h3>Typography</h3>
    <p>Applications use the <span ref="fontName">Arial</span> font.  The
    typographic scale and styles can be found in the attached assets.</p>
    <h1 className="font-sample">H1 font sample</h1>
    <h2 className="font-sample">H2 font sample</h2>
    <h3 className="font-sample">H3 font sample</h3>
    <h4 className="font-sample">H4 font sample</h4>
    <h5 className="font-sample">H5 font sample</h5>

    <a className="anchor" id="writing-style"></a>
    <h3>Writing Style</h3>
    <p>Applications should use a conversational tone and should not include
    excessive technical jargon.</p>

    <p>Here are some things we recommend you consider when writing for applications:</p>

    <h3>Do’s</h3>
    <ul>
      <li>Use simple yet complete sentences.</li>
      <li>Use correct punctuation.</li>
      <li>Use the present tense to describe problem states.</li>
      <li>Use past tense to describe events that occurred in the past.</li>
      <li>Use an active voice whenever possible.</li>
      <li>Passive voice is acceptable to describe some error conditions.</li>
      <li>Use descriptors to clarify terminology. For example, “Specify InflD
      when Detect is set to NO.” We instead recommend something along the
      lines of “Specify the InflD parameter when the Detect option is set
      to NO”.</li>
    </ul>

    <h3>Don’ts</h3>
    <ul>
      <li>Do not use UPPERCASE in text or exclamation points!!!!</li>
      <li>Do not make the user feel at fault.</li>
      <li>Do not anthropomorphize by implying that the programs or hardware
      can think or feel.</li>
      <li>Do not use colloquial words or phrases.</li>
      <li>Do not use terms that may be offensive in certain cultures.</li>
      <li>Do not compound several nouns without adding a preposition or
      subclause to clarify the meaning. For example, “Site Server LDAP
      Service directory server” should be changed to “Directory server for
      the LDAP Service of the Site Server”.</li>
      <li>Avoid the use of the word “bad”. Use more descriptive terms to
      tell the user as to what is wrong. For example, avoid messages such
      as “Bad size”. Instead, tell the user what criteria to use when
      specifying a size.</li>
      <li>Avoid the use of the word “please”. It can imply that a required
      action is optional.</li>
    </ul>

    <a className="anchor" id="date-time"></a>
    <h3>Date and Time</h3>
    <p>Date and time formats should generally be displayed in the user’s
    local timezone.  Any exceptions to this should include the timezone being
    used to display the time and date. In addition, dates and times shall always
    be localized to use the most recognizable format for the user’s locale.
    Here are examples of recommended date and time formats. Notice, that we use
    words like “Today” and “Yesterday” as it doesn’t force the user to remember
    today’s date to process the information.  In each of these examples, showing
    seconds is optional.</p>

    <ol>
      <li>Today, since 12:00 am today:
        <ul>
          <li><code>Today &lt;HH:MM[:SS] am|pm&gt;</code></li>
          <li><code>Today 10:10:05 am</code></li>
          <li><code>Today 11:11 am</code></li>
        </ul>
      </li>

      <li>Yesterday, since 12:00 am yesterday, before 12:00 am today:
        <ul>
          <li><code>Yesterday &lt;HH:MM[:SS] am|pm&gt;</code></li>
          <li><code>Yesterday 10:10:05 pm</code></li>
          <li><code>Yesterday 11:11 am</code></li>
        </ul>
      </li>

      <li>This year, since 12:00 am this year, before yesterday:
        <ul>
          <li><code>&lt;3 char month name&gt; &lt;day&gt; &lt;HH:MM[:SS] am/pm&gt;</code></li>
          <li><code>Jan 28 10:10:05 am</code></li>
        </ul>
      </li>

      <li>Last years messages, before 12:00 am this year:
        <ul>
          <li><code>&lt;month&gt; &lt;day&gt; &lt;year&gt; &lt;HH:MM[:SS] am/pm&gt;</code></li>
          <li>1-1-2014 10:10:05 am</li>
        </ul>
      </li>
    </ol>

    <a className="anchor" id="capitalization"></a>
    <h3>Capitalization</h3>
    <p>For the English language, we recommend using English title capitalization
    rules for titles (i.e. generally, capitalize the first letter of each word). Titles
    include the following user interface elements:</p>
    <ul>
      <li>Page titles</li>
      <li>Panel titles</li>
      <li>Section headings</li>
      <li>Form section titles</li>
      <li>Table headers</li>
      <li>Dialog titles (reference rule #8: grammarbook.com)</li>
    </ul>

    <h4>Sentence Capitalization</h4>
    <p>Capitalize only the first letter of data labels unless a word used in the
    data label otherwise deserves capitalization because of English capitalization
    rules (e.g. proper names, abbreviations, etc).</p>

    <p>Data labels include the following UI elements:</p>
    <ul>
      <li>Radio button labels</li>
      <li>Checkbox labels</li>
      <li>Form property labels</li>
      <li>Panel property labels</li>
      <li>Button labels</li>
      <li>Action menu items</li>
      <li>Hyperlinks to actions</li>
      <li>Hint text</li>
      <li>Help text</li>
    </ul>

    <h4>Attributes</h4>
    <p>Capitalize only the first letter of attributes unless a word used in
    the attribute otherwise deserves capitalization because of English
    capitalization rules (e.g. proper names, abbreviations, etc). User-entered
    attributes will retain the user’s capitalization.</p>

    <h4>Exceptions</h4>
    <p>The English language is full of exceptions, so we felt compelled.
    For attribute values which indicate the property or data field hasn’t
    been set or the location is intentionally left empty, we use the
    non-capitalized words or phrases such as “empty”, “none”, “not set”,
    “unassigned”, or “no alerts”.</p>

    <p>Some specific words and acronyms are always capitalized for branding
    or common industry recognition.</p>

    <p>Examples:</p>
    <ul>
      <li>VLAN</li>
      <li>IPv4</li>
      <li>IPv6</li>
      <li>WWN</li>
    </ul>

    <h4>Capitalization in APIs</h4>
    <p>Yes, our application users make use of our APIs, so it’s important
    to provide a familiar voice to our users, regardless of the interface
    they are using.</p>

    <h5>PascalCase</h5>
    <ul>
      <li>Schema names</li>
      <li>Schema enum values</li>
    </ul>

    <h5>camelCase</h5>
    <p>The following API elements should be rendered in camelCase:</p>
    <ul>
      <li>Schema attribute names</li>
    </ul>
  </section>

  <section>
    <a className="anchor" id="icons"></a>
    <h2>Icons</h2>
    <p>Icons are used for inline controls. Users should be able to identify
      an icon’s function without any supporting text decoration. This is why
      we have a fairly small icon set. Text is used for non-iconifiable controls.</p>

    <h3>Controls</h3>
    <p>Control icons have a larger hit area around them to work well on mobile platforms.</p>
    <div className="example">
      {controlIcons}
    </div>

    <h3>Status</h3>
    <p>Status icons come in multiple sizes for use in different contexts.
      They are differentiated both by color and by shape for accessibility.
      Typically, status icons are placed immediately to the left of the label
      indicating what object they are indicating the status of.</p>
    <div className="example">
      {statusIcons}
    </div>
    <p>When something is occuring that could lead to a change in status, a changing
      icon is added next to the status icon. This changing icon is placed to the
      right of the status icon when laying out horizontally, and below when laying
      out vertically.</p>
    <div className="example">
      <div className="icon-tile">
        <div><Spinning /></div>
        <div><Spinning small={true} /></div>
        <label>
          <span>Changing</span>
          <span>Loading</span>
        </label>
      </div>
    </div>

  </section>
    </article>
    );
  }
});

module.exports = Basics;
