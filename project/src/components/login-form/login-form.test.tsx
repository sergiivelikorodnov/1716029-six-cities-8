import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute } from '../../consts';
import { Provider } from 'react-redux';
import LoginForm from './login-form';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Render Login Form', () => {


  it('should render Login Form correctly, when user navigates "/login" url', () => {
    history.push(AppRoute.Login);

    render(
      <Provider store ={mockStore({})}>
        <Router history={history}>
          <LoginForm/>
        </Router>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'fake.email@gmail.com');
    userEvent.type(screen.getByTestId('password'), '123');

    expect(screen.getByDisplayValue(/fake.email@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123/i)).toBeInTheDocument();
  });

});
