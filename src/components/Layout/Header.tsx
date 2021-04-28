import React, { Fragment } from "react";
import { Menu, Layout, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import classnames from "classnames";
import styles from "./Header.module.scss";
import { connect } from "react-redux";
import { getLoginInfo } from "redux/actions/user";
import { IAppState } from "redux/store/types";
import userEvent from "@testing-library/user-event";

const { SubMenu } = Menu;

interface IHeaderProps {
  collapsed: boolean;
  toggle: () => void;
  onSignOut?: () => void;
  user?: any;
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { collapsed, toggle, onSignOut, user } = props;

  const handleClickMenu = (e) => {
    if (onSignOut) {
      e.key === "SignOut" && onSignOut();
    }
  };

  const rightContent = [
    <Menu key="user" mode="horizontal" onClick={handleClickMenu}>
      <SubMenu
        title={
          <Fragment>
            <span style={{ color: "#999", marginRight: 4 }}>Hi,</span>
            <span>{user.userType}</span>
            <Avatar
              style={{ marginLeft: 8 }}
              src="https://wolves-staging.s3.us-east-2.amazonaws.com/images/1614741165701-images.png"
            />
          </Fragment>
        }
      >
        <Menu.Item key="SignOut" onClick={onSignOut}>
          Sign out
        </Menu.Item>
      </SubMenu>
    </Menu>,
  ];

  return (
    <Layout.Header
      className={classnames(styles.header, styles.fixed, {
        [styles.collapsed]: collapsed,
      })}
    >
      <div className={styles.button} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.rightContainer}>{rightContent}</div>
    </Layout.Header>
  );
};

const mapStateToProps = (state: IAppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Header);
