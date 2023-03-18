import api from "./api";

const list = () => api.get(api.url.products);
const get = (id) => api.get(`${api.url.products}/${id}`);
const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(`${api.url.products}/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(`${api.url.products}/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (id) => api.post(`${api.url.products}/delete/${id}`);

const getImageUrl = (id) => api.get(`${api.url.products}/image-url/${id}`);
const getImageBase64 = (id) =>
  api.get(`${api.url.products}/image-base64/${id}`);
const getImage = (id) => api.get(`${api.url.products}/image/${id}`);

const downloadImage = (id) => {
  api.get(`${api.url.products}/download-image/${id}`, {
    responseType: "blob",
  });
};

const productService = {
  list,
  get,
  getImageUrl,
  getImageBase64,
  getImage,
  add,
  update,
  downloadImage,
  delete: remove,
};

export default productService;
