import React, { Component } from "react";
import _ from "lodash";
import { Row, Col, Card, Button } from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import "./list.less";
const { Meta } = Card;

export default class List extends Component {


  componentDidMount = () => {
  }

  componentDidUpdate = () => {
  }

  render() {
    const { allBooks, goToRoute } = this.props;

    // 取得所有專案並塞資料
    let data;
    if (allBooks) {
      data = allBooks.map((item, index) => {
        return (
          <Col key={index} lg={12} md={24} sm={24} xs={24} >
            <div className='block'>
              <Row>
                <Col lg={10} md={8} sm={12} xs={12}>
                  <img alt={item.title} src={item.img_src} style={{ width: "200px" }} />
                </Col>
                <Col lg={14} md={16} sm={12} xs={12}>
                  <div className='detail'><span className='span'>書名:</span> {item.title}</div>
                  <div className='detail'><span className='span'>作者:</span> {item.author}</div>
                  <div className='detail'><span className='span'>isbn:</span> {item.isbn}</div>
                  <div className='detail'><span className='span'>出版社:</span> {item.publisher}</div>
                  <div className='detail'><span className='span'>出版日期:</span> {item.publication_date}</div>
                  <div className='detail intro' ><span className='span'>簡介:</span> {item.summary}</div>
                  <Col>
                    <a  onClick={ () => goToRoute(`/book/${item.isbn}`)}>
                      <Button type="primary" htmlType="submit">
                        查看詳細
                      </Button>
                    </a>
                  </Col>
                </Col>
              </Row>
            </div>
          </Col>
        );
      });
    }

    return (
      <div className='list'>
        <Row gutter={24}>
          {data}
        </Row>
      </div>
    );
  }
}
