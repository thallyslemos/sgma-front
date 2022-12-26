<template>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section>
        <span class="q-ml-sm">Selecione o Aluno que deseja excluir</span>
        <q-input
          dense
          v-model="novoAluno.nome"
          autofocus
          label="CPF"
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn flat label="Sim" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "deletar",
};
</script>

<style></style>
