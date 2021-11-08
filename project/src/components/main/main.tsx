import { Offers } from '../../types/offer';
import MainLocationList from '../main-location-list/main-location-list';
import { CITIES, FetchStatus, SortingType } from '../../consts';
import {
  getOffersByCity,
  getSortedOffersPriceDown,
  getSortedOffersPriceUp,
  getSortedOffersTopRated,
  isCheckedAuth
} from '../../utils/utils';
import { useCallback, useState } from 'react';
import Header from '../header/header';
import { useSelector } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import MainCityContainer from '../main-city-container/main-city-container';
import MainEmpty from '../main-empty/main-empty';
import { getAllOffers, getAuthorizationStatus, getCurrentCity, getFetchStatus } from '../../store/selectors';

function Main(): JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const offers = useSelector(getAllOffers);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const fetchStatus = useSelector(getFetchStatus);

  const [activeOffer, setActiveOffer] = useState(0);
  const offerHandler = useCallback((id: number) => {
    setActiveOffer(id);
  },[]);

  const [selectedSortType, setSelectedSortType] = useState(SortingType.POPULAR);

  if (isCheckedAuth(authorizationStatus) || fetchStatus=== FetchStatus.InProgress) {
    return (
      <LoadingScreen />
    );
  }


  const offersList = getOffersByCity(currentCity, offers);

  const selectedSortTypeHandler = (sortType: string) => {
    setSelectedSortType(sortType);
    getSortedOffers(sortType, offersList);
  };

  const getSortedOffers = (sortType: string, allOffers: Offers): Offers => {
    switch (sortType) {
      case SortingType.PRICE_DOWN:
        return getSortedOffersPriceDown(allOffers);
      case SortingType.PRICE_UP:
        return getSortedOffersPriceUp(allOffers);
      case SortingType.TOP_RATED:
        return getSortedOffersTopRated(allOffers);
      default:
        return offersList;
    }
  };

  const sortedOffers = getSortedOffers(selectedSortType, offersList);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <MainLocationList cities={CITIES} />
        {offersList.length === 0 ?
          <MainEmpty/>
          :
          <MainCityContainer
            offersList={offersList}
            selectedSortTypeHandler={selectedSortTypeHandler}
            selectedSortType={selectedSortType}
            sortedOffers={sortedOffers}
            onHoverOfferHandler={offerHandler}
            activeOffer = {activeOffer}
          />}
      </main>
    </div>
  );
}

export {Main};
export default Main;
