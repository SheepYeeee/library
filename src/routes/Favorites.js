import React, { Component } from "react";
import _ from "lodash";
import { connect } from "dva";
import {
  Space,
  Spin,
  Row
} from "antd";
import "./Favorites.less";

import List from "../components/list";

const mapStateToProps = state => {
  return {
    favoriteList: state.book.favoriteList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_Favorite(payload, callback, loading) {
      dispatch({ type: "book/GET_Favorite", payload, callback, loading });
    },
    goToRoute(payload) {
      dispatch({ type: "global/goToRoute", payload });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class FavoriteComponent extends Component {
    state = {
      loading: false,
      perPage: 1
    }

    // 假資料
    testData = [];

    componentDidMount = () => {
      const { GET_Favorite } = this.props;
      const { perPage } = this.state;
      // 取得書籍
      GET_Favorite(perPage, null, (loading) => this.setState({ loading }));
    }




    render() {
      const { favoriteList, goToRoute } = this.props;
      const { loading } = this.state;

      if (favoriteList) {
        this.testData = favoriteList.data;
      }

      return (
        <div id="favorites">
          <Space direction="vertical" style={{ width: "100%" }}>

            <div className='banner'>
              <div className='bimg'></div>
              <h2>Favorites</h2>
              <h3>最愛清單</h3>
            </div>

            <Row justify="center">
              {
                !loading
                  ?
                  <List
                    goToRoute = {(payload) => {
                      goToRoute(payload);
                    }}
                    allBooks={this.testData}
                  />
                  : <div className="spin">
                    <Spin />
                  </div>
              }
            </Row>



          </Space>
        </div>
      );
    }
  }
);
