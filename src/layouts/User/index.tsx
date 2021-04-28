import React from "react";
import { connect } from "react-redux";
import {
  getUsers,
  getUser,
  addUser,
  removeUser,
  editUser,
  activeUser,
} from "redux/actions/pageUser";
import { IAppState } from "redux/store/types";
import { Page, Loader } from "components/UI";
import { Filter, List, Modal } from "./components";
import { Breadcrumb, Spin } from "antd";
import { NavLink } from "react-router-dom";
import _ from "lodash";

interface IUserProps {
  pageUser: any;
  getUsers: () => void;
  getUser: (value: string) => void;
  addUser: (value: any) => void;
  removeUser: (id: string) => void;
  editUser: (value: any) => void;
  activeUser: (value: any) => void;
}

const User: React.FunctionComponent<IUserProps> = (props) => {
  const initialState = {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
  };

  const [state, setState] = React.useState(initialState);
  const [userList, setUserList] = React.useState<any>([]);
  const [removeFile, setRemoveFile] = React.useState<boolean>(false);
  const [filterName, setFilterName] = React.useState<string>("");

  React.useEffect(() => {
    props.getUsers();
  }, []);

  React.useEffect(() => {
    setUserList(onSearch(props.pageUser.userList, filterName));
  }, [props.pageUser.userList, filterName]);

  const onSearch = (data: any, key: string) => {
    return data.filter(
      (item: any) => item.fullName.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  };

  const toggleModalVisible = (visible: boolean) => {
    setState({ ...state, modalVisible: visible });
    setRemoveFile(true);
  };

  const modalProps = {
    item: state.modalType === "create" ? {} : state.currentItem,
    visible: state.modalVisible,
    destroyOnClose: true,
    title: `${state.modalType === "create" ? `Create user` : `Update user`}`,
    removie: removeFile,
    centered: true,
    loading: props.pageUser.isActing,
    onOk: (data: any) => {
      console.log(data);
      const { item, values, onShowPassword } = data;
      if (_.isEmpty(item)) {
        const dataCreate = {
          ...values,
        };
        console.log(dataCreate);
        props.addUser({ dataCreate, onShowPassword, toggleModalVisible });
      } else {
        const data = {
          id: item.key,
          ...values,
        };
        props.editUser(data);
      }
    },
    onCancel: () => {
      setState(initialState);
      setRemoveFile(true);
    },
  };

  const filterProps = {
    showCreateModal: () => {
      setState({ ...initialState, modalVisible: true });
      setRemoveFile(false);
    },
    onFilterChange: (value: string) => {
      setFilterName(value);
    },
  };

  const listProps = {
    loading: props.pageUser.isActing || props.pageUser.isRefreshing,
    dataSource: userList,
    pagination: props.pageUser.pagination,
    showEditModal: (item: any) => {
      setState({ currentItem: item, modalType: "update", modalVisible: true });
    },
    onActiveItem: (item: any) => {
      props.activeUser(item);
    },
    onDeleteItem: (id: string) => {
      props.removeUser(id);
    },
  };
  return (
    <>
      <Spin
        spinning={props.pageUser.isLoading}
        size="large"
        wrapperClassName="bg-page-loading"
      >
        <div style={{ opacity: props.pageUser.isLoading ? 0 : 1 }}>
          <div className="header-content">
            <Breadcrumb>
              <Breadcrumb.Item>
                <NavLink to={"/"}>Home</NavLink>
              </Breadcrumb.Item>
              <Breadcrumb.Item>User</Breadcrumb.Item>
            </Breadcrumb>
            <h2 style={{ marginTop: "13px" }}> Page User</h2>
          </div>
          <div style={{ width: "100%", height: "10px" }}></div>
          <div style={{ margin: "10px 20px" }}>
            <Page inner>
              <Filter {...filterProps} />
              <List {...listProps} />
              <Modal {...modalProps} />
            </Page>
          </div>
        </div>
      </Spin>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  pageUser: state.pageUser,
});

export default connect(mapStateToProps, {
  getUsers,
  getUser,
  addUser,
  removeUser,
  editUser,
  activeUser,
})(User);
