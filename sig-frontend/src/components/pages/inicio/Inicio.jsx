import React, { useReducer } from 'react';
import MapContainer from './MapContainer';
import './Inicio.css';
import Busqueda from './Busqueda';
import { actions } from '../../../constants';

export const MapContext = React.createContext();
const initialState = {
    origen: null,
    destino: null,
    playas: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ACTUALIZAR_ORIGEN: 
            return { origen: action.data };

        case actions.ACTUALIZAR_DESTINO:
            return { destino: action.data };

        default:
            return initialState;
    }
}

export default function Inicio() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <MapContext.Provider value={{ state, dispatch }}>
            <div className="container-fluid inicio">
                <div className="row">
                    <section className="col-12 col-lg-9">
                        <MapContainer/>
                    </section>
                    <aside className="col-12 col-lg-3">
                        <Busqueda />
                    </aside>
                </div>
            </div>
        </MapContext.Provider>
    );
}