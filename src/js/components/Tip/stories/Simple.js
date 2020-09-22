// import React, { createRef, useState, useRef } from 'react';
// import { storiesOf } from '@storybook/react';

// import { grommet, Box, Button, Grommet, Text, Tip, Drop } from 'grommet';

// // TODO light and dark
// // Tooltip on Charts
// // animation of tooltip
// // auto rounding (anything) per alignment
// // useRef and createRef
// const Example = () => {
//   const [over, setOver] = useState(false);
//   const ref = useRef();
//   return (
//     <Grommet theme={grommet}>
//       <Box pad="large">
//         {/* 1 */}
//         <Tip align={{ top: 'bottom' }} content={<Box></Box>}>
//           <Button background="purple" label="Primary" onClick={() => {}} />
//         </Tip>
//         {/* 2 */}
//         <Button
//           ref={ref}
//           background="purple"
//           label="Primary"
//           onClick={() => {}}
//         />
//         <Tip target={ref.current}></Tip>

//         {/* 3 */}
//         <Button background="purple" label="Primary" onClick={() => {}} tip={} />
//       </Box>
//     </Grommet>
//   );
// };

// storiesOf('Tip', module).add('Simple', () => <Example />, {
//   chromatic: { disable: true },
// });
