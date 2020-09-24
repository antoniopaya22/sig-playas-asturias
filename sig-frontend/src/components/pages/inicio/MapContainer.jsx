import React, { useContext, useState, useEffect, useCallback } from 'react';
import { MapContext } from '../../../context/MapContext';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { actions, apiKey, icons, wmsUrl } from '../../../constants';
import { getPlayas } from '../../../api/inicioApi';
import Playas from '../../common/Playas';

const centro = { lat: 43.364365, lng: -5.849002 };
const mapStyles = {width: '100%', height: '90%'};
export default function MapContainer() {
    const { state, dispatch } = useContext(MapContext);
    const [map, setMap] = useState(null);
    let marcadores = [];

    const EXTENT = [-Math.PI * 6378137, Math.PI * 6378137];

    const xyzToBounds = (x, y, z) => {
        let tileSize = EXTENT[1] * 2 / Math.pow(2, z);
        let minx = EXTENT[0] + x * tileSize;
        let maxx = EXTENT[0] + (x + 1) * tileSize;
        let miny = EXTENT[1] - (y + 1) * tileSize;
        let maxy = EXTENT[1] - y * tileSize;
        return [minx, miny, maxx, maxy];
    }
    // const onLoad = map => {
        // const {ImageMapType, LatLng} = window.google.maps;
        // const tileSize = 256;
        // const a = new LatLng(3, 3);
        // map = new window.google.maps.Map();
        // //const getTyleUrl = (coords, zoom) => `${wmsUrl}&BBOX=${xyzToBounds(coords.x, coords.y, zoom).join(',')}&WIDTH=${tileSize}&HEIGHT=${tileSize}`;
        // const getTyleUrl=(coordinates, zoom) => {
        //     return (
        //       "https://www.mrlc.gov/geoserver/NLCD_Land_Cover/wms?" +
        //       "&REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1" +
        //       "&LAYERS=mrlc_display%3ANLCD_2016_Land_Cover_L48" +
        //       "&FORMAT=image%2Fpng" +
        //       "&SRS=EPSG:3857&WIDTH=256&HEIGHT=256" +
        //       "&BBOX=" +
        //       xyzToBounds(coordinates.x, coordinates.y, zoom).join(",")
        //     );
        //   };
        // const playas = new ImageMapType({
        //     getTyleUrl,
        //     name: "Landcover",
        //   alt: "National Land Cover Database 2016",
        //   minZoom: 0,
        //   maxZoom: 19,
        //   opacity: 1.0
        // });
        // map.overlayMapTypes.push(playas);
        // setMap(map);
  
    // }

    const onLoad = () => {
        getPlayas()
        .then(result => {
            dispatch({
                type: actions.ACTUALIZAR_PLAYAS,
                data: result
            });
            marcadores = [...result];
        })
        .catch(error => console.error(error));
    }

    const handlePlayaClick = (e) => {
        const { playas } = state;
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const playaSeleccionada = playas.find(p => p.longitud == lng && p.latitud == lat);
        dispatch({
            type: actions.SELECCIONAR_PLAYA,
            data: playaSeleccionada
        })
        console.log();
    }

    return (
        <div className="map-container">
            <p>sel: {state.playa}</p>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap 
                    onLoad={onLoad}
                    center={centro} 
                    zoom={9} 
                    mapContainerStyle={mapStyles} >

                    <Marker position={centro} icon={icons.hotel} /> 
                    
                    { state.playas && state.playas.length && 
                        <Playas handleClick={handlePlayaClick} playas={state.playas} />
                    }
                    { state.seleccionada && 
                        <InfoWindow position={{lat: state.seleccionada.latitud, lng: state.seleccionada.longitud}}>
                            <p><strong>{state.seleccionada.camping}</strong></p>
                        </InfoWindow>
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
}