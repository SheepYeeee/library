import React, { Component } from "react";
import _ from "lodash";
import { connect } from "dva";
import { Form, Input, Button, Spin } from "antd";
import "./Login.less";
import Layout from "../layout/Layout";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    POST_Register(payload, callback, loading) {
      dispatch({ type: "auth/POST_Register", payload, callback, loading });
    },
    goToRoute(payload) {
      dispatch({ type: "global/goToRoute", payload });
    },
  };
};

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class Register extends Component {
    state = {
      loading: false,
    };

    onFinish = (values) => {
      // 註冊
      const { POST_Register } = this.props;
      POST_Register(values, null, null);
    };

    onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    render() {
      const { loading } = this.state;
      const { goToRoute } = this.props;
      return (
        <div id="login">
          {!loading ? (
            <Layout>
              <Form
                {...layout}
                name="loginForm"
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                className="loginForm"
              >
                <p className="title">
                  <a onClick={() => goToRoute('/index/1')} className="webTitle">
                    圖書資訊系統
                  </a>
                  <br />
                  註冊
                </p>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "請輸入Email",
                    },
                    {
                      type: "email",
                      message: "Email格式錯誤",
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item
                  label="姓 名 "
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "請輸入姓名",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="密 碼 "
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "請輸入密碼",
                    },
                    // {
                    //   pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\*\.\!\@\$\%\^\&\(\)\{\}\[\]\:\;\<\>\,\.\?\/\~\_\+\-\=\|\\]).{8,32}$/,
                    //   message: '密碼需包含至少一個英文大寫、小寫、數字及特殊符號，長度為8至32個字元'
                    // },
                  ]}
                >
                  <Input.Password size="small" />
                </Form.Item>

                <Form.Item className="loginBtn" {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    註冊
                  </Button>
                </Form.Item>
                <p>
                  已有會員？ <a onClick={() => goToRoute('/login')}>去登入</a>
                </p>
              </Form>
            </Layout>
          ) : (
            <div className="spin">
              <Spin />
            </div>
          )}
        </div>
      );
    }
  }
);
