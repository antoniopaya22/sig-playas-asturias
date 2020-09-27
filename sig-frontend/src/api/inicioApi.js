import { handleResponse, handleError } from './apiUtils';
import { config } from '../constants';

export const getPlayas = () => {
    return fetch(`${config.apiUrl}/beaches`)
        .then(handleResponse)
        .catch(handleError);
}

export const searchBeaches = payload => {
    return fetch(`${config.apiUrl}/search`, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: JSON.stringify(payload)
        })
        .then(handleResponse)
        .catch(handleError);
}

export const searchOcupations = playa_id => {
    return fetch(`${config.apiUrl}/occupations/playa/${playa_id}`)
        .then(handleResponse)
        .catch(handleError);
}