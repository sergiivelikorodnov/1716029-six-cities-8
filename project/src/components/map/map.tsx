import 'leaflet';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../consts';
import useMap from '../../hooks/use-map';
import { Offers, CityOffer, Offer } from '../../types/offer';

type Points = {
  city: CityOffer;
  points: Offers;
  selectedPoint: Offer  | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [27, 39],
  iconAnchor: [14, 39],
});

function Map({ city, points, selectedPoint }:Points): JSX.Element {

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point) => {
        // eslint-disable-next-line no-console
        console.log(point.city);
        const marker = new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.latitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);
  return (
    <div
      style={{ height: '100%' }}
      ref={mapRef}
    >
    </div>
  );

}

export default Map;
