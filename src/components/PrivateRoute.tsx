import * as React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import PrimaryLayout from "../layouts/PrimaryLayout";
import { get, save } from "services/localStorage";
import { IAppState } from "redux/store/types";
import { connect } from "react-redux";
import { getLoginInfo } from "redux/actions/user";

interface PrivateRouteProps extends RouteProps {
  component: any;
  getLoginInfo: () => void;
  user: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const isLoggined = get("accessToken");

  React.useEffect(() => {
    props.user.id === "" && props.getLoginInfo();
  }, []);

  React.useEffect(() => {
    save("type", props.user.userType);
  }, [props.user]);

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        true ? (
          <PrimaryLayout {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getLoginInfo,
})(PrivateRoute);
