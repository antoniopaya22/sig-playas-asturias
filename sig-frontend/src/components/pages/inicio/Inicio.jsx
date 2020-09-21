import React, { useReducer } from 'react';
import MapContainer from './MapContainer';
import './Inicio.css';
import { Container, Row, Col } from 'reactstrap';
import Busqueda from './Busqueda';
import { actions } from '../../../constants';

export const MapContext = React.createContext();
const initialState = {
    origen: null,
    ruta: null,
    playas: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.ACTUALIZAR_RUTA:
            return { ...state, ruta: action.data };

        case actions.ACTUALIZAR_POSICIONES:
            return { playas: action.data.playas, origen: action.data.origen };
            
        default:
            return initialState;
    }
}

export default function Inicio() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <MapContext.Provider value={{ state, dispatch }}>
            <Container fluid={true} className="inicio">            
                <Row>
                    <Col xs={12} lg={9} tag="section">
                        <MapContainer/>
                    </Col>
                    <Col xs={12} lg={3} tag="aside">
                        <Busqueda />
                    </Col>
                </Row>
            </Container>
        </MapContext.Provider>
    );
}