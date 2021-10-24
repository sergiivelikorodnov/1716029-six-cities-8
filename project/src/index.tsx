import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import { CITIES } from './consts';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App
        cities={CITIES}
        comments ={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
