import React, { Component } from "react";
import { Box, Button, Text, TextInput } from "grommet";

class Sign extends Component {
  state = { value: "" };

  render() {
    const { focus, value } = this.state;
    return (
      <Box direction="row" width="large" justify="center">
        <Box
          direction="row"
          align="center"
          width="medium"
          // set opacity
          border={{ side: "bottom", color: focus ? "focus" : "brand" }}
        >
          <TextInput
            plain
            placeholder={<Text size="small">your email address</Text>}
            value={value}
            onChange={event => this.setState({ value: event.target.value })}
            onFocus={() => this.setState({ focus: true })}
            onBlur={() => this.setState({ focus: false })}
          />
        </Box>
        <Button onClick={() => {}}>
          <Box
            round="xlarge"
            background="accent-1"
            pad={{ vertical: "small", horizontal: "medium" }}
          >
            <Text size="small" color="brand" weight="bold" textAlign="center">
              join the team
            </Text>
          </Box>
        </Button>
      </Box>
    );
  }
}

export { Sign };
