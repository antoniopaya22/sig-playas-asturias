import React, { useContext } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';
import { MapContext } from '../../utils/MapContext';
import { actions } from '../../constants';

export default function Seleccionada() {
    const { state, dispatch } = useContext(MapContext);

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
                    <h3>Manual de uso:</h3>
                    <p>En el mapa se encuentran representadas las playas de Asturias junto con su índice de ocupación.</p>
                    <p>Si pulsas en una de las playas podrás obtener información más detallada de esta.</p>
                    <hr/>
                    <p>Tienes la opción de buscar las playas mas cercanas a tu localización actual (si has aceptado los permisos)
                        o al punto que selecciones en el mapa (con el marcador azul).
                    </p>
                </> }
            { state.seleccionada && 
                <>
                    <Card>
                        <CardImg src={state.seleccionada.foto_tiempo_real || state.seleccionada.foto_estatica} />
                        <CardBody>
                            <CardTitle>{`${state.seleccionada.nombre} (${state.seleccionada.concejo})`}</CardTitle>
                            { state.seleccionada.ocupacion_actual && 
                                <CardText>
                                    <span className="text-primary"> Ocupación:</span> 
                                    {Number(state.seleccionada.ocupacion_actual) === -1 ? ' Sin datos' : Number(state.seleccionada.ocupacion_actual).toFixed(2) + '%'}
                                </CardText> }
                            { state.seleccionada.ocupacion_media && 
                                <CardText>
                                    <span className="text-primary"> Ocupación media:</span> {state.seleccionada.ocupacion_media}
                                </CardText> }
                            { state.seleccionada.longitud && 
                                <CardText>
                                    <span className="text-primary"> Longitud:</span> {state.seleccionada.longitud_playa} metros
                                </CardText> }
                            { state.seleccionada.material && 
                                <CardText>
                                    <span className="text-primary"> Material:</span> {state.seleccionada.material}
                                </CardText> }
                            { state.seleccionada.accesos && 
                                <CardText>
                                    <span className="text-primary"> Accesos:</span> {state.seleccionada.accesos}
                                </CardText> }
                            { state.seleccionada.salvamento && 
                                <CardText>
                                    <span className="text-primary"> Salvamento:</span> {state.seleccionada.salvamento}
                                </CardText> }
                            { state.seleccionada.nucleo_rural && 
                                <CardText>
                                    <span className="text-primary"> Núcleo rural más cercano:</span> {state.seleccionada.nucleo_rural}
                                </CardText> }
                            { state.seleccionada.nucleo_urbano && 
                                <CardText>
                                    <span className="text-primary"> Núcleo urbano más cercano:</span> {state.seleccionada.nucleo_urbano}
                                </CardText> }
                            <ButtonGroup>
                                <Button onClick={onCancelar} color="danger">Cerrar</Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>
                </>
            }
        </div>
    )
}