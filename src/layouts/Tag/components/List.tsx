/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./List.module.scss";
import { Table, Input, Popconfirm, Form, Modal } from "antd";
import { ButtonOption } from "components/UI";
import { BgColorsOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { BlockPicker } from "react-color";
import _ from "lodash";

const { confirm } = Modal;
interface Item {
  index: number;
  key: string;
  title: string;
  description: number;
  color: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: Item;
  index: number;
  children: React.ReactNode;
  dataSource: any;
  formRef: any;
  isPicker: any;
  handleChange: any;
  togglePicker: any;
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
  formRef,
  togglePicker,
  color,
  isPicker,
  handleChange,
  save,
  cancel,
  onTouchCancel,
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
          {dataIndex === "color" ? (
            <>
              <Input
                addonAfter={<BgColorsOutlined onClick={togglePicker} />}
                onKeyDown={handleKeyDown}
                value={color}
              />
              {isPicker ? (
                <div
                  style={{
                    marginTop: 10,
                    position: "absolute",
                    right: 0,
                    zIndex: 999,
                  }}
                >
                  <BlockPicker onChange={handleChange} color={color} />
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <Input onKeyDown={handleKeyDown} />
          )}
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
  const [isPicker, setIsPicker] = React.useState<boolean>(false);
  const [colorTag, setColorTag] = React.useState("");

  const togglePicker = () => {
    setIsPicker((pre) => !pre);
  };
  const handleChange = (e) => {
    setColorTag(e.hex);
    form.setFieldsValue({ color: e.hex });
  };

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      title: "",
      description: "",
      color: record.color,
      ...record,
    });
    if (record.color) {
      setColorTag(record.color);
    }
    setIsPicker(false);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
    setIsPicker(false);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      const item = { id: key, ...row };
      props.onEditItem(item);
      setEditingKey("");
      setIsPicker(false);
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
      dataIndex: "index",
      key: "index",
      width: "5%",
      editable: false,
      align: "center" as "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: "30%",
      editable: true,
      render: (text: any) => {
        return (
          <div className="color-wrapper">
            <span>{text}</span>
            <div
              className="color-picked"
              style={{ backgroundColor: text }}
            ></div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "operation",
      align: "center" as "center",
      width: "200",
      render: (_: any, record) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
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
        formRef: form,
        color: colorTag,
        isPicker,
        handleChange,
        togglePicker,
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
