import React, { useState, useCallback } from "react";
import { Button, Row, Col, Form, Input } from "antd";
import { debounce } from "lodash";

const ColProps = {
  xs: 24,
  sm: 8,
  style: {
    marginBottom: 16,
  },
};

interface IFilterProps {
  showCreateModal: () => void;
  onFilterChange: (value: string) => void;
}

const Filter: React.FunctionComponent<IFilterProps> = (props) => {
  const handleOnChange = (e: any) => {
    const { value } = e.target;

    props.onFilterChange(value);
  };

  const onAdd = () => {
    props.showCreateModal();
  };

  return (
    <Form name="control-ref">
      <Row
        gutter={24}
        justify="space-between"
        style={{ padding: "0px 20px 25px 5px" }}
      >
        <Col {...ColProps} xl={{ span: 12 }} md={{ span: 8 }}>
          <h2>Tag</h2>
        </Col>
        <Col xl={{ span: 12 }} md={{ span: 12 }}>
          <Row gutter={24} justify="end">
            <Col xs={{ span: 14 }} sm={{ span: 16 }} xl={{ span: 12 }}>
              <Form.Item name="title">
                <Input
                  placeholder="Search name"
                  onChange={handleOnChange}
                  //value={value}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 10 }} sm={{ span: 8 }} xl={{ span: 4 }}>
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
