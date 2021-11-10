import 'leaflet';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../consts';
import useMap from '../../hooks/use-map';
import { CityOffer, Offer, Offers } from '../../types/offer';

type AppComponentProps = {
  offersList: Offers;
  city: CityOffer;
  currentOffer: Offer;
  activeOffer: number;
};

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

function MapNearestPlaces({
  currentOffer,
  offersList,
  city,
  activeOffer,
}: AppComponentProps): JSX.Element {

  const { latitude, longitude, zoom } = city.location;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      offersList.forEach((offer) => {
        const { location } = offer;

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            currentOffer !== undefined && offer.id === activeOffer
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
        markers.push(marker);
      });

      if (currentOffer.id !== -1) {
        const currentOfferMarker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });

        currentOfferMarker
          .setIcon(currentCustomIcon)
          .addTo(map);
        markers.push(currentOfferMarker);
      }


      return () => {
        markers.forEach((marker) => marker.removeFrom(map));
      };
    }
  }, [
    map,
    offersList,
    currentOffer?.id,
    currentOffer,
    latitude,
    longitude,
    zoom,
    activeOffer,
    currentOffer.location.latitude,
    currentOffer.location.longitude,
    city.location,
  ]);
  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default MapNearestPlaces;
