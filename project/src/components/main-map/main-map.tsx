import 'leaflet';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../consts';
import useMap from '../../hooks/use-map';
import { getCurrentOffer } from '../../store/selectors';
import { CityOffer, Offers } from '../../types/offer';

type AppComponentProps = {
  offersList: Offers;
  city: CityOffer;
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

function MainMap({
  offersList,
  city,
}: AppComponentProps): JSX.Element {
  const currentOffer = useSelector(getCurrentOffer);

  const { latitude, longitude, zoom } = city.location;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers: Marker[] = [];
    if (map) {
      map.flyTo(
        {
          lat: latitude,
          lng: longitude,
        },
        zoom,
        {
          animate: true,
          duration: 2,
        },
      );
      offersList.forEach((offer) => {
        const { location } = offer;

        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            currentOffer && currentOffer.id === offer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
        markers.push(marker);
      });

      return () => markers.forEach((marker) => marker.removeFrom(map));
    }
  }, [
    map,
    offersList,
    currentOffer?.id,
    currentOffer,
    latitude,
    longitude,
    zoom,
  ]);
  return <div style={{ height: '100%' }} ref={mapRef} data-testid = 'main-map'></div>;
}

export default MainMap;
