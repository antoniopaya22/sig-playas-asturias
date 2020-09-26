import { handleResponse, handleError} from './apiUtils';
import { config } from '../constants';

export const getPlayas = () => {
    return fetch(`${config.apiUrl}/beaches`)
        .then(handleResponse)
        .catch(handleError);
}

export const searchBeaches = payload => {
    return fetch(`${config.apiUrl}/search`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(handleResponse)
    .catch(handleError);
}

export const getRuta = payload => {
    return fetch(`${config.apiUrl}/rutas`)
        .then(handleResponse)
        .catch(handleError);
}
