import React, {useContext} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MapContext } from '../utils/MapContext';
import {actions} from '../constants'

export default function ModalWindow(){
    const {state, dispatch} = useContext(MapContext);
    const {showModal} = state;
    const toggle = () => {
        dispatch({type: actions.SHOW_MODAL, data: {show: false}})
    }

    return (
        <Modal isOpen={showModal.show} toggle={toggle} >
        <ModalHeader toggle={toggle}>{showModal.cabecera}</ModalHeader>
        <ModalBody>
            { showModal.mensaje }
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={toggle}>Aceptar</Button>
        </ModalFooter>
        </Modal>
      );
}