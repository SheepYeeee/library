import request from "../utils/request";

// 取得書籍列表
export const GET_List = (page) => {
  return request.get(`/book?page=${page}`);
};

// 取得搜尋結果列表
export const GET_Search = (payload) => {
  return request.get(`/book/search?title=${payload.title}&page=${payload.page}`);
};

// 喜歡
export const POST_Favorite = (isbn) => {
  const token = localStorage.getItem("token");
  return request.post(`/book/favorite/${isbn}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 取得喜歡列表
export const GET_Favorite = (page) => {
  const token = localStorage.getItem("token");
  return request.get(`/book/favorite?page=${page}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// 取得書籍
export const GET_Book = (isbn) => {
  const token = localStorage.getItem("token");
  return request.get(`/book/${isbn}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 加一個帶token的範例
export const POST_WithToken = () => {
  const token = localStorage.getItem("token");
  return request.post("/token", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 加一個帶form-data的範例
export const POST_WithFormData = () => {
  return request.post("/token", null, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 加一個兩個都帶的範例
export const POST_WithTokenAndFormData = () => {
  const token = localStorage.getItem("token");
  return request.post("/token", null, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
