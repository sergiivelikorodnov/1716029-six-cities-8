import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthorizationStatus, CITIES } from './consts';
import { CreateApi } from './services/api';
import { requireAuthorization } from './store/action';
import { ThunkAppDispatch } from './types/action';
import { /* checkAuthAction,  */fetchOffersAction } from './store/api-actions';

const api = CreateApi(()=> store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
));

//(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cities={CITIES} comments={comments} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
