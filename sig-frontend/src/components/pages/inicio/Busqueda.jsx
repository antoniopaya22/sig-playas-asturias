import React, { useContext } from 'react';
import { MapContext } from './Inicio';
import SimpleForm from './SimpleForm';
import Leyenda from './Leyenda';
import { actions } from '../../../constants';

export default function Busqueda() {
    const { state, dispatch } = useContext(MapContext);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        dispatch({
            type: actions.ACTUALIZAR_ORIGEN, 
            data: { lat: 43.364365, lng: -5.849002 }
        });
    };

    const handleRuta = (e) => {
        e.preventDefault();
        console.log('ruta');
    }
    
    return(
        <div className="busqueda">
            <SimpleForm onSubmit={handleSubmitSearch} />
            <Leyenda />
            {state.destino && 
                <button type="button" className="btn btn-secondary btn-block" onClick={handleRuta}>Calcular ruta</button>
            }
        </div>
    );
}