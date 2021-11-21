import { render, screen } from '@testing-library/react';
import { DEFAULT_CITY } from '../../consts';
import MainEmpty from './main-empty';

describe('Render main Empty Component', () => {

  it('should render correctly', () => {
    render(
      <MainEmpty currentCity={ DEFAULT_CITY }/>,
    );

    expect(screen.queryByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.queryByText(/We could not find any property available at the moment in/i)).toBeInTheDocument();
  });

});
