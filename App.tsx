import React from "react";
import { Provider } from "react-redux";
import store from "./src/stores/store";
import HomeScreen from "./src/scenes/HomeFlow/Home/HomeScreen.component";

const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;