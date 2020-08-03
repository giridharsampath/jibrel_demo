import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <React.Fragment>
          <Router>
            <NavigationBar />
            <Layout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NoMatch} />
              </Switch>
            </Layout>
          </Router>
        </React.Fragment>
      </PersistGate>
    </Provider>
  );
}

export default App;
