import React, { useContext } from 'react';
import { MapContext } from './Inicio';
import SimpleForm from './SimpleForm';
import Leyenda from './Leyenda';
import { Button } from 'reactstrap';
import { actions } from '../../../constants';
import { getPlayas } from '../../../api/inicioApi';

export default function Busqueda() {
    const { state, dispatch } = useContext(MapContext);

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        getPlayas()
            .then(result => {
                dispatch({
                    type: actions.ACTUALIZAR_POSICIONES,
                    data: result
                })
            })
            .catch(error => console.error(error));

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
                <Button block={true} onClick={handleRuta}>CalcularRuta</Button>
            }
        </div>
    );
}