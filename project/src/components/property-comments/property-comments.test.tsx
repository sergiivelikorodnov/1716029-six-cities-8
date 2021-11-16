import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router} from 'react-router';
import PropertyComments from './property-comments';
import { fakeFrontendComments } from '../../mocks/mock-comments';

const history = createMemoryHistory();

describe('Render Property Comments', () => {

  it('should render Property Comments correctly', () => {
    render(
      <Router history={history}>
        <PropertyComments comments={ fakeFrontendComments }/>
      </Router>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();

    fakeFrontendComments.forEach((item) =>
      expect(screen.getByText(item.comment)).toBeInTheDocument());
  });


});
