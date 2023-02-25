<template>
  <v-container>
    <v-row class="text-left">
      <v-col class="mb-4">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
          <v-btn color="blue" small icon @click="abrirForm();">
            <v-icon color="white">mdi-plus</v-icon>
            <v-tooltip activator="parent" location="end">Adicionar {{ formName }}</v-tooltip>
          </v-btn>
          <!--v-btn color="success">
                Add
            </v-btn-->
          <v-flex class="mt-4 mb-4 button-add" color="grey">
            <!--v-col>
              <h2>{{formName}}</h2>
            </v-col-->
            
            <!--Paciente /-->
            <!--v-btn color="grey" small @click="abrirForm();"><v-icon>mdi-pencil-plus</v-icon>ADICIONAR</v-btn-->
          </v-flex>
        </v-subheader>

        <v-col></v-col>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>

        <v-table density="compact">
          <thead>
            <tr>
              <th class="text-left">CODIGO</th>
              <th class="text-left">NOME</th>
              <th class="text-left">GENERO</th>
              <th class="text-left">NACIMENTO</th>
              <th class="text-left">ENDERECO</th>
              <th class="text-left">ESTADO</th>
              <th class="text-left">ACÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of items" :key="item.id">
              <td>{{ completar(item.id) }}</td>
              <td>{{ item.nome }}</td>
              <td>{{ item.genero }}</td>
              <td>{{ item.DATA.substring(0, 10) }}</td>
              <td>{{ item.endereco }}</td>
              <td>{{ item.STATUS }}</td>
              <td>
                <v-btn color="success" small icon @click="editar(item);"><v-icon>mdi-pencil</v-icon><v-tooltip
                    activator="parent" location="end">Editar {{ formName }}</v-tooltip></v-btn>
                <v-btn color="error" small icon @click="apagar(item);"><v-icon>mdi-trash-can-outline</v-icon><v-tooltip
                    activator="parent" location="end">Apagar {{ formName }}</v-tooltip></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
  <v-row justify="center">
    <ul>
      <li></li>
    </ul>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialogDetail" persistent width="1024">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">
              Open Dialog
            </v-btn>
          </template>
          <v-card>
            <v-col cols="12">
              <v-card-title>
                <span class="text-h5">{{formName}}</span>
              </v-card-title>
            </v-col>
            <v-form @submit.prevent="salvar">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="Nome *" v-model="detailEdit.nome" :rules="rules"
                        hint="examplo: Elton de Assis Penicela" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Data de nascimento *" v-model="detailEdit.DATA" v-mask="'####/##/##'"
                        :rules="rules" hint="examplo: 2023-10-10" required></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-select :items="['Masculino', 'Femenino']" v-model="detailEdit.genero" label="Genero *"
                        :rules="rules" required></v-select>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field label="Endereco *" v-model="detailEdit.endereco" :rules="rules"
                        hint="examplo: Cidade de Tete - Alberto Vaquina" required></v-text-field>
                    </v-col>

                    <!--v-col cols="12" sm="12">
                      <v-autocomplete :items="['Ativo', 'Inativo']" v-model="detailEdit.STATUS" label="Estado" multiple></v-autocomplete>
                    </v-col-->

                    <v-col cols="12">
                      <v-select :items="['Ativo', 'Inativo']" v-model="detailEdit.STATUS" label="Estado *"></v-select>
                    </v-col>
                  </v-row>
                </v-container>
                <v-col cols="12">
                  <small>*indica campo obrigatório</small>
                </v-col>
              </v-card-text>
              <v-col>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red-darken-1" variant="text" @click="dialogDetail = false">
                    FECHAR
                  </v-btn>
                  <v-btn color="green-darken-1" type="submit" variant="text">
                    SALVAR
                  </v-btn>
                </v-card-actions>
              </v-col>
              <v-col cols="12">
                <small></small>
              </v-col>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </template>



  </v-row>
</template>

<script>
import paciente from '../services/paciente'
export default {

  data() {
    return {
      search: '',
      formName: 'Paciente',
      items: [],
      dialogDetail: false,
      detailEdit: {
        id: '',
        nome: '',
        DATA: new Date().toJSON().slice(0,10),
        endereco: '',
        genero: '',
        STATUS: 'ativo'
      },
      rules: [
        value => {
          if (value) return true
          return 'Campo obrigatório.'
        },
      ],
      errors: []
    }
  },
  mounted() {
    this.listar();
  },
  methods: {

    abrirForm() {
      this.detailEdit.id=null;
      this.dialogDetail = true;
    },
    listar() {
      paciente.listar().then(response => {
        this.items = response.data
      })
    }, salvar() {
      //alert(this.detailEdit.nome)
      if (!this.detailEdit.id) {
        paciente.salvar(this.detailEdit).then(response => {
          this.dialogDetail = false;
          this.detailEdit = {};
          this.listar();
          alert('Salvo com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          //console.log(this.errors);
        })
      } else {
        paciente.editar(this.detailEdit).then(response => {
          this.dialogDetail = false;
          this.detailEdit = {};
          this.listar();
          alert('Editado com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    },
    editar(paciente) {
      paciente.DATA = paciente.DATA.substring(0, 10)
      this.detailEdit = paciente;
      this.dialogDetail = true;
    },
    apagar(pacienteObject) {
      if (confirm('Deseja mesmo excluir?')) {
        this.detailEdit = pacienteObject;
        paciente.apagar(this.detailEdit).then(response => {
          this.listar();
          alert('Removido com sucesso')
        }).catch(e => {
          this.errors = e.response.data;
          console.log(this.errors);
        })
      }
    }, completar(num){
        var numberWithZeroes = String(num);
        var counter = numberWithZeroes.length;
        while (counter < 6) {
          numberWithZeroes = "0" + numberWithZeroes;
          counter++;
        }
        return numberWithZeroes;
      }

  }, computed: {
    filteredPost() {
      //return this.detailEdit.filter()
    }
  }
}

</script>
