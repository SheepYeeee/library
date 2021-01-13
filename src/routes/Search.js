import React, {Component} from "react";
import _ from "lodash";
import {connect} from "dva";
import {
  Space,
  Pagination,
  Row,
  Spin
} from "antd";
import "./Search.less";

import List from "../components/list";


const mapStateToProps = state => {
  return {
    bookList: state.book.bookList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToRoute(payload) {
      dispatch({type: "global/goToRoute", payload});
    },
    GET_Search(payload, callback, loading) {
      dispatch({type: "book/GET_Search", payload, callback, loading});
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class SearchComponent extends Component {
    state = {
      loading: false,
      title: ""
    };


    componentDidMount = () => {
      const {GET_Search} = this.props;
      const query = new URLSearchParams(this.props.location.search);
      let title = query.get("title");
      let page = query.get("page");
      let payload = {
        page: page,
        title: title
      };
      this.setState({
        title: title
      });

      // 取得書籍
      GET_Search(payload, null, (loading) => this.setState({loading}));

    };


    // 換頁觸發
    onChange = page => {
      const {title} = this.state;
      const {goToRoute} = this.props;
      goToRoute(`/search?title=${title}&page=${page}`);

      const {GET_Search} = this.props;
      let payload = {
        page: page,
        title: title
      };

      // 取得書籍
      GET_Search(payload, null, (loading) => this.setState({loading}));
    };


    render() {
      const {bookList, goToRoute} = this.props;
      const {loading} = this.state;
      let testData, cp, lp, tt;
      if (bookList) {
        testData = bookList.data;
        cp = bookList.current_page;
        tt = bookList.total;
        lp = bookList.last_page;
      }

      return (
        <div id="index">
          <Space direction="vertical" style={{width: "100%"}}>

            <div className='banner'>
              <div className='bimg'></div>
              <h2>Search</h2>
              <h3>搜尋結果</h3>
            </div>

            {
              !loading ?
                <Row justify="center">
                  <h4>以下是您的搜尋結果</h4>
                  <List
                    goToRoute = {(payload) => {
                      goToRoute(payload);
                    }}
                    allBooks={testData}/>
                </Row>
                : <div className="spin">
                  <Spin/>
                </div>

            }
            <Row>
              <div className='pagination'>
                <Pagination current={cp} total={tt} onChange={this.onChange} showSizeChanger={false}/>
              </div>
            </Row>


          </Space>
        </div>
      );
    }
  }
);
