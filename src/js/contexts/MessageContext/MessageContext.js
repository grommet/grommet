import React from 'react';

import defaultMessages from '../../languages/default.json';

export const format = (opts, messages) => {
  // Message id's are hierarchical. For the component-specific
  // message objects passed as opts.messages, just use the last
  // component in the id for backwards compatibility.
  // 
  // For overall messages passed to grommet, use the hierarchical
  // id. For that messages object, the messages are in an object
  // hierarchy by component, similar to how the theme works.
  //
  // Applications that typically keep their messages in flat
  // objects with a single key string per message can override
  // this format function to get the grommet messages from
  // their bundles that way and don't need to pass the messages
  // themselves in this property, just the format function.
  const idParts = opts.id?.split('.') || [];
  const baseId = idParts[idParts?.length -1];
  let messageObj = messages;
  idParts.forEach(idPart => {
    if (typeof messageObj === 'object') {
      messageObj = messageObj[idPart];
    }
  });
  const message = (opts.messages ? opts.messages[baseId] : undefined) ||
    messageObj ||
    opts.defaultMessage;
  return message;
};

const defaultValue = {
  messages: defaultMessages,
  format: opts => format(opts, defaultMessages),
};

export const MessageContext = React.createContext(defaultValue);
