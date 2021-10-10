import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { comments } from './mocks/comments';
import { offers } from './mocks/offers';


const Settings = {
  PROPERTY_NUMBER: 322,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      propertyNumber = {Settings.PROPERTY_NUMBER}
      offers={offers}
      comments ={comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
