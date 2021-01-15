import React, {Component} from "react";
import _ from "lodash";
import {connect} from "dva";
import {
  Space,
  Modal,
  Spin,
  Button,
  Table,
  Form,
  Input,
  Row, Col
} from "antd";
import "./Dashboard.less";


const mapStateToProps = state => {
  return {
    dashboardList: state.dashboard.dashboardList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    GET_Dashboard(callback, loading) {
      dispatch({type: "dashboard/GET_Dashboard", callback, loading});
    },
    POST_book(payload, callback, loading) {
      dispatch({type: "dashboard/POST_book", payload, callback, loading});
    },
    PUT_book(payload, callback, loading) {
      dispatch({type: "dashboard/PUT_book", payload, callback, loading});
    },
    Del_book(payload, callback, loading) {
      dispatch({type: "dashboard/Del_book", payload, callback, loading});
    },
    goToRoute(payload) {
      dispatch({ type: "global/goToRoute", payload });
    },
  };
};

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20}
};
const tailLayout = {
  wrapperCol: {
    offset: 7,
    span: 17
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class DashboardComponent extends Component {

    // 取得編輯表單內容
    formRef = React.createRef();

    // 取得新增表單內容
    addFormRef = React.createRef();

    state = {
      loading: false,
      isEditModalVisible: false,
      isDeleteModalVisible: false,
      isAddModalVisible: false,
      isbn: "",
      bookData: null
    };

    // 前往書籍
    goBook = (dataIndex) => {
      const { goToRoute } = this.props;
      goToRoute(`/book/${dataIndex}`);
    }


    // 篩選條件
    onChange = (pagination, filters, sorter, extra) => {
      console.log("params", pagination, filters, sorter, extra);
    };

    // 顯示編輯modal
    showEditModal = (isbn) => {
      const {dashboardList} = this.props;
      let testData;
      if (dashboardList) {
        testData = dashboardList.map((e) => {
          if ((e.isbn = isbn)) {
            return e;
          }
        });
      }

      this.setState({
        isbn: isbn,
        isEditModalVisible: true,
        bookData: testData[0]
      });
    };

    // 顯示刪除modal
    showDeleteModal = (isbn) => {
      this.setState({
        isbn: isbn,
        isDeleteModalVisible: true
      });
    };

    // 顯示新增modal
    showAddModal = () => {
      this.setState({
        isAddModalVisible: true
      });
    };

    // 關閉modal
    handleCancel = () => {
      this.setState({
        isEditModalVisible: false,
        isDeleteModalVisible: false,
        isAddModalVisible: false
      });
    };

    // 確定新增
    onAddFinish = (values) => {
      const {POST_book} = this.props;
      POST_book(values, null, (loading) => this.setState({loading}));
      this.setState({
        isAddModalVisible: false
      });
      // 表單清空
      this.addFormRef.current.resetFields();
    };

    // 確定編輯
    onFinish = (values) => {
      const {PUT_book} = this.props;
      let payload = {
        isbn: this.state.isbn,
        data: values
      };
      PUT_book(payload, null, (loading) => this.setState({loading}));
      this.setState({
        isEditModalVisible: false
      });
      // 表單清空
      this.formRef.current.resetFields();
    };

    // 表單錯誤
    onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    // 確定刪除
    handleDeleteOk = () => {
      const {Del_book} = this.props;
      Del_book(this.state.isbn, null, (loading) => this.setState({loading}));
      this.setState({
        isDeleteModalVisible: false
      });
    };

    componentDidMount = () => {
      const {GET_Dashboard} = this.props;
      // 取得書籍
      GET_Dashboard(null, (loading) => this.setState({loading}));

    };


    render() {
      const {loading, isEditModalVisible, isDeleteModalVisible, isAddModalVisible, bookData} = this.state;
      const {dashboardList, goToRoute} = this.props;
      let testData;
      if (dashboardList) {
        testData = dashboardList;
      }


      // 假資料 欄
      let columns = [
        {
          title: "書名",
          dataIndex: "title"
        },
        {
          title: "作者",
          dataIndex: "author"
        },
        {
          title: "出版日期",
          dataIndex: "publication_date"
        },
        {
          title: "isbn",
          dataIndex: "isbn"
        },
        {
          title: "操作",
          dataIndex: "isbn",
          render: (dataIndex) => <div className='actions' id={dataIndex}>
            <a onClick={()=>goToRoute(`/book/${dataIndex}`)} target="_blank" rel="noreferrer"><Button primary>查看</Button></a>
            <Button className='btns' type="primary" onClick={() => this.showEditModal(dataIndex)}>編輯 </Button>
            <Button className='btns' type="primary" danger onClick={() => this.showDeleteModal(dataIndex)}>刪除 </Button>
          </div>
        }
      ];


      return (
        <div id="dashboard">
          <Space direction="vertical" style={{width: "100%"}}>
            <Row>
              <Col span={8}><h2>後台管理</h2></Col>
              <Col span={3} offset={13}>
                <Button className='btns' danger onClick={() => this.showAddModal()}>新增</Button>
              </Col>
            </Row>
            {
              !loading ?
                <div className='contant'>
                  <Table columns={columns} dataSource={testData} onChange={this.onChange}/>
                </div> : <div className="spin">
                  <Spin/>
                </div>
            }

          </Space>

          <Modal title="新增書籍" visible={isAddModalVisible} onCancel={this.handleCancel}
            footer={null}
          >

            <div>
              <Form
                {...layout}
                name='AddForm'
                ref={this.addFormRef}
                onFinish={this.onAddFinish}
                onFinishFailed={this.onFinishFailed}>

                <Form.Item
                  label="書名"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "請輸入書名"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="isbn"
                  name="isbn"
                  rules={[
                    {
                      required: true,
                      message: "請輸入isbn"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="作者"
                  name="author"
                  rules={[
                    {
                      required: true,
                      message: "請輸入作者"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="出版社"
                  name="publisher"
                  rules={[
                    {
                      required: true,
                      message: "請輸入出版社"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="出版日期"
                  name="publication_date"
                  rules={[
                    {
                      required: true,
                      message: "請輸入出版日期"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="簡介"
                  name="summary"
                  rules={[
                    {
                      required: true,
                      message: "請輸入簡介"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item
                  label="圖片網址"
                  name="img_src"
                  rules={[
                    {
                      required: true,
                      message: "請輸入圖片網址"
                    }
                  ]}>
                  <Input size='small'/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button key="submit" className='ant-btn' htmlType="submit" type="primary">
                    新增
                  </Button>
                  <Button key="back" className='ant-btn' htmlType="button" onClick={this.handleCancel}>
                    取消
                  </Button>
                </Form.Item>

              </Form>
            </div>

          </Modal>

          <Modal title="編輯書籍" visible={isEditModalVisible} onCancel={this.handleCancel}
            footer={null}
          >

            <div> {bookData ? <Form
              {...layout}
              name='EditForm'
              ref={this.formRef}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}>

              <Form.Item
                label="書名"
                name="title"
                initialValue={bookData.title}
                rules={[
                  {
                    required: true,
                    message: "請輸入書名"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item
                label="作者"
                name="author"
                initialValue={bookData.author}
                rules={[
                  {
                    required: true,
                    message: "請輸入作者"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item
                label="出版社"
                name="publisher"
                initialValue={bookData.publisher}
                rules={[
                  {
                    required: true,
                    message: "請輸入出版社"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item
                label="出版日期"
                name="publication_date"
                initialValue={bookData.publication_date}
                rules={[
                  {
                    required: true,
                    message: "請輸入出版日期"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item
                label="簡介"
                name="summary"
                initialValue={bookData.summary}
                rules={[
                  {
                    required: true,
                    message: "請輸入簡介"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item
                label="圖片網址"
                name="img_src"
                initialValue={bookData.img_src}
                rules={[
                  {
                    required: true,
                    message: "請輸入圖片網址"
                  }
                ]}>
                <Input size='small'/>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button key="submit" className='ant-btn' htmlType="submit" type="primary">
                  編輯
                </Button>
                <Button key="back" className='ant-btn' htmlType="button" onClick={this.handleCancel}>
                  取消
                </Button>
              </Form.Item>

            </Form> : null} </div>

          </Modal>

          <Modal title="刪除書籍" okText="確定刪除" cancelText="取消" visible={isDeleteModalVisible} onOk={this.handleDeleteOk}
            onCancel={this.handleCancel}>
            <p>確定要刪除該書籍嗎?</p>
          </Modal>

        </div>
      );
    }
  }
);
