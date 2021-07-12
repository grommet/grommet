import React from 'react';

import { Avatar, Anchor, Nav, Grommet, Header, Button } from 'grommet';
import { grommet } from 'grommet/themes';

const gravatarLink =
  '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';

export const Ref = () => {
  const ref = React.createRef<HTMLDivElement>();
  const [color, setColor] = React.useState('');

  const setRandomColor = () => {
    const red = Math.floor(Math.random() * 255).toString(16);
    const green = Math.floor(Math.random() * 255).toString(16);
    const blue = Math.floor(Math.random() * 255).toString(16);
    setColor(`#${red}${green}${blue}`);
  };

  React.useEffect(() => {
    if (ref.current) ref.current.style.backgroundColor = color;
  });

  return (
    <Grommet theme={grommet}>
      <Header background="light-4" pad="small" ref={ref}>
        <Avatar src={gravatarLink} />
        <Nav direction="row">
          <Button primary label="Change Color" onClick={setRandomColor} />
        </Nav>
      </Header>
    </Grommet>
  );
};

export default {
  title: 'Layout/Header/Ref',
};
