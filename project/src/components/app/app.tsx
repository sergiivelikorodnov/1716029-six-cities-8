import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import NotFound from '../not-found/not-found';
import Login from '../login/login';
import Property from '../property/property';
import PrivateRoute from '../private-route/private-route';
import browserHistory from '../../browser-history';
import LoginRoute from '../login-route/login-route';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main />
        </Route>
        <LoginRoute
          exact
          path={AppRoute.Login}
          render={() => <Login />}
        >
        </LoginRoute>
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
