/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./List.module.scss";
import { Table, Form, Modal, Switch } from "antd";
import { ButtonOption } from "components/UI";
import {
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";

const { confirm } = Modal;
interface Item {
  key: string;
  title: string;
  description: number;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Item;
  index: number;
  children: React.ReactNode;
  dataSource: any;
}

interface IListProps {
  loading: boolean;
  pagination: any;
  onDeleteItem: (id: string) => void;
  onActiveItem: (item: any) => void;
  showEditModal: (item: any) => void;
}

const List: React.FC<IListProps> = (props) => {
  const [form] = Form.useForm();
  const [idEdit, setIdEdit] = React.useState<string>("");

  const onChange = (record, e) => {
    const { onActiveItem } = props;
    setIdEdit(record.key);
    if (e) {
      onActiveItem({ id: record.key, status: "activate" });
    } else {
      onActiveItem({ id: record.key, status: "disable" });
    }
  };

  const handleMenuClick = (record, e) => {
    const { onDeleteItem, showEditModal } = props;

    if (e.key === "1") {
      showEditModal(record);
    } else if (e.key === "2") {
      confirm({
        title: "Do you want to delete these items?",
        icon: <ExclamationCircleOutlined />,
        onOk() {
          onDeleteItem(record.key);
        },
        onCancel() {},
        okButtonProps: {
          loading: props.loading,
        },
      });
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "center" as "center",
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
      width: "15%",
    },
    {
      title: "Avatar",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      width: "15%",
      align: "center" as "center",
      render: (url: any) => {
        return (
          <>
            <img
              src={
                url
                  ? url
                  : "https://wolves-staging.s3.us-east-2.amazonaws.com/images/1614741165701-images.png"
              }
              alt="Avatar"
              width="50%"
            ></img>
          </>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "User type",
      dataIndex: "userType",
      key: "userType",
      width: "15%",
      align: "center" as "center",
    },
    {
      title: "Active",
      dataIndex: "status",
      key: "status",
      width: "10%",
      align: "center" as "center",
      render: (text: any, record: any) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={record.status === "Active" ? true : false}
            loading={record.key === idEdit && props.loading}
            onChange={(e) => onChange(record, e)}
          />
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      align: "center" as "center",
      width: "15%",
      render: (text: any, record: any) => {
        return (
          <ButtonOption
            onMenuClick={(e) => handleMenuClick(record, e)}
            buttonOptions={[
              { key: "1", name: "Update" },
              { key: "2", name: "Delete" },
            ]}
          />
        );
      },
    },
  ];

  return (
    <Form form={form} component={false}>
      <Table
        {...props}
        bordered
        columns={columns}
        pagination={{
          ...props.pagination,
          showTotal: (total) => `Total ${total} Items`,
        }}
        className={styles.table}
        scroll={{ x: 500 }}
        rowKey={(record) => record.key}
      />
    </Form>
  );
};

export default List;
