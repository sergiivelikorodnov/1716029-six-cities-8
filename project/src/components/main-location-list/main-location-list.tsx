import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCityAction } from '../../store/action';
import { getCurrentCity } from '../../store/selectors';

type AppProps = {
  cities: string[];
}

function MainLocationList({cities}: AppProps): JSX.Element {
  const currentCity = useSelector(getCurrentCity);
  const dispatch = useDispatch();

  const onChangeCity = (city: string) => {
    dispatch(changeCityAction(city));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <Link to="/" className={`locations__item-link ${city === currentCity ? 'tabs__item--active' : 'tabs__item'}`}>
                <span onClick={() => onChangeCity(city)}>{city}</span>
              </Link>
            </li>
          ),

          )}

        </ul>
      </section>
    </div>
  );
}

export default MainLocationList;
