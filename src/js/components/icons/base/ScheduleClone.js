import React from 'react';
import Schedules from './Schedules';

export default (props) => {
  console.warn(
    'ScheduleClone has been renamed to Schedules.' +
    ' Plese update your import statement.'
  );
  return <Schedules {...props} />;
};
