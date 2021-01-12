import { message } from "antd";
import { GET_List, GET_Search, POST_Favorite, GET_Favorite, GET_Book } from "../services/book";

export default {
  namespace: "book",
  state: {
    query: [],
  },
  effects: {
    *GET_List({ payload, callback, loading }, { put, call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 取得書籍列表
        const response = yield call(GET_List, payload);
        yield put({ type: "SAVE_BookList", payload: response.data });

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

    *GET_Search({ payload, callback, loading }, { put, call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 取得書籍列表
        const response = yield call(GET_Search, payload);
        yield put({ type: "SAVE_BookList", payload: response.data });

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

    *POST_Favorite({ payload, callback, loading }, { call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 喜歡書籍
        const response = yield call(POST_Favorite, payload);
        message.success(response.msg);


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

    *GET_Favorite({ payload, callback, loading }, { put, call }) {
      try {
        if (loading) {
          loading(true);
        }

        // 取得書籍列表
        const response = yield call(GET_Favorite, payload);
        yield put({ type: "SAVE_FavoriteList", payload: response.data });

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

    * GET_Book({ payload, callback, loading }, { put, call, select }) {
      try {
        if (loading) { loading(true); }

        // 取得書籍
        const response = yield call(GET_Book, payload);
        yield put({ type: "SAVE_Book", payload: response.data });

        if (loading) { loading(false); }
        if (callback) { callback(); }
      } catch (err) {
        console.log(err);
      }
    },



  },
  reducers: {
    SAVE_BookList(state, { payload }) {
      return {
        ...state,
        bookList: payload,
      };
    },

    SAVE_FavoriteList(state, { payload }) {
      return {
        ...state,
        favoriteList: payload
      };
    },

    SAVE_Book(state, { payload }) {
      return {
        ...state,
        book: payload,
      };
    },
  },
};
