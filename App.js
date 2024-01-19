import * as React from "react";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import your Redux store
import AppNavigator from "./appNavigator";
function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
export default App;
