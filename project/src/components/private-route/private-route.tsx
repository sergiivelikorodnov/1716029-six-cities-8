import { connect, ConnectedProps } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { getAuthStatus } from '../../services/auth-status';
import { State } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element,
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute({ exact, path, render, authorizationStatus }: ConnectedComponentProps): JSX.Element{
  return (
    <Route
      exact={exact}
      path={path}
      render ={() => (
        getAuthStatus()===AuthorizationStatus.Auth && authorizationStatus === AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export  {PrivateRoute};
export default connector(PrivateRoute);

