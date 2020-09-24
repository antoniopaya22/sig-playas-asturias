import React, { useReducer } from 'react';
import MapContainer from './MapContainer';
import { MapContext, mapReducer, initialState } from '../../../context/MapContext';
import './Inicio.css';
import { Container, Row, Col } from 'reactstrap';
import Busqueda from './Busqueda';

export default function Inicio() {
    const [state, dispatch] = useReducer(mapReducer, initialState);

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