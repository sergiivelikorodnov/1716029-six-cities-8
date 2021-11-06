import { Offers } from '../../types/offer';
import MainLocationList from '../main-location-list/main-location-list';
import { CITIES, SortingType } from '../../consts';
import {
  getOffersByCity,
  getSortedOffersPriceDown,
  getSortedOffersPriceUp,
  getSortedOffersTopRated,
  isCheckedAuth
} from '../../utils/utils';
import { useState } from 'react';
import Header from '../header/header';
import { connect, ConnectedProps } from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import { State } from '../../types/state';
import MainCityContainer from '../main-city-container/main-city-container';
import MainEmpty from '../main-empty/main-empty';

const mapStateToProps = ({ currentCity, offers, authorizationStatus, isDataLoaded }: State) => ({
  currentCity,
  offers,
  isDataLoaded,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;


function Main({ currentCity, offers, authorizationStatus, isDataLoaded }: ConnectedComponentProps): JSX.Element {

  const [selectedSortType, setSelectedSortType] = useState(SortingType.POPULAR);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
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
          <MainCityContainer offersList={offersList} selectedSortTypeHandler={selectedSortTypeHandler} selectedSortType={selectedSortType} sortedOffers={sortedOffers} />}
      </main>
    </div>
  );
}

export {Main};
export default connector(Main);
