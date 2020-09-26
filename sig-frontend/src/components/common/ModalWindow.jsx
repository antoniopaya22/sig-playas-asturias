import React, {useContext, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MapContext } from '../../context/MapContext';
import {actions} from '../../constants'

export default function ModalWindow({cabecera, mensaje, buttonLabel1, buttonLabel2, buttonAction}){
    const {state, dispatch} = useContext(MapContext);
    const toggle = () => {
        dispatch({type: actions.SHOW_MODAL, data: false})
    }

    return (
        <Modal isOpen={state.showModal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{cabecera}</ModalHeader>
        <ModalBody>
            { mensaje }
        </ModalBody>
        <ModalFooter>
            { buttonLabel2 && <Button color="primary" onClick={buttonAction}>{buttonLabel2}</Button> } 
            {' '}
            { buttonLabel1 && <Button color="secondary" onClick={toggle}>{buttonLabel1}</Button> }
        </ModalFooter>
        </Modal>
      );
}