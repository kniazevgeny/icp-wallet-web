<template>
  <v-layout column justify-center style=" margin-top: -55px; min-height: 100vh" id="wallllet">
    <div style="width: 91%; margin-left: 4%;">
      <div style="margin-top: 55px" v-if="mparams.auth">
        <a style="font-size: 40px; width: 80%; margin-left: 2%; color: whitesmoke">{{mparams.txtwallet}}</a>
        <br>
      </div>
      <v-layout wrap justify-space-between v-if="mparams.auth">
        <!--v-flex xs6 sm3 md3 lg3 xl3 v-for="(crw, p) in cryptowallets" :key="p">
          <dashdiv :name="crw.name" :fullname="crw.fullname" :balance="crw.balance" :price="crw.price" :alt="mparams"
                   v-if="mparams.Checkedbalance"></dashdiv>
          <v-progress-linear indeterminate v-else style="width: 90%"></v-progress-linear>
        </v-flex-->
        <v-flex>
          <v-btn round depressed dark large
                 style="font-size: x-large; color: #fff; background: linear-gradient(90deg, rgb(59,54,150), rgb(255,23,50));
               letter-spacing: 3px; margin-left: 5%">
            Ethereum
          </v-btn>
          <a id="ACryptoBalance"
             style="text-align: right; color: rgba(255,255,255,0.9); font-weight: 500; font-size: xx-large"
             v-if="mparams.balanceShow"> {{mparams.eth_balance}} ETH</a><br>
          <v-card v-if="mparams.registration_complete">
            <v-card-title style="font-size: x-large">Поздравляем!</v-card-title>
            <v-card-text>Регистрация прошла успешно. <br>
              Кошелек находится на стадии тестирования. Если что-то пойдет не так, пожалуйста, обратитесь в поддержку.
            </v-card-text>
            <v-card-text>
              <strong>Пожалуйста, подтвердите свою почту.</strong> Мы отправили вам письмо с ссылкой на подтверждение
              аккаунта.
            </v-card-text>
          </v-card>
          <!--a

          MONTH PLUS/MINUS

            style="text-align: right; margin-right: 1em; font-weight: 200; color: rgba(0, 150, 200, .9);  font-size: medium"
            v-if="mparams.historyShow">+{{mparams.monthplus}}
            ETH</a>
          <a style="text-align: right; font-weight: 200; color: rgba(255, 0, 0, .75); font-size: medium"
             v-if="mparams.historyShow">{{mparams.monthminus}}
            ETH</a--><br>
          <v-flex>
            <v-layout justify-space-between style="width: 90%; margin-left: 5%;">
              <v-dialog v-model="receive" class="v-dialog" style="margin: 0;">
                <v-btn slot="activator" round large depressed block dark color="green"
                       @click="copiedAddr = false; DeleteBoxShadow()">Получить
                </v-btn>
                <v-card style="border-radius: 1em">
                  <v-layout wrap style="justify-items: center; padding: 2em">
                    <v-flex sm1></v-flex>
                    <v-flex sm10>
                      <v-flex xs12>
                        <v-card-title>
                          <strong style="font-size: large;">Ваш ETH адрес:</strong>
                          <v-spacer></v-spacer>
                          <v-btn fab flat small @click="receive = false">
                            <v-icon>clear</v-icon>
                          </v-btn>
                        </v-card-title>
                        <br>
                      </v-flex>
                      <v-card-text style="width: 97.5%; margin-left: 0.5%">
                        <v-text-field v-model="mparams.eth_address"
                                      :mask="mparams.eth_address" style="font-size: medium"
                                      :append-icon="'file_copy'"
                                      @click:append="Copy('address')" id="Address">
                        </v-text-field>
                        <a v-if="copied">Скопировано!</a>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-dialog>


              <v-dialog v-model="dialog" width="80em" class="v-dialog" style="margin: 0">
                <v-btn slot="activator" round large depressed block dark color="indigo darken-2"
                       @click="readyToSend = false; notEnough = false; DeleteBoxShadow()">Отправить
                </v-btn>
                <v-card style="border-radius: 1em; box-shadow: none">
                  <v-card-title>
                    <span style="font-size: x-large">Отправить</span>
                    <v-spacer></v-spacer>
                    <v-btn fab flat small @click="dialog = false">
                      <v-icon>clear</v-icon>
                    </v-btn>
                  </v-card-title>
                  <v-card-text v-if="!readyToSend">
                    <v-form ref="send" lazy-validation>
                      <v-layout style="justify-items: center">
                        <v-flex sm2 hidden-xs-only></v-flex>
                        <v-flex sm12>
                          <v-layout wrap style="justify-items: center">
                            <v-flex xs12 sm10>
                              <a style="font-size: large">Отправка по:</a><a slot="activator"></a><br>
                              <v-radio-group v-model="transactionType" row @change="CheckTransactionType()">
                               <v-radio :label="transactionTypes[2]" value="2" color="blue"></v-radio>
                                <v-radio :label="transactionTypes[0]" value="0" color="blue"></v-radio>
                                <v-radio :label="transactionTypes[1]" value="1" color="blue"></v-radio>
                              </v-radio-group>
                            </v-flex>
                            <span v-if="tryLogin" class="tryOther">
                              <span style="font-size: medium">Возможно, это </span>
                              <v-btn @click="transactionType = '0'; tryLogin = false" small outline color="white">логин</v-btn>
                            </span>
                            <span v-if="tryEmail" class="tryOther">
                              <span>Возможно, это</span>
                              <v-btn @click="transactionType = '1'; tryEmail = false" small outline color="white">email</v-btn>
                            </span>
                            <span v-if="tryAddress" class="tryOther">
                              <span>Возможно, это</span>
                              <v-btn @click="transactionType = '2'; tryAddress = false" small outline color="white">адрес</v-btn>
                            </span>
                            <v-flex xs12 sm10 @keyup.enter="sendNext">
                              <v-text-field label="Логин" v-model="sendTo"
                                            style="font-size: 1.7em" @input="CheckTransactionType()"
                                            :rules="loginRules" v-if="transactionType == 0"></v-text-field>
                              <v-text-field label="Почта" required v-model="sendTo"
                                            style="font-size: 1.7em" @input="CheckTransactionType()"
                                            :rules="emailRules" v-if="transactionType == 1"></v-text-field>
                              <v-text-field label="Адрес" required v-model="sendTo"
                                            style="font-size: 1.7em" @input="CheckTransactionType()"
                                            :rules="addressRules" v-if="transactionType == 2"></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm10 @keyup.enter="sendNext">
                              <v-text-field label="Сумма" required v-model="amount" :rules="amountRules" placeholder="0"
                                            style="font-size: 1.7em">
                              </v-text-field>
                              <strong v-if="notEnough" style="color: #b71c1c; font-size: medium">Недостаточно средств<br></strong>
                              <strong v-if="userNotFound" style="color: #b71c1c; font-size: medium">Пользователь не найден<br></strong>
                              <span class="italicNAVALNY">Комиссия ICP: 0%<br></span>
                              <span class="italicNAVALNY">Комиссия сети: 0.000021 ETH<br></span>
                              <span class="italicNAVALNY">Минимальная для отправки сумма: 0.0001 ETH</span>
                              <v-spacer></v-spacer>
                              <v-btn round color="red lighten-1" dark outline
                                     @click.native="amount = mparams.eth_transaction_balance - 0.000021"
                                     style="margin-left: -0px">Все средства
                              </v-btn>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-progress-linear indeterminate v-if="sent" color="blue"><br></v-progress-linear>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="amber darken-3" dark round @click.native="sendNext" v-if="!readyToSend">Далее
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>

                  <v-card-actions v-if="readyToSend">
                    <v-layout wrap justify-space-between>
                      <v-flex xs1 sm2 md4></v-flex>
                      <v-flex xs10 sm8 md4 style="font-size: large; text-align: center; border-color: #00e676">
                        Будет переведено: <strong>{{amount}}</strong> ETH<br>
                        <a v-if="transactionType == 0">Пользователю с логином: <strong>{{sendTo}}</strong></a>
                        <a v-if="transactionType == 1">Пользователю с почтой: <strong>{{sendTo}}</strong></a>
                        <a v-if="transactionType == 2">На адрес: <strong>{{sendTo}}</strong></a>
                        <br>
                        Комиссия сети: <strong>0.000021</strong> ETH<br><br>
                        <a style="float: right">Итого: <strong>{{sumSend}}</strong> ETH</a>
                      </v-flex>
                      <v-spacer></v-spacer>
                    </v-layout>
                  </v-card-actions>
                  <br>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="indigo" dark round @click.native="Send()" v-if="readyToSend">Отправить
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-flex>
        </v-flex>

        <!--v-flex md6>             CHART
          <canvas id="myChart"></canvas>
        </v-flex-->

      </v-layout>

      <v-layout v-if="mparams.auth">
        <v-flex xs12> <!--xs12 sm12 md8 lg8 xl10 -->
          <div style="width: 90%; margin-left: 5%;">
            <v-subheader style="margin-top: -0.5em; padding: 0; font-size: medium; color: white">
              {{mparams.today}}, {{cDate}} {{cMonth}}, {{year}}
              <v-spacer></v-spacer>
            </v-subheader>

            <div v-if="sendsuccess">
              <v-card color="rgb(255, 255, 255)" style="border-radius: 10px;"
                      v-for="(tr, i) in successfulTransation" :key="i">
                <a style="font-size: x-large; ">
                  <v-icon size="40px">check_circle_outline</v-icon>
                  Средства успешно отправлены! </a><br>
                <div style="margin-left: 40px; font-size: medium;">Ваша транзакция находится в обработке.<br><br>
                  TX: <v-text-field style="font-size: smaller"
                                v-model="tr.tx"
                                :mask="tr.tx"
                                :append-icon="'file_copy'"
                                @click:append="Copy('tx')" id="tx"></v-text-field>
                  <a v-if="copied">Адрес скопирован!</a>
                  <sub style="margin-left: 40px;"><br>Если транзакция обрабатывается слишком долго то обратитесь в
                    поддержку.</sub></div>
              </v-card>
            </div>
            <br>

            <v-expansion-panel v-if="mparams.historyShow" expand style="box-shadow: none">
              <v-expansion-panel-content v-for="(transaction, i) in mparams.ETH_history" :key="i" hide-actions>
                <v-layout slot="header" row style="align-items: center">
                  <v-flex xs2 md1>
                    <v-avatar slot="activator" size="30px">
                      <img v-if="transaction.avatar" :src="transaction.avatar" alt="Avatar">
                      <v-icon v-else :color="transaction.color" v-text="transaction.icon"></v-icon>
                    </v-avatar>
                  </v-flex>

                  <span xs1>
                  <strong v-html="transaction.asset"></strong>
                </span>
                  <v-spacer></v-spacer>

                  <v-flex v-if="transaction.excerpt" class="grey--text" ellipsis hidden-sm-and-down md5>
                    <a class="grey--text" v-if="transaction.type">{{mparams.from}}</a>
                    <a class="grey--text" v-if="!transaction.type">{{mparams.to}}</a>
                    {{ transaction.excerpt }}
                  </v-flex>

                  <v-flex xs2 hidden-xs-only>
                    <a class="white--text inOUT" style="background-color: #4caf50;" v-if="transaction.type">IN</a>
                    <a class="white--text inOUT" style="background-color: #ff6f00;" v-if="!transaction.type">OUT</a>
                  </v-flex>

                  <v-flex no-wrap xs5 sm2 md2>
                    <v-chip v-if="transaction.count" :color="`${transaction.color} lighten-2`"
                            :class=transaction.textcolor class="ml-1" label small>
                      {{ transaction.count }} {{transaction.name}}
                    </v-chip>
                    <strong v-html="transaction.title"></strong>
                  </v-flex>

                  <v-spacer></v-spacer>
                  <span v-if="transaction.time" xs1 style="clear: right">
                  {{ transaction.time }}
                </span>
                </v-layout>
                <v-card class="text-xs-center">
                  <span v-if="transaction.type">Перевод от {{transaction.from}}</span>
                  <span v-if="!transaction.type">Перевод на {{transaction.to}}</span>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <span style="font-size: large; color: white" v-if="!mparams.historyShow && mparams.auth">
            Вы пока не совершили ни одной транзакции.
          </span>
          </div>
        </v-flex>
        <!--v-flex md4 lg4 xl2 hidden-sm-and-down>
          <div id="params">Vive nous touS</div>
        </v-flex-->
      </v-layout>
      <span v-if="!mparams.auth" style="font-size: 300%; color: whitesmoke;">Чтобы просматривать страницу,
              <a style=" font-style: italic; background-color: #b71c1c; color: whitesmoke; padding: 7px">войдите в аккаунт</a>
      </span>
    </div>
    <br>
  </v-layout>
