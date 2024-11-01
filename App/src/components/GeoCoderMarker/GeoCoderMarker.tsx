import React, { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import * as ELG from 'esri-leaflet-geocoder';

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface GeoCoderMarkerProps {
	address: string;
}

const GeoCoderMarker: React.FC<GeoCoderMarkerProps> = ({ address }) => {
	const map = useMap();
	const [position, setPosition] = useState<[number, number]>([60, 19]);

	useEffect(() => {
		ELG.geocode()
			.text(address)
			.run((err, results) => {
				if (err) {
					console.error('Geocoding error:', err);
					return;
				}

				if (results?.results?.length > 0) {
					const { lat, lng } = results.results[0].latlng;
					setPosition([lat, lng]);
					map.flyTo([lat, lng], 6);
				}
			});
	}, [address, map]);

	return (
		<Marker position={position} icon={DefaultIcon}>
			<Popup>{address}</Popup>
		</Marker>
	);
};

export default GeoCoderMarker;
