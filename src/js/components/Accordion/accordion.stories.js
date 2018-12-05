import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

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
  Text,
  TextInput,
  ThemeContext,
} from 'grommet';
import { grommet } from 'grommet/themes';

const richAccordionTheme = {
  accordion: {
    icons: {
      collapse: FormSubtract,
      expand: FormAdd,
    },
  },
};

const SimpleAccordion = props => {
  const { animate, multiple, ...rest } = props;
  return (
    <Grommet theme={grommet}>
      <Box {...rest}>
        <Accordion animate={animate} multiple={multiple}>
          <AccordionPanel label="Panel 1">
            <Box background="light-2" style={{ height: '800px' }}>
              Panel 1 contents
            </Box>
          </AccordionPanel>
          <AccordionPanel label="Panel 2">
            <Box background="light-2" style={{ height: '50px' }}>
              Panel 2 contents
            </Box>
          </AccordionPanel>
          <AccordionPanel label="Panel 3">
            <Box background="light-2" style={{ height: '300px' }}>
              Panel 3 contents
            </Box>
          </AccordionPanel>
        </Accordion>
      </Box>
    </Grommet>
  );
};

class RichPanel extends Component {
  state = {
    hovering: false,
  };

  renderPanelTitle = () => {
    /* eslint-disable-next-line react/prop-types */
    const { icon, label } = this.props;
    const { hovering } = this.state;
    return (
      <Box
        direction="row"
        align="center"
        gap="small"
        pad={{ horizontal: 'small' }}
      >
        {icon}
        <Heading level={4} color={hovering ? 'dark-1' : 'dark-5'}>
          {label}
        </Heading>
      </Box>
    );
  };

  render() {
    /* eslint-disable-next-line react/prop-types */
    const { children } = this.props;
    return (
      <AccordionPanel
        label={this.renderPanelTitle()}
        onMouseOver={() => this.setState({ hovering: true })}
        onMouseOut={() => this.setState({ hovering: false })}
        onFocus={() => this.setState({ hovering: true })}
        onBlur={() => this.setState({ hovering: false })}
      >
        {children}
      </AccordionPanel>
    );
  }
}

const spinning = (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width="32px"
    height="32px"
    fill="#333333"
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const loading = (
  <Box align="center" justify="center" style={{ height: '100px' }}>
    {spinning}
  </Box>
);

class RichAccordion extends Component {
  state = {
    highlightLoaded: false,
  };

  render() {
    const { highlightLoaded } = this.state;
    return (
      <Grommet full theme={grommet}>
        <Box fill direction="row">
          <Box basis="medium" border="all">
            <Box
              flex={false}
              border="bottom"
              background="light-2"
              tag="header"
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
                    setTimeout(() => {
                      this.setState({ highlightLoaded: true });
                    }, 1000);
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
                      <Text color="dark-5">
                        <strong>Purpose</strong>
                      </Text>
                      <Text>
                        Used for general announcements like new releases,
                        trainings...
                      </Text>
                    </Box>
                    <Box gap="xsmall">
                      <Text color="dark-5">
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
                      <Text color="dark-5">
                        Below is the top message in
                        <strong>#announcements</strong>.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                    </Box>
                  ) : (
                    loading
                  )}
                </RichPanel>
                <RichPanel
                  icon={<User color="accent-2" />}
                  label="2,000 members"
                >
                  <Box
                    pad={{
                      bottom: 'medium',
                      horizontal: 'small',
                      top: 'small',
                    }}
                    gap="medium"
                  >
                    Yeah believe me, this channel has 2,000 members.
                  </Box>
                </RichPanel>
              </Accordion>
            </ThemeContext.Extend>
          </Box>
        </Box>
      </Grommet>
    );
  }
}

const renderPanelHeader = (title, active) => (
  <Box direction="row" align="center" pad="medium" gap="small">
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color="brand">{active ? '-' : '+'}</Text>
  </Box>
);

class CustomHeaderAccordion extends Component {
  state = {
    activeIndex: [0],
  };

  render() {
    const { activeIndex } = this.state;
    return (
      <Grommet theme={grommet}>
        <Accordion
          activeIndex={activeIndex}
          onActive={newActiveIndex =>
            this.setState({ activeIndex: newActiveIndex })
          }
        >
          <AccordionPanel
            header={renderPanelHeader('Panel 1', activeIndex.includes(0))}
          >
            <Box pad="medium" background="light-2" style={{ height: '800px' }}>
              <Text>Panel 1 contents</Text>
              <TextInput />
            </Box>
          </AccordionPanel>
          <AccordionPanel
            header={renderPanelHeader('Panel 2', activeIndex.includes(1))}
          >
            <Box pad="medium" background="light-2" style={{ height: '50px' }}>
              <Text>Panel 2 contents</Text>
            </Box>
          </AccordionPanel>
          <AccordionPanel
            header={renderPanelHeader('Panel 3', activeIndex.includes(2))}
          >
            <Box pad="medium" background="light-2" style={{ height: '300px' }}>
              <Text>Panel 3 contents</Text>
            </Box>
          </AccordionPanel>
        </Accordion>
      </Grommet>
    );
  }
}

storiesOf('Accordion', module)
  .add('Simple', () => <SimpleAccordion />)
  .add('Dark no animation', () => (
    <SimpleAccordion animate={false} background="dark-2" />
  ))
  .add('Multiple', () => <SimpleAccordion multiple />)
  .add('Rich', () => <RichAccordion />)
  .add('Custom Header', () => <CustomHeaderAccordion />);
