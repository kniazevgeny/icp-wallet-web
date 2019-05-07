<template>
  <v-app v-scroll="onScroll">
    <!-- здесь будут отображаться наши компоненты -->
    <div id="SubApp" v-show="mparams.routerv">
      <v-toolbar style="align-items: center; z-index: 1" flat color="transparent"
                 dark height="55em">
        <v-flex xs1>
          <v-card flat id="logo" transparent color="transparent" :to="'/'">
            <img src="/static/logo_w.png" height="52em" style="margin-top: 4px" alt="">
          </v-card>
        </v-flex>
        <!--a class="white--text" style="font-size: 3.5em; margin: 1% 0 0 -1.5%; opacity: 0" id="wallet">Wallet</a-->
          <v-spacer></v-spacer>
        <strong v-if="mparams.balanceShow" style="font-size: 24px; font-weight: 100">${{$root.balance}}</strong>
        <div class="text-xs-center" v-if="!mparams.auth">
          <v-dialog v-model="dialog" min-width="70vw" max-width="90vw">
            <v-btn light slot="activator"><strong>Войти</strong></v-btn>
            <v-card>
              <v-card-title>
                <span style="font-size: 2.5em">Авторизоваться</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-if="showAuthForm">
                  <a v-if="mparams.reauth_please">И снова здравствуйте, {{mparams.login}}<br></a>
                  <a v-if="loginWrong" style="color: red;">Неверный логин или пароль<br></a>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field label="Логин" required name="name" v-model="name" style="font-size: 1.7em"
                                    :rules="Rules"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="Пароль" type="password" required name="pass"
                                    v-model="pass" :rules="Rules" @keyup.enter="Authentication()"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-progress-linear indeterminate v-if="!mparams.auth && tryauth" color="indigo lighten-2"></v-progress-linear>
              <v-card-actions>
                <v-list-tile @click="$refs.general2.ScrollToRegister(); dialog = false" v-show="loc()">
                  <v-list-tile-title>
                    Зарегистрироваться
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="'/'" v-show="!loc()"> <!--if user isn't authorised and isn't on the home page-->
                  <v-list-tile-title>
                    Зарегистрироваться
                  </v-list-tile-title>
                </v-list-tile>
                <v-spacer></v-spacer>
                <v-btn color="blue" class="white--text" @click.native="Authentication()" type="submit">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <v-btn flat color="white" :to="'/wallet'" value="wallet" large v-if="mparams.auth">
        <v-icon>account_balance_wallet</v-icon>
      </v-btn>

        <v-btn flat color="#f08080" small @click="Exit()" fab v-if="mparams.auth">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar>
      <transition name="fade" v-show="mparams.routerv" style="z-index: 999">
        <router-view v-show="mparams.routerv" :mparams="mparams" @Registration="Registration" ref="general2"></router-view>
      </transition>
      <MyFooter></MyFooter>
    </div>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import MyFooter from './footer';
  import Cookies from 'js-cookie';


  export default {
    components: {MyFooter: MyFooter},
    data: () => ({
      offsetTop: 0,
      dialog: false,
      tryauth: false,
      loginWrong: false,
      name: "",
      showAuthForm: false,
      pass: "",
      Rules: [v => !!v || "Это поле обязательно к заполнению"]
    }),
    props: ['mparams'],//main params
    name: 'SubApp',
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || window.frames.pageYOffset
      },
      Authentication() {
        let info = {"name": this.name, "pass": this.pass};
        this.$emit('Authentication', info);
        this.tryauth = true;
      },
      Registration(info) {
        this.$emit("Registration", info);
      },
      loc() {
        window.event = new Vue();
        if (window.onload) {
          return window.location.hash == '#/'
        }
      },
      SetLogin(){ //From CooksWork
        this.showAuthForm = false;
        this.name = this.mparams.login;
        this.showAuthForm = true;
      },
      LoginWrongAuth(){
        this.loginWrong = true;
        this.tryauth = false;
      },
      //Other components
      dialogform_none() {
        this.dialog = false;
      },
      Registration_Login_used() {
        this.$refs.general2.Registration_Login_used();
      },
      Exit(){
        Cookies.remove('token');
        window.location.replace("#/");
        window.location.reload();
      }
    },
    mounted() {
      this.$root.salution = this.mparams.salution;
      window.event = new Vue();
      window.onload = () => {
        this.$emit('emit_complete')
      };
      this.showAuthForm = true;
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: .35s;
  }

  .fade-enter-active {
    transition-delay: .30s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  #logo {
  }

  #navigation {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)
  }
</style>
