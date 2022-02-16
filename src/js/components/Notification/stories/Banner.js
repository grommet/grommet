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
    container: {
      round: 'xsmall',
    },
    textContainer: {
      direction: 'row',
      gap: 'xsmall',
    },
    toast: {
      title: {
        weight: 'bold',
      },
    },
    separator: ' - ',
    truncate: true,
    title: {
      weight: 'normal',
    },
    message: {
      weight: 'normal',
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
  const [showNotification, setShowNotification] = useState(true);
  const [showToast, setShowToast] = useState(false);

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
        {showNotification && (
          <Box pad={{ horizontal: 'medium' }} gap="small">
            <Notification
              href="#"
              status="critical"
              title="Scheduled Maintenance"
              message={`Saturday 02/21/2022 at 12:00UTC. This service will be 
              unavailable for approximately 2 hours.`}
              // exploration IF we want to include links
              actions={[
                {
                  label: 'jfksl',
                  href: 'jfklj',
                },
              ]}
              onClose={() => setShowNotification(false)}
            />
            <Notification
              status="warning"
              title="Subscription Expiration"
              message={`Your subscription is expiring in 7 days. Renew your 
              subscription to ensure you don't have any interruptions to your 
              access.`}
              onClose={() => setShowNotification(false)}
            />
            <Notification
              status="info"
              title="Feature Release"
              message={`Updates to this service will be available soon including
               feature a, feature b, and feature c.`}
              onClose={() => setShowNotification(false)}
            />
          </Box>
        )}
        <Box width="large" margin="auto" pad="medium" gap="medium">
          <Heading margin="none">Page Heading</Heading>
          <Paragraph margin="none" fill>
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
          <Button
            label="Click to show Toast"
            onClick={() => setShowToast(true)}
            primary
          />
        </Box>
      </Box>
      {showToast && (
        <Notification title="Title" message="This is the message." toast />
      )}
    </Grommet>
  );
};

export const Banner = () => <BannerNotification />;

export default {
  title: 'Visualizations/Notification/Banner',
};
