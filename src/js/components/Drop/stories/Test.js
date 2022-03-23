import React, { useState } from "react";

import {
  grommet,
  Box,
  Grommet,
  Paragraph,
  DropButton,
  Button,
  Markdown
} from "grommet";

const constantAlign = { top: "bottom", left: "right" };

const ExampleDrop = () => {
  const [renderTrigger, setRenderTrigger] = useState(false);
  const align = { top: "bottom", left: "right" };

  const DropContent = (
    <>
      {Array(100)
        .fill()
        .map((_, i) => (
          <Box pad="medium">{i}</Box>
        ))}
      <Button
        pad="small"
        primary
        onClick={() => setRenderTrigger(!renderTrigger)}
      >
        click me
      </Button>
    </>
  );
  return (
    <Grommet theme={grommet}>
      <Paragraph>
        Open the Drop by clicking the button, scroll to the bottom of the drop,
        and trigger a re-render by clicking the button at the bottom of the
        Drop. Observe that clicking the button causes the scroll position to
        jump back to the top of the Drop.
      </Paragraph>
      <DropButton primary dropAlign={align} dropContent={DropContent}>
        Open Drop
      </DropButton>
      <Paragraph>
        By contrast, open this Drop and do the same thing; observe that clicking
        the button does not reset the scroll position.
      </Paragraph>
      <DropButton primary dropAlign={constantAlign} dropContent={DropContent}>
        Open Drop
      </DropButton>

      <Paragraph>
        <Markdown>
          The only difference between the two is that the align prop in the
          first is an object that is re-constructed on each render, whereas the
          second one's align prop is an object that remains the same. I believe
          (although I have not fully confirmed) that this difference is causing
          [this
          useEffect](https://github.com/grommet/grommet/blob/master/src/js/components/Drop/DropContainer.js#L295-L305)
          to run in the first one. Similar behavior can be seen when passing a
          non-callbackified onClickOutside directly into Drop. This is all
          typical React behavior, but feels like a hidden pitfall for usage of
          this component since the need to memoize is not documented.
        </Markdown>
      </Paragraph>
    </Grommet>
  );
};

export const Example = () => <ExampleDrop />;

export default {
  title: 'Controls/Drop/Example',
};