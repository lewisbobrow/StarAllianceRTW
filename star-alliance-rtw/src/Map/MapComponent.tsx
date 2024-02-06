import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// Set your Mapbox token here
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

const MapComponent: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initialize the map
        const map = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: 'mapbox://styles/mapbox/streets-v11', // map style
            center: [-98.5795, 39.8283], // starting position [lng, lat]
            zoom: 3 // starting zoom
        });

        // Add navigation control (zoom in/out)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        // Create markers - replace with actual airport data
        const airports = [
            { lng: -0.4531566, lat: 51.4709959 }, // Example: Heathrow Airport
            { lng: -73.7781391, lat: 40.6413111 } // Example: JFK Airport
            // Add more airports here
        ];

        airports.forEach(airport => {
            new mapboxgl.Marker()
                .setLngLat([airport.lng, airport.lat])
                .addTo(map);
        });

        // Clean up on unmount
        return () => map.remove();
    }, []);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;