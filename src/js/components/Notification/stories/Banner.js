import React, { useState } from 'react';

import {
  Button,
  NameValueList,
  NameValuePair,
  Notification,
  Grommet,
  Header,
  Heading,
  Paragraph,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { Hpe, AppsRounded } from 'grommet-icons';
import { hpe } from 'grommet-theme-hpe';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { data } from '../../NameValueList/stories/data';

// demonstrating how we would update the HPE theme while allowing
// grommet theme to be backwards compatible.
const customTheme = deepMerge(hpe, {
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
    },
    warning: {
      background: 'validation-warning',
    },
    normal: {
      background: 'validation-ok',
    },
    unknown: {
      background: 'background-contrast',
    },
    info: {
      background: 'background-contrast',
    },
    undefined: {
      background: 'background-contrast',
    },
  },
});

const BannerNotification = () => {
  const [showGlobalNotification, setShowGlobalNotification] = useState(true);
  const [showNotification, setShowNotification] = useState(true);

  return (
    <Grommet theme={customTheme} full>
      <Header border="bottom" pad={{ horizontal: 'medium', vertical: 'small' }}>
        <Box direction="row" align="center" gap="small">
          <Hpe size="large" color="brand" />
          <Text>HPE</Text>
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
          {showNotification && (
            <Notification
              status="critical"
              message={`You have used 100% of the available space on this 
              server.`}
              onClose={() => setShowNotification(false)}
            />
          )}
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

export const Banner = () => <BannerNotification />;

export default {
  title: 'Visualizations/Notification/Banner',
};
