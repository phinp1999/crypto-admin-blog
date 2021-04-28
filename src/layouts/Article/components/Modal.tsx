import React from "react";
import { Form, Input, Modal, Button, Select, Upload } from "antd";
import _ from "lodash";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

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
  collectionList: [];
  tagList: [];
  loading: boolean;
  userId: string;
  removie: boolean;
  onEditItem: (item) => void;
  onOk: (data: any) => void;
  onCancel: () => void;
}

const { Option } = Select;

const ArticlesModal: React.FunctionComponent<IModalProps> = React.memo(
  (props) => {
    const [fileList, setFileList] = React.useState<any>([]);

    const [progress, setProgress] = React.useState(0);

    const [urlImage, setUrlImage] = React.useState<string>("");

    const formRef = React.useRef<any>();

    React.useEffect(() => {
      if (props.item.imageUrl) {
        setUrlImage(props.item.imageUrl);
        setFileList([
          {
            uid: "-1",
            name: props.item.imageUrl,
            status: "done",
            url: props.item.imageUrl,
            thumbUrl: props.item.imageUrl,
          },
        ]);
      }
    }, [props.item.imageUrl]);

    React.useEffect(() => {
      if (props.removie == true) {
        handleRemove();
      }
    }, [props.removie]);

    const renderCollection = () => {
      return props.collectionList.map((item: any, index: number) => {
        return (
          <Option value={item.key} key={index}>
            {item.title}
          </Option>
        );
      });
    };

    const renderTag = () => {
      return props.tagList.map((item: any, index: number) => {
        return (
          <Option value={item.key} key={index}>
            {item.name}
          </Option>
        );
      });
    };

    const handleOk = () => {
      const { item = {}, onOk, userId } = props;
      formRef.current
        .validateFields()
        .then((values: any) => {
          const data = { ...values, imageUrl: urlImage };
          onOk({ item, values: data, userId });
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
        setUrlImage(res.data.attributes.imageUrl);
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
      setUrlImage("");
    };

    const normFile = (e) => {
      //console.log("Upload event:", e);

      if (Array.isArray(e)) {
        return e;
      }

      return e && e.fileList;
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
            rules={[{ required: false }]}
            label="Description"
            hasFeedback
            {...formItemLayout}
          >
            <Input.TextArea rows={4} />
          </FormItem>
          <Form.Item
            name="collectionId"
            label="Collection"
            rules={[{ required: true, message: "Please select collection!" }]}
            hasFeedback
            {...formItemLayout}
          >
            <Select placeholder="Select collection" allowClear>
              {renderCollection()}
            </Select>
          </Form.Item>
          <Form.Item
            name="imageUrl"
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
              name="imageUrl"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="tagIdArray" label="Tag" {...formItemLayout}>
            <Select placeholder="Select tag" allowClear mode="multiple">
              {renderTag()}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default ArticlesModal;
