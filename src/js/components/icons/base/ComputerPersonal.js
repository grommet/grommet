import React from 'react';
import PersonalComputer from './PersonalComputer';

export default (props) => {
  console.warn(
    'ComputerPersonal has been renamed to PersonalComputer.' +
    ' Plese update your import statement.'
  );
  return <PersonalComputer {...props} />;
};
