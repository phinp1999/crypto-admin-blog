import React from "react";
import { connect } from "react-redux";
import {
  getCollectiones,
  getCollection,
  addCollection,
  removeCollection,
  editCollection,
} from "redux/actions/collection";
import { getTags } from "redux/actions/tag";
import { IAppState } from "redux/store/types";
import { Page, Loader } from "components/UI";
import { Filter, List, Modal } from "./components";
import { Breadcrumb, Spin } from "antd";
import { NavLink } from "react-router-dom";
interface ICollection {
  collection: any;
  tag: any;
  getCollectiones: () => void;
  getTags: () => void;
  getCollection: (value: string) => void;
  addCollection: (value: any) => void;
  removeCollection: (id: string) => void;
  editCollection: (value: any) => void;
}

const Collection: React.FunctionComponent<ICollection> = (props) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [collectionList, setCollectionList] = React.useState<any>([]);
  const [filterTitle, setFilterTitle] = React.useState<string>("");

  React.useEffect(() => {
    props.getCollectiones();
    props.getTags();
  }, []);

  React.useEffect(() => {
    setCollectionList(onSearch(props.collection.collectionList, filterTitle));
  }, [props.collection.collectionList, filterTitle]);

  const onSearch = (data: any, key: string) => {
    return data.filter(
      (item: any) => item.title.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  };

  const modalProps = {
    item: {},
    visible: modalVisible,
    destroyOnClose: true,
    title: "Create collection",
    centered: true,
    loading: props.collection.isActing,
    optiondata: props.tag.tagList,
    onOk: (data: any) => {
      props.addCollection(data);
    },
    onCancel: () => {
      setModalVisible(false);
    },
  };

  const filterProps = {
    showCreateModal: () => {
      setModalVisible(true);
    },
    onFilterChange: (value: string) => {
      setFilterTitle(value);
    },
  };

  const listProps = {
    loading: props.collection.isActing || props.collection.isRefreshing,
    dataSource: collectionList,
    pagination: props.collection.pagination,
    onEditItem: (item: any) => {
      props.editCollection(item);
    },
    onDeleteItem: (id: string) => {
      props.removeCollection(id);
    },
  };

  return (
    <Spin
      spinning={props.collection.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div style={{ opacity: props.collection.isLoading ? 0 : 1 }}>
        <div className="header-content">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={"/"}>Home</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Collection</Breadcrumb.Item>
          </Breadcrumb>
          <h2 style={{ marginTop: "13px" }}> Page Collection</h2>
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
  );
};

const mapStateToProps = (state: IAppState) => ({
  collection: state.collection,
  tag: state.tag,
});

export default connect(mapStateToProps, {
  getCollectiones,
  getCollection,
  getTags,
  addCollection,
  removeCollection,
  editCollection,
})(Collection);
