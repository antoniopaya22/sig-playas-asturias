export const handleResponse = response => {
    return response.json();
}

export const handleError = error => {
    console.error(error);
    throw error;
}
