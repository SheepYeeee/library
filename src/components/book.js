import React, { Component } from "react";
import _ from "lodash";
import { Row, Col, Card } from "antd";
import "./book.less";
const { Meta } = Card;

export default class Book extends Component {


    componentDidMount = () => {
    }

    componentDidUpdate = () => {
    }

    render() {
      const {allBooks} = this.props;

      // 取得所有書籍並塞資料
      let data;
      if(allBooks){
        data = allBooks.map((item,index) =>{
          return(
            <Col key={index} lg={6} md={6} sm={8} xs={12} >
              <Card
                hoverable
                style={{ width: 220, marginBottom: "1em" }}
                cover={<img alt={item.name} src={item.img} />}>
                <Meta title={item.name} description={item.publishing_house} />
              </Card>
            </Col>
          );
        });
      }

      return (
        <div className='book'>
          <Row gutter={24}>
            {data}
          </Row>
        </div>
      );
    }
}
