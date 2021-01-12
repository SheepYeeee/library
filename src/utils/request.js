import _ from "lodash";
import axios from "axios";
import config from "../config";
import { message } from "antd";

const ax = axios.create({
  baseURL: config.api,
  timeout: 60000
});

function responseData(res) {
  return res.data;
}

function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  const error = new Error(res.statusText);
  error.response = res;
  throw error;
}

function generateShortCutMethod(_method) {
  return (_path, _params = {}, _extendOption = {}) => {
    return call(_path, _.toUpper(_method), _params, _extendOption);
  };
}

function call(_path, _method, _params = {}, _extendOption = {}) {
  let option = {
    url: _path,
    method: _method
  };

  switch (_.toUpper(_method)) {
  case "PUT":
  case "POST":
  case "PATCH":
    option.data = _params;
    break;
  case "GET":
    option.params = _params;
    break;
  default:
    break;
  }

  option = {
    ...option,
    ..._extendOption
  };

  return ax
    .request(option)
    .then(checkStatus)
    .then(responseData)
    .catch((error) => {
      if(error.response.code === 401){
        message.error("尚未登入，需登入會員才能進行該動作");
      }else{
        message.error(`請求錯誤，${ error.response.data.msg }`);
      }
      return error; 
    });
}

export default {
  call,
  get: generateShortCutMethod("GET"),
  post: generateShortCutMethod("POST"),
  put: generateShortCutMethod("PUT"),
  patch: generateShortCutMethod("PATCH"),
  delete: generateShortCutMethod("DELETE")
};
