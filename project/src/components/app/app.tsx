import Main from '../main/main';

const Settings = {
  PROPERTY_NUMBER: 322,
};

function App(): JSX.Element {
  return (
    <Main
      propertyNumber = {Settings.PROPERTY_NUMBER}
    />
  );
}

export default App;
