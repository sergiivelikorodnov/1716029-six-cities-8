import Loader from 'react-loader-spinner';
import stylesComponent from './loading.module.css';

function LoadingScreen(): JSX.Element {
  const LOADING_HEIGHT = 50;
  const LOADING_WIDTH = 50;
  return (
    <div className={stylesComponent.loading}>
      <Loader
        type="TailSpin"
        color="#4481c3"
        height={LOADING_HEIGHT}
        width={LOADING_WIDTH}
      />
    </div>

  );
}

export default LoadingScreen;
