import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router';
import Logo from './logo';
import { AppRoute } from '../../consts';

const history = createMemoryHistory();

describe('Render Logo Component', () => {


  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to main page', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path={AppRoute.Main} exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Logo />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

});
