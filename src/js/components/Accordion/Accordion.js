import React, {
  Component,
  Children,
} from 'react';
import { compose } from 'recompose';

import { Box } from '../Box';

import { withTheme } from '../hocs';

import doc from './doc';

import { AccordionContext } from './AccordionContext';

const activeAsArray = active => ((typeof active === 'number') ? (
  [active]
) : active);

class Accordion extends Component {
  static defaultProps = {
    animate: true,
    messages: {
      tabContents: 'Tab Contents',
    },
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeIndex } = nextProps;
    const { activeIndexes: stateActiveIndexes = [] } = prevState;

    const activeIndexes = activeAsArray(activeIndex) || [];

    if (
      activeIndex &&
      activeIndexes.join() !== stateActiveIndexes.join()
    ) {
      return { activeIndexes };
    }
    return null;
  }

  state = {
    activeIndexes: [],
  }

  onPanelChange = (index) => {
    let activeIndexes = [...this.state.activeIndexes];
    const { onActive, multiple } = this.props;

    const activeIndex = activeIndexes.indexOf(index);
    if (activeIndex > -1) {
      activeIndexes.splice(activeIndex, 1);
    } else if (multiple) {
      activeIndexes.push(index);
    } else {
      activeIndexes = [index];
    }

    this.setState({ activeIndexes }, () => {
      if (onActive) {
        if (!multiple) {
          onActive(activeIndexes[0]);
        } else {
          onActive(activeIndexes);
        }
      }
    });
  }

  render() {
    const {
      animate,
      children,
      messages,
      ...rest
    } = this.props;
    const { activeIndexes } = this.state;

    return (
      <Box role='tablist' {...rest} overflow='auto'>
        {Children.toArray(children).map((panel, index) => (
          <AccordionContext.Provider
            key={`accordion-panel_${index}`}
            value={{
              active: activeIndexes.indexOf(index) > -1,
              animate,
              messages,
              onPanelChange: () => this.onPanelChange(index),
            }}
          >
            {panel}
          </AccordionContext.Provider>
        ))}
      </Box>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Accordion);
}

export default compose(
  withTheme,
)(Accordion);
