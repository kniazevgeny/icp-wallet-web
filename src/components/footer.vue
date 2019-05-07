<template>
  <v-footer
    dark
    height="auto"
    width="100vw"
    style="margin-top: 5vh"
  >
    <v-card
      flat
      tile
      class="black white--text text-xs-center"
      width="100vw"
    >
      <v-card-text>
        <v-btn class="mx-3 white--text button" icon large>
          <img :src="'./../static/facebook.png'" height="44px"
               onclick="window.open('https://www.facebook.com/groups/232756997581057')">
        </v-btn>
        <v-btn class="mx-3 white--text button" icon large>
          <img :src="'./../static/Telegram.png'" height="44px" onclick="window.open('https://t.me/icp_news')">
        </v-btn>
        <v-btn class="mx-3 white--text button" icon large>
          <img :src="'./../static/twitter.png'" height="44px" onclick="window.open('https://twitter.com/icp_news_ru')">
        </v-btn>
      </v-card-text>
      Поддержка, идеи и предложения : icphelp@yandex.ru
      <v-divider></v-divider>
      <v-card-text class="white--text">
        &copy;2018 - 2019 — <strong>ICP team</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    name: "footer",
    data: () => ({

    })
  }
</script>

<style scoped>
</style>
