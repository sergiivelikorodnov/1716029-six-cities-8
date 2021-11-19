import { useSelector } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';

import { getAuthorizationStatus } from '../../store/selectors';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
};

function PrivateRoute({ exact, path, render }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        authorizationStatus === AuthorizationStatus.Auth ? (
          render()
        ) : (
          <Redirect to={AppRoute.Login} />
        )}
    />
  );
}

export default PrivateRoute;