</template>

<script>
  import dash_div from './utils/dashboard_div.vue';
  //import Chart from 'chart.js';
  import axios from 'axios';

  export default {
    components: {
      'dashdiv': dash_div
    },
    name: "order",
    props: ['mparams'],
    data: () => ({
      copied: false,
      successfulTransation: [],
      transactionTypes: [
        'Логину',
        'Почте',
        'Адресу'
      ],
      transactionType: "2",
      tryLogin: false,
      tryEmail: false,
      tryAddress: false,

      sendsuccess: true,
      dialog: false,
      receive: false,
      userNotFound: false,
      sent: false,
      readyToSend: false,
      notEnough: false,
      sendTo: "",
      sumSend: 0,
      amount: null,
      addressRules: [
        v => !!v || 'Это поле обязательно к заполнению',
        v => /^0x[0-9a-fA-F]{40}$/.test(v) || "Адрес не валиден"
      ],
      amountRules: [
        v => v >= 0.0001 || "Сумма меньше минимальной"
      ],
      loginRules: [
        v => !!v || "Это поле обязательно к заполнению",
        v => v.length > 2 || "Минимум 3 символа латиницей",
        v => v.length < 30 || "Максимум 30 символов",
        v => /^[a-zA-Z0-9_]+$/.test(v) || "Логин может содержать только английские буквы, цифры, и нижнее подчеркивание"
      ],
      emailRules: [
        v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
        v => v.length < 50 || "Максимум 50 символов",
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Проверьте корректность написания'
      ],
      date: "",
      year: null,
      month: "",
      cMonth: "",
      cDate: "",
      LagerThan600: false,
      cryptowallets: [{}],
      transactions: [{time: "20:20"}],
      lorem: "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
    }),
    methods: {
      CheckTransactionType() {
        this.userNotFound = false;
        let address = /^0x[0-9a-fA-F]{40}$/;
        let email =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let input = this.sendTo;
        if (input == "") return;

        let isAddress = input.match(address);
        let isEmail = input.match(email);

        this.tryAddress = false;
        this.tryEmail = false;
        this.tryLogin = false;
        if (isAddress != null && this.transactionType != "2") this.tryAddress = true;
        else if (isEmail != null && this.transactionType != "1") this.tryEmail = true;
        else if (this.transactionType != "0" && isEmail == null && isAddress == null) this.tryLogin = true;
      },
      sendNext() {
        if (this.$refs.send.validate()) {
          if (this.amount < this.mparams.eth_balance) {
            this.readyToSend = true;
            this.sumSend = parseFloat(this.amount) + 0.000021;
            this.notEnough = false;
          } else this.notEnough = true;
        }
      },
      Send() {
        //this func should be emitted from SubApp
        let type = "";
        if (this.transactionType == "0") type = "login";
        else if (this.transactionType == "1") type = "email";
        else if (this.transactionType == "2") type = "address";

        const pre_snd = {
          "amount": parseFloat(this.amount),
          "to_type": type,
          "to": this.sendTo,
          "asset": "ETH",
          "network": "rinkeby",
          "token": this.mparams.token
        };
        const snd = JSON.stringify(pre_snd);
        this.sent = true;
        console.log("Запрос отправлен!", snd);
        axios.post("https://api.icp.ru.com/" + 'send', snd).then(response => {
          console.log("Got send response!", response);
          if (response.status == 200) {
            if (response.data.message != "not enough money") {
              this.sent = false;
              this.dialog = false;
              this.successfulTransation.push({
                tx: response.data.tx
              });
              this.sendsuccess = true;
            } else this.notEnough = true;
          };
        })
          .catch(error => {
            this.sent = false;
            if (error.response != undefined) {
              console.log("Got send response!", error.response);
              if (error.response.data.message == "recipient not found") {
                this.userNotFound = true;
                this.sent = false;
                this.readyToSend = false;
              }
            }
          })
      },
      Copy(mode) {
        if (mode == "address") {
          var copyText = document.getElementById("Address");
          copyText.select();
          document.execCommand("copy");
          this.copied = true;
        }
        else if (mode == "tx") {
          var copyText = document.getElementById("tx");
          copyText.select();
          document.execCommand("copy");
          this.copied = true;
        }
      },
      DeleteBoxShadow() {//in dialogs
        let dialogs = document.getElementsByClassName("v-dialog");
        for (let i = 0; dialogs.length; i++) {
          console.log(dialogs[i]);
          dialogs[i].style["boxShadow"] = "none";
        }
      },
      SetCryptoWallets() {
        //adoptation for mobile devices
        if (screen.width < 600) {
          let assets = [{}, {}];
          assets[0].name = 'BTC';
          assets[0].fullname = 'Bitcoin';
          assets[0].balance = 1010;
          assets[0].price = 5;

          assets[1].name = 'ETH';
          assets[1].fullname = 'Ethereum';
          assets[1].balance = 16;
          assets[1].price = 4;
          this.cryptowallets = assets;
        } else {
          let assets = [{}, {}, {}, {}];

          assets[0].name = 'BTC';
          assets[0].fullname = 'Bitcoin';
          assets[0].balance = 1010;
          assets[0].price = 5;

          assets[1].name = 'ETH';
          assets[1].fullname = 'Ethereum';
          assets[1].balance = 16;
          assets[1].price = 4;

          assets[2].name = 'LTC';
          assets[2].fullname = 'Litecoin';
          assets[2].balance = 1010;
          assets[2].price = 5;

          assets[3].name = 'ZEC';
          assets[3].fullname = 'Zcash';
          assets[3].balance = 1010;
          assets[3].price = 5;
          this.cryptowallets = assets;
        }
        ;
        //console.log(this.cryptowallets);
      }
    },
    mounted() {
      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.SetCryptoWallets();
      switch (this.month) {
        case 0:
          this.cMonth = "Января";
          break;
        case 1:
          this.cMonth = "Февраля";
          break;
        case 2:
          this.cMonth = "Марта";
          break;
        case 3:
          this.cMonth = "Апреля";
          break;
        case 4:
          this.cMonth = "Мая";
          break;
        case 5:
          this.cMonth = "Июня";
          break;
        case 6:
          this.cMonth = "Июля";
          break;
        case 7:
          this.cMonth = "Августа";
          break;
        case 8:
          this.cMonth = "Сентября";
          break;
        case 9:
          this.cMonth = "Октября";
          break;
        case 10:
          this.cMonth = "Ноября";
          break;
        case 11:
          this.cMonth = "Декабря";
          break;
      }
      this.cDate = date.getDate();
      this.$root.wallet = true;
      if (screen.width >= 600) this.LagerThan600 = true; //if true, it shows some elements
      /*var ctx = document.getElementById("myChart");
      let chart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: 'Ethereum',
            data: [0, 20, 40, 50, 25, 31, 2, 56, 82, 101, 65],
            borderColor: "gold",
            backgroundColor: "rgba(240, 170, 0, 0.5)",
            fill: 'start'
          }],
          labels: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                suggestedMin: 50,
                suggestedMax: 100
              }
            }]
          }
        }
      });*/
    }
  };
