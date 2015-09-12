// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Article = require('grommet/components/Article');
var Topology = require('grommet/components/Topology');

var TopologyDoc = React.createClass({

  render: function() {
    var inline =
      "<Topology links={[...]}>\n" +
      "  <Topology.Parts>\n" +
      "    <Topology.Part>\n" +
      "      ...\n" +
      "    </Topology.Part>\n" +
      "    ...\n" +
      "  </Topology.Parts>\n" +
      "</Topology>";

    return (
      <Article primary={true}>
        <header>
          <h1>Topology</h1>
          <p>Visualize structure and connectivity.</p>
          <pre><code className="html hljs xml">{inline}</code></pre>
        </header>

        <section>
          <h2>Options</h2>
          <dl>
            <dt><code>links       {"[{...}]"}</code></dt>
            <dd>An array of: <code>
              {"{ids: [<id>, ...], colorIndex: <string>}"}
              </code>. The ids should reference id properties of
              contained Topology.Part components.</dd>
          </dl>
        </section>

        <section>
          <h2>Available Sub Components</h2>

          <h3>Toplogy.Part</h3>
          <p>An individual part. I Part can contain Parts or another Part.</p>
          <h4>Options</h4>
          <dl>
            <dt><code>align        start|center|between|end|stretch</code></dt>
            <dd>How to align the contents along the cross axis.</dd>
            <dt><code>demarcate    true|false</code></dt>
            <dd>Whether or not to visually demarcate the boundaries of the Part.</dd>
            <dt><code>direction    row|column</code></dt>
            <dd>The orientation to layout any child components in.</dd>
            <dt><code>id           {"{id}"}</code></dt>
            <dd>The id of this part. The id should at least be unique within the Topology.</dd>
            <dt><code>justify      start|center|between|end</code></dt>
            <dd>How to align the contents along the main axis.</dd>
            <dt><code>label        {"{label}"}</code></dt>
            <dd>The label of this part. This could be a part name or number, for example.</dd>
            <dt><code>reverse      true|false</code></dt>
            <dd>Whether to reverse the order of the child components.</dd>
            <dt><code>status       error|warning|ok|disabled|unknown</code></dt>
            <dd>If provided, adds the corresponding status icon.</dd>
          </dl>

          <h3>Toplogy.Parts</h3>
          <p>A container for Part components. It is provided purely to assist with Part layout.</p>
          <h4>Options</h4>
          <dl>
            <dt><code>direction    row|column</code></dt>
            <dd>The orientation to layout the child components in.</dd>
            <dt><code>uniform    true|false</code></dt>
            <dd>Whether or not to all children should be the same size.</dd>
          </dl>

          <h3>Toplogy.Label</h3>
          <p>A label. It provides finer control over how Part labels are rendered.</p>
        </section>

        <section>
          <h2>Examples</h2>

          <div className="example">
            <Topology links={[
              {colorIndex: "graph-1", ids: ["s1p1", "s2p1"]},
              {colorIndex: "graph-1", ids: ["s1p2", "s2p2"]},
              {colorIndex: "graph-2", ids: ["em1p2", "em2p1"]},
              {colorIndex: "graph-2", ids: ["em2p2", "em3p1"]},
              {colorIndex: "graph-2", ids: ["em3p2", "em4p1"]},
              {colorIndex: "graph-2", ids: ["em4p2", "em1p1"]}
            ]}>
              <Topology.Parts direction="row">

                <Topology.Part className="rack" direction="column">

                  <Topology.Part className="switch" direction="column">
                    <Topology.Parts direction="row">
                      <Topology.Part id="s1p1" status="ok" label="1"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p2" status="ok" label="2"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p3" status="ok" label="3"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p4" status="ok" label="4"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p5" status="ok" label="5"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p6" status="ok" label="6"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p7" status="ok" label="7"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s1p8" status="ok" label="8"
                        direction="column" demarcate={false} />
                    </Topology.Parts>
                    <Topology.Label>HP 3100 SI</Topology.Label>
                  </Topology.Part>

                  <Topology.Part className="enclosure" direction="column">
                    <Topology.Part className="em"
                      label="HP Virtual Connect FlexFabric-20/40 F8 Module" />
                    <Topology.Part className="em"
                      label="HP Virtual Connect FlexFabric-20/40 F8 Module" />
                    <Topology.Parts direction="row">
                      <Topology.Part className="em">
                        <Topology.Parts direction="column">
                          <Topology.Part id="em1p1" status="ok" label="1"
                            demarcate={false} align="center" />
                          <Topology.Part id="em1p2" status="ok" label="2"
                            demarcate={false} align="center" />
                        </Topology.Parts>
                      </Topology.Part>
                      <Topology.Part className="fan" status="ok" label="1" align="center" />
                      <Topology.Part className="fan" />
                      <Topology.Part className="fan" status="ok" label="3" align="center" />
                    </Topology.Parts>
                    <Topology.Part className="em"
                      label="HP Virtual Connect FlexFabric-20/40 F8 Module" />
                    <Topology.Parts direction="row">
                      <Topology.Part className="em">
                        <Topology.Parts direction="column">
                          <Topology.Part id="em2p1" status="ok" label="1"
                            demarcate={false} align="center" />
                          <Topology.Part id="em2p2" status="ok" label="2"
                            demarcate={false} align="center" />
                        </Topology.Parts>
                      </Topology.Part>
                      <Topology.Part className="fan" status="ok" label="4" align="center" />
                      <Topology.Part className="fan" status="ok" label="5" align="center" />
                      <Topology.Part className="fan" status="ok" label="6" align="center" />
                    </Topology.Parts>
                  </Topology.Part>

                </Topology.Part>

                <Topology.Part className="rack" direction="column">

                  <Topology.Part className="switch" direction="column">
                    <Topology.Parts direction="row">
                      <Topology.Part id="s2p1" status="ok" label="1"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p2" status="ok" label="2"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p3" status="ok" label="3"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p4" status="ok" label="4"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p5" status="ok" label="5"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p6" status="ok" label="6"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p7" status="ok" label="7"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p8" status="ok" label="8"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p9" status="ok" label="9"
                        direction="column" demarcate={false} />
                      <Topology.Part id="s2p10" status="ok" label="10"
                        direction="column" demarcate={false} />
                    </Topology.Parts>
                    <Topology.Label>HP 5920AF-24XG</Topology.Label>
                    <Topology.Parts direction="row">
                      <Topology.Part id="s2p11" status="ok" label="11"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p12" status="ok" label="12"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p13" status="ok" label="13"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p14" status="ok" label="14"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p15" status="ok" label="15"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p16" status="ok" label="16"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p17" status="ok" label="17"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p18" status="ok" label="18"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p19" status="ok" label="19"
                        direction="column" demarcate={false} reverse={true} />
                      <Topology.Part id="s2p20" status="ok" label="20"
                        direction="column" demarcate={false} reverse={true} />
                    </Topology.Parts>
                  </Topology.Part>

                  <Topology.Part className="enclosure" direction="column">
                    <Topology.Parts direction="row">
                      <Topology.Part className="em">
                        <Topology.Parts direction="column">
                          <Topology.Part id="em3p1" status="ok" label="1"
                            demarcate={false} align="center" />
                          <Topology.Part id="em3p2" status="ok" label="2"
                            demarcate={false} align="center" />
                        </Topology.Parts>
                      </Topology.Part>
                      <Topology.Part className="fan" status="ok" label="1" align="center" />
                      <Topology.Part className="fan" status="ok" label="2" align="center" />
                      <Topology.Part className="fan" status="ok" label="3" align="center" />
                    </Topology.Parts>
                    <Topology.Part className="em"
                      label="HP Virtual Connect FlexFabric-20/40 F8 Module" />
                    <Topology.Parts direction="row">
                      <Topology.Part className="em">
                        <Topology.Parts direction="column">
                          <Topology.Part id="em4p1" status="ok" label="1"
                            demarcate={false} align="center" />
                          <Topology.Part id="em4p2" status="ok" label="2"
                            demarcate={false} align="center" />
                        </Topology.Parts>
                      </Topology.Part>
                      <Topology.Part className="fan" status="ok" label="4" align="center" />
                      <Topology.Part className="fan" status="ok" label="5" align="center" />
                      <Topology.Part className="fan" status="ok" label="6" align="center" />
                    </Topology.Parts>
                  </Topology.Part>

                </Topology.Part>

              </Topology.Parts>
            </Topology>
          </div>

        </section>

      </Article>
    );
  }
});

module.exports = TopologyDoc;
