import { api } from "src/boot/axios";

export default function useApi(url) {
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const update = async (form) => {
    try {
      const { data } = await api.update(`${url}/${form.id}`, form);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    list,
    post,
    update,
    remove,
  };
}