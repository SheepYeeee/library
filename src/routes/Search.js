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

    componentDidUpdate(prevProps) {

      const {GET_Search} = this.props;
      const query = new URLSearchParams(this.props.location.search);
      let title = query.get("title");
      let page = query.get("page");
      let payload = {
        page: page,
        title: title
      };

      if (this.state.title !== title) {
        this.setState({
          title: title
        });
        // 取得書籍
        GET_Search(payload, null, (loading) => this.setState({loading}));
      }

    }

    // 換頁觸發
    onChange = page => {
      const {title} = this.state;
      const {goToRoute} = this.props;
      goToRoute(`/search?title=${title}&page=${page}`);
    };


    render() {
      const {bookList} = this.props;
      const {loading} = this.state;
      let testData, cp, lp, perp;
      if (bookList) {
        testData = bookList.data;
        cp = bookList.current_page;
        lp = bookList.last_page;
        perp = bookList.perp_page;
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
                  <List allBooks={testData}/>
                </Row>
                : <div className="spin">
                  <Spin/>
                </div>


            }
            <Row>
              <div className='pagination'>
                <Pagination simple current={cp} defaultPageSize={perp} total={lp} onChange={this.onChange}/>
              </div>
            </Row>


          </Space>
        </div>
      );
    }
  }
);
