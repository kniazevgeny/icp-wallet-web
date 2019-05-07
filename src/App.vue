<template lang="html">
  <v-app v-scroll="onScroll" @load="bkg()">
    <!-- здесь будут отображаться наши компоненты -->
    <div id="appV">
      <SApp :mparams="params" @emit_complete="emit_complete" @Authentication="Authentication"
            @Registration="Registration"
            v-show="params.routerv"
            style="background-color: #fff "
            ref="general"></SApp>
      <v-dialog v-model="showerrors">
        <v-btn flat light @click.native="showerrors = true" slot="activator" v-if="showerrors">Show Errors</v-btn>
        <v-card>
          Server: {{params.serverstatus}}<br>
          BTC mainnet: {{params.BTC.MAIN}}<br>
          ETH mainnet: {{params.ETH.MAIN}}<br>
          ETH kovan: {{params.ETH.KOVAN}}<br>
          ETH rinkeby: {{params.ETH.RINKEBY}}<br>
          ETH ropsten: {{params.ETH.ROPSTEN}}<br>
          <v-btn flat light @click.native="showerrors = false">Close</v-btn>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="error500" :timeout="7000" bottom color="error">Упс! Кажется, что-то пошло не так. Повторите
        попытку позже.
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
  import SubAppVue from './components/SubApp.vue';
  import axios from "axios";
  import Cookies from 'js-cookie';

  export default {
    data: () => ({
      elem: 'home',
      offsetTop: 0,
      serverstats: '',
      apiVersion: "v0.1",
      error500: false,
      params: {
        monthSum: "",
        salution: "Hello!",
        txtwallet: "My wallet",
        txttooeasy: "",
        from: "Перевод от",
        to: "Перевод на",
        today: "Today",
        status: 'Готово!',
        routerv: false,
        balance: '0',
        btc_balance: '0',
        eth_address: "",
        eth_balance: '0',
        eth_transaction_balance: 0,
        ltc_balance: '0',
        zec_balance: '0',
        prices: [],
        lang: '',
        error: false,
        Checkedbalance: false,
        historyShow: false,
        balanceShow: false,
        reauth_please: false,
        registration_complete: false,
        BTC: {
          MAIN: "400"
        },
        ETH: {
          MAIN: "400",
          KOVAN: "400",
          RINKEBY: "400",
          ROPSTEN: "400"
        },
        serverstatus: "",
        ETH_history: [],
        monthplus: "",
        monthminus: "",
        login: "",
        token: "",
        auth: false,
      },
      token: "",
      apiurl: 'https://api.icp.ru.com/',
      showerrors: false,
      language: 'ru',
      status: 'error'
    }),
    name: 'app',
    components: {
      'SApp': SubAppVue
    },
    methods: {
      onScroll(e) {
        this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      },
      emit_complete() {
        console.log('emitting...');
        this.$root.salution = this.params.salution;
        this.$root.routerv = true;
        this.params.routerv = true;
        this.status = 'ok';
        //this.set_language();
        this.set_ru();
      },
      set_language() {
        console.log('setting lang...');
        this.$root.userLang = navigator.language || navigator.userLanguage;
        var reg1 = /[a-z]/g; // from ru-RU to ru
        var reg2 = /[A-Z]/g; // from ru-RU to RU
        var userLang = this.$root.userLang;
        var _match1 = userLang.match(reg1); // _match1 and _match2 contains ['r','u'] or
        var _match2 = userLang.match(reg2); // ['f', 'r'] so I need to group these chars like: 'ru' or 'fr'
        var match1 = ''; // will contain 'ru', 'fr' etc.
        var match2 = '';
        for (var m1 in _match1) {
          match1 = match1 + _match1[m1]
        };
        for (var m2 in _match2) {
          match2 = match2 + _match2[m2]
        };
        if (match1.toUpperCase() === match2.toUpperCase()) userLang = match1;
        // If match1 and match2 are the same (ru and RU)
        //userLang = 'fr'; //If you wanna see the other language
        console.log('lang —', userLang);
        this.params.lang = userLang;
        this.$root.lang = userLang;
        //Well! I find user language. It's time to show page with the correct words.
        switch (userLang) {
          case 'ru':
            this.set_ru();
            break;
          case 'en':
            this.set_en();
            break;
          case 'fr':
            this.set_fr();
            break;
        }
      },
      set_ru() {
        this.params.salution = "Добро пожаловать!";
        this.params.from = "от";
        this.params.to = "→";
        this.params.today = "Сегодня";
        this.params.txtwallet = "Мой кошелёк";
        this.params.txttooeasy = "Пароль не должен быть простым";
      },
      set_en() {
        this.params.salution = "Hello!";
        this.params.from = "from";
        this.params.to = "→";
        this.params.today = "Today";
        this.params.txtwallet = "My wallet";
        this.params.txttooeasy = "Your password should be strong";
      },
      set_fr() {
        this.params.salution = "Salut!";
        this.params.from = "de";
        this.params.today = "Aujourd'hui";
        this.params.to = "→";
        this.params.txtwallet = "Mon portmone";
      },
      Сheckserver() {
        console.log('Connecting to the server...');
        axios.get(this.apiurl + 'stats').then(response => {
          var EList = {};
          var resp = response.data;
          this.params.BTC.MAIN = resp.BTC_stats.MAINNET_network_status;
          this.params.ETH.MAIN = resp.ETH_stats.MAINNET_network_status;
          this.params.ETH.KOVAN = resp.ETH_stats.test_KOVAN_network_status;
          this.params.ETH.RINKEBY = resp.ETH_stats.test_RINKEBY_network_status;
          this.params.ETH.ROPSTEN = resp.ETH_stats.test_ROPSTEN_network_status;
          this.params.serverstatus = resp.server_status;
          if ((this.params.BTC.MAIN != 200) || (this.params.ETH.MAIN != 200) ||
            (this.params.ETH.KOVAN != 200) || (this.params.ETH.RINKEBY != 200) ||
            (this.params.ETH.ROPSTEN != 200) || (this.params.serverstatus != 200)) {
            this.params.error = true;
            //this.showerrors = true;
          }
          console.log('Server works normally');
          return true;
        })
          .catch(error => {
            this.check500error(error);
          })
      },
      Authentication(auth_info) {
        //this func should be emitted from SubApp
        let username = auth_info.name;
        let password = auth_info.pass;
        const pre_auth = {
          "login": username,
          "password": password
        };
        const auth = JSON.stringify(pre_auth);
        axios.post(this.apiurl + 'auth', auth).then(response => {
          console.log("Got auth response!", response);
          if (response.status == 200) {
            this.$refs.general.dialogform_none();
            this.params.auth = true;
            this.params.login = username;
            this.token = response.data.token;
            this.params.token = response.data.token;
            Cookies.set('token', this.token, {expires: 0.25});
            Cookies.set('login', username, {expires: 14});
            this.params.login = username;
            this.params.eth_transaction_balance = response.data.wallets.ETH.balance;
            let bal = Math.round(response.data.wallets.ETH.balance * 10000000) / 10000000;
            this.params.eth_address = response.data.wallets.ETH.address.toLowerCase();
            this.$root.eth_balance = bal;
            this.params.eth_balance = bal;
            this.$root.balance = bal;
            this.params.Checkedbalance = true;
            this.params.reauth_please = false,

              this.GetPrice("eth");
            this.GetHistory();
            window.location.replace("#/wallet");
          }
        }).catch(error => {
          let cause = error.response.data.message;
          if (cause == "invalid login or email" || cause == "invalid password") {
            this.$refs.general.LoginWrongAuth()
          } else this.check500error(error);
        })
      },
      Registration(info) {
        console.log(info);
        let login = info.name;
        let password = info.pass;
        let email = info.mail;
        let language = this.params.lang;
        const pre_reg = {
          "login": login,
          "password": password,
          "email": email,
          "language": language
        };
        const reg = JSON.stringify(pre_reg);
        console.log(reg);
        axios.post(this.apiurl + 'register', reg).then(response => {
          console.log("Got reg response!", response);
          if (this.checkResponse(response)) {
            console.log("registration complete");
            this.params.registration_complete = true;
            Cookies.set('token', response.data.token, {expires: 0.25});
            Cookies.set('login', login, {expires: 14});
            this.auth = true;
            this.params.auth = true;
            this.params.login = login;
            this.params.eth_address = response.data.wallets.ETH.address.toLowerCase();
            window.location.replace("#/wallet");
          } else if (response.data.message == "login or email already used") this.$refs.general.Registration_Login_used();
        })
          .catch(error => {
            if (error.response != undefined) {
              console.log("Got reg response!", error.response);
              if (error.response.data.message == "login or email already used") {
                this.$refs.general.Registration_Login_used();
              } else this.check500error(error);
            }
          });
      },
      disauth() {
        this.params.auth = false;
        this.params.balanceShow = false;
        this.params.Checkedbalance = false;
        this.params.historyShow = false;
      },
      check500error(e) {
        if (e.response.status == 500) {
          this.error500 = true;
        } else this.checkResponse(e.response);
      },
      checkToken(r) {
        if (r.data.message == "invalid token") {
          console.log("!! invalid token");
          this.disauth();
          return false;
        } else return true;
      },
      checkResponse(r) {
        if ((r.status == 200 || r.status == 201 || r.status == 202 || r.status == 203 || r.status == 204 || r.status == 205 || r.status == 206) || r.data.message == "OK") {
          if (this.checkToken(r)) {
            console.log("response – ok");
            return true; //if ok
          } else return false;
        } else {
          console.log("!! error", r);
          if (this.checkToken(r)) {
            console.log("response – ok");
            return true; //if ok
          } else return false;
        }
      },
      GetPrice(asset) {
        let pair = asset + "usdt";
        const pre_prce = {
          "pair": pair,
          "amount": 1.0
        }
        const prce = JSON.stringify(pre_prce);
        axios.post(this.apiurl + 'price', prce).then(response => {
          if (this.checkResponse(response)) {
            let price = response.data.price;

            let usdbalance = this.params.eth_balance * price;
            this.$root.balance = Math.round(usdbalance * 1000) / 1000;
            //console.log('Got "', asset, '" price!');
            this.params.balanceShow = true; //in SubApp [$3.87348]
          }
        })
          .catch(error => {
            this.check500error(error);
          })
      },
      GetBalance() {
        const pre_blnce = {
          "asset": "ETH",
          "network": "rinkeby",
          "token": this.token
        };
        const blnce = JSON.stringify(pre_blnce);
        axios.post(this.apiurl + 'balance', blnce).then(response => {
          if (this.checkResponse(response)) {
            this.params.eth_transaction_balance = response.data.balance;
            this.$root.eth_balance = Math.round(response.data.balance * 1000000) / 1000000;
            this.params.eth_balance = Math.round(response.data.balance * 1000000) / 1000000;
            this.$root.balance = response.data.balance;
            this.params.Checkedbalance = true;

            this.GetPrice("eth");
            return true;
          }
        })
          .catch(error => {
            this.check500error(error);
          })
      },
      GetAddress() {
        const gettt = {
          "login": this.params.login
        };
        const gett = JSON.stringify(gettt);
        axios.post(this.apiurl + 'wallet', gett).then(response => {
          if (this.checkResponse(response)) {
            console.log(response);
            this.params.eth_address = response.data.ETH.toLowerCase();
            console.log(this.params.eth_address, "PPTZ");
            this.GetHistory();
            this.GetBalance();
            return true;
          } else return false;
        })
          .catch(error => {
            this.check500error(error);
          })
      },
      minutestime(s) {
        return new Date(s * 1e3).toISOString().slice(-13, -8);
      },
      datetime(s) {
        return new Date(s * 1e3).toISOString().slice(-24, -14);
      },
      reverse(trs) {
        let l = trs.length;
        let Tnew = [l];
        for (let i = l; i != 0; i--) {
          Tnew[l - i] = trs[i - 1];
        };
        return Tnew;
      },
      monthSum(trs) {
        let count = 0.0;
        let minus = 0.0;
        let plus = 0.0;
        for (let i = 0; i < trs.length; i++) {
          if (trs[i].type == true) {
            count += trs[i].count;
            plus += trs[i].count;
          } else {
            console.log(count, " – ", parseFloat(trs[i].count));
            count = count - parseFloat(trs[i].count);
            minus -= trs[i].count;
          }
          ;
        }
        ;
        console.log(count);
        count = Math.round(count * 1000000) / 1000000;
        if (count > 0) {
          count.toString();
        }
        ;
        console.log(minus);
        minus = Math.round(minus * 1000000) / 1000000;
        plus = Math.round(plus * 1000000) / 1000000;
        return [count, plus, minus];
      },
      GetHistory() {
        const pre_hist = {
          "asset": "ETH",
          "network": "rinkeby",
          "token": this.token,
          "number": 100
        };
        const hist = JSON.stringify(pre_hist);
        axios.post(this.apiurl + 'history', hist).then(response => {
          var resphist = response.data;
          console.log("HIST!", resphist);
          if (this.checkResponse(response)) {
            //this.params.ETH_history = resphist.transactions;
            for (var i = 0; i < resphist.transactions.length; i++) {
              var transaction = {};
              transaction.from = resphist.transactions[i].from;
              transaction.to = resphist.transactions[i].to;
              transaction.count = parseFloat(resphist.transactions[i].value);
              if (resphist.transactions[i].value == "0") transaction.count = 0;
              transaction.blockHash = resphist.transactions[i].blockHash;
              transaction.hash = resphist.transactions[i].hash;
              transaction.blockNumber = resphist.transactions[i].blockNumber;
              transaction.time = this.minutestime(resphist.transactions[i].timeStamp);
              transaction.date = this.datetime(resphist.transactions[i].timeStamp);
              console.log(transaction.to == this.params.eth_address, transaction.count);
              if (transaction.to == this.params.eth_address) {
                transaction.type = true;
                transaction.color = "green";
                transaction.excerpt = resphist.transactions[i].from;
              } else {
                transaction.type = false;
                transaction.color = "red";
                transaction.excerpt = resphist.transactions[i].to;
              }
              transaction.asset = "ETH";
              transaction.avatar = '/static/ICONS/' + transaction.asset + '.png';
              transaction.textcolor = "white--text";
              this.params.ETH_history[i] = transaction;
              this.params.historyShow = true;
            };
            this.params.ETH_history = this.reverse(this.params.ETH_history);
            /*let transit = this.monthSum(this.params.ETH_history);
            this.params.monthSum = transit[0];
            this.params.monthplus = transit[1];
            this.params.monthminus = transit[2];
            console.log("MonthSum", this.params.monthSum);*/

            //console.log('Gotcha!', this.params.ETH_history, transaction);
          };
          return true;
        })
          .catch(error => {
            this.check500error(error);
          })
      },
      cooksWork() {
        let token = Cookies.get('token');
        let login = Cookies.get('login');
        console.log(token, login);
        console.log(token !== null && token !== "" && token !== undefined);
        if (login !== null && login !== "" && login !== undefined) {
          if (token !== null && token !== "" && token !== undefined) {
            this.params.auth = true;
            this.token = token;
            this.params.token = token;
            this.params.login = login;
            Cookies.set('token', this.token, {expires: 0.25});
            Cookies.set('login', login, {expires: 14});
            return true;
          } else
            this.params.login = login;
          this.$refs.general.SetLogin();
          this.params.reauth_please = true;
          return false;
        } else return false;
      },
      CheckHTTPs() {
        let uri = location.href;
        let protocol = location.protocol;
        if (protocol == "http:" && (window.location.host != "localhost:8080")) { //localhost doesn't work with https
          let b = uri.slice(4);
          window.location.replace("https" + b);
        }
      }
    },
    mounted() {
      console.log('App.vue launched successful');
      this.CheckHTTPs();
      /*console.log('navigator', window.navigator);
      console.log('frames', window.frames);
      console.log('location', window.location);
      console.log('history', window.history);
      console.log('screen', window.screen);*/
      this.Сheckserver();
      this.params.lang = "ru";
      if (this.cooksWork()) {
        this.set_ru();
        this.GetAddress();
      }
    },
    watch: {
      bkg() {
        if (window.location.hash == "#/wallet"
        ) {
          let app = document.getElementById("app");
          app.style.backgroundimage = "url('./../../static/wallet_bkg.png')";
          console.log("bkg wallet");
        }
      }
    }
  };

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

  body {
    font-family: "Google Sans" !important;
  }

  #app {
    font-family: Google Sans !important;
  }
</style>
