import React from 'react';

import {
  Bookmark,
  CircleInformation,
  FormSubtract,
  FormAdd,
  User,
} from 'grommet-icons';

import {
  Accordion,
  AccordionPanel,
  Box,
  Grommet,
  Heading,
  Spinner,
  Text,
  ThemeContext,
} from 'grommet';
import { grommet, ThemeType } from 'grommet/themes';

// Type annotations can only be used in TypeScript files.
// Remove ': ThemeType' if you are not using Typescript.
const richAccordionTheme: ThemeType = {
  accordion: {
    icons: {
      collapse: FormSubtract,
      expand: FormAdd,
    },
    panel: {
      border: {
        side: 'horizontal',
        size: 'medium',
        color: '#DADADA',
        style: 'dotted',
      },
    },
  },
};

const RichPanel = ({ children, icon, label }) => {
  const [hovering, setHovering] = React.useState(false);

  const renderPanelTitle = () => (
    <Box
      direction="row"
      align="center"
      gap="small"
      pad={{ horizontal: 'small' }}
    >
      {icon}
      <Heading level={4} color={hovering ? 'dark-1' : 'dark-3'}>
        {label}
      </Heading>
    </Box>
  );

  return (
    <AccordionPanel
      label={renderPanelTitle()}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
    >
      {children}
    </AccordionPanel>
  );
};

const RichAccordion = () => {
  const [highlightLoaded, setHighlightLoaded] = React.useState(false);

  return (
    <Grommet full theme={grommet}>
      <Box fill direction="row">
        <Box basis="medium" border="all">
          <Box
            flex={false}
            border="bottom"
            background="light-2"
            as="header"
            pad={{ horizontal: 'small' }}
          >
            <Heading level={3}>
              <strong>About #announcements</strong>
            </Heading>
          </Box>
          <ThemeContext.Extend value={richAccordionTheme}>
            <Accordion
              multiple
              onActive={activeIndexes => {
                if (activeIndexes.includes(1)) {
                  // give sometime to emulate an async call
                  setTimeout(() => setHighlightLoaded(true), 1000);
                }
              }}
            >
              <RichPanel icon={<CircleInformation />} label="Channel Details">
                <Box
                  pad={{
                    bottom: 'medium',
                    horizontal: 'small',
                    top: 'small',
                  }}
                  gap="medium"
                >
                  <Box gap="xsmall">
                    <Text color="dark-3">
                      <strong>Purpose</strong>
                    </Text>
                    <Text>
                      Used for general announcements like new releases,
                      trainings...
                    </Text>
                  </Box>
                  <Box gap="xsmall">
                    <Text color="dark-3">
                      <strong>Created</strong>
                    </Text>
                    <Text>Created by Bryan Jacquot on January 19, 2016</Text>
                  </Box>
                </Box>
              </RichPanel>
              <RichPanel
                icon={<Bookmark color="accent-1" />}
                label="Highlights"
              >
                {highlightLoaded ? (
                  <Box
                    pad={{
                      bottom: 'medium',
                      horizontal: 'small',
                      top: 'small',
                    }}
                    gap="medium"
                    overflow="auto"
                    style={{ maxHeight: '400px' }}
                  >
                    <Text color="dark-3">
                      Below is the top message in
                      <strong>#announcements</strong>.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Text>
                  </Box>
                ) : (
                  <Spinner alignSelf="center" margin="large" size="medium" />
                )}
              </RichPanel>
              <RichPanel icon={<User color="accent-2" />} label="3,000 members">
                <Box
                  pad={{
                    bottom: 'medium',
                    horizontal: 'small',
                    top: 'small',
                  }}
                  gap="medium"
                >
                  Yeah believe me, this channel has 3,000 members.
                </Box>
              </RichPanel>
            </Accordion>
          </ThemeContext.Extend>
        </Box>
      </Box>
    </Grommet>
  );
};

export const Rich = () => <RichAccordion />;

export default {
  title: 'Controls/Accordion/Rich',
};
