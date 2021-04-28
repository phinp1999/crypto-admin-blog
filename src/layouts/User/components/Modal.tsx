import React from "react";
import { Form, Input, Modal, Button, Select, Upload } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import _ from "lodash";

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
  removie: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
}

const UserModal: React.FunctionComponent<IModalProps> = React.memo((props) => {
  const formRef = React.useRef<any>();
  const [urlAvatar, setUrlAvatar] = React.useState<string>("");
  const [fileList, setFileList] = React.useState<any>([]);

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (props.item.avatarUrl) {
      setUrlAvatar(props.item.avatarUrl);
      setFileList([
        {
          uid: "-1",
          name: props.item.avatarUrl,
          status: "done",
          url: props.item.avatarUrl,
          thumbUrl: props.item.avatarUrl,
        },
      ]);
    }
  }, [props.item.avatarUrl]);

  React.useEffect(() => {
    if (props.removie == true) {
      handleRemove();
    }
  }, [props.removie]);

  const handleOk = () => {
    const { item = {}, onOk } = props;
    formRef.current
      .validateFields()
      .then((values: any) => {
        const data = { ...values, avatarUrl: urlAvatar };
        onOk({ item, values: data, onShowPassword });
      })
      .catch((errorInfo: any) => {
        console.log(errorInfo);
      });
  };
  const { item = {}, onOk, ...modalProps } = props;
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://api.twp.asia/api/uploads/image",
        fmData,
        config
      );
      onSuccess("Ok");
      setUrlAvatar(res.data.attributes.imageUrl);
    } catch (err) {
      onError({ err });
    }
  };
  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);

    setFileList(fileList);
  };

  const handleRemove = () => {
    setFileList([]);
    setUrlAvatar("");
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onShowPassword = (password) => {
    Modal.info({
      title: "Please login to this account with the password below.",
      content: (
        <Input.Password
          value={password}
          readOnly
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      ),
      onOk() { },
    });
  };

  return (
    <Modal
      {...modalProps}
      afterClose={handleRemove}
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
        {_.isEmpty(props.item) && (
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
            label="Email"
            hasFeedback
            {...formItemLayout}
          >
            <Input />
          </FormItem>
        )}
        <FormItem
          name="fullName"
          rules={[{ required: true, message: "Please enter your full name!" }]}
          label="Full name"
          hasFeedback
          {...formItemLayout}
        >
          <Input />
        </FormItem>
        <Form.Item
          name="avatarUrl"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please upload image!",
            },
          ]}
          getValueFromEvent={normFile}
          {...formItemLayout}
        >
          <Upload
            customRequest={uploadImage}
            accept="image/*"
            onChange={handleChange}
            onRemove={handleRemove}
            fileList={fileList}
            //action={urlImage}
            name="avatarUrl"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="userType"
          label="User type"
          rules={[{ required: true, message: "Please select user type!" }]}
          hasFeedback
          {...formItemLayout}
        >
          <Select placeholder="Select user type" allowClear>
          <Select.Option value="Member" >
          Member
          </Select.Option>
          <Select.Option value="Admin" >
          Admin
          </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default UserModal;
