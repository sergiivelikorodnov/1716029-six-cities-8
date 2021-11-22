
import React from 'react';
import { Router as BrowserRouter} from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from './consts';
import { createApi } from './services/api';
import { requireAuthorization } from './store/action';
import { checkAuthAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/reducers/root';
import ReactDOM from 'react-dom';
import browserHistory from './browser-history';

export const api = createApi(() =>
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
