import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import { Add, Close, FormClose, StatusGood, Trash } from 'grommet-icons';

import {
  Box,
  Button,
  FormField,
  Grommet,
  Heading,
  Layer,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from '../../utils';

class CenterLayer extends Component {
  state = {};

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  onOpen2 = () => this.setState({ open2: true });

  onClose2 = () => this.setState({ open2: undefined });

  render() {
    const { open, open2 } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Button
            icon={<Trash />}
            label={
              <Text>
                <strong>Remove</strong>
              </Text>
            }
            onClick={this.onOpen}
            plain
          />
        </Box>
        {open && (
          <Layer
            position="center"
            modal
            onClickOutside={this.onClose}
            onEsc={this.onClose}
          >
            <Box pad="medium" gap="small" width="medium">
              <Heading level={3} margin="none">
                Confirm
              </Heading>
              <Text>Are you sure you want to delete?</Text>
              <Box
                tag="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'medium', bottom: 'small' }}
              >
                <Button label="Open 2" onClick={this.onOpen2} color="dark-6" />
                <Button
                  label={
                    <Text color="white">
                      <strong>Delete</strong>
                    </Text>
                  }
                  onClick={this.onClose}
                  primary
                  color="status-critical"
                />
              </Box>
            </Box>
          </Layer>
        )}
        {open2 && (
          <Layer
            position="top"
            modal
            onClickOutside={this.onClose2}
            onEsc={this.onClose2}
          >
            <Box pad="medium" gap="small" width="medium">
              <Heading level={3} margin="none">
                Confirm 2
              </Heading>
              <Select options={['one', 'two', 'three']} />
              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'medium', bottom: 'small' }}
              >
                <Button label="Close" onClick={this.onClose2} color="dark-6" />
              </Box>
            </Box>
          </Layer>
        )}
      </Grommet>
    );
  }
}

class FormLayer extends Component {
  state = {
    fourthOption: 'one',
    open: false,
  };

  onOpen = () => this.setState({ open: true });

  onClose = () => {
    this.setState({ open: undefined });
  };

  render() {
    const { open, fourthOption } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Button icon={<Add />} label="Add" onClick={this.onOpen} />
          {open && (
            <Layer
              position="right"
              full="vertical"
              modal
              onClickOutside={this.onClose}
              onEsc={this.onClose}
            >
              <Box
                as="form"
                fill="vertical"
                overflow="auto"
                width="medium"
                pad="medium"
                onSubmit={this.onClose}
              >
                <Box flex={false} direction="row" justify="between">
                  <Heading level={2} margin="none">
                    Add
                  </Heading>
                  <Button icon={<Close />} onClick={this.onClose} />
                </Box>
                <Box flex="grow" overflow="auto" pad={{ vertical: 'medium' }}>
                  <FormField label="First">
                    <TextInput />
                  </FormField>
                  <FormField label="Second">
                    <TextInput />
                  </FormField>
                  <FormField label="Third">
                    <TextArea />
                  </FormField>
                  <FormField label="Fourth">
                    <Select
                      options={['one', 'two', 'three']}
                      value={fourthOption}
                      onChange={({ option }) =>
                        this.setState({ fourthOption: option })
                      }
                    />
                  </FormField>
                </Box>
                <Box flex={false} as="footer" align="start">
                  <Button
                    type="submit"
                    label="Submit"
                    onClick={this.onClose}
                    primary
                  />
                </Box>
              </Box>
            </Layer>
          )}
        </Box>
      </Grommet>
    );
  }
}

class NotificationLayer extends Component {
  state = {};

  onOpen = () => this.setState({ open: true });

  onClose = () => this.setState({ open: undefined });

