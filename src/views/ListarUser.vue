<template>
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-user </v-icon>
        <v-toolbar-title class="pl-4"> Lista de Usuários: </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">
            <v-data-table
              dense
              :headers="listUser.cabecalho"
              :items="listUser.items"
              :items-per-page="listUser.porPagina"
              :loading="listUser.carregando"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              height="73vh"
              fixed-header
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:[`item.operacoes`]="{ item }">
                <v-icon
                  size="16"
                  color="red"
                  class="operacoes"
                  @click="deleteUser(item)"
                  >fas fa-trash</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "@/global";

export default {
  name: "ListarUser",

  data: () => ({
    dialogEditarUser: false,

    sortBy: 'id',
    sortDesc: true,

    user: {
      name: "",
    },

    listUser: {
      cabecalho: [
        { text: "ID ", value: "id", sortable: true },
        { text: "Nome", value: "name", sortable: true },
        { text: "Criado em", value: "created_at", sortable: true },
        { text: "", value: "operacoes", sortable: false, align: "end" },
      ],
      items: [],
      porPagina: 10,
      carregando: false,
    },
  }),

  mounted() {
    this.carregarUser();
  },

  methods: {
    carregarUser() {
      this.listUser.carregando = true;
      axios
        .get(`${baseApiUrl}/users`)
        .then((res) => {
          this.listUser.items = res.data;
          this.listUser.porPagina = res.data.length;
          this.listUser.carregando = false;

          for (let i = 0; i < res.data.length; i++) {

            this.listUser.items[i].created_at = this.listUser.items[i].created_at
              ? moment(this.listUser.items[i].created_at).format(
                  "DD/MM/YYYY"
                )
              : "";
          }

        })

        .catch((error) => {
          console.log(error);
          this.listUser.carregando = false;
        });
    },
    deleteUser(item) {
      this.$swal({
        title: "Confirmação",
        html: `Deseja realmente excluir o usuário?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        confirmButtonColor: "#4BB543",
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .delete(`${baseApiUrl}/user/${item.id}`)
            .then(() => {
              this.$swal({
                title: "Sucesso!!!",
                text: "Usuário excluído com sucesso.",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#4BB543",
                allowOutsideClick: true,
              });
              this.carregarUser();
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.operacoes {
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 8px;
}
.operacoes::after {
  background-color: transparent !important;
}
.v-icon.v-icon::after {
  display: none;
}
.v-dialog {
  overflow-y: unset;
}
</style>
