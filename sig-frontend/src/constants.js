const dev = {
    apiUrl: 'http://localhost:3001/api'
};
const prod = {
    apiUrl: ''
};
const imgUrl = '/img/';

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const apiKey = 'AIzaSyCwYm3CgrdQQM_abaP45IH0OpCovrwyPQs';
export const wmsUrl = 'https://sig.asturias.es/servicios/services/PlayasYFaros/MapServer/WMSServer?request=GetCapabilities&service=WMS';

export const actions = {
    ACTUALIZAR_RUTA: 'ACTUALIZAR_RUTA',
    ACTUALIZAR_POSICIONES: 'ACTUALIZAR_POSICIONES'
};

export const icons = {
    hotel: `${imgUrl}hotel.png`,
    baja: `${imgUrl}ocupacion_baja.png`,
    media: `${imgUrl}ocupacion_media.png`,
    alta: `${imgUrl}ocupacion_alta.png`,
    excesiva: `${imgUrl}ocupacion_excesiva.png`
}
