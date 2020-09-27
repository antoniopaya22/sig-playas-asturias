import React, { useReducer } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
// core components
import MapContainer from './MapContainer';
import Leyenda from './Leyenda';
import PanelHeader from "components/PanelHeader.jsx";
import { MapContext, mapReducer, initialState } from '../../utils/MapContext';
import SimpleForm from './SimpleForm';
import { actions, mensajes } from '../../constants';
import { searchBeaches } from '../../api/inicioApi';
import Seleccionada from './Seleccionada';

export default function Inicio() {
    const [state, dispatch] = useReducer(mapReducer, initialState);
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        searchBeaches({
            minutes: Number.parseInt(state.tiempo),
            latitud: state.origen.lat + '',
            longitud: state.origen.lng + ''
        })
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
    return(
        <>
            <PanelHeader size="sm" />
            <div className="content">
                    <MapContext.Provider value={{ state, dispatch }}>  
                        <Row>
                            <Col xs={8}>
                                <Card>
                                    <CardHeader><h3>Mapa con la ocupación de las playas de Asturias</h3></CardHeader>
                                    <CardBody>
                                        <div
                                            id="map"
                                            className="map"
                                            style={{ position: "relative", overflow: "hidden" }}
                                        >
                                            <MapContainer/>
                                        </div>
                                    </CardBody>
                                    <CardFooter>
                                        <Leyenda/>
                                    </CardFooter>
                                </Card>
                            </Col>
                            <Col xs={4}>
                                <Card>
                                    <CardBody>
                                        <Seleccionada/>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>     
                        <Row>
                            <Col xs={8}>
                                <Card>
                                    <CardBody>
                                        <SimpleForm onSubmit={handleSubmitSearch} /> 
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>   
                    </MapContext.Provider>
                </div>
        </>
    );
}
