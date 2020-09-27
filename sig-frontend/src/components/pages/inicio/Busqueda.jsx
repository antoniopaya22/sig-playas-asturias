import React, { useContext } from 'react';
import { MapContext } from '../../../context/MapContext';
import SimpleForm from './SimpleForm';
import Leyenda from './Leyenda';
import { actions, mensajes } from '../../../constants';
import { searchBeaches } from '../../../api/inicioApi';
import Seleccionada from './Seleccionada';

export default function Busqueda() {
    const { state, dispatch } = useContext(MapContext);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        searchBeaches()
        .then(result => {
            dispatch({
                type: actions.ACTUALIZAR_PLAYAS,
                data: result
            })
        })
        .catch(_ => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: mensajes.errorHeader,
                    mensaje: mensajes.errorBody
                }
            })
        })
    };

    const onCalcular = e => {
        e.preventDefault();
        console.log('ruta');
    }
    
    const onCancelar = e => {
        e.preventDefault();
        dispatch({
            type: actions.SELECCIONAR_PLAYA,
            data: null
        });
    }

    return(
        <div className="busqueda">
            { !state.seleccionada && 
                <>
                    <SimpleForm onSubmit={handleSubmitSearch} /> 
                    <Leyenda />
                </> }
            { state.seleccionada && <Seleccionada playa={state.seleccionada} handleCalcular={onCalcular} handleCancelar={onCancelar} /> }
        </div>
    );
}