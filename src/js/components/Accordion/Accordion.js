import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';

import { AccordionContext } from './AccordionContext';

const activeAsArray = active =>
  typeof active === 'number' ? [active] : active;

class Accordion extends Component {
  static defaultProps = {
    animate: true,
    messages: {
      tabContents: 'Tab Contents',
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeIndex } = nextProps;
    const {
      activeIndexes: stateActiveIndexes,
      activeIndex: stateActiveIndex,
    } = prevState;

    const activeIndexes = activeAsArray(activeIndex) || [];

    if (
      (typeof activeIndex !== 'undefined' ||
        activeIndex !== stateActiveIndex) &&
      activeIndexes.join() !== stateActiveIndexes.join()
    ) {
      return { activeIndexes, activeIndex };
    }

    return null;
  }

  state = {
    activeIndexes: [],
  };

  onPanelChange = index => {
    const { activeIndexes } = this.state;
    let nextActiveIndexes = [...(activeIndexes || [])];
    const { onActive, multiple } = this.props;

    const activeIndex = nextActiveIndexes.indexOf(index);
    if (activeIndex > -1) {
      nextActiveIndexes.splice(activeIndex, 1);
    } else if (multiple) {
      nextActiveIndexes.push(index);
    } else {
      nextActiveIndexes = [index];
    }

    this.setState({ activeIndexes: nextActiveIndexes }, () => {
      if (onActive) {
        onActive(nextActiveIndexes);
      }
    });
  };

  render() {
    const { animate, children, messages, ...rest } = this.props;
    const { activeIndexes } = this.state;

    delete rest.onActive;

    return (
      <Box role="tablist" {...rest}>
        {Children.toArray(children).map((panel, index) => (
          <AccordionContext.Provider
            key={`accordion-panel_${index + 0}`}
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

let AccordionDoc;
if (process.env.NODE_ENV !== 'production') {
  AccordionDoc = require('./doc').doc(Accordion); // eslint-disable-line global-require
}
const AccordionWrapper = AccordionDoc || Accordion;

export { AccordionWrapper as Accordion };

/* PropTypes declaration for Merge.
 ** Temporarily Merge doesn't support TS.
 */

Accordion.propTypes = {
  a11yTitle: PropTypes.string,
  alignSelf: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  gridArea: PropTypes.string,
  margin: PropTypes.oneOf([
    'none',
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
  ]),
  activeIndex: PropTypes.number,
  animate: PropTypes.bool,
  children: PropTypes.node,
  onActive: PropTypes.func,
  multiple: PropTypes.bool,
  messages: PropTypes.object,
};

/* Export Default for Merge */
export default Accordion;
