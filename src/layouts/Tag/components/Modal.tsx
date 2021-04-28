import React from "react";
import { Form, Input, Modal, Button } from "antd";
import { BlockPicker } from "react-color";
import { BgColorsOutlined } from "@ant-design/icons";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

interface IModalProps {
  item: any;
  loading: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
}

const TagModal: React.FunctionComponent<IModalProps> = React.memo((props) => {
  const formRef = React.useRef<any>();
  const [isPicker, setIsPicker] = React.useState<boolean>(false);
  const [color, setColor] = React.useState("");

  const handleOk = () => {
    const { item = {}, onOk } = props;
    formRef.current
      .validateFields()
      .then((values: any) => {
        const data = {
          ...values,
          id: item.id,
        };
        onOk(data);
      })
      .catch((errorInfo: any) => {
        //console.log(errorInfo);
      });
  };

  const handleChange = (e) => {
    setColor(e.hex);

    formRef.current.setFieldsValue({ color: e.hex });
  };

  const { item = {}, onOk, ...modalProps } = props;

  return (
    <Modal
      {...modalProps}
      afterClose={() => {
        setColor("");
        setIsPicker(false);
      }}
      footer={[
        <Button
          key="cancel"
          onClick={() => {
            setColor("");
            setIsPicker(false);
            formRef.current.setFieldsValue({ color: "" });
            props.onCancel();
          }}
        >
          Cancel
        </Button>,
        <Button
          key="Ok"
          type="primary"
          loading={props.loading}
          onClick={handleOk}
        >
          Ok
        </Button>,
      ]}
    >
      <Form
        ref={formRef}
        name="control-ref"
        initialValues={{ ...item }}
        layout="horizontal"
      >
        <FormItem
          name="name"
          rules={[{ required: true, message: "Please enter name!" }]}
          label="Name"
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <FormItem
          name="color"
          rules={[{ required: true, message: "Please enter color!" }]}
          label="Color"
          {...formItemLayout}
        >
          <Input
            addonAfter={
              <BgColorsOutlined onClick={() => setIsPicker((pre) => !pre)} />
            }
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
        </FormItem>
      </Form>
    </Modal>
  );
});

export default TagModal;
