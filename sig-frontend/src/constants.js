const dev = {
    apiUrl: 'http://156.35.95.126:5000/api'
};
const prod = {
    apiUrl: 'http://156.35.95.126:5000/api'
};
const imgUrl = '/img/';

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const apiKey = 'AIzaSyCwYm3CgrdQQM_abaP45IH0OpCovrwyPQs';
export const wmsUrl = `https://sig.asturias.es/servicios/services/PlayasYFaros/MapServer/WMSServer?
request=GetMap
&service=WMS
&version=1.1.1
&format=image/png
&width=256
&height=256
&layers=Playas
&srs=EPSG:3857
&styles=Default
&transparent=true
&bbox=
    `;

export const actions = {
    ACTUALIZAR_RUTA: 'ACTUALIZAR_RUTA',
    ACTUALIZAR_PLAYAS: 'ACTUALIZAR_PLAYAS',
    ACTUALIZAR_MARCADOR_PLAYA: 'ACTUALIZAR_MARCADOR_PLAYA',
    SELECCIONAR_PLAYA: 'SELECCIONAR_PLAYA',
    SET_MAP: 'SET_MAP',
    SET_ORIGEN: 'SET_ORIGEN',
    SHOW_MODAL: 'SHOW_MODAL',
    ACTUALIZAR_TIEMPO: 'ACTUALIZAR_TIEMPO',
    ERROR: 'ERROR'
};

export const icons = {
    hotel: `${imgUrl}hotel.png`,
    baja: `${imgUrl}ocupacion_baja.png`,
    media: `${imgUrl}ocupacion_media.png`,
    alta: `${imgUrl}ocupacion_alta.png`,
    excesiva: `${imgUrl}ocupacion_excesiva.png`,
    sinDatos: `${imgUrl}ocupacion_sinDatos.png`
}

export const mensajes = {
    cabecera: 'Localización',
    locationError: 'No ha sido posible acceder a u ubicación. Para calcular la ruta a la playa es necesario saber donde te encuentras. Pulsa en un punto del mapa desde donde quieras calcular la ruta.',
    reintentar: 'Reintentar',
    aceptar: 'Aceptar',
    distancia: 'Como mucho ¿Cuántos minutos quieres tardar?',
    calcular: 'Calcular',
    avisoOrigen: 'Para realizar la búsqueda debes marcar el punto de origen en el mapa',
    errorHeader: 'Error',
    errorBody: 'Ha ocurrido un error obteniendo los datos'
}