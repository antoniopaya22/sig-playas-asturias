import { createContext } from 'react';
import { actions } from '../constants';

export const initialState = {
    map: null,
    origen: null,
    ruta: null,
    playas: [],
    marcadores: [],
    seleccionada: null,
    showModal: {
        show: false,
        cabecera: '',
        mensaje: ''
    },
    tiempo: '',
    error: false
};

export const MapContext = createContext();

export const mapReducer = (state, action) => {
    switch (action.type) {
        case actions.ACTUALIZAR_RUTA:
            return { ...state, ruta: action.data };

        case actions.ACTUALIZAR_PLAYAS:
            return { ...state, playas: action.data };

        case actions.ACTUALIZAR_MARCADOR_PLAYA:
            return { ...state, marcadores: [...state.marcadores, {playaId: action.data.playaId, marcador: action.data.marcador}]}

        case actions.SELECCIONAR_PLAYA:
            return { ...state, seleccionada: action.data };

        case actions.SET_MAP:
            return { ...state, map: action.data };

        case actions.SET_ORIGEN:
            return { ...state, origen: action.data }

        case actions.SHOW_MODAL:
            return { ...state, showModal: action.data}

        case actions.ACTUALIZAR_TIEMPO:
            return { ...state, tiempo: action.data }

        default:
            return initialState;
    }
}
