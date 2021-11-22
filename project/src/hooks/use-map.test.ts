import { renderHook } from '@testing-library/react-hooks';
import { isNull } from 'lodash';
import { fakeStateAuth } from '../mocks/mock-store';
import useMap from './use-map';

describe('Hook: useMap', () => {

  it('should return null, if ref = null', () => {
    const mapRef = {
      current: null,
    };
    const city = fakeStateAuth.LOCATION.currentOffer.city;

    const { result } = renderHook(() =>
      useMap(mapRef, city),
    );
    expect(result.current).toBe(null);
  });

  it('should return NOT null, if ref = HTML Element', () => {
    const mapRef = {
      current: document.createElement('container_map'),
    };
    const city = fakeStateAuth.LOCATION.currentOffer.city;

    const { result } = renderHook(() =>
      useMap(mapRef, city),
    );
    expect(result.current).not.toBe(null);
  });
});
