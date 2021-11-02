import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthorizationStatus } from './consts';
import { сreateApi } from './services/api';
import { requireAuthorization } from './store/action';
import { ThunkAppDispatch } from './types/action';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';

export const api = сreateApi(()=> store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
  applyMiddleware(redirect),
));

(store.dispatch as ThunkAppDispatch)(fetchOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App comments={comments} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
