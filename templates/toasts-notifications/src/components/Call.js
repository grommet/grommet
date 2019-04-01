import React from "react";
import { Box, Image, Button } from "grommet";
import { Toast } from "./Toast";

export const Call = ({ onClose }) => (
  <Toast position="center" modal>
    <Box align="center">
      <Box height="small" width="small">
        <Image
          src="https://uploads.codesandbox.io/uploads/user/5dfd08c4-cbb6-4165-a264-f2eb4b2f6ef1/-wkS-gremlin.png"
          fit="cover"
        />
      </Box>
      <Box width="small" margin="none" direction="row">
        <Box basis="1/2">
          <Button plain color="dark-1" onClick={onClose}>
            <Box pad="small" align="center" background="status-ok">
              Accept
            </Box>
          </Button>
        </Box>
        <Box basis="1/2">
          <Button plain color="dark-1" onClick={onClose}>
            <Box pad="small" align="center" background="status-error">
              Reject
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  </Toast>
);
