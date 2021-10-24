import { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { changeCityAction } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

type AppProps = {
  cities: string[];
}

const mapStateToProps = ({ currentCity }: State) => ({ currentCity });

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeCity(city: string) {
    dispatch(changeCityAction(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function MainLocationList(props: ConnectedComponentProps): JSX.Element {
  const { cities, currentCity, onChangeCity } = props;
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a href="/#" className={`locations__item-link ${city === currentCity ? 'tabs__item--active' : 'tabs__item'}`}>
                <span onClick={() => onChangeCity(city)}>{city}</span>
              </a>
            </li>
          ),

          )}

        </ul>
      </section>
    </div>
  );
}

export { MainLocationList };
export default connector(MainLocationList);
