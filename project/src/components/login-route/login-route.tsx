import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthStatus } from '../../services/auth-status';

type LoginRouteProps = RouteProps & {
  render: () => JSX.Element,
}


function LoginRoute({ exact, path, render }: LoginRouteProps): JSX.Element{
  return (
    <Route
      exact={exact}
      path={path}
      render ={() => (
        getAuthStatus()!==AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.Main} />
      )}
    />
  );
}


export default LoginRoute;
