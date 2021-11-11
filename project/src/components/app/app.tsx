import { Switch, Route, Router as BrowserRouter, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import Login from '../login/login';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/selectors';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main />
        </Route>
        <Route
          exact
          path={AppRoute.Login}
          render={() => authorizationStatus === AuthorizationStatus.Auth ? <Redirect to={AppRoute.Main} /> : <Login />}
        >
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => <Favorites />}
        >
        </PrivateRoute>
        <Route exact path={`${AppRoute.Room}/:id`}>
          <Property/>
        </Route>
        <Route exact path={AppRoute.NotFoundOffer}>
          <NotFound />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
