import { message } from "antd";
import { GET_Dashboard, PUT_book, POST_book, Del_book } from "../services/dashboard";

export default {
  namespace: "dashboard",
  state: {
    query: [],
  },
  effects: {
    *GET_Dashboard({ callback, loading }, { put, call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 取得書籍列表
        const response = yield call(GET_Dashboard);
        yield put({ type: "SAVE_List", payload: response.data });

        if (loading) {
          loading(false);
        }
        if (callback) {
          callback();
        }
      } catch (err) {
        console.log(err);
      }
    },

    *POST_book({ payload, callback, loading }, { call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 後台新增書籍
        const response = yield call(POST_book, payload);
        message.success(response.msg);

        // 取得書籍列表
        const response2 = yield call(GET_Dashboard, payload);
        yield put({ type: "SAVE_List", payload: response2.data });


        if (loading) {
          loading(false);
        }
        if (callback) {
          callback();
        }
      } catch (err) {
        console.log(err);
      }
    },

    *PUT_book({ payload, callback, loading }, { put, call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 後台編輯書籍
        const response = yield call(PUT_book, payload);
        message.success(response.msg);

        // 取得書籍列表
        const response2 = yield call(GET_Dashboard, payload);
        yield put({ type: "SAVE_List", payload: response2.data });

        if (loading) {
          loading(false);
        }
        if (callback) {
          callback();
        }
      } catch (err) {
        console.log(err);
      }
    },

    * Del_book({ payload, callback, loading }, { put, call, select }) {
      try {
        if (loading) { loading(true); }

        // 取得書籍
        const response = yield call(Del_book, payload);
        message.success(response.msg);

        // 取得書籍列表
        const response2 = yield call(GET_Dashboard, payload);
        yield put({ type: "SAVE_List", payload: response2.data });

        if (loading) { loading(false); }
        if (callback) { callback(); }
      } catch (err) {
        console.log(err);
      }
    },



  },
  reducers: {
    SAVE_List(state, { payload }) {
      return {
        ...state,
        dashboardList: payload,
      };
    },

  },
};
