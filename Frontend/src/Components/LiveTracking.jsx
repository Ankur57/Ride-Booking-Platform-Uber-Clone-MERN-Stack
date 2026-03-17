import { useState, useEffect } from 'react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(() => {
        const savedPosition = localStorage.getItem('lastKnownPosition');
        return savedPosition ? JSON.parse(savedPosition) : null;
    });

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        const updateLocation = (position) => {
            const { latitude, longitude } = position.coords;
            const newPos = { lat: latitude, lng: longitude };
            setCurrentPosition(newPos);
            localStorage.setItem('lastKnownPosition', JSON.stringify(newPos));
        };

        navigator.geolocation.getCurrentPosition(updateLocation);

        const watchId = navigator.geolocation.watchPosition(updateLocation);

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                console.log('Position updated:', latitude, longitude);
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    if (!isLoaded || !currentPosition) return <div>Loading Map...</div>

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
        >
            <Marker position={currentPosition} />
        </GoogleMap>
    )
}

export default LiveTracking