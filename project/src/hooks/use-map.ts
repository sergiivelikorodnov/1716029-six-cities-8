import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useState } from 'react';
import { CityOffer } from '../types/offer';

const TITLE_LAYER = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TITLE_LAYER_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: CityOffer,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const { latitude, longitude, zoom } = city.location;

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      });

      const layer = new TileLayer(
        TITLE_LAYER,
        {
          attribution:
            TITLE_LAYER_ATTRIBUTION,
        },
      );

      instance.addLayer(layer);
      setMap(instance);
    }
  }, [mapRef, map, latitude, longitude, zoom]);

  return map;
}

export default useMap;
