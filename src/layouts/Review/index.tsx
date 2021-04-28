import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "redux/actions/pageUser";
import { getTags } from "redux/actions/tag";
import { IAppState } from "redux/store/types";
import { Loader } from "components/UI";
import styles from "./index.module.scss";
import Moment from "react-moment";
import _ from "lodash";
import { Button, Row, Col } from "antd";
import {
  getArticle,
  addArticleVerify,
  addArticleRequestV1,
} from "redux/actions/article";
import { get } from "services/localStorage";
interface IReviewProps {
  article: any;
  user: any;
  tag: any;
  getArticle: (value: string) => void;
  getUser: (value: string) => void;
  getTags: () => void;
  addArticleVerify: (value: any) => void;
  addArticleRequestV1: (value: any) => void;
}

const Review: React.FunctionComponent<IReviewProps> = (props) => {
  const [tagArray, setTagArray] = React.useState<any>([]);
  const [status, setStatus] = React.useState<boolean>(false);
  const params: any = useParams();

  React.useEffect(() => {
    if (!_.isEmpty(params.id)) {
      props.getArticle(params.id);
      props.getTags();
    }
  }, []);

  React.useEffect(() => {
    if (!_.isEmpty(props.article.articleItem)) {
      props.getUser(props.article.articleItem.attributes.userId);
    }
  }, [props.article.articleItem]);

  React.useEffect(() => {
    if (!_.isEmpty(props.article.articleItem)) {
      var tagArray = props.tag.tagList.filter((tag) =>
        props.article.articleItem.attributes.tagIdArray.find(
          (tagId) => tag.key === tagId
        )
      );

      setTagArray(tagArray);
    }
  }, [props.article.articleItem, props.tag.tagList]);

  const renderhtml = () => {
    return (
      <div className="quill">
        <div className="ql-container ql-snow" style={{ border: "none" }}>
          <Col
            className={"ql-editor " + styles.body_content}
            dangerouslySetInnerHTML={{
              __html: props.article.articleItem.attributes?.content,
            }}
            style={{ padding: 0 }}
          ></Col>
        </div>
      </div>
    );
  };

  const renderTag = (tagList) => {
    return tagList.map((tag) => (
      <div className={styles.guide} key={tag.key}>
        <a
          href="#"
          style={{
            backgroundColor: `${tag.color}`,
            color: "#fff",
            height: "30px",
            lineHeight: "30px",
            padding: "0 10px",
            borderRadius: "5px",
          }}
        >
          {tag.name}
        </a>
      </div>
    ));
  };
  const handleClick = () => {
    if (props.article.articleItem.attributes?.status == "Request") {
      props.addArticleVerify({ id: parseInt(params.id) });
    } else {
      if (props.article.articleItem.attributes?.status == "Draft")
        props.addArticleRequestV1(parseInt(params.id));
    }
    setStatus(true);
  };

  return (
    <>
      <Loader
        spinning={
          props.article.isLoading || props.user.isLoading || props.tag.isLoading
        }
      />
      {props.article.articleItem.attributes?.status == "Request" &&
      get("type") == "Admin" &&
      status === false ? (
        <Button
          className={styles.preview_goback}
          onClick={handleClick}
          shape="round"
        >
          Verify
        </Button>
      ) : (
        ""
      )}
      {props.article.articleItem.attributes?.status == "Draft" &&
      get("type") != "Admin" &&
      status === false ? (
        <Button
          className={styles.preview_goback}
          onClick={handleClick}
          shape="round"
        >
          Request
        </Button>
      ) : (
        ""
      )}
      <div className={styles.wrapper_review}>
        <div className={styles.main_content}>
          <div className={styles.header_content}>
            <h1 className={styles.title}>
              {props.article.articleItem.attributes?.title}
            </h1>
            <Row gutter={24} className={styles.info_content}>
              <Col
                xs={{ span: 12 }}
                sm={{ span: 8 }}
                xl={{ span: 8 }}
                className={styles.bottom_content}
              >
                <img
                  style={{ width: "28px", height: "28px", borderRadius: "50%" }}
                  src={props.user.userItem.attributes?.avatarUrl}
                ></img>
                <div className={styles.info_user}>
                  <span className={styles.name}>
                    {props.user.userItem.attributes?.fullName}
                  </span>
                  <br />
                  <span className={styles.date}>
                    <Moment format="MMM DD, YYYY">
                      {props.article.meta?.updatedAt}
                    </Moment>
                  </span>
                </div>
              </Col>
              <Col xs={{ span: 12 }} sm={{ span: 16 }} xl={{ span: 16 }}>
                <Row gutter={24} className={styles.head_content}>
                  {renderTag(tagArray)}
                </Row>
              </Col>
            </Row>
          </div>
          {renderhtml()}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: IAppState) => ({
  tag: state.tag,
  article: state.article,
  user: state.pageUser,
});

export default connect(mapStateToProps, {
  getArticle,
  getUser,
  getTags,
  addArticleVerify,
  addArticleRequestV1,
})(Review);
