import { connect, ConnectedProps } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { dropAuthStatus, getAuthStatus } from '../../services/auth-status';
import { State } from '../../types/state';

type LoginRouteProps = RouteProps & {
  render: () => JSX.Element,
}


const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & LoginRouteProps;

function LoginRoute({ exact, path, render, authorizationStatus }: ConnectedComponentProps): JSX.Element{
  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        if(authorizationStatus === AuthorizationStatus.NoAuth){
          dropAuthStatus();
        }
        return (getAuthStatus()!==AuthorizationStatus.Auth && authorizationStatus !== AuthorizationStatus.Auth ? render() : <Redirect to={AppRoute.Main}/>);
      }}
    />
  );
}


export {LoginRoute};
export default connector(LoginRoute);
