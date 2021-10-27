import 'leaflet';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { URL_MARKER_ACTIVE, URL_MARKER_DEFAULT } from '../../consts';
import useMap from '../../hooks/use-map';
import { CityOffer, Offers } from '../../types/offer';
import { State } from '../../types/state';

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

const mapStateToProps = ({ currentOffer, currentCity, offers }: State) => ({
  currentOffer,
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppComponentProps;

function Map({
  currentOffer,
  offersList,
  city,
}: ConnectedComponentProps): JSX.Element {
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
        const { location } = offer.city;
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            currentOffer !== undefined && offer.id === currentOffer?.id
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
  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export { Map };
export default connector(Map);
