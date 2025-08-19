import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

export type MapViewWithMarkerHandle = {
  searchPlace: (query: string) => Promise<void>;
  locateUser: () => Promise<void>;
  resetView: () => void;
};

type LatLng = google.maps.LatLngLiteral;

const defaultCenter: LatLng = { lat: 18.5204, lng: 73.8567 }; // Pune as a sensible default
const defaultZoom = 11;

function geocodeAddress(geocoder: google.maps.Geocoder, address: string) {
  return new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results) resolve(results);
      else reject(new Error(`Geocoding failed: ${status}`));
    });
  });
}

const containerStyle: React.CSSProperties = { width: "100%", height: "100%" };

const MapViewWithMarker = forwardRef<MapViewWithMarkerHandle, {}>(
  function MapViewWithMarker(_props, ref) {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
      // Add needed libraries if you expand functionality later:
      // libraries: ["places"],
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);

    const [center, setCenter] = useState<LatLng>(defaultCenter);
    const [zoom, setZoom] = useState<number>(defaultZoom);
    const [markers, setMarkers] = useState<LatLng[]>([]);

    const onLoad = useCallback((map: google.maps.Map) => {
      mapRef.current = map;
      geocoderRef.current = new google.maps.Geocoder();
    }, []);

    const panTo = useCallback((pos: LatLng, z?: number) => {
      setCenter(pos);
      if (typeof z === "number") setZoom(z);
      // Imperatively adjust map as well for snappier UX
      if (mapRef.current) {
        mapRef.current.panTo(pos);
        if (typeof z === "number") mapRef.current.setZoom(z);
      }
    }, []);

    const addMarker = useCallback((pos: LatLng) => {
      setMarkers((m) => [...m, pos]);
    }, []);

    // ----- Imperative API -----
    useImperativeHandle(
      ref,
      () => ({
        async searchPlace(query: string) {
          if (!query?.trim()) return;
          if (!geocoderRef.current) throw new Error("Geocoder not ready");
          const results = await geocodeAddress(
            geocoderRef.current,
            query.trim()
          );
          const loc = results[0].geometry.location;
          const pos = { lat: loc.lat(), lng: loc.lng() };
          addMarker(pos);
          panTo(pos, 14);
        },
        async locateUser() {
          const pos = await new Promise<LatLng>((resolve, reject) => {
            if (!navigator.geolocation)
              return reject(new Error("Geolocation unsupported"));
            navigator.geolocation.getCurrentPosition(
              (p) =>
                resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
              (err) =>
                reject(new Error(err.message || "Failed to get location")),
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          });
          addMarker(pos);
          panTo(pos, 15);
        },
        resetView() {
          setMarkers([]);
          panTo(defaultCenter, defaultZoom);
        },
      }),
      [addMarker, panTo]
    );

    const options = useMemo<google.maps.MapOptions>(
      () => ({
        disableDefaultUI: false,
        clickableIcons: true,
        streetViewControl: false,
        mapTypeControl: false,
      }),
      []
    );

    if (loadError) {
      return (
        <div className="p-3 text-sm text-destructive">Failed to load map.</div>
      );
    }
    if (!isLoaded) {
      return (
        <div className="p-3 text-sm text-muted-foreground">Loading map…</div>
      );
    }

    return (
      <GoogleMap
        onLoad={onLoad}
        center={center}
        zoom={zoom}
        mapContainerStyle={containerStyle}
        options={options}
      >
        {markers.map((m, i) => (
          <Marker key={`${m.lat}-${m.lng}-${i}`} position={m} />
        ))}
      </GoogleMap>
    );
  }
);

export default MapViewWithMarker;
