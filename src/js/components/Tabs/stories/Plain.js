import React from 'react';
import { storiesOf } from '@storybook/react';
import UncontrolledTabs from './Uncontrolled';

storiesOf('Tabs', module).add('Plain', () => <UncontrolledTabs plain />);
