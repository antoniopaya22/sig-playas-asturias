import { handleResponse, handleError } from './apiUtils';
import { config } from '../constants';

export const getPlayas = () => {
    return fetch(`${config.apiUrl}/beaches`)
        .then(handleResponse)
        .catch(handleError);
}

export const searchBeaches = payload => {
    return fetch(`${config.apiUrl}/search`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(handleResponse)
        .catch(handleError);
}