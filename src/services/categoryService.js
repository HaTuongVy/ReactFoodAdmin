import api from "./api";

const list = () => api.get(api.url.categories);
const get = (id) => api.get(`${api.url.categories}/${id}`);
const add = (data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(`${api.url.categories}/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const update = (id, data) => {
  const formData = new FormData();
  for (const key in data) formData.append(key, data[key]);
  return api.post(`${api.url.categories}/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const remove = (id) => api.post(`${api.url.categories}/delete/${id}`);

const categoryService = {
  list,
  get,
  add,
  update,
  delete: remove,
};

export default categoryService;
