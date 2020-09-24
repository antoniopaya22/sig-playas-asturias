import React, {useContext} from 'react';
import { Marker } from '@react-google-maps/api';
import { icons } from '../../constants';
import { MapContext } from '../../context/MapContext'

export default function Playa({ playa }) {
    const { state } = useContext(MapContext);
    let marcadorActual = null;

    const onLoad = marker => {
        marcadorActual = marker;
    }

    const handleClick = e => {
        const { map } = state;
        const currentInfoWindow = new window.google.maps.InfoWindow({
            content: buildContent(),
            maxHeight: 500
        });
        currentInfoWindow.open(map, marcadorActual);
    }

    const buildContent = () => {
        return `<div class="info-playa">
        <h1>${playa.nombre} (${playa.concejo})</h1>
        <img src=${playa.foto_estatica} />
        <ul>
            <li><strong>Ocupación actual:</strong> ${playa.ocupacion_actual}%</li>
            <li><strong>Ocupación media:</strong> ${playa.ocupacion_media}</li>
            <li><strong>Material:</strong> ${playa.material}</li>
            <li><strong>Accesos:</strong> ${playa.accesos}</li>
            <li><strong>Salvamento</strong> ${playa.salvamento}</li>
        </ul>
    </div>`;
    }

    const calcularOcupacion = valor => {
        const v = Number(valor);

        switch (true) {
            case v === -1:
                return 'sinDatos'

                case v < 35:
                return 'baja';

            case v < 70:
                return 'media';

            case v < 91:
                return 'alta';
            
            case v >= 91:
                return 'excesiva';

            default:
                return 'excesiva';
        }
    }

    return (<Marker position={{lat: Number(playa.latitud), lng: Number(playa.longitud)}} 
                icon={icons[calcularOcupacion(playa.ocupacion_actual)]} 
                onLoad={onLoad}
                onClick={handleClick} />
        )
}