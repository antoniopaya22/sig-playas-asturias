import React, { useContext } from 'react';
import { MapContext } from '../../utils/MapContext';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { actions, apiKey, icons, mensajes } from '../../constants';
import { getPlayas } from '../../api/inicioApi';
import Playa from '../../components/Playa';
import { getPosicionUsuario } from '../../utils/Geolocation';
import ModalWindow from '../../components/ModalWindow';
import { obtenerWMS } from '../../utils/WMS';

const centro = { lat: 43.5272269, lng: -5.8439137 };
export default function MapContainer() {
    const { state, dispatch } = useContext(MapContext);
    const mapStyles = {width: '100%', height: '100%'};

    const localizar = () => {
        getPosicionUsuario()
        .then(result => {
            dispatch({
                type: actions.SET_ORIGEN,
                data: result
            });
        })
        .catch(_ => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: mensajes.cabecera,
                    mensaje: mensajes.locationError
                }
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
        .catch(_ => {
            dispatch({
                type: actions.SHOW_MODAL,
                data: {
                    show: true,
                    cabecera: mensajes.errorHeader,
                    mensaje: mensajes.errorBody
                }
            })
        });
    }   

    const onLoad = map => {
        dispatch({
            type: actions.SET_MAP,
            data: map
        });    
        obtenerPlayas();
        localizar();
        obtenerWMS(map);
    };

    const onClick = e => {
        dispatch({
            type: actions.SET_ORIGEN,
            data: {
                lng: e.latLng.lng(),
                lat: e.latLng.lat()
            }
        });
    }

    return (
        <>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap 
                        onLoad={onLoad}
                        onClick={onClick}
                        center={centro} 
                        zoom={10} 
                        mapContainerStyle={mapStyles} >

                        { state.origen && <Marker position={state.origen} icon={icons.hotel} /> }
                        
                        { state.playas && state.playas.length && 
                            state.playas.map ( p => <Playa playa={p} key={p.id} /> )
                        }
                    </GoogleMap>
                </LoadScript>
            <ModalWindow />        
        </>
    );
}