import React, { useState } from 'react';

import {
  Button,
  NameValueList,
  NameValuePair,
  Notification,
  Header,
  Heading,
  Paragraph,
  Main,
} from 'grommet';
import { Grommet as GrommetIcon, AppsRounded } from 'grommet-icons';
import { Box } from '../../Box';
import { Text } from '../../Text';
import { data } from '../../NameValueList/stories/data';

export const Global = () => {
  const [showGlobalNotification, setShowGlobalNotification] = useState(true);

  return (
    <>
      <Header border="bottom" pad={{ horizontal: 'large', vertical: 'small' }}>
        <Box direction="row" align="center" gap="small">
          <GrommetIcon size="large" color="plain" />
          <Text weight="bold">Company Name</Text>
        </Box>
        <Button icon={<AppsRounded />} />
      </Header>
      <Main gap="medium">
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
      </Main>
    </>
  );
};

export default {
  title: 'Visualizations/Notification/Global',
};