</script>

<!-- инкапсулированные стили компонента -->

<style scoped>
  .v-dialog {
    box-shadow: none;
  }

  #wallet {
    opacity: 1;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .v-expansion-panel__container--active,
  .v-expansion-panel__container--active {
    margin: 0;
  }

  .v-expansion-panel__container {
    box-shadow: none;
    margin-top: 8px;
    padding-bottom: 3px;
    border-radius: 1em;
  }

  @media screen and (min-width: 600px) {
    .v-expansion-panel__container:hover {
      box-shadow: none;
      cursor: pointer;
    }
  }


  .v-expansion-panel__body,
  .v-expansion-panel__body .v-card .v-card__text,
  .v-card {
    border-radius: 1em;
    width: 90%;
    margin-left: 5%;
  }

  #myChart {
    height: 400px;
    width: 400px;
  }

  #params {
    display: none;
    float: right;
    box-shadow: none;
  }

  #ACryptoBalance {
    margin-top: 2em;
  }

  #transations {
    width: 100%
  }

  @media screen and (min-width: 800px) and (max-width: 1200px) {
    #params {
      display: block;
      width: 240px;
      height: 350px;
      background: white;
      border-radius: 1em;
    }

    #ACryptoBalance {
      margin-top: 30px;
    }

    #transations {
      width: 95%
    }
  }

  @media screen and (min-width: 1200px) {
    #params {
      display: block;
      width: 340px;
      height: 450px;
      background: white;
      border-radius: 1em;
    }

    #ACryptoBalance {
      margin-top: 10px;
    }
  }

  .mycryptowallets {
    width: 25vw;
    height: 20vh;
  }

  div.v-dialog__container {
    width: 48%;
  }

  #wallllet {
    background-image: url('./../../static/ICPWallet_bkg.png');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .v-expansion-panel__body .v-card {
    border-radius: 1em
  }

  .inOUT {
    font-size: medium;
    font-weight: bold;
    padding: 5px;
    border-radius: 4px;
  }

  .italicNAVALNY {
    font-size: medium;
    padding: 3px;
  }

  .tryOther {
    background: deepskyblue;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    padding: 0 6px 0 6px;
    width: auto;
  }


</style>
