import { render } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Render Loading Component', () => {

  it('should render correctly', () => {
    const {container} = render(<LoadingScreen />);
    expect(container).toMatchSnapshot();
  });

});
