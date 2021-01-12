import React, {Component} from "react";
import _ from "lodash";
import {connect} from "dva";
import {
  Space,
  Row,
  Pagination,
  Spin
} from "antd";
import "./Index.less";
import List from "../components/list";

const mapStateToProps = state => {
  return {
    bookList: state.book.bookList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_List(payload, callback, loading) {
      dispatch({type: "book/GET_List", payload, callback, loading});
    },
    goToRoute(payload) {
      dispatch({type: "global/goToRoute", payload});
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class IndexComponent extends Component {
    state = {
      loading: false
    };


    componentDidMount = () => {
      const {GET_List, match} = this.props;
      const {page} = match.params;

      // 取得書籍
      GET_List(page, null, (loading) => this.setState({loading}));

    };

    // 換頁觸發
    onChange = page => {
      const {goToRoute} = this.props;
      goToRoute(`/index/${page}`);
      const {GET_List} = this.props;
      // 取得書籍
      GET_List(page, null, (loading) => this.setState({loading}));
    };


    render() {
      const {bookList} = this.props;
      let testData, cp, tt, lp, perp;
      if (bookList) {
        testData = bookList.data;
        cp = bookList.current_page;
        tt = bookList.total;
        lp = bookList.last_page;
        perp = bookList.perp_page;
        // 路看這 當前頁碼 總頁數
        console.log(cp, lp);
      }

      return (
        <div id="index">
          <Space direction="vertical" style={{width: "100%"}}>

            <div className='banner'>
              <div className='bimg'></div>
              <h2>Library</h2>
              <h3>學習永無止境</h3>
            </div>

            <Row justify="center">
              {
                testData
                  ?
                  <List
                    allBooks={testData}
                  />
                  : <div className="spin">
                    <Spin/>
                  </div>
              }
            </Row>
            <Row>
              <div className='pagination'>
                <Pagination defaultCurrent={cp} total={tt} onChange={this.onChange} showSizeChanger={false}/>
              </div>
            </Row>
          </Space>
        </div>
      );
    }
  }
);
