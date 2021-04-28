import React from "react";
import { connect } from "react-redux";
import { get } from "services/localStorage";
import {
  getArticles,
  getArticlesV1,
  getArticle,
  addArticle,
  addArticleVersion,
  addArticleVerify,
  editArticle,
  removeArticle,
  addArticleRequestV1,
} from "redux/actions/article";
import { getUser } from "redux/actions/pageUser";
import { getCollectiones } from "redux/actions/collection";
import { getTags } from "redux/actions/tag";
import { IAppState } from "redux/store/types";
import { Page } from "components/UI";
import { Filter, List, ModalArticle } from "./components";
import { Breadcrumb, Modal, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
interface IArticleProps {
  user: any;
  article: any;
  collection: any;
  tag: any;
  infoUser: any;
  getArticles: () => void;
  getArticlesV1: () => void;
  getArticle: (value: string) => void;
  addArticle: (value: any) => void;
  editArticle: (value: any) => void;
  removeArticle: (id: string) => void;
  addArticleVersion: (value: any) => void;
  addArticleRequestV1: (value: any) => void;
  // Collections
  getCollectiones: () => void;
  getTags: () => void;
  hiddenPopup: () => void;
  addArticleVerify: (value: any) => void;
  // user
  getUser: (id: number) => void;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const initialState = {
    currentItem: {},
    modalVisible: false,
    modalType: "create",
  };

  const history = useHistory();
  const [articleList, setArticleList] = React.useState<any>([]);
  const [filterTitle, setFilterTitle] = React.useState<string>("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  const [state, setState] = React.useState(initialState);
  const [removeFile, setRemoveFile] = React.useState<boolean>(false);

  React.useEffect(() => {
    props.getCollectiones();
    props.getTags();
  }, []);

  React.useEffect(() => {
    if (get("type") != "Admin") {
      props.getArticlesV1();
    } else {
      props.getArticles();
    }
  }, [get("type")]);

  React.useEffect(() => {
    props.getUser(props.user.id);
  }, [props.user]);
  React.useEffect(() => {
    setArticleList(onSearch(props.article.articleList, filterTitle));
  }, [props.article.articleList, filterTitle]);

  const onSearch = (data: any, key: string) => {
    return data.filter(
      (item: any) => item.title.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  };

  const modalProps = {
    item: state.modalType === "create" ? {} : state.currentItem,
    visible: state.modalVisible,
    destroyOnClose: true,
    title: `${
      state.modalType === "create" ? `Create article` : `Update article`
    }`,
    removie: removeFile,
    centered: true,
    loading: props.article.isActing || props.article.isRefreshing,
    collectionList: props.collection.collectionList,
    tagList: props.tag.tagList,
    userId: props.user.id,
    onOk: (data: any) => {
      const { item, values, userId } = data;

      if (_.isEmpty(item)) {
        const dataCreate = {
          ...values,
          userId,
        };
        props.addArticle({
          dataCreate,
          showConfirm,
          toggleModalVisible,
        });
      } else {
        const data = {
          id: item.key,
          ...values,
        };
        props.editArticle({
          data,
          showConfirm,
          toggleModalVisible,
          refresh: true,
          notify: true,
        });
      }
    },
    onCancel: () => {
      setState(initialState);
      setRemoveFile(true);
    },
    onEditItem: (item: any) => {
      props.editArticle({ data: item });
    },
  };

  const filterProps = {
    user: props.user,
    showCreateModal: () => {
      setState({ ...initialState, modalVisible: true });
      setRemoveFile(false);
    },
    onStatusChange: (value: string) => {
      setFilterStatus(value);
    },
    onFilterChange: (value: string) => {
      setFilterTitle(value);
    },
  };

  const listProps = {
    loading: props.article.isActing || props.article.isRefreshing,
    dataSource: articleList,
    pagination: props.article.pagination,
    user: props.user,
    infoMember: props.infoUser,
    dataStatus: filterStatus,
    showEditModal: (item: any) => {
      setState({ currentItem: item, modalType: "update", modalVisible: true });
    },
    onAddItemVersion: (item: any) => {
      props.addArticleVersion(item);
    },
    onAddItemVerify: (item: any) => {
      props.addArticleVerify(item);
    },
    onAddItemRequest: (item: any) => {
      props.addArticleRequestV1(item);
    },
    onDeleteItem: (id: string) => {
      props.removeArticle(id);
    },
    onPreviewItem: async (id: any) => {
      history.push({
        pathname: `${"/review/" + id}`,
      });
    },
  };

  const toggleModalVisible = (visible: boolean) => {
    setState({ ...state, modalVisible: visible });
  };

  const showConfirm = (data: any, type: string) => {
    confirm({
      title: `${
        type === "create"
          ? "Add article successfully!"
          : "Update article successfully"
      }`,
      icon: <ExclamationCircleOutlined />,
      content: `Do you want to ${
        type === "create" ? "write" : "edit"
      } content for this article?`,
      onOk() {
        const { id, userId, tagIdArray } = data;

        var tagArray = props.tag.tagList.filter((tag) =>
          tagIdArray.find((tagId) => tag.key === tagId)
        );

        history.push({
          pathname: "/article/create",
          state: {
            articleId: id,
            userId,
            tagArray,
          },
        });
      },
      onCancel() {},
    });
  };

  return (
    <Spin
      spinning={props.article.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div style={{ opacity: props.article.isLoading ? 0 : 1 }}>
        <div className="header-content">
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to={"/"}>Home</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Article</Breadcrumb.Item>
          </Breadcrumb>
          <h2 style={{ marginTop: "13px" }}>Page Article</h2>
        </div>
        <div style={{ width: "100%", height: "10px" }}></div>
        <div style={{ margin: "10px 20px" }}>
          <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            <ModalArticle {...modalProps} />
          </Page>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: IAppState) => ({
  article: state.article,
  collection: state.collection,
  tag: state.tag,
  user: state.user,
  infoUser: state.pageUser,
});

export default connect(mapStateToProps, {
  getArticle,
  getArticles,
  getArticlesV1,
  addArticle,
  addArticleVersion,
  addArticleVerify,
  editArticle,
  removeArticle,
  getCollectiones,
  getTags,
  getUser,
  addArticleRequestV1,
})(Article);
