import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { Previous, Next, Subtract } from 'grommet-icons';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';

import { withTheme } from '../hocs';

import doc from './doc';

class Carousel extends Component {
  state = { activeIndex: 0 };

  componentDidMount() {
    if (this.props.play) {
      this.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.play && !nextProps.play) {
      clearInterval(this.timer);
    } else if (nextProps.play && !this.props.play) {
      this.play();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  play = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { children } = this.props;
      const { activeIndex } = this.state;
      const lastIndex = Children.count(children) - 1;
      if (activeIndex < lastIndex) {
        this.setState({ activeIndex: activeIndex + 1, priorActiveIndex: activeIndex });
      } else {
        this.setState({ activeIndex: 0, priorActiveIndex: activeIndex });
      }
    }, this.props.play);
  }

  onRight = () => {
    const { activeIndex } = this.state;
    clearInterval(this.timer);
    this.setState({ activeIndex: activeIndex + 1, priorActiveIndex: activeIndex });
  }

  onLeft = () => {
    const { activeIndex } = this.state;
    clearInterval(this.timer);
    this.setState({ activeIndex: activeIndex - 1, priorActiveIndex: activeIndex });
  }

  onSelect = index =>
    () => {
      const { activeIndex } = this.state;
      clearInterval(this.timer);
      this.setState({ activeIndex: index, priorActiveIndex: activeIndex });
    };

  render() {
    const { children, fill, ...rest } = this.props;
    const { activeIndex, priorActiveIndex } = this.state;

    const lastIndex = Children.count(children) - 1;
    const onLeft = (activeIndex > 0 ? this.onLeft : undefined);
    const onRight = (activeIndex < lastIndex ? this.onRight : undefined);

    const selectors = [];
    const wrappedChildren = Children.map(children, (child, index) => {
      selectors.push((
        <Button
          key={index}
          icon={<Subtract color={activeIndex === index ? 'brand' : undefined} />}
          onClick={this.onSelect(index)}
        />
      ));

      let animation;
      if (index === activeIndex) {
        if (priorActiveIndex !== undefined) {
          animation = {
            type: (priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight'),
            size: 'xlarge',
          };
        }
      } else if (index === priorActiveIndex) {
        animation = { type: 'fadeOut' };
      } else {
        animation = { type: 'fadeOut', duration: 0 };
      }

      return (
        <Box overflow='hidden'>
          <Box animation={animation}>
            {child}
          </Box>
        </Box>
      );
    });

    return (
      <Keyboard onLeft={onLeft} onRight={onRight}>
        <Stack guidingChild={activeIndex} tabIndex='0' fill={fill} {...rest}>
          {wrappedChildren}
          <Box fill={true} direction='row' justify='between'>
            <Box fill='vertical'>
              <Button fill='true' onClick={onLeft} hoverIndicator={true}>
                <Box justify='center'>
                  <Previous />
                </Box>
              </Button>
            </Box>
            <Box justify='end'>
              <Box direction='row' justify='center'>
                {selectors}
              </Box>
            </Box>
            <Box fill='vertical'>
              <Button fill='true' onClick={onRight} hoverIndicator={true}>
                <Box justify='center'>
                  <Next />
                </Box>
              </Button>
            </Box>
          </Box>
        </Stack>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Carousel);
}

export default compose(
  withTheme,
)(Carousel);
