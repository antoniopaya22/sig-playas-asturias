import { handleResponse, handleError} from './apiUtils';
import { config } from '../constants';

export const getPlayas = payload => {
    return fetch(`${config.apiUrl}/playas`)
        .then(handleResponse)
        .catch(handleError);
}

export const getDestinos = payload => {
    return fetch(`${config.apiUrl}/playas`)
        .then(handleResponse)
        .catch(handleError);
}
