// import React from 'react';
// import PropTypes from 'prop-types';
// import { grommet } from 'grommet/themes';
// eslint-disable-next-line max-len
// import { AnnounceContext, Box, Button, Grommet, Heading, Spinner, Text } from 'grommet';

// const AnnouncedSpinner = ({ announce, message, mode, role }) => {
//   React.useEffect(() => {
//     const timeout = 30000;
//     announce(message, mode, timeout);
//   }, [announce, message, mode]);

//   return (
//     <Box align="center" gap="small">
//     <Button label="load">
//       <Spinner color="white" />
//       <Text align="center" role={role} aria-live={mode}>
//         {message}
//       </Text>
//     </Box>
//   );
// };

// AnnouncedSpinner.propTypes = {
//   announce: PropTypes.func.isRequired,
//   message: PropTypes.string,
//   mode: PropTypes.string,
//   role: PropTypes.string,
// };

// AnnouncedSpinner.defaultProps = {
//   message: 'Here is a simple announcement. Shimi. This will soon disappear',
//   mode: 'polite',
//   role: 'log',
// };

// const AnnounceContextComponent = props => (
//   <Grommet theme={grommet} full>
//     <Box justify="center" align="center" background="brand" fill>
//       <Heading>Welcome to announcement section</Heading>

//       <AnnounceContext.Consumer>
//         {announce => <AnnouncedSpinner announce={announce} {...props} />}
//         {announce => <AnnouncedSpinner announce={announce} {...props} />}
//       </AnnounceContext.Consumer>
//     </Box>
//   </Grommet>
// );

// export const Announced = () => <AnnounceContextComponent />;

// export default {
//   title: 'Utilities/Spinner/Announced',
// };
