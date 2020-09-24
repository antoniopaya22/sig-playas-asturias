import React from 'react';
import { Marker } from '@react-google-maps/api';
import { icons } from '../../constants';

export default function Playas({ playas, handleClick }) {
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

    return playas.map(p => {
        return (<Marker position={{lat: Number(p.latitud), lng: Number(p.longitud)}} 
                            icon={icons[calcularOcupacion(p.ocupacion_actual)]} 
                            key={p.nombre} 
                            onClick={handleClick} />)
    })

}