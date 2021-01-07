import React, { useState } from 'react';
import EventEmitter from 'event-emitter';

import { Box } from '../Box';
import { Layer } from '../Layer';
import { OPEN_MODAL, CLOSE_MODAL, MODAL_LOAD_STATE } from './constants';
import { PopUpContainer } from './PopUpContainer';

const emitter = new EventEmitter();

const ModalPopUp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUpConfig, setPopUpConfig] = useState({
    title: '',
    message: '',
    body: undefined,
    onPrimaryClick: undefined,
    renderButton: undefined,
    closeOnOutSideClick: false,
    closeOnEscape: false,
  });

  const onClose = () => setModalOpen(false);

  emitter.on(OPEN_MODAL, config => {
    setPopUpConfig({ ...popUpConfig, ...config });
    setModalOpen(true);
  });
  emitter.on(CLOSE_MODAL, () => onClose());
  emitter.on(MODAL_LOAD_STATE, value => setIsLoading(value));

  return (
    <>
      {modalOpen && (
        <Box width="100vw" height="100vh">
          <Layer 
            position="center" 
            onClickOutside={popUpConfig.closeOnOutSideClick ? onClose: null} 
            onEsc={popUpConfig.closeOnEscape ? onClose: null}
          >
            <PopUpContainer
              isLoading={isLoading}
              onClose={onClose}
              {...popUpConfig}
            />
          </Layer>
        </Box>
      )}
    </>
  );
};

const openConfirmAlert = config => emitter.emit(OPEN_MODAL, config);
const closeConfirmAlert = () => emitter.emit(CLOSE_MODAL);
const modalIsLoading = value => emitter.emit(MODAL_LOAD_STATE, value);

export { ModalPopUp, openConfirmAlert, closeConfirmAlert, modalIsLoading };
