import React from "react";
import { Form, Input, Modal, Button } from "antd";

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
  optiondata: any;
}

const CollectionModal: React.FunctionComponent<IModalProps> = React.memo(
  (props) => {
    const formRef = React.useRef<any>();

    const handleOk = () => {
      const { item = {}, onOk } = props;
      formRef.current
        .validateFields()
        .then((values: any) => {
          const data = {
            ...values,
          };
          onOk(data);
        })
        .catch((errorInfo: any) => {
          console.log(errorInfo);
        });
    };
    const { item = {}, onOk, ...modalProps } = props;

    return (
      <Modal
        {...modalProps}
        footer={[
          <Button key="cancel" onClick={props.onCancel}>
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
            name="title"
            rules={[{ required: true, message: "Please enter title!" }]}
            label="Title"
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
          <FormItem
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
            label="Description"
            hasFeedback
            {...formItemLayout}
          >
            <Input.TextArea />
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

export default CollectionModal;
