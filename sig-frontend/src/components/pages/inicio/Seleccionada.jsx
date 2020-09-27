import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';

export default function Seleccionada({ playa, handleCalcular, handleCancelar }) {
    return(
        <Card>
            <CardImg src={playa.foto_tiempo_real || playa.foto_estatica} />
            <CardBody>
                <CardTitle>{`${playa.nombre} (${playa.concejo})`}</CardTitle>
                { playa.ocupacion_actual > -1 && <CardText>Ocupación: {playa.ocupacion_actual}</CardText> }
                { playa.ocupacion_media && <CardText>Ocupación media: {playa.ocupacion_media}</CardText> }
                { playa.longitud && <CardText>Longitud: {playa.longitud_playa} metros</CardText> }
                { playa.material && <CardText>Material: {playa.material}</CardText> }
                { playa.accesos && <CardText>Accesos: {playa.accesos}</CardText> }
                { playa.salvamento && <CardText>Salvamento: {playa.salvamento}</CardText> }
                { playa.nucleo_rural && <CardText>Núcleo rural más cercano: {playa.nucleo_rural}</CardText> }
                { playa.nucleo_urbano && <CardText>Núcleo urbano más cercano: {playa.nucleo_urbano}</CardText> }
                <ButtonGroup>
                    <Button onClick={handleCalcular} color="success">Calcular ruta</Button>
                    <Button onClick={handleCancelar} color="danger">Cancelar</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}