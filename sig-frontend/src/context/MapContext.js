import { createContext } from 'react';
import { actions } from '../constants';

export const initialState = {
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
            return { playas: action.data };

        case actions.SELECCIONAR_PLAYA:
            return { seleccionada: action.data }
            
        default:
            return initialState;
    }
}
