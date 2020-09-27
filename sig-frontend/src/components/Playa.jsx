import React, {useContext} from 'react';
import { Marker } from '@react-google-maps/api';
import { MapContext } from '../utils/MapContext';
import { actions, icons } from '../constants';

export default function Playa({ playa }) {
    const { state, dispatch } = useContext(MapContext);

    const getMarcador = () => {
        return state.marcadores.find(m => playa.id === m.playaId).marcador;
    }

    const onLoad = marker => {
        dispatch({
            type: actions.ACTUALIZAR_MARCADOR_PLAYA,
            data: {
                playaId: playa.id,
                marcador: marker
            }
        });
    }

    const handleClick = _ => {
        setInfowindow();
        setPlayaActual();
    }

    const setInfowindow = () => {
        const { map } = state;
        const currentInfoWindow = new window.google.maps.InfoWindow({
            content: buildContent()
        });
        currentInfoWindow.open(map, getMarcador());
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
                <img class="card-img-top" src="${playa.foto_estatica}" />
                <div class="card-body">
                    <h5 class="card-title">${playa.nombre} (${playa.concejo})</h5>
                    <p class="card-text">
                        <span class="text-primary">Ocupación actual:</span> 
                        ${Number(playa.ocupacion_actual) === -1 ? ' Sin datos' : Number(playa.ocupacion_actual).toFixed(2) + '%'}
                    </p>
                    <p class="card-text">
                        <span class="text-primary">Ocupación media:</span> ${playa.ocupacion_media}
                    </p>
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