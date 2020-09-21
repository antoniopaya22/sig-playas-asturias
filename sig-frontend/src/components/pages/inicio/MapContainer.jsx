import React, { useContext } from 'react';
import { MapContext } from './Inicio';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { actions, apiKey, icons, wmsUrl } from '../../../constants';
import { getRuta } from '../../../api/inicioApi';

const centro = { lat: 43.364365, lng: -5.849002 };
const mapStyles = {width: '100%', height: '100%'};

export default function MapContainer() {
    const { state, dispatch } = useContext(MapContext);
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(gMap => {
        const playas = window.google.maps.ImageMapType({
            getTyleUrl: wmsUrl
        });
        setMap(gMap);
        // map.overlayMapTypes.push(playas);
        console.log(window.google.maps.ImageMapType);
    }, []);

    const handleMarkerClick = destino => {
        getRuta(destino)
        .then(result => {
            console.log(result);
            dispatch({
                type: actions.ACTUALIZAR_RUTA,
                data: result
            });
        })
        .catch(error => console.error(error));
    }

    return (
        <div className="map-container">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap 
                    onLoad={onLoad}
                    center={centro} 
                    zoom={9} 
                    mapContainerStyle={mapStyles} >

                    { state.origen && 
                        <Marker position={{lat: Number(state.origen.coordenadas.lat), lng: Number(state.origen.coordenadas.lng)}} icon={icons.hotel} /> 
                    }
                    {
                        state.playas && state.playas.length && state.playas.map(p => {
                            let lat = Number(p.coordenadas.lat);
                            let lng = Number(p.coordenadas.lng);

                            return (
                                <Marker position={{lat, lng}} icon={icons[p.ocupacion]} key={p.nombre} onClick={({lat, lng}) => handleMarkerClick({lat, lng})} />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
}