import { createContext } from 'react';
import { actions } from '../constants';

export const initialState = {
    infoWindow: null,
    origen: null,
    ruta: null,
    playas: [],
    seleccionada: null
};

export const MapContext = createContext();

export const mapReducer = (state, action) => {
    switch (action.type) {
        case actions.ACTUALIZAR_RUTA:
            return { ...state, ruta: action.data };

        case actions.ACTUALIZAR_PLAYAS:
            return { ...state, playas: action.data };

        case actions.SELECCIONAR_PLAYA:
            return { ...state, seleccionada: action.data };

        case actions.SET_INFOWINDOW:
            return { ...state, infoWindow: action.data };
            
        default:
            return initialState;
    }
}