  render() {
    const { open } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box fill align="center" justify="center">
          <Button
            icon={<Add color="brand" />}
            label={
              <Text>
                <strong>Add</strong>
              </Text>
            }
            onClick={this.onOpen}
            plain
          />
        </Box>
        {open && (
          <Layer
            position="bottom"
            full="horizontal"
            modal={false}
            responsive={false}
            onEsc={this.onClose}
          >
            <Box
              align="start"
              pad={{ vertical: 'medium', horizontal: 'small' }}
            >
              <Box
                align="center"
                direction="row"
                gap="small"
                round="medium"
                elevation="medium"
                pad={{ vertical: 'xsmall', horizontal: 'small' }}
                background="status-ok"
              >
                <Box align="center" direction="row" gap="xsmall">
                  <StatusGood />
                  <Text>A new virtual machine has been successfully added</Text>
                </Box>
                <Button icon={<FormClose />} onClick={this.onClose} plain />
              </Box>
            </Box>
          </Layer>
        )}
      </Grommet>
    );
  }
}

const MarginLayer = ({ margin, ...rest }) => (
  <Grommet theme={grommet}>
    <Layer
      margin={
        margin || { left: '40px', top: '50px', right: '30px', bottom: '10px' }
      }
      {...rest}
    >
      <Box height="small" overflow="auto">
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
        <Box pad="xlarge">text</Box>
      </Box>
    </Layer>
  </Grommet>
);

const PlainLayer = () => (
  <Grommet theme={grommet} full>
    <Box fill background="dark-3">
      <Layer margin="medium" plain>
        <Box pad="large" border={{ color: 'accent-1', size: 'large' }}>
          <Text color="accent-2">Text</Text>
        </Box>
      </Layer>
    </Box>
  </Grommet>
);

class FullLayer extends Component {
  state = {
    showLayer: false,
  };

  render() {
    const { showLayer } = this.state;
    return (
      <Grommet theme={grommet} full>
        <Box
          pad="small"
          fill
          background="dark-3"
          align="center"
          justify="center"
        >
          <Button
            primary
            color="accent-3"
            label="Show"
            onClick={() => this.setState({ showLayer: true })}
          />
          {showLayer && (
            <Layer full>
              <Box fill background="light-4" align="center" justify="center">
                <Button
                  primary
                  label="Close"
                  onClick={() => this.setState({ showLayer: false })}
                />
              </Box>
            </Layer>
          )}
        </Box>
      </Grommet>
    );
  }
}

const ScrollBodyLayer = () => (
  <Grommet theme={grommet}>
    <Layer full="vertical" position="right">
      <Box fill style={{ minWidth: '378px' }}>
        <Box
          direction="row"
          align="center"
          tag="header"
          elevation="small"
          justify="between"
        >
          <Text margin={{ left: 'small' }}>Header</Text>
          <Button icon={<FormClose />} />
        </Box>
        <Box flex overflow="auto" pad="xsmall">
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
          <span>body</span>
        </Box>
        <Box
          tag="footer"
          border={{ side: 'top' }}
          pad="small"
          justify="end"
          direction="row"
          align="center"
        >
          <Button primary label="Save" />
        </Box>
      </Box>
    </Layer>
  </Grommet>
);

const darkLayerTheme = deepMerge(grommet, {
  layer: {
    background: '#000000',
  },
});

const DarkLayer = () => (
  <Grommet theme={darkLayerTheme}>
    <Layer>
      <Text>hi</Text>
    </Layer>
  </Grommet>
);

storiesOf('Layer', module)
  .add('Center', () => <CenterLayer />)
  .add('Dark', () => <DarkLayer />)
  .add('Form', () => <FormLayer />)
  .add('Notification', () => <NotificationLayer />)
  .add('Margin', () => <MarginLayer full />)
  .add('Margin (Center)', () => <MarginLayer margin="large" />)
  .add('Margin Top (Center)', () => (
    <MarginLayer margin={{ top: 'large' }} position="top" />
  ))
  .add('Plain', () => <PlainLayer />)
  .add('Full', () => <FullLayer />)
  .add('Fixed Header, Scroll Body', () => <ScrollBodyLayer />);
