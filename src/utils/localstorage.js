// 設置token
export function setToken(value) {
  return localStorage.setItem("token", value);
}

// 取得token
export function getToken() {
  return localStorage.getItem("token");
}

// 刪除token
export function delToken() {
  return localStorage.removeItem("token");
}

// 清除所有storage
export function clearStorage() {
  return localStorage.clear();
}



