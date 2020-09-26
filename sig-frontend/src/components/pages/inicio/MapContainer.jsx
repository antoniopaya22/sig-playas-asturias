import React, { useContext } from 'react';
import { MapContext } from '../../../context/MapContext';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { actions, apiKey, icons, wmsUrl, mensajes } from '../../../constants';
import { getPlayas } from '../../../api/inicioApi';
import Playa from '../../common/Playa';
import { comprobarNavegador, getPosicionUsuario } from '../../../utils/Geolocation';
import ModalWindow from '../../common/ModalWindow';

const centro = { lat: 43.364365, lng: -5.849002 };
const mapStyles = {width: '100%', height: '100%'};
export default function MapContainer() {
    const { state, dispatch } = useContext(MapContext);
    // const [modal, setModal] = useState(false);
    // const [map, setMap] = useState(null);

    const localizar = () => {
        getPosicionUsuario()
        .then(result => {
            dispatch({
                type: actions.SET_ORIGEN,
                data: result
            });
        })
        .catch(error => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: true
            });
        })

    }

    const obtenerPlayas = () => {
        getPlayas()
        .then(result => {
            dispatch({
                type: actions.ACTUALIZAR_PLAYAS,
                data: result
            });
        })
        .catch(error => console.error(error));
    }

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

    const onLoad = map => {
        dispatch({
            type: actions.SET_MAP,
            data: map
        });    
        obtenerPlayas();
        localizar();
    };

    return (
        <>
        <div className="map-container">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap 
                    onLoad={onLoad}
                    center={centro} 
                    zoom={9} 
                    mapContainerStyle={mapStyles} >

                    { state.origen && <Marker position={state.origen} icon={icons.hotel} /> }
                    
                    { state.playas && state.playas.length && 
                        state.playas.map ( p => <Playa playa={p} key={p.id} /> )
                    }
                </GoogleMap>
            </LoadScript>
        </div>
        
            <ModalWindow 
                cabecera={mensajes.cabecera} 
                mensaje={mensajes.locationError} 
                buttonLabel1={mensajes.cancelar}
            />
        
        </>
    );
}