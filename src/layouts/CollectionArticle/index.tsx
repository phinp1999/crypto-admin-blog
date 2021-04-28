import React from "react";
import { connect } from "react-redux";
import {
  getArticles,
  getArticle,
  addArticle,
  addArticleVersion,
  addArticleVerify,
  editArticle,
  addArticleRequestV1,
} from "redux/actions/article";
import {
  getUser
} from "redux/actions/pageUser";
import { getCollectiones } from "redux/actions/collection";
import { getTags } from "redux/actions/tag";
import { IAppState } from "redux/store/types";
import { Page } from "components/UI";
import { Filter, List} from "./components";
import { Breadcrumb, Modal, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
interface IArticleProps {
  user: any;
  article: any;
  collection: any;
  tag: any;
  infoUser:any;
  getArticles: () => void;
  getArticle: (value: string) => void;
  addArticle: (value: any) => void;
  editArticle: (value: any) => void;
  removeArticle: (id: string) => void;
  addArticleVersion: (value: any) => void;
  addArticleRequestV1: (value: any) => void;
  // Collections
  hiddenPopup: () => void;
  addArticleVerify: (value: any) => void;
  // user
  getUser:(id:number)=> void;
}

const Article: React.FunctionComponent<IArticleProps> = (props) => {
  const history = useHistory();
  const [articleList, setArticleList] = React.useState<any>([]);
  const [filterTitle, setFilterTitle] = React.useState<string>("");
  const [filterStatus, setFilterStatus] = React.useState("All");
  let param:any=useParams();
  React.useEffect(() => {
    props.getArticles();
  }, []);

  React.useEffect(() => {
    setArticleList(onSearch(props.article.articleList, filterTitle));
  }, [props.article.articleList, filterTitle]);

  React.useEffect(() => {
    props.getUser(props.user.id);
  }, [props.user]);

  const onSearch = (data: any, key: string) => {
    return data.filter(
      (item: any) => item.title.toLowerCase().indexOf(key.toLowerCase()) > -1
    );
  };


  const filterProps = {
    user: props.user,
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
    infoMember:props.infoUser,
    idCollection:param.id,
    dataStatus: filterStatus,
    onAddItemVersion: (item: any) => {
      props.addArticleVersion(item);
    },
    onAddItemVerify: (item: any) => {
      props.addArticleVerify(item);
    },
    onAddItemRequest: (item: any) => {
      props.addArticleRequestV1(item);
    },
    onPreviewItem: async (item: any) => {
      const { id, userId, tagIdArray } = item;

      var tagArray = await props.tag.tagList.filter((tag) =>
        tagIdArray.find((tagId) => tag.key === tagId)
      );

      history.push({
        pathname: `${"/review/" + id}`,
        state: {
          articleId: id,
          userId,
          tagArray,
        },
      });
    },
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
            <Breadcrumb.Item>Collection-Article</Breadcrumb.Item>
          </Breadcrumb>
          <h2 style={{ marginTop: "13px" }}>Page Collection-Article</h2>
        </div>
        <div style={{ width: "100%", height: "10px" }}></div>
        <div style={{ margin: "10px 20px" }}>
          <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
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
  infoUser:state.pageUser
});

export default connect(mapStateToProps, {
  getArticle,
  getArticles,
  addArticle,
  addArticleVersion,
  addArticleVerify,
  editArticle,
  addArticleRequestV1,
  getUser,
})(Article);
