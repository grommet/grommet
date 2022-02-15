import React, { useState } from 'react';

import {
  Button,
  NameValueList,
  NameValuePair,
  Notification,
  Header,
  Heading,
  Paragraph,
} from 'grommet';
import { Hpe, AppsRounded } from 'grommet-icons';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { data } from '../../NameValueList/stories/data';

const BannerNotification = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <Box>
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
              banner
              onClose={() => setShowNotification(false)}
            />
            <Notification
              status="warning"
              title="Subscription Expiration"
              message={`Your subscription is expiring in 7 days. Renew your 
              subscription to ensure you don't have any interruptions to your 
              access.`}
              banner
              onClose={() => setShowNotification(false)}
            />
            <Notification
              status="info"
              title="Feature Release"
              message={`Updates to this service will be available soon including
               feature a, feature b, and feature c.`}
              banner
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
        </Box>
      </Box>
    </Box>
  );
};

export const Banner = () => <BannerNotification />;

export default {
  title: 'Visualizations/Notification/Banner',
};
