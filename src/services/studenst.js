import useApi from "src/composables/UseApi";

export default function studentsService() {
  const { list, post, update, remove, getById } = useApi("/students");

  return {
    list,
    post,
    update,
    remove,
    getById,
  };
}
