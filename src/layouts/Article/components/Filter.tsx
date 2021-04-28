import React from "react";
import { Button, Row, Col, Form, Input, Select } from "antd";
import { values } from "lodash";

const ColProps = {
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 16,
  },
};

interface IFilterProps {
  onFilterChange: (value: string) => void;
  showCreateModal: () => void;
  onStatusChange: (value: string) => void;
  user: any;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  //const [value, setValue] = React.useState<string>("");

  /*   const fetchData = (value) => {
    props.onFilterChange(value);
  }; */

  //const debounceLoadData = React.useCallback(debounce(fetchData, 1000), []);

  const handleOnChange = (e: any) => {
    const { value } = e.target;
    //debounceLoadData(value);
    props.onFilterChange(value);
  };
  const OnChangeStatus = (value: string) => {
    if (value == undefined) {
      props.onStatusChange("All");
    } else {
      props.onStatusChange(value);
    }
  };

  const onAdd = () => {
    props.showCreateModal();
  };
  const ListStatus = [
    {
      id: "0",
      name: "All",
    },
    // {
    //   id: "1",
    //   name: "Draft",
    // },
    {
      id: "2",
      name: "Request",
    },
    {
      id: "3",
      name: "Verify",
    },
    {
      id: "4",
      name: "Published",
    },
    {
      id: "5",
      name: "Modified",
    },
  ];
  const { Option } = Select;
  const renderStatus = () => {
    return ListStatus.map((item, index) => {
      return (
        <Option value={item.name} key={index}>
          {item.name}
        </Option>
      );
    });
  };

  return (
    <Form name="control-ref">
      <Row
        gutter={24}
        justify="space-between"
        style={{ padding: "0px 20px 25px 5px" }}
      >
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }}>
          <h2>Article</h2>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 12 }}>
          <Row gutter={24} justify="end">
            <Col xs={{ span: 6 }} sm={{ span: 6 }} xl={{ span: 8 }}>
              {props.user.userType != "Admin" ? (
                ""
              ) : (
                <Form.Item name="Status">
                  <Select
                    placeholder="Select "
                    onChange={OnChangeStatus}
                    allowClear
                  >
                    {renderStatus()}
                  </Select>
                </Form.Item>
              )}
            </Col>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} xl={{ span: 12 }}>
              <Form.Item name="title">
                <Input
                  placeholder="Search title"
                  onChange={handleOnChange}
                  //value={value}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 6 }} sm={{ span: 6 }} xl={{ span: 4 }}>
              <Button type="ghost" onClick={onAdd}>
                Create
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
