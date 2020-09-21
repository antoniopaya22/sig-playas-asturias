import React, { useContext } from 'react';
import { MapContext } from './Inicio';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { apiKey, icons } from '../../../constants';


const centro = { lat: 43.364365, lng: -5.849002 };
const mapStyles = {width: '100%', height: '100%'};

export default function MapContainer() {
    const { state } = useContext(MapContext);
    
    return (
        <div className="map-container">
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap 
                    center={centro} 
                    zoom={9} 
                    mapContainerStyle={mapStyles} >

                    { state.origen && 
                        <Marker position={{lat: Number(state.origen.coordenadas.lat), lng: Number(state.origen.coordenadas.lng)}} icon={icons.hotel} /> 
                    }
                    { state.destino &&
                        <Marker position={{lat: Number(state.destino.lat), lng: Number(state.destino.lng)}} />
                    }
                    {
                        state.playas && state.playas.length && state.playas.map(p => {
                            let lat = Number(p.coordenadas.lat);
                            let lng = Number(p.coordenadas.lng);

                            return (
                                <Marker position={{lat, lng}} icon={icons[p.ocupacion]} key={p.nombre} />
                            )
                        })
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
}