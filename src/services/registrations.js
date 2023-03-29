import useApi from "src/composables/UseApi";

export default function regisrationsService() {
  const { list, post, update, remove, getById } = useApi(
    "/students/registrations"
  );

  return {
    list,
    post,
    update,
    remove,
    getById,
  };
}
