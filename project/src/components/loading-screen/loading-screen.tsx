import Loader from 'react-loader-spinner';

function LoadingScreen(): JSX.Element {
  return (
    <div className="loader__wrapper">
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
