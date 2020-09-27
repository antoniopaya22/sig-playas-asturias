import React from 'react';
import { icons } from '../../constants';

export default function Leyenda() {
    return(
        <div className="leyenda">
            <small>
                Ocupación: 
                <span className="icon"><img src={icons.baja} alt="Ocupación baja"/></span>
                Baja
                <span className="icon"><img src={icons.media} alt="Ocupación media"/></span>
                Media
                <span className="icon"><img src={icons.alta} alt="Ocupación alta"/></span>
                Alta
                <span className="icon"><img src={icons.excesiva} alt="Ocupación excesiva"/></span>
                Excesiva
                <span className="icon"><img src={icons.sinDatos} alt="Ocupación excesiva"/></span>
                Sin Datos
            </small>
        </div>
    );
}