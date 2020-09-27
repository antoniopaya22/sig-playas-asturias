export const comprobarNavegador = () => {
    return ("geolocation" in navigator);
}

export const getPosicionUsuario = () => {
    return new Promise((resolve, reject) => {
        if(!comprobarNavegador)
            reject(false);
        else 
            navigator.geolocation.getCurrentPosition(pos => {
                resolve({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                })
            }, error => {
                reject(error);
            }
        )
    })
}
