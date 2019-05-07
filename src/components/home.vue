<template>
  <v-app v-scroll="onScroll" color="secondary">
    <v-jumbotron :gradient="gradient" dark src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" height="50em"
                 style="background-color: rgba(0,0,0, 0.7) ; margin-top: -55px;">
      <v-layout fill-height style="width: 90%; margin-left: 5%">
        <v-layout align-center>
          <v-flex xs5>
             <img src="/static/logo_rect.png" :width="width" alt="logo"
          >
            <a style="font-size: 4rem" class="white--text"><!--{{mparams.salution  text-xs-center}} --></a><br>
          </v-flex>
          <v-flex xs7>
            <div
              style="text-align: right; max-width: 50vw; padding: 10px; border-radius: 10px">
              <a style="color: #fff;">
                <strong class="WalletSlogan">ICP Wallet – понятный и удобный криптовалютный кошелёк</strong><br><br>
                <a class="Slogan2">Мы делаем простой продукт для людей которые не хотят разбираться во всех тонкостях криптовалют
                </a>
              </a>
            </div>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-jumbotron>

    <v-card height="50em" style="background: radial-gradient(rgba(20,20,200, .7), rgba(10, 10, 100, 1))">
      <v-layout fill-height style="width: 90vw; margin-left: 5vw">
        <v-layout justify-space-between align-center>
          <div>
            <div
              style=" text-align: left; max-width: 40vw; padding: 10px; border-radius: 10px">
              <a style="color: #fff;" class="Slogan2">
                <strong>Управляйте своими средствами откуда угодно</strong><br><br>
                <small>Вы можете пользоваться кошельком из любой точки мира без ограничений. Управляйте деньгами как с сайта, так и с мобильного приложения.
                  Более того, у нас нет лимитов на использование кошелька. Отправляйте криптовалюту без каких либо ограничений.
                </small>
              </a>
            </div>
          </div>
          <div>
            <v-icon class="iconSmartphone">smartphone</v-icon>
          </div>
        </v-layout>
      </v-layout>
    </v-card>


    <v-card height="50em" style="background: linear-gradient( 135deg, rgb(240,200,62), rgb(214,20,7))">
      <v-layout fill-height style="width: 90vw; margin-left: 5vw">
        <v-layout justify-space-between align-center>
          <div>
            <v-icon class="iconSmartphone">money_off</v-icon>
          </div>

          <div>
            <div
              style="text-align: left; max-width: 40vw; padding: 10px; border-radius: 10px">
              <a style="color: #fff;" class="Slogan2">
                <strong><a style="color: #2c3e50; font-size: 2.7em">0% </a>  за все платежи!</strong><br><br>
                <small>Мы не взимаем комиссии за использование кошелька, отсутствуют комиссии за платежи, и вам не нужна верификация для
                  использования кошелька
                </small>
              </a>
            </div>
          </div>
        </v-layout>
      </v-layout>
    </v-card>
    <v-card style="background: linear-gradient( 90deg, rgba(20,20,150, .7), rgba(10, 10, 70, 1)); padding: 8px; align-items: center">
        <v-card-text style="color: #fff; text-align: center; font-size: 2.7em">
          Чего же вы ждёте?</v-card-text>
              <v-card-text style="color: #fff; text-align: center; font-size: 2em">
                         Начните пользоваться кошельком!</v-card-text>
    </v-card>
    <br>
    <regForm @Registration="Registration" ref="RegistrationForm" id="reg"></regForm>
  </v-app>
</template>

<script>
  import regForm from "./utils/regForm";

  export default {
    name: 'home',
    components: {regForm: regForm},
    props: ['mparams'],
    data: () => ({
      offsetTop: 0,
      gradient: 'to top left, rgba(200, 0, 0, .85), rgba(0, 0, 200, .8)',
      width: '280em',
      width2: '320em'
    }),
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      },
      Registration(info) {
        this.$emit('Registration', info);
      },
      //other components
      Registration_Login_used() {
        this.$refs.RegistrationForm.Registration_Login_used();
      },
      ScrollToRegister() {
        this.$vuetify.goTo("#reg", {
          duration: 300,
          offset: -100,
          easing: 'easeInOutCubic'
        });
      }
    },
    mounted() {
      console.log(window.innerWidth);
      if (window.innerWidth < 400) {
        this.width = '95em'
      } else if (window.innerWidth < 500 && window.innerWidth > 400) {
        this.width = '125em'
      }
      else if (window.innerWidth < 700 && window.innerWidth > 500) {
        this.width = '145em'
      }
      else if (window.innerWidth < 1000 && window.innerWidth > 700) {
        this.width = '185em'
      }
      if (window.innerWidth < 400) {
        this.width2 = '160em'
      } else if (window.innerWidth < 500 && window.innerWidth > 400) {
        this.width2 = '195em'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-card{
    border-radius: 0;
  }
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .slide-enter-active {
    animation: slide .5s ease-out;
  }

  .slide-leave-active {
    animation: slide .5s reverse;
  }

  @keyframes slide {
    0% {
      margin-left: -100px;
      opacity: 0;
    }
    100% {
      margin-left: 0px;
      opacity: 1;
    }
  }

  .slide-reverse-enter-active {
    animation: slide-reverse .5s ease-out;
  }

  .slide-reverse-leave-active {
    animation: slide-reverse .5s reverse;
  }

  @keyframes slide-reverse {
    0% {
      margin-left: +100px;
      opacity: 0;
    }
    100% {
      margin-left: 0px;
      opacity: 1;
    }
  }

  @media screen and (min-width: 300px) and (max-width: 500px) {
    .WalletSlogan {
      font-size: 1.5em;
    }

    .Slogan2 {
      font-size: 1em;
    }

    .iconSmartphone {
      font-size: 7em;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 700px) {
    .WalletSlogan {
      font-size: 2em;
    }

    .Slogan2 {
      font-size: 1em;
    }

    .iconSmartphone {
      font-size: 15em;
    }
  }

  @media screen and (min-width: 700px) and (max-width: 900px) {
    .WalletSlogan {
      font-size: 3em;
    }

    .Slogan2 {
      font-size: 2em;
    }

    .iconSmartphone {
      font-size: 25em;
    }
  }

  @media screen and (min-width: 900px) {
    .WalletSlogan {
      font-size: 4em;
    }

    .Slogan2 {
      font-size: 2em;
    }

    .iconSmartphone {
      font-size: 35em;
    }
  }

  .Slogan2 {
    color: whitesmoke
  }

  .WalletSlogan {
    color: white
  }

</style>
