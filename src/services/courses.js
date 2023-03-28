import useApi from "src/composables/UseApi";

export default function coursesService() {
  const { list, post, update, remove, getById } = useApi("/courses");

  return {
    list,
    post,
    update,
    remove,
    getById,
  };
}
