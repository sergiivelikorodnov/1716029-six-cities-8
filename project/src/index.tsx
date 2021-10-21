import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { offers } from './mocks/offers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store ={store}>
      <App
      //propertyNumber = {Settings.PROPERTY_NUMBER}
        offers={offers}
        comments ={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
