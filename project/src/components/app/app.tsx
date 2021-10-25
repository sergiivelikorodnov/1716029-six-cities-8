import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import Login from '../login/login';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import { Comments } from '../../types/comment-get';
import { State } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { getOffersByCity } from '../../utils/utils';

type AppScreenProps = {
  cities: string[];
  comments: Comments;
}

const mapStateToProps = ({ currentCity, offers }: State) => ({
  currentCity,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppScreenProps;


function App(props:ConnectedComponentProps): JSX.Element {
  const { cities, comments, offers, currentCity } = props;

  const offersList = getOffersByCity(currentCity, offers);

  const similarOffers = offers.slice(0, 3);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main
            cities = {cities}
            offersList={offersList}
          />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => (
            <Favorites
              favOffers={offersList}
            />)}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.Room}/:id`}>
          <Property
            offers={offersList}
            comments={comments}
            similarOffers={similarOffers}
            authorizationStatus={AuthorizationStatus.Auth}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
