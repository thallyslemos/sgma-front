import useApi from "src/composables/UseApi";

export default function regisrationsService() {
  const { list, post, updateRegistration, remove, getById } = useApi(
    "/students/registrations"
  );

  const getOneById = useApi("/students/register").getById;
  const postGrades = useApi("/students/register").post;

  return {
    list,
    post,
    updateRegistration,
    remove,
    getById,
    getOneById,
    postGrades,
  };
}
