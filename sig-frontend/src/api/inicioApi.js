import { handleResponse, handleError} from './apiUtils';
import { config } from '../constants';

export const getPlayas = payload => {
    return fetch(`${config.apiUrl}/playas`)
        .then(handleResponse)
        .catch(handleError);
}

export const getRuta = payload => {
    return fetch(`${config.apiUrl}/rutas`)
        .then(handleResponse)
        .catch(handleError);
}
