import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';


function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}


export const MapComponent = ({ center }) => {
    return (
        <div className='mapContainer'>
            <MapContainer center={center} zoom={8} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={center}>
                    <Popup>
                        Approximate location.
                    </Popup>
                </Marker>
                <SetViewOnClick coords={center}/>
            </MapContainer>
        </div>
    )
}

export default MapComponent;