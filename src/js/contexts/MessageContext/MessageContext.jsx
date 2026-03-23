import React from 'react';

import defaultMessages from '../../languages/default.json';

// options:
//   id: message id
//   messages: (optional) an object of message overrides
//   values: (optional) currently unused but in the future
//     will be an object with substitution values for
//     positional variables in the message text.
//   defaultMessage: (optional) default message to use if
//     the message isn't found elsewhere.
export const format = (options, messages) => {
  // Message id's are hierarchical. For the component-specific
  // message objects passed as options.messages, just use the last
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
  const idParts = options.id?.split('.') || [];
  // eslint-disable-next-line no-unsafe-optional-chaining
  const baseId = idParts[idParts?.length - 1];
  let messageObj = messages;
  idParts.forEach((idPart) => {
    if (typeof messageObj === 'object') {
      messageObj = messageObj[idPart];
    }
  });

  const message =
    (options.messages ? options.messages[baseId] : undefined) ||
    messageObj ||
    options.defaultMessage;

  const { values } = options;

  let newMessage = message;
  const tokens = message?.match(/\{(.+?)\}/g);
  tokens?.forEach((token) => {
    const names = token.substr(1, token.length - 2);
    const value = values[names];
    newMessage = newMessage.replace(token, value);
  });

  return values ? newMessage : message;
};

const defaultValue = {
  messages: defaultMessages,
  format: (options) => format(options, defaultMessages),
};

export const MessageContext = React.createContext(defaultValue);
