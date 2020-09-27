import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, ButtonGroup} from 'reactstrap';

export default function Seleccionada({ playa, handleCancelar }) {
    return(
        <Card>
            <CardImg src={playa.foto_tiempo_real || playa.foto_estatica} />
            <CardBody>
                <CardTitle>{`${playa.nombre} (${playa.concejo})`}</CardTitle>
                { playa.ocupacion_actual && 
                    <CardText>
                        <span className="text-primary"> Ocupación:</span> 
                        {Number(playa.ocupacion_actual) === -1 ? ' Sin datos' : Number(playa.ocupacion_actual).toFixed(2) + '%'}
                    </CardText> }
                { playa.ocupacion_media && 
                    <CardText>
                        <span className="text-primary"> Ocupación media:</span> {playa.ocupacion_media}
                    </CardText> }
                { playa.longitud && 
                    <CardText>
                        <span className="text-primary"> Longitud:</span> {playa.longitud_playa} metros
                    </CardText> }
                { playa.material && 
                    <CardText>
                        <span className="text-primary"> Material:</span> {playa.material}
                    </CardText> }
                { playa.accesos && 
                    <CardText>
                        <span className="text-primary"> Accesos:</span> {playa.accesos}
                    </CardText> }
                { playa.salvamento && 
                    <CardText>
                        <span className="text-primary"> Salvamento:</span> {playa.salvamento}
                    </CardText> }
                { playa.nucleo_rural && 
                    <CardText>
                        <span className="text-primary"> Núcleo rural más cercano:</span> {playa.nucleo_rural}
                    </CardText> }
                { playa.nucleo_urbano && 
                    <CardText>
                        <span className="text-primary"> Núcleo urbano más cercano:</span> {playa.nucleo_urbano}
                    </CardText> }
                <ButtonGroup>
                    <Button onClick={handleCancelar} color="danger">Cerrar</Button>
                </ButtonGroup>
            </CardBody>
        </Card>
    )
}