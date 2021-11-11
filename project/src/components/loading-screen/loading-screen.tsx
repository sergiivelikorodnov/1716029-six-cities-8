import Loader from 'react-loader-spinner';
import stylesComponent from './loading.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={stylesComponent.loading}>
      <Loader
        type="TailSpin"
        color="#4481c3"
        height={50}
        width={50}
      />
    </div>

  );
}

export default LoadingScreen;
