import useApi from "src/composables/UseApi";

export default function studentsService() {
  const { list, post, update, remove } = useApi("/students");

  return {
    list,
    post,
    update,
    remove,
  };
}
