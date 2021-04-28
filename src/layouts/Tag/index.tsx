import React from "react";
import { connect } from "react-redux";
import { getTags, getTag, addTag, editTag, removeTag } from "redux/actions/tag";
import { IAppState } from "redux/store/types";
import { Page, Loader } from "components/UI";
import { Filter, List, Modal } from "./components";
import { Breadcrumb, Spin } from "antd";
import { NavLink } from "react-router-dom";
interface ITag {
  tag: any;
  getTags: () => void;
  getTag: (value: string) => void;
  addTag: (value: any) => void;
  editTag: (value: any) => void;
  removeTag: (id: string) => void;
}

const Tag: React.FunctionComponent<ITag> = (props) => {
  const [tagList, setTagList] = React.useState<any>([]);
  const [filterName, setFilterName] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.getTags();
  }, []);

  React.useEffect(() => {
    setTagList(onSearch(props.tag.tagList, filterName));
  }, [props.tag.tagList, filterName]);

  const onSearch = (data: any, key: string) => {
    return data.filter(
      (item: any) => item.name.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  };

  const modalProps = {
    item: {},
    visible: modalVisible,
    destroyOnClose: true,
    title: "Create tag",
    centered: true,
    loading: props.tag.isActing,
    onOk: (data: any) => {
      props.addTag(data);
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
      setFilterName(value);
    },
  };

  const listProps = {
    loading: props.tag.isActing || props.tag.isRefreshing,
    dataSource: tagList,
    pagination: props.tag.pagination,
    onEditItem: (item: any) => {
      props.editTag(item);
    },
    onDeleteItem: (id: string) => {
      props.removeTag(id);
    },
  };

  return (
    <Spin
      spinning={props.tag.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div style={{ opacity: props.tag.isLoading ? 0 : 1 }}>
        <div className="header-content">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={"/"}>Home</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tag</Breadcrumb.Item>
          </Breadcrumb>
          <h2 style={{ marginTop: "13px" }}> Page Tag</h2>
        </div>
        <div style={{ width: "100%", height: "10px" }}></div>
        <div style={{ margin: "10px 20px" }}>
          <Page inner className="tag-container">
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
  tag: state.tag,
});

export default connect(mapStateToProps, {
  getTags,
  getTag,
  addTag,
  editTag,
  removeTag,
})(Tag);
