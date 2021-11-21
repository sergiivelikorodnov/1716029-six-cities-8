import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import {  AuthorizationStatus } from '../../consts';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import  Header  from './header';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Render Not Found Component', () => {

  it('should render correctly, if AuthorizationStatus is "NO AUTH"', () => {
    const store = mockStore({
      AUTH: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly, if AuthorizationStatus is "AUTH"', () => {
    const store = mockStore({
      AUTH: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store ={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

});
