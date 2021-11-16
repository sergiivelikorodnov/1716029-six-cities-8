import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../consts';
import { changeCityAction } from '../../store/action';
import { getRandomCity } from '../../utils/utils';
import Logo from '../logo/logo';
import LoginForm from '../login-form/login-form';

function Login(): JSX.Element {
  const currentCity = getRandomCity(CITIES);
  const dispatch = useDispatch();

  const onChangeCity = (city: string) => {
    dispatch(changeCityAction(city));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                onClick={() => onChangeCity(currentCity)}
                className="locations__item-link"
                to={AppRoute.Main}
              >
                <span data-testid="city">{currentCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
