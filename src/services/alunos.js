import { http } from "./config";

export default {
  listar: () => {
    return http.get("alunos");
  },
  salvar: (aluno) => {
    console.log(aluno);
    return http.post("alunos", aluno);
  },
  deletar: (cpf) => {
    console.log(cpf);
    console.log(typeof cpf);
    return http.delete(`alunos/${cpf}`);
  },
};
