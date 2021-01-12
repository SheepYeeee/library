import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  DatePicker
} from "antd";
import moment from "moment";

const { Option } = Select;

export default class CrossAnalysis extends Component {
  form = React.createRef();


  render() {
    const { onSubmit, onChange, options } = this.props;

    // 取得所有oprions並塞資料
  	let data;
    if(options){
  		data = options.map((item,index) =>{
  			return(
          <Col
            xs={24} sm={24} md={8} lg={8} xl={6} xxl={6}
            style={{ minHeight: 80 }} key={index}
          >
            <Form.Item
              name={item.name}
              label={item.label}
              rules={[
                {
                  required: true,
                  message: "此欄位為必填！"
                }
              ]}
            >
              <Select
                placeholder={`請選擇${item.label}`}
                allowClear
                style={{ width: "95%" }}
              >
                {item.value.map((values) => {
                  return (
                    <Option key={values}>{values}</Option>
                  );
                })}

              </Select>
            </Form.Item>
          </Col>
        );
  		});
    }
    
    return (
      <Form
        ref={this.form}
        name="BasicStatistics"
        onFinish={onSubmit}
        layout="inline"
        style={{
          minHeight: 120
        }}
      >
        {data}
        <Col
          xs={24} sm={24} md={24} lg={24}
          style={{ textAlign: "center" }}
        >
          <Form.Item>
          
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 16 }}
            >查詢
            </Button>
            <Button
              onClick={() => {
                this.form.current.resetFields();
              }}
            >重設
            </Button>
          </Form.Item>
        </Col>
      
      </Form >
    );
  }
}
