import React from "react";
import { Table, Modal, Switch } from "antd";
import { ButtonOption } from "components/UI";
import styles from "./List.module.scss";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

interface IListProps {
  loading: boolean;
  pagination: any;
  user: any;
  dataSource: any;
  dataStatus: string;
  infoMember:any;
  onAddItemVersion: (item: any) => void;
  onAddItemVerify: (item: any) => void;
  onDeleteItem: (id: string) => void;
  showEditModal: (item: any) => void;
  onPreviewItem: (item: any) => void;
  onAddItemRequest: (item: any) => void;
}

const { confirm } = Modal;

const List: React.FunctionComponent<IListProps> = React.memo(
  ({
    loading,
    pagination,
    user,
    dataSource,
    dataStatus,
    infoMember,
    onAddItemVersion,
    onAddItemVerify,
    onDeleteItem,
    showEditModal,
    onPreviewItem,
    onAddItemRequest,
    ...rest
  }) => {
    const [idEdit, setIdEdit] = React.useState<string>("");

    const [articleList, setArticleList] = React.useState<any>([]);
    const [countPage, setCountPage] = React.useState<number>(0);

    React.useEffect(() => {
      filterListArticle();
    }, []);
    React.useEffect(() => {
      filterListArticle();
    }, [dataSource, dataStatus]);

    const filterListArticle = () => {
      let updateList;
      if (dataStatus == "All") {
        updateList = dataSource;
      } else {
        updateList = dataSource.filter(
          (item: any) => item.status == dataStatus
        );
      }

      if (user.userType == "Admin") {
        setArticleList(updateList);
        setCountPage(updateList.length)
      } else {
        let articleList = updateList.filter(
          (item: any) => item.userId == user.id
        );
        setArticleList(articleList);
        setCountPage(updateList.length)
      }
    };
    const handleMenuClick = (record, e) => {
      switch (e.key) {
        case "1":
          showEditModal(record);
          break;
        case "2":
          confirm({
            title: "Do you want to delete these items?",
            icon: <ExclamationCircleOutlined />,
            onOk() {
              onDeleteItem(record.key);
            },
            onCancel() {},
            okButtonProps: {
              loading,
            },
          });
          break;
        case "3":
          window.open(`/review/${record.key}`);
          break;
        case "4":
          console.log("4");
          onAddItemRequest(record.key);
          break;
        case "5":
            onAddItemVerify({ id: record.key });
          break;
        case "6":
            onAddItemVersion({ id: record.key });
          break;
        case "7":
            onAddItemVersion({ id: record.key });
          break;
      }
    };
    const filterOptions = (value, record) => {
      let btnOption=[
        { key: "1", name: "Update" },
        { key: "2", name: "Delete" },
        { key: "3", name: "Review" },
      ]
      switch (value.status) {
        case "Draft":
          return (
            <ButtonOption
              onMenuClick={(e) => handleMenuClick(record, e)}
              buttonOptions={[
                { key: "1", name: "Update" },
                { key: "2", name: "Delete" },
                { key: "3", name: "Review" },
                { key: "4", name: "Request" },
              ]}
            />
          );
        case "Request":
          return (
            <ButtonOption
              onMenuClick={(e) => handleMenuClick(record, e)}
              buttonOptions={user.userType=="Admin"? [
                { key: "1", name: "Update" },
                { key: "2", name: "Delete" },
                { key: "3", name: "Review" },
                { key: "5", name: "Verify" },
              ]:btnOption}
            />
          );
        case "Verify":
          return (
            <ButtonOption
              onMenuClick={(e) => handleMenuClick(record, e)}
              buttonOptions={ user.userType=="Admin"?[
                { key: "1", name: "Update" },
                { key: "2", name: "Delete" },
                { key: "3", name: "Review" },
                { key: "6", name: "Publish" },
              ]:btnOption}
            />
          );
        case "Modified":
          return (
            <ButtonOption
              onMenuClick={(e) => handleMenuClick(record, e)}
              buttonOptions={user.userType=="Admin"? [
                { key: "1", name: "Update" },
                { key: "2", name: "Delete" },
                { key: "3", name: "Review" },
                { key: "7", name: "Publish" },
              ]:btnOption}
            />
          );
        case "Published":
          return (
            <ButtonOption
              onMenuClick={(e) => handleMenuClick(record, e)}
              buttonOptions={btnOption}
            />
          );

        default:
          break;
      }
    };

    const columns = [
      {
        title: "",
        dataIndex: "index",
        key: "index",
        width: "5%",
        align: "center" as "center",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "20%",
        ellipsis: true,
        render: (text: any, record: any) => {
          return <NavLink to={`/article/${record.key}`}>{text}</NavLink>;
        },
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "30%",
        ellipsis: true,
      },
      {
        title: "User",
        dataIndex: "userName",
        key: "userName",
        width: "15%",
        align: "center" as "center",
        render: (text: any, record: any) => {
          return <>
          {user.userType=="Admin"?text:""}
          </>
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "center" as "center",
        width: "10%",
        render: (text: any, record: any) => {
          return text;
        },
      },
      {
        title: "Action",
        key: "operation",
        align: "center" as "center",
        
        render: (text: any, record: any) => {
          return filterOptions(text, record);
        },
      },
    ];
    return (
      <>
        <Table
          {...rest}
          pagination={{
            total: articleList.length,
            showTotal: (total) => `Total ${articleList.length} Items`,
          }}
          loading={loading}
          className={styles.table}
          bordered
          scroll={{ x: 1160 }}
          dataSource={articleList}
          columns={user.userType=="Admin"?columns:columns.filter((col)=>col.title!="User")}
          rowKey={(record) => record.key}
        />
      </>
    );
  }
);

export default List;
