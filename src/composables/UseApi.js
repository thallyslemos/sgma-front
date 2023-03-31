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

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
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

  const updateStudent = async (form) => {
    try {
      const { name, cpf, birth_date } = form;
      const { data } = await api.patch(`${url}/${form.id}`, {
        name,
        cpf,
        birth_date,
      });
      return data;
    } catch (e) {
      throw new Error(e);
    }
  };

  const updateRegistration = async (form) => {
    try {
      const { grade_1, grade_2, grade_3 } = form;
      const { data } = await api.patch(`${url}/${form.id}`, {
        grade_1: parseFloat(grade_1),
        grade_2: parseFloat(grade_2),
        grade_3: parseFloat(grade_2),
      });
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
    updateStudent,
    updateRegistration,
    remove,
    getById,
  };
}
