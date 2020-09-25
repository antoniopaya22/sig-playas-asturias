import React, {useContext} from 'react';
import { Marker } from '@react-google-maps/api';
import { icons } from '../../constants';
import { MapContext } from '../../context/MapContext'
import { actions } from '../../constants';

export default function Playa({ playa }) {
    const { state, dispatch } = useContext(MapContext);
    let marcadorActual = null;

    const onLoad = marker => {
        marcadorActual = marker;
    }

    const handleClick = e => {
        setInfowindow();
        setPlayaActual();
    }

    const setInfowindow = () => {
        const { map } = state;
        const currentInfoWindow = new window.google.maps.InfoWindow({
            content: buildContent()
        });
        currentInfoWindow.open(map, marcadorActual);
    }

    const setPlayaActual = () => {
        dispatch({
            type: actions.SELECCIONAR_PLAYA,
            data: playa
        });
    }

    const buildContent = () => {
        return `
            <div class="card card-playa">
                <img class="card-img-top" src="${playa.foto_tiempo_real || playa.foto_estatica}" />
                <div class="card-body">
                    <h5 class="card-title">${playa.nombre} (${playa.concejo})</h5>
                    <p class="card-text">Ocupación actual: ${playa.ocupacion_actual}%</p>
                    <p class="card-text">Ocupación media: ${playa.ocupacion_media}</p>
                </div>
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