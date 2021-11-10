import { useSelector } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { dropAuthStatus, getAuthStatus } from '../../services/auth-status';
import { getAuthorizationStatus } from '../../store/selectors';

type LoginRouteProps = RouteProps & {
  render: () => JSX.Element;
};

function LoginRoute({ exact, path, render }: LoginRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if (authorizationStatus === AuthorizationStatus.NoAuth) {
          dropAuthStatus();
        }
        return getAuthStatus() !== AuthorizationStatus.Auth &&
          authorizationStatus !== AuthorizationStatus.Auth ? (
            render()
          ) : (
            <Redirect to={AppRoute.Main} />
          );
      }}
    />
  );
}

export default LoginRoute;
