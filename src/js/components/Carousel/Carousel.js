import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { withFocus, withTheme } from '../hocs';
import { evalStyle } from '../../utils';

class Carousel extends Component {
  state = { activeIndex: 0 };

  componentDidMount() {
    if (this.props.play) {
      this.play();
    }
  }

  componentDidUpdate(prevProps) {
    const { play } = this.props;
    if (play && (!prevProps.play || play !== prevProps.play)) {
      this.play();
    } else if (!play && prevProps.play) {
      clearInterval(this.timer);
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
    const { children, fill, focus, theme, ...rest } = this.props;
    const { activeIndex, priorActiveIndex } = this.state;

    const lastIndex = Children.count(children) - 1;
    const onLeft = (activeIndex > 0 ? this.onLeft : undefined);
    const onRight = (activeIndex < lastIndex ? this.onRight : undefined);

    const CurrentIcon = theme.carousel.icons.current;
    const dark = theme.dark;
    const iconColor = evalStyle((theme.carousel.icons.color ||
      theme.global.control.color)[dark ? 'dark' : 'light'], theme);

    const selectors = [];
    const wrappedChildren = Children.map(children, (child, index) => {
      selectors.push((
        <Button
          key={index}
          icon={(
            <CurrentIcon
              color={activeIndex === index ? iconColor : undefined}
            />
          )}
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

    const NextIcon = theme.carousel.icons.next;
    const PreviousIcon = theme.carousel.icons.previous;

    return (
      <Keyboard onLeft={onLeft} onRight={onRight}>
        <Stack guidingChild={activeIndex} fill={fill} {...rest}>
          {wrappedChildren}
          <Box tabIndex='0' focus={focus} fill={true} direction='row' justify='between'>
            <Box fill='vertical'>
              <Button fill={true} onClick={onLeft} hoverIndicator={true}>
                <Box justify='center'>
                  <PreviousIcon />
                </Box>
              </Button>
            </Box>
            <Box justify='end'>
              <Box direction='row' justify='center'>
                {selectors}
              </Box>
            </Box>
            <Box fill='vertical'>
              <Button fill={true} onClick={onRight} hoverIndicator={true}>
                <Box justify='center'>
                  <NextIcon />
                </Box>
              </Button>
            </Box>
          </Box>
        </Stack>
      </Keyboard>
    );
  }
}

let CarouselDoc;
if (process.env.NODE_ENV !== 'production') {
  CarouselDoc = require('./doc').doc(Carousel); // eslint-disable-line global-require
}
const CarouselWrapper = compose(
  withFocus,
  withTheme,
)(CarouselDoc || Carousel);

export { CarouselWrapper as Carousel };
