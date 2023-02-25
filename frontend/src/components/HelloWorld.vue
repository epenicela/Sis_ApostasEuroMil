<template>
  <v-container>
    <v-row class="text-center">
      <br>
      <v-col cols="12">
        <v-img :src="require('../assets/logo.svg')" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          BEM VINDO AO EUROMIL<br><br>
        </h1>


        <p class="subheading font-weight-regular">
        <h3>sistema EuroMil permite registar apostas online no jogo Euromilhões.</h3>
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">
          Como fazer?
        </h2>

        <v-row justify="center">
          <p class="subheading font-weight-regular"><br>
          <h3>Para registar uma aposta no sistema, o utilizador da aplicação deve inserir:</h3><br><br>
            <h4>1- A chave em que pretende apostar, de acordo com as regras de formação das chaves do Euromilhões.<br>
            2 - A identificação da sua conta de crédito no sistema CredBank.</h4><br><br>
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HelloWorld',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader/tree/next',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify/tree/next',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Roadmap',
        href: 'https://vuetifyjs.com/introduction/roadmap/',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>
