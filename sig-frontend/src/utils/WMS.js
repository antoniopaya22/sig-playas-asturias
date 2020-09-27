import { wmsUrl } from '../constants';

const calcularBBox = (x, y, z) => {
    const EXTENT = [-Math.PI * 6378137, Math.PI * 6378137];
    const tileSize = EXTENT[1] * 2 / Math.pow(2, z);
    const minx = EXTENT[0] + x * tileSize;
    const maxx = EXTENT[0] + (x + 1) * tileSize;
    const miny = EXTENT[1] - (y + 1) * tileSize;
    const maxy = EXTENT[1] - y * tileSize;
    return [minx, miny, maxx, maxy];
}

const getTileUrl = (coordenadas, zoom) => wmsUrl + calcularBBox(coordenadas.x, coordenadas.y, zoom);

export const obtenerWMS = map => {
    const capa = new window.google.maps.ImageMapType({
        getTileUrl,
        name: "Playas de Asturias",
        alt: "Playas de Asturias",
        minZoom: 9,
        maxZoom: 19
    });

    map.overlayMapTypes.push(capa);
} 
