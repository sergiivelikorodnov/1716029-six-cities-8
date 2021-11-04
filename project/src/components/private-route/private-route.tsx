import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthStatus } from '../../services/auth-status';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

function PrivateRoute({ exact, path, render }: PrivateRouteProps): JSX.Element{
  return (
    <Route
      exact={exact}
      path={path}
      render ={() => (
        getAuthStatus()===AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export default PrivateRoute;

