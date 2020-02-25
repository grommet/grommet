import React, { Children, Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { normalizeColor } from '../../utils';
import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Keyboard } from '../Keyboard';
import { Stack } from '../Stack';
import { withFocus } from '../hocs';

class Carousel extends Component {
  constructor(p) {
    super(p);
    this.state = { activeIndex: p.initialChild };
  }

  componentDidMount() {
    const { play } = this.props;
    if (play) {
      this.play();
    }
  }

  componentDidUpdate(prevProps) {
    const { play } = this.props;
    if (typeof window !== 'undefined') {
      this.handleActive();
    }
    if (play && (!prevProps.play || play !== prevProps.play)) {
      this.play();
    } else if (!play && prevProps.play) {
      clearInterval(this.timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleActive = () => {
    const { activeIndex, priorActiveIndex } = this.state;
    const activeCard = document.getElementById(`active${activeIndex}`);
    if (activeCard) {
      const activeParent = activeCard.parentElement;
      activeParent.style.zIndex = 10;
    }
    if (priorActiveIndex) {
      const prevCard = document.getElementById(`active${priorActiveIndex}`)
        .parentElement;
      prevCard.style.zIndex = 0;
    }
  };

  play = () => {
    const { play } = this.props;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { children } = this.props;
      const { activeIndex } = this.state;
      const lastIndex = Children.count(children) - 1;
      if (activeIndex < lastIndex) {
        this.setState({
          activeIndex: activeIndex + 1,
          priorActiveIndex: activeIndex,
        });
      } else {
        this.setState({ activeIndex: 0, priorActiveIndex: activeIndex });
      }
    }, play);
  };

  onRight = () => {
    const { activeIndex } = this.state;
    clearInterval(this.timer);
    this.setState({
      activeIndex: activeIndex + 1,
      priorActiveIndex: activeIndex,
    });
  };

  onLeft = () => {
    const { activeIndex } = this.state;
    clearInterval(this.timer);
    this.setState({
      activeIndex: activeIndex - 1,
      priorActiveIndex: activeIndex,
    });
  };

  onSelect = index => () => {
    const { activeIndex } = this.state;
    clearInterval(this.timer);
    this.setState({ activeIndex: index, priorActiveIndex: activeIndex });
  };

  render() {
    const { children, controls, fill, focus, theme, ...rest } = this.props;
    const { activeIndex, priorActiveIndex } = this.state;

    const showArrows = controls && controls !== 'selectors';
    const showSelectors = controls && controls !== 'arrows';
    const lastIndex = Children.count(children) - 1;
    const onLeft = activeIndex > 0 ? this.onLeft : undefined;
    const onRight = activeIndex < lastIndex ? this.onRight : undefined;

    const CurrentIcon = theme.carousel.icons.current;
    const iconColor = normalizeColor(
      theme.carousel.icons.color || 'control',
      theme,
    );

    const NextIcon = theme.carousel.icons.next;
    const PreviousIcon = theme.carousel.icons.previous;
    const nextIconDisabled = activeIndex >= lastIndex;
    const previousIconDisabled = activeIndex <= 0;

    const selectors = [];
    const wrappedChildren = Children.map(children, (child, index) => {
      selectors.push(
        <Button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          icon={
            <CurrentIcon
              color={activeIndex === index ? iconColor : undefined}
            />
          }
          onClick={this.onSelect(index)}
        />,
      );

      let animation;
      if (index === activeIndex) {
        if (priorActiveIndex !== undefined) {
          animation = {
            type: priorActiveIndex < activeIndex ? 'slideLeft' : 'slideRight',
            size: 'xlarge',
            duration: theme.carousel.animation.duration,
          };
        }
      } else if (index === priorActiveIndex) {
        animation = {
          type: 'fadeOut',
          duration: theme.carousel.animation.duration,
        };
      } else {
        animation = { type: 'fadeOut', duration: 0 };
      }

      return (
        <Box fill={fill} overflow="hidden" id={`active${index}`}>
          <Box focus={focus} fill direction="row" justify="between">
            {showArrows && (
              <Button
                alignSelf="center"
                fill="vertical"
                icon={
                  <PreviousIcon
                    color={normalizeColor(
                      previousIconDisabled
                        ? theme.carousel.disabled.icons.color
                        : theme.carousel.icons.color,
                      theme,
                    )}
                  />
                }
                plain
                disabled={previousIconDisabled}
                onClick={onLeft}
                hoverIndicator
              />
            )}
            <Box fill={fill} animation={animation}>
              {child}
            </Box>
            {showArrows && (
              <Button
                alignSelf="center"
                fill="vertical"
                icon={
                  <NextIcon
                    color={normalizeColor(
                      nextIconDisabled
                        ? theme.carousel.disabled.icons.color
                        : theme.carousel.icons.color,
                      theme,
                    )}
                  />
                }
                plain
                disabled={nextIconDisabled}
                onClick={onRight}
                hoverIndicator
              />
            )}
          </Box>
          {showSelectors && (
            <Box justify="end" fill={!showArrows && 'horizontal'}>
              <Box direction="row" justify="center">
                {selectors}
              </Box>
            </Box>
          )}
        </Box>
      );
    });

    return (
      // The controls rest on top of the children,
      // making it not possible to click carousel card elements.
      <Keyboard onLeft={onLeft} onRight={onRight}>
        <Stack guidingChild={activeIndex} fill={fill} {...rest}>
          {wrappedChildren}
        </Stack>
      </Keyboard>
    );
  }
}

Carousel.defaultProps = {
  initialChild: 0,
  controls: true,
};
Object.setPrototypeOf(Carousel.defaultProps, defaultProps);

let CarouselDoc;
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  CarouselDoc = require('./doc').doc(Carousel);
}
const CarouselWrapper = compose(
  withFocus(),
  withTheme,
)(CarouselDoc || Carousel);

export { CarouselWrapper as Carousel };

/*           <Box
            tabIndex="0"
            focus={focus}
            fill
            direction="row"
            justify="between"
          >
            {showSelectors && (
              <Box justify="end" fill={!showArrows && 'horizontal'}>
                <Box direction="row" justify="center">
                  {selectors}
                </Box>
              </Box>
            )}
          </Box> */
