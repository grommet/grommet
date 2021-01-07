import React from 'react';
import 'jest-styled-components';
import '@testing-library/jest-dom/extend-expect';
import {
  cleanup,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { createPortal } from '../../../utils/portal';
import {
  closeConfirmAlert,
  modalIsLoading,
  ModalPopUp,
  openConfirmAlert,
} from '../ModalPopUp';

describe('ModalPopUp', () => {
  const openButtonText = 'TEST OPEN MODAL';
  const title = 'TEST MODAL';
  const message = 'TEST MESSAGE CONTENT';
  const okLabel = 'OK';
  const cancelLabel = 'Cancel';

  const clicks = {
    okButtonClick: jest.fn(),
  };
  const okButtonClickSpy = jest.spyOn(clicks, 'okButtonClick');

  const getPopUpPayload = type => {
    /*
     * Type Values
     * 
     * 0 - basic
     * 1 - without title
     * 2 - custom message
     * 3 - custom body
     * 4 - without onPrimaryClick
     * 
     */

    // eslint-disable-next-line default-case
    switch (type) {
      case 0: return {
        title,
        message,
        onPrimaryClick: clicks.okButtonClick,
      }
      case 1: return {
        message,
        onPrimaryClick: clicks.okButtonClick,
      }
      case 2: return {
        title: <span>{title}</span>,
        message: <span>{message}</span>,
        renderButton: <button type="button" onClick={clicks.okButtonClick}>
                        {okLabel}
                      </button>,
      }
      case 3: return {
        title: <span>{title}</span>,
        body: <div><span>{message}</span></div>,
        renderButton: <button type="button" onClick={clicks.okButtonClick}>
                        {okLabel}
                      </button>,
      }
      case 4: return { title, message }
    };

    return null;
    
  }

  beforeEach(createPortal);
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  /* Snapshot Tests */

  it('Before opening pop-up', () => {
    const { baseElement } = render(<ModalPopUp id="test-modal-pop-up" />);
    expect(baseElement).toMatchSnapshot();
  });

  it('Basic', () => {
    const { baseElement, getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));

    expect(baseElement).toMatchSnapshot();
  });

  it('Without Title', () => {
    const { baseElement, getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(1))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));

    expect(baseElement).toMatchSnapshot();
  });

  it('Custom render elements', () => {
    const { baseElement, getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(2))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));

    expect(baseElement).toMatchSnapshot();
  });

  it('Custom render elements - custom body', () => {
    const { baseElement, getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(3))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));

    expect(baseElement).toMatchSnapshot();
  });

  /* Unit Test Cases */

  it('Pop-up open and close', () => {
    const { getByText, queryByRole } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
        <button
          type="button"
          onClick={closeConfirmAlert}
        >
          {cancelLabel}_modal_close
        </button>
      </>,
    );
    
    expect(queryByRole('dialog', { name: 'modal-pop-up' })).toBeNull();

    fireEvent.click(getByText(openButtonText));
    expect(queryByRole('dialog', { name: 'modal-pop-up' })).toBeInTheDocument();

    fireEvent.click(getByText(`${cancelLabel}_modal_close`));
    waitForElementToBeRemoved(() => queryByRole(
      'dialog', { name: 'modal-pop-up' },
    )).then(() => {
      expect(queryByRole('dialog', { name: 'modal-pop-up' })).toBeNull();
    });
  });

  it('Basic - OK Click', () => {
    const { getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));
    fireEvent.click(getByText(okLabel));

    expect(okButtonClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Custom elements - OK Click', () => {
    const { getByText } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));
    fireEvent.click(getByText(okLabel));

    expect(okButtonClickSpy).toHaveBeenCalledTimes(1);
  });

  it('Basic - OK Click - without onPrimaryClick option', () => {
    const { getByText, queryByRole } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(4))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));
    fireEvent.click(getByText(okLabel));

    waitForElementToBeRemoved(() => queryByRole(
      'dialog', { name: 'modal-pop-up' },
    )).then(() => {
      expect(queryByRole('dialog', { name: 'modal-pop-up' })).toBeNull();
    });
  });
  
  it('Cancel click', () => {
    const { getByText, queryByRole } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));
    fireEvent.click(getByText(cancelLabel));

    waitForElementToBeRemoved(() => queryByRole(
      'dialog', { name: 'modal-pop-up' },
    )).then(() => {
      expect(queryByRole('dialog', { name: 'modal-pop-up' })).toBeNull();
    });
  });

  it('Loading state', () => {
    const { getByText, queryByRole } = render(
      <>
        <ModalPopUp id="test-modal-pop-up" />
        <button
          type="button"
          onClick={() => openConfirmAlert(getPopUpPayload(0))}
        >
          {openButtonText}
        </button>
        <button
          type="button"
          onClick={() => modalIsLoading(true)}
        >
          SET_LOADER
        </button>
        <button
          type="button"
          onClick={() => modalIsLoading(false)}
        >
          RESET_LOADER
        </button>
      </>,
    );

    fireEvent.click(getByText(openButtonText));
    expect(queryByRole('alert', { name: 'button-loader' })).toBeNull();

    fireEvent.click(getByText('SET_LOADER'));
    expect(queryByRole('alert', { name: 'button-loader' })).toBeInTheDocument();

    fireEvent.click(getByText('RESET_LOADER'));
    expect(queryByRole('alert', { name: 'button-loader' })).toBeNull();
  });

});
