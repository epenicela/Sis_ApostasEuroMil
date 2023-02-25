<template>
    <v-container>
        <v-row class="text-left">
            <v-col class="mb-4">
                <v-col></v-col>
                <v-spacer></v-spacer>

                <v-form @submit.prevent="registrarAposta">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <h1>Registar aposta</h1>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-spacer></v-spacer>
                                </v-col>

                                <v-col>
                                    <v-spacer></v-spacer>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Digite chave *" v-model="key" :rules="rules" hint="examplo: 543V"
                                        required></v-text-field>
                                </v-col>

                                <v-col>
                                    <v-spacer></v-spacer>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field v-on:keyup="onEnterCheck" label="Digite credit_account_id *"
                                        v-model="checkid" hint="examplo: 567" required></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-text-field label="Chque digital" v-model="chequeDigital" :rules="rules"
                                        hint="examplo: 0123456789 (10 digitos)" readonly></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-col cols="12">
                            <small>* indica campo obrigatório</small>
                        </v-col>
                    </v-card-text>
                    <v-col>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green-darken-1" type="submit" variant="text">
                                REGISTAR
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                    <v-col cols="12">
                        <small></small>
                    </v-col>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'
import { GrpcWebClient } from "grpc-web-client";

export default {
    data() {
        return {
            key: '',
            checkid: '',
            chequeDigital: '',
            value: 10
            , rules: [
                value => {
                    if (value) return true
                    return 'Campo obrigatório.'
                },
            ],

        }

    },
    mounted() {
        //this.listar();
    },
    methods: {
        async registrarAposta() {
            // Contactar o sistema CrediBank e pedir a emissão de um cheque digital no valor de 10 créditos.
            const respostaCrediBank = await axios.get(`http://localhost:3000/check/${this.checkid}/ammount/${this.value}`, {
                valor: 10,
                idConta: this.checkid
            })

            console.log(respostaCrediBank.data);
            this.chequeDigital = respostaCrediBank.data.chequeDigital;
            //if (respostaCrediBank.data.sucesso) {
            if (respostaCrediBank.status) {
                //const chequeDigital = respostaCrediBank.data.cheque
                const chequeDigital = respostaCrediBank.data.checkId
                // Contactar o sistema EuroMilRegister e colocar a aposta e o cheque digital;
                alert("NOVA APOSTA INSERIDA COM SUCCESSO");
                client.getData(respostaCrediBank, function (err, response) {
                    if (err) {
                        console.error(err);
                    } else {
                        enviarNovaAposta();
                    }
                });

            } else {
                // Informar o utilizador do fracasso da operação.
                alert('Não foi possível obter o cheque digital. Tente novamente mais tarde.')
            }
        }, enviarNovaAposta(respostaCrediBank) {

            const client = new GrpcWebClient({
                host: "127.0.0.1:50051",
                protoPath: "../euromil.proto",
                transport: "http",
            });
            client.rpcCall("insert", aposta, {}, (err, response) => {
                if (err) {
                    console.error(err);
                } else {
                    this.enviarNovaAposta
                }
            });
        }, enviarNovaAposta(respostaCrediBank) {
            const client = new GrpcWebClient({
                host: "127.0.0.1:50051",
                protoPath: "../euromil.proto",
                transport: "http",
            });
            client.rpcCall("insert", aposta, {}, (err, response) => {
                if (err) {
                    console.error(err);
                } else {
                    alert("NOVA APOSTA INSERIDA COM SUCCESSO");
                }
            });
        }, async onEnterCheck() {
            const checkOb = await axios.get(`http://localhost:3000/check/${this.checkid}/ammount/${this.value}`, {
                valor: 2,
                idConta: this.checkid
            })
            //console.log(checkOb.data.chequeDigital);
            if (checkOb) {
                this.chequeDigital = checkOb.data.chequeDigital;
            } else {
                this.chequeDigital = '';
            }

        }
    }
}
</script>
  