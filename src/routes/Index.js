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
      const {bookList, goToRoute} = this.props;
      const {loading} = this.state;
      let testData, cp, tt, lp;
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
              <h2>Library</h2>
              <h3>學習永無止境</h3>
            </div>


              {
                !loading
                  ?
                  <Row justify="center">
                    <List
                    goToRoute = {(payload) => {
                      goToRoute(payload);
                    }}
                    allBooks={testData} />
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
