import { http } from "./config";

export default {
  listar: () => {
    return http.get("alunos");
  },
  salvar: (aluno) => {
    console.log(aluno);
    return http.post("alunos", aluno);
  },
};
