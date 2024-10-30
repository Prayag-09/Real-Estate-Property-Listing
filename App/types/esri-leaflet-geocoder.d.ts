declare module 'esri-leaflet-geocoder' {
	import GeocodeOptions from 'esri-leaflet';

	export interface GeocodeResult {
		latlng: { lat: number; lng: number };
	}

	export interface Geocode {
		text: (address: string) => GeocodeOptions;
		run: (
			callback: (
				err: Error | null,
				results: { results: GeocodeResult[] }
			) => void
		) => void;
	}

	export function geocode(): Geocode;
}
