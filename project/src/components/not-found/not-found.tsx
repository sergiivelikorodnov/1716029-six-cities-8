import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Footer from '../footer/footer';
import Header from '../header/header';

function NotFound(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header/>
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">404</h1>
            <div className="not-found-wrapper">
              <b className="favorites__status">Oh no, you’ve found junior developer’s homepage!</b>
              <p>
               Go to<Link className="text-not-found-page" to={AppRoute.Main}> Main Page</Link>.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
