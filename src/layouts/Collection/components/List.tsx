/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./List.module.scss";
import { NavLink } from "react-router-dom";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Modal,
} from "antd";
import { ButtonOption } from "components/UI";
import { ExclamationCircleOutlined } from "@ant-design/icons";
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
  save: any;
  cancel: any;
}

interface IListProps {
  loading: boolean;
  pagination: any;
  onDeleteItem: (id: string) => void;
  onEditItem: (item: any) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  save,
  cancel,
  ...restProps
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      save(record.key);
    } else if (e.key === "Escape") {
      cancel();
    }
  };

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input onKeyDown={handleKeyDown} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const List: React.FC<IListProps> = (props) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ title: "", description: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const item = { id: key, ...row };
      props.onEditItem(item);
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleMenuClick = (record, e) => {
    const { onDeleteItem } = props;

    if (e.key === "1") {
      edit(record);
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
      editable: false,
      align: "center" as "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "15%",
      editable: true,
      render: (text: any, record: any) => {
        return (
          <NavLink to={`/collection-article/${record.key}`}>{text}</NavLink>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
      editable: true,
    },
    {
      title: "Action",
      key: "operation",
      align: "center" as "center",
      width: "30%",
      render: (_: any, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <a
              // eslint-disable-next-line no-script-url
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <a onClick={cancel}>Cancel</a>
          </span>
        ) : (
          <ButtonOption
            onMenuClick={(e) => handleMenuClick(record, e)}
            buttonOptions={[
              { key: "1", name: "Update" },
              { key: "2", name: "Delete" },
            ]}
            disabled={editingKey !== ""}
          />
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        save,
        cancel,
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        {...props}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns}
        rowClassName="editable-row"
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
