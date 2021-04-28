import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "normalize.css";
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "./styles/main.scss";
import "../node_modules/quill/dist/quill.min.js";
import configureStore from "redux/store";
import { PrivateRoute } from "components";
import { Editor, Login, PageNotFound, Review } from "layouts";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={[
            "",
            "/editor",
            "/tag",
            "/article",
            "/collection",
            "/user",
            "/collection-article/:id",
          ]}
          component={PrivateRoute}
        />
        <Route path="/login" component={Login} />
        <Route path="/review/:id" component={Review} />
        <Route path="/article/:id" component={Editor} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
