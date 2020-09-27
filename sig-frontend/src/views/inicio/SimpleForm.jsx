import React, { useContext } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {actions, mensajes} from '../../constants';
import { MapContext } from '../../utils/MapContext';

export default function SimpleForm({ onSubmit }) {
    const {state, dispatch} = useContext(MapContext);
    const {distancia, cabecera, avisoOrigen} = mensajes;

    const handleChange = e => {
        if(e.target.validity.valid){
            dispatch({
                type: actions.ACTUALIZAR_TIEMPO,
                data: e.target.value
            });
        }
    }

    const handleFocus = e => {
        if(!state.origen) {
            e.target.blur();
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: cabecera,
                    mensaje: avisoOrigen
                }
            })
        }
    }

    return(
        <Form onSubmit={onSubmit}>
            <FormGroup>
                <legend>Buscar playas cercanas</legend>
                <Label for="distancia">{distancia}</Label>
                <Input 
                    type="text" 
                    name="distancia" 
                    className="form-control" 
                    placeholder={"10"}
                    onChange={handleChange} 
                    onFocus={handleFocus}
                    pattern="[0-9]*" 
                    value={state.tiempo} 
                    maxLength="3"
                />
                <Button color="primary" className="btn-round" block={true} disabled={!state.tiempo}>
                    <i className="now-ui-icons ui-1_zoom-bold"></i> Buscar
                </Button>
            </FormGroup>
        </Form>
    );
}