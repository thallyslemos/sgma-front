import useApi from "src/composables/UseApi";

export default function studentsService() {
  const { list, post, updateStudent, remove, getById } = useApi("/students");

  return {
    list,
    post,
    updateStudent,
    remove,
    getById,
  };
}
