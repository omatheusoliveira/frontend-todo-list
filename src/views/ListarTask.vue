<template class="content">
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-list </v-icon>
        <v-toolbar-title class="pl-4">
          Lista de Tarefas:
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">
            <v-data-table
              dense
              :headers="listTask.cabecalho"
              :items="listTask.items"
              :items-per-page="listTask.porPagina"
              :loading="listTask.carregando"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              height="73vh"
              hide-default-footer
              fixed-header
              class="elevation-1"
            >
              <template v-slot:[`item.operacoes`]="{ item }">
                  <v-icon size="16" color="green" class="operacoes" @click="abrirEditarTask(item)">fas fa-pen</v-icon>
                  <v-icon size="16" color="red" class="operacoes" @click="deleteTask(item)">fas fa-trash</v-icon>
              </template>
            </v-data-table> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->

    <!-- Modal Alteracao -->
      <v-row class="px-9 py-7" justify="end">
        <v-dialog v-model="dialogTask" max-width="600">
          <v-card>
            <v-container>
              <v-card-title class="text-h5" style="justify-content:center"> Atualizar - Tarefa </v-card-title>
              <v-row class="pt-8 d-flex justify-center">
                <v-col cols="6" sm="8" md="5">
                  <v-select
                    :items="listTask.status"
                    label="Status da Tarefa"
                    v-model="task.status"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="8" md="5">
                  <v-select
                    :items="users"
                    label="Atribuir a usuários"
                    v-model="task.user_id"
                    item-text="name"
                    item-value="id"
                    dense
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="d-flex justify-center">
                <v-col cols="10" sm="10" md="10">
                  <v-textarea
                    name="input-7-1"
                    outlined
                    label="Descrição"
                    no-resize
                    clearable
                    auto-grow
                    v-model="task.description"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            
            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error" @click="(dialogTask = false, carregarTask())">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="editarTask()"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Fim Modal Alteracao -->
  </div>
</template>

<script>

import axios from "axios";
import { baseApiUrl } from "@/global";

  export default {
    name: 'ListarTask',

    data: () => ({

      dialogTask: false,

      sortBy: 'id',
      sortDesc: true,

      task: {
        description: "",
        status: null,
        user_id: ""
      },

      users: [],
      
      listTask: {
        cabecalho: [
          { text: "ID ", value: "id", sortable: true },
          { text: "Descrição", value: "description", sortable: false, width: "50%" },
          { text: "Status", value: "status", sortable: true },
          { text: "Responsável", value: "user.name", sortable: true },
          { text: "", value: "operacoes", sortable: false, align: "end" },
        ],
        items: [],
        porPagina: 10,
        status: [ 
          'Pendente',
          'Em execução',
          'Finalizada'
        ],
        carregando: false
      },
      
    }),

    async mounted() {
      await this.carregarTask();
      await this.carregarUser();
    },

    methods: {

      async carregarUser() {
      await axios
        .get(`${baseApiUrl}/users`)
        .then((res) => {
          this.users = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

      async carregarTask(){
        this.listTask.carregando = true;
        await axios
        .get(`${baseApiUrl}/tasks`)
        .then((res) => {
          this.listTask.items = res.data;
          this.listTask.porPagina = res.data.length;
          this.listTask.carregando = false;
        })
        .catch((error) => {
          console.log(error);
          this.listTask.carregando = false;
        })

      },

      abrirEditarTask(item){
        this.dialogTask = true;
        this.task = item;
      },

      editarTask(){
        axios
        .put(`${baseApiUrl}/task/${this.task.id}`, this.task)
        .then(() => {
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Tarefa editada com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.dialogTask = false;
          this.carregarTask();
        })
        .catch((error) => {
          console.log(error)
        })
      },

      deleteTask(item){
        this.$swal({
        title: 'Confirmação',
        html: `Deseja realmente excluir a Tarefa?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#4BB543',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios
              .delete(`${baseApiUrl}/task/${item.id}`)
              .then(() => {
                this.$swal({
                title: 'Sucesso!!!',
                text: 'Tarefa excluída com sucesso.',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#4BB543',
                allowOutsideClick: true,
              });
                this.carregarTask();
              });
          }
        });
      }
    }

  }
</script>

<style scoped>

.content{
  overflow-y: hidden;
}

.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.operacoes {
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 8px;
}
.operacoes::after{
  background-color: transparent !important;
}
.v-icon.v-icon::after{
  display: none;
}
.v-dialog{
  overflow-y: unset;
}
.v-text-field__details{
  display: none;
}
</style>