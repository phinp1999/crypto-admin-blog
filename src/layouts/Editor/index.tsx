import React from "react";
import { connect } from "react-redux";
import Editor from "./components/QuillEditor";
import {
  editArticle,
  getArticle,
  addArticleRequest,
  clearArticleItem,
} from "redux/actions/article";
import { Breadcrumb, Button, Modal, Alert, Spin } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { Page } from "components/UI";
import _, { debounce } from "lodash";
import { IAppState } from "redux/store/types";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";

interface IArticleWriteProps {
  getArticle: (id: string) => void;
  editArticle: (value: any) => void;
  clearArticleItem: () => void;
  addArticleRequest: (value: any) => void;
  article: any;
  value: any;
  onChange: (value: any) => void;
  label: string;
  error: string;
  inputDescription: any;
  placeholder: any;
  location: any;
}

const ArticleWrite: React.FC<IArticleWriteProps> = ({
  inputDescription,
  error,
  label,
  onChange,
  value,
  placeholder,
  ...props
}) => {
  const history = useHistory();
  const params: any = useParams();
  const [content, setContent] = React.useState<string>("");
  const [isSaved, setIsSaved] = React.useState<boolean>(true);
  const [isDraft, setIsDraft] = React.useState<boolean>(false);
  const [disabledSave, setDisableSave] = React.useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(true);

  const editorRef = React.useRef<any>(null);

  const fetchContent = (value) => {
    props.editArticle({
      data: { id: params.id, content: value },
      notify: false,
    });
  };

  const debounceLoadContent = React.useCallback(
    debounce(fetchContent, 500),
    []
  );

  React.useEffect(() => {
    props.getArticle(params.id);

    return () => {
      props.clearArticleItem();
    };
  }, []);

  React.useEffect(() => {
    if (!_.isEmpty(props.article.articleItem)) {
      setContent(props.article.articleItem.attributes.content);
      if (props.article.articleItem.attributes.status === "Draft") {
        setIsDraft(true);
      } else {
        setIsDraft(false);
      }
    }
  }, [props.article.articleItem]);

  const toggleSaved = (isSaved) => {
    setIsSaved(isSaved);
  };

  const onFocus = () => {
    setIsSaved(false);
  };

  const handleChange = (data: any, source: any) => {
    if (source === "user" || source === "api") {
      if (!disabledSave) {
        debounceLoadContent(data);
      }
      setContent(data);
      setDisableSave(false);
    }
  };

  const handleSave = () => {
    //save article with status="Draft"
    props.editArticle({
      data: { id: params.id, content },
      toggleSaved,
      notify: true,
    });
  };

  const handleSubmit = () => {
    //save article with status="Request"
    /*     if (isSaved) {
      props.addArticleRequest({
        data: params.id,
        modalDialog,
      });
    } else {
      infoModal();
    } */
    props.addArticleRequest({
      data: params.id,
      modalDialog,
    });
  };

  const handlePreview = () => {
    window.open(`${"/review/" + params.id}`);
  };

  function infoModal() {
    Modal.confirm({
      content: (
        <>
          Your content has not been saved yet! <br />
          Do you want to save?
        </>
      ),
      onOk() {
        handleSave();
      },
      onCancel() {},
    });
  }

  const modalDialog = (
    icon: string,
    content: string,
    push: boolean = false
  ) => {
    Modal[icon]({
      content,
      onOk() {
        push &&
          history.push({
            pathname: "/article",
          });
      },
    });
  };

  document.addEventListener("fullscreenchange", function (event) {
    if (document.fullscreenElement) {
      setIsFullscreen(false);
    } else {
      setIsFullscreen(true);
    }
  });

  return (
    <Spin
      spinning={props.article.isLoading}
      size="large"
      wrapperClassName="bg-page-loading"
    >
      <div
        style={{
          opacity: props.article.isLoading ? 0 : 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {isFullscreen && (
          <div className="editor-btn-wrapper">
            <Button
              className="editor_goback"
              onClick={() => history.goBack()}
              shape="round"
              type="primary"
              icon={<ArrowLeftOutlined />}
            >
              Go back
            </Button>
            <div className="editor-action">
              <Button className="preview" onClick={handlePreview} shape="round">
                Preview
              </Button>
              {isDraft && (
                <Button
                  className="request"
                  onClick={handleSubmit}
                  loading={props.article.isEditing}
                  shape="round"
                >
                  Resquest
                </Button>
              )}
            </div>
          </div>
        )}
        <div className="editor-wrapper">
          <Page
            inner
            className={`page-editor ${!isFullscreen ? "ql-fullscreen" : ""}`}
          >
            <div className="editor-container-blog">
              <Editor
                iconFullscreen={
                  isFullscreen ? (
                    <FullscreenOutlined />
                  ) : (
                    <FullscreenExitOutlined />
                  )
                }
                placeholder="Write something..."
                onChange={handleChange}
                onFocus={onFocus}
                value={content}
              />
            </div>
          </Page>
        </div>
      </div>
    </Spin>
  );
};

const mapStateToProps = (state: IAppState) => ({
  article: state.article,
});

export default connect(mapStateToProps, {
  getArticle,
  editArticle,
  addArticleRequest,
  clearArticleItem,
})(ArticleWrite);
