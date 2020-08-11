import React, { useRef, useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';

import {
  Grommet,
  grommet,
  Box,
  Button,
  Drop,
  DropButton,
  Text,
  Nav,
  Heading,
  TextInput,
  Form,
  FormField,
} from 'grommet';
import {
  Calculator,
  Bar,
  Bug,
  Alert,
  Close,
  Achievement,
  Action,
} from 'grommet-icons';

const icons = [
  { name: 'Bar', icon: <Bar /> },
  { name: 'Bug', icon: <Bug /> },
  { name: 'Calculator', icon: <Calculator /> },
];
const menuIcons = [
  { name: 'Alert', icon: <Alert /> },
  { name: 'Achievement', icon: <Achievement /> },
];

const DropContent = ({ onClose }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
  });
  return (
    <Box pad="small" background="slategray">
      <Box direction="row" justify="between" align="center">
        <Heading level={3} margin="small" color="white">
          Heading
        </Heading>
        <Button icon={<Close color="white" />} onClick={onClose} />
      </Box>
      <Text color="white">Content</Text>
      <Form>
        <FormField>
          <TextInput ref={ref} />
        </FormField>
      </Form>
    </Box>
  );
};

const SidebarButton = ({ icon, index, name }) => {
  const [over, setOver] = useState(false);
  const ref = useRef();

  return (
    <Box>
      <Button
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        plain
        onClick={() => console.log(`Clicked me ${index}`)}
      >
        <Box pad={{ vertical: 'small' }} align="center">
          {icon}
        </Box>
      </Button>
      {ref.current && over && (
        <Drop
          align={{ left: 'right' }}
          target={ref.current}
          plain
          trapFocus={false}
        >
          <Box pad="small" background="pink">
            <Text color="white">{name}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

const SidebarDropButton = ({ icon, name }) => {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState(false);

  const ref = useRef();

  return (
    <Box fill="horizontal">
      <DropButton
        ref={ref}
        onMouseOver={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        onFocus={() => setOver(true)}
        onBlur={() => setOver(false)}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        dropAlign={{
          top: 'top',
          right: 'right',
          left: 'right',
          bottom: 'top',
        }}
        dropContent={<DropContent onClose={() => setOpen(false)} />}
      >
        <Box>{icon}</Box>
      </DropButton>
      {ref.current && over && (
        <Drop
          align={{ left: 'right' }}
          target={ref.current}
          plain
          trapFocus={false}
        >
          <Box pad="small" background="pink">
            <Text color="white">{name}</Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};
const Sidebar = () => {
  return (
    <Box direction="row" fill>
      <Box
        direction="column"
        basis="15%"
        justify="between"
        style={{ border: 'blue solid 4px' }}
        align="center"
      >
        <Box>
          <Nav>
            {icons.map(({ icon, name }, index) => {
              return (
                <SidebarButton
                  key={name}
                  icon={icon}
                  index={index}
                  name={name}
                />
              );
            })}
            {menuIcons.map(({ icon, name }, index) => {
              return (
                <SidebarDropButton
                  key={name}
                  icon={icon}
                  index={index}
                  name={name}
                />
              );
            })}
          </Nav>
        </Box>
        <Box>
          <SidebarButton icon={<Action />} index="Action" name="Action" />
        </Box>
      </Box>
    </Box>
  );
};

const Tooltips = () => {
  return (
    <Grommet theme={grommet} full>
      <Sidebar />
    </Grommet>
  );
};

storiesOf('Drop', module).add('Tooltips', () => <Tooltips />);
