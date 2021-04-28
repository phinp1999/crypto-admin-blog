import React from "react";
import Header from "../../components/Layout/Header";
import Sider from "../../components/Layout/Sider";
import { Layout } from "antd";
import styles from "./index.module.scss";
import { Route } from "react-router-dom";
import {
  Editor,
  Article,
  Collection,
  User,
  Tag,
  CollectionArticle,
} from "layouts";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "redux/actions/user";
import { IAppState } from "redux/store/types";
import { Loader } from "components/UI";

const { Content, Footer } = Layout;

interface Location {
  pathname: string;
}
interface IPrimaryLayoutProps {
  location: Location;
  logoutUser: () => void;
  user: any;
}

const PrimaryLayout: React.FunctionComponent<IPrimaryLayoutProps> = ({
  children,
  location,
  logoutUser,
  user,
  ...rest
}) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const history = useHistory();

  const toggle = () => {
    setCollapsed((pre) => !pre);
  };

  const onSignOut = () => {
    logoutUser();
    history.push("/login");
  };

  document.addEventListener("fullscreenchange", function (event) {
    if (document.fullscreenElement) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  });

  return (
    <React.Fragment>
      {user.loginSuccess == true ? "" : <Loader spinning={true} />}
      <Layout>
        <Sider collapsed={collapsed} location={location.pathname} />
        <div
          className={styles.container}
          style={{ paddingTop: 72 }}
          id="primaryLayout"
        >
          <Header
            collapsed={collapsed}
            toggle={toggle}
            onSignOut={onSignOut}
            {...rest}
          />
          <Content
            className={styles.content}
            style={{ padding: "0", overflow: "initial" }}
          >
            {user.userType == "Admin" ? (
              <React.Fragment>
                {" "}
                <Route exact path={["", "/user"]} component={User} />
                <Route path="/tag" component={Tag} />
              </React.Fragment>
            ) : (
              ""
            )}
            <Route exact path="/article" component={Article} />
            <Route
              path="/collection-article/:id"
              component={CollectionArticle}
            />
            <Route path="/collection" component={Collection} />
          </Content>
          {/* <BackTop target={() => document.querySelector("#primaryLayout")} />  */}
          {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018</Footer> */}
        </div>
      </Layout>
    </React.Fragment>
  );
};
const mapStateToProps = (state: IAppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  logoutUser,
})(PrimaryLayout);
