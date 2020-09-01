import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = AnnounceContext => {
  const DocumentedAnnounceContext = describe(AnnounceContext)
    .availableAt(getAvailableAtBadge('AnnounceContext'))
    .description('A means of announcing events for screen readers.')
    .usage(
      "import { AnnounceContext } from 'grommet';\n" +
        '<AnnounceContext.Consumer />\n{announce => ()}',
    );

  DocumentedAnnounceContext.propTypes = {
    children: PropTypes.func.description(
      `Render function that will be called with an 'announce' function that
      can be called when something should be announced. 
      'announce' function accepts 'message', 'mode' and 'timeout' as arguments
      and these arguments can be passed as 'props' to the return component.
      'mode' can be one of 'polite', 'assertive' or 'off'. 
      'timeout' is measured in milliseconds.
      'id' used to query a specific Announce Context. 
      Default is 'grommet-announcer'
      Example:  
      {announce => 
        <Button onClick={() => announce(
          "Button was clicked", 
          "polite", 
          1000, 
          "custom-announcer"
        )
      }
      `,
    ),
  };

  return DocumentedAnnounceContext;
};
