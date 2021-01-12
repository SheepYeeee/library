import request from "../utils/request";



// 取得後台書籍
export const GET_Dashboard = () => {
  const token = localStorage.getItem("token");
  return request.get("dashboard/book", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 後台新增書籍
export const POST_book = (payload) => {
  const token = localStorage.getItem("token");
  return request.post("dashboard/book", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 後台修改書籍
export const PUT_book = (payload) => {
  const token = localStorage.getItem("token");
  return request.put(`dashboard/book/${payload.isbn}`, payload.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 後台刪除書籍
export const Del_book = (isbn) => {
  const token = localStorage.getItem("token");
  return request.delete(`dashboard/book/${isbn}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


