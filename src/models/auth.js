import { message } from "antd";
import { setToken, delToken } from "../utils/localstorage";
import {
  POST_Logout,
  POST_Login,
  POST_Register,
  GET_WhoAmI,
} from "../services/auth";

export default {
  namespace: "auth",
  state: {
    query: [],
  },
  effects: {
    *POST_Login({ payload, callback, loading }, { put, call, select }) {
      try {
        if (loading) {
          loading(true);
        }

        // 登入
        const response = yield call(POST_Login, payload);
        yield put({ type: "SAVE_MemberInfo", payload: response });
        if (response.code === 200) {
          message.success("登入成功");
          setToken(response.data.access_token);

          yield put({
            type: "global/goToRoute",
            payload: "/",
          });
        }

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

    *POST_Register({ payload, callback, loading }, { put, call, select }) {
      try {
        if (loading) {
          loading(true);
        }

        // 註冊
        const response = yield call(POST_Register, payload);

        if (response.code === 200) {
          message.success("註冊成功，請去登入");

          yield put({
            type: "global/goToRoute",
            payload: "/login",
          });
        }

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

    *GET_WhoAmI({ callback, loading }, { put, call, select }) {
      try {
        if (loading) {
          loading(true);
        }

        // 取得個人資訊
        const response = yield call(GET_WhoAmI);
        yield put({ type: "SAVE_MemberInfo", payload: response.data });

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

    *POST_Logout({ callback, loading }, { put, call, select }) {
      try {
        if (loading) {
          loading(true);
        }

        // 登出
        // yield call(POST_Logout);
        delToken();

        // 導向登入頁面
        yield put({
          type: "global/goToRoute",
          payload: "/login",
        });

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
  },
  reducers: {
    SAVE_MemberInfo(state, { payload }) {
      return {
        ...state,
        memberInfo: payload,
      };
    },
  },
};
