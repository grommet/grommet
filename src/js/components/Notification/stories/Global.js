import React, { useState } from 'react';

import {
  Button,
  NameValueList,
  NameValuePair,
  Notification,
  Grommet,
  grommet,
  Header,
  Heading,
  Paragraph,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { Grommet as GrommetIcon, AppsRounded } from 'grommet-icons';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { data } from '../../NameValueList/stories/data';

// demonstrating how we would update the HPE theme while allowing
// grommet theme to be backwards compatible.
const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      'validation-critical': {
        light: '#FC61613D',
        dark: '#C54E4B5C',
      },
      'validation-ok': {
        light: '#17EBA03D',
        dark: '#00856759',
      },
      'validation-warning': {
        light: '#FFBC443D',
        dark: '#9B63105C',
      },
    },
  },
  notification: {
    direction: 'row',
    container: {
      round: 'xsmall',
    },
    global: {
      container: {
        round: 'none',
      },
    },
    toast: {
      direction: 'column',
    },
    critical: {
      background: 'validation-critical',
      toast: {
        background: 'background-front',
      },
    },
    warning: {
      background: 'validation-warning',
      toast: {
        background: 'background-front',
      },
    },
    normal: {
      background: 'validation-ok',
      toast: {
        background: 'background-front',
      },
    },
    unknown: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
    info: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
    undefined: {
      background: 'background-contrast',
      toast: {
        background: 'background-front',
      },
    },
  },
});

export const Global = () => {
  const [showGlobalNotification, setShowGlobalNotification] = useState(true);

  return (
    <Grommet theme={customTheme} full="min">
      <Header border="bottom" pad={{ horizontal: 'large', vertical: 'small' }}>
        <Box direction="row" align="center" gap="small">
          <GrommetIcon size="large" color="plain" />
          <Text weight="bold">Company Name</Text>
        </Box>
        <Button icon={<AppsRounded />} />
      </Header>
      <Box gap="medium">
        {showGlobalNotification && (
          <Notification
            status="warning"
            message={`Your supscription will expire in 7 days. Renew your 
            subscription to ensure you don't lose access.`}
            onClose={() => setShowGlobalNotification(false)}
            actions={[
              {
                href: '#',
                label: 'Renew Subscription',
              },
            ]}
            global
          />
        )}
        <Box width="large" margin="auto" pad="medium" gap="medium">
          <Header>
            <Heading margin="none">Page Heading</Heading>
            <Button alignSelf="start" label="Page-level Action" primary />
          </Header>
          <Paragraph margin="none">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            aliquet vitae velit non cursus. Aliquam fringilla dapibus elit, non
            fermentum neque tempor non.
          </Paragraph>
          <Heading margin="none" level={2}>
            Details
          </Heading>

          <NameValueList>
            {Object.entries(data).map(([name, value]) => (
              <NameValuePair key={name} name={name}>
                {value}
              </NameValuePair>
            ))}
          </NameValueList>
        </Box>
      </Box>
    </Grommet>
  );
};

export default {
  title: 'Visualizations/Notification/Global',
};
