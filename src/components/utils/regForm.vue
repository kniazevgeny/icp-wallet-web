<template>
  <v-layout row wrap>
    <form style="width: 80%; margin-left: 10%">
      <v-card>
        <v-card-title>
          <span class="headline">Регистрация</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="re_valid" lazy-validation @submit.prevent="Registration">
              <v-layout wrap>
                <a style="color: red" v-if="loginOrEmail_Used">Логин или Email уже привязаны к другому пользователю</a>
                <v-flex xs12>
                  <v-text-field label="Логин (nickname)" required name="re_usrname" v-model="re_usrname"
                                :rules="re_Rules" @keyup.enter="registrate" @input="loginOrEmail_Used = false"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email" type="email" required name="re_email" v-model="re_email"
                                :rules="paRules" @keyup.enter="registrate"  @input="loginOrEmail_Used = false"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Пароль" type="password" required name="re_password" v-model="re_password"
                                :rules="passwordRules" @keyup.enter="registrate"
                                :append-icon="show ? 'visibility_off' : 'visibility'"
                                :type="show ? 'text' : 'password'"
                                @click:append="show = !show"></v-text-field>
                  <v-progress-linear
                    slot="progress"
                    :value="progress*17+15"
                    :color="color"
                    height="7"
                  ></v-progress-linear>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Подтвердите пароль" type="password" required name="re_password2"
                                v-model="re_password2" @keyup.enter="registrate"></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <a style="color: red" v-if="notmatch">Пароли не совпадают</a>
          <v-btn color="blue darken-1" flat :disabled="!re_valid" @click="registrate()">
            Зарегистрироваться

          </v-btn>
        </v-card-actions>

      </v-card>
    </form>

  </v-layout>
</template>

<script>
  import zxcvbn from 'zxcvbn';

  export default {
    name: "regForm",
    components: {
      zxcvbn
    },
    data: () => ({
      notmatch: false,
      re_valid: true,
      show: false,
      re_usrname: "",
      re_email: "",
      re_Rules: [
        v => !!v || "Это поле обязательно к заполнению",
        v => v.length > 2 || "Минимум 3 символа латиницей",
        v => v.length < 30 || "Максимум 30 символов",
        v => /^[a-zA-Z0-9_]+$/.test(v) || "Логин может содержать только английские буквы, цифры, и нижнее подчеркивание"],
      re_password: "",
      re_password2: "",
      paRules: [
        v => !!v || 'Это поле обязательно к заполнению', // /^\w*@\w+$/.test(v)
        v => v.length < 50 || "Максимум 50 символов",
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Проверьте корректность написания'
      ],
      passwordRules: [
        v => !!v || "Укажите пароль",
        v => v.length < 30 || "Максимум 30 символов",
        v => (zxcvbn(v).score >= 1) || "Пароль слишком легкий",
        v => (zxcvbn(v).score >= 2) || "Уже лучше, но пароль по-прежнему легко взломать"
      ],
      loginOrEmail_Used: false
    }),
    computed: {
      progress () {
        if (this.re_password == "") return 0;
        return zxcvbn(this.re_password).score + 1
      },
      color () {
        return ['', '#dd2c00', 'error', '#fdd835', 'success', 'info'][this.progress]
      }
    },
    methods: {
      registrate() {
        if (this.$refs.form.validate()) {
          if (this.re_password == this.re_password2) {
            let info = {"name": this.re_usrname, "mail": this.re_email, "pass": this.re_password};
            this.$emit('Registration', info);
            this.notmatch = false;
          }
          else {
            this.notmatch = true;
          };
        }
      },
      checkPassword(p) {
        //m - mode
        //because there're 2 enter points
        let strong = zxcvbn(p).score;
        if (strong >= 2)
          return true;
      },
      //called from app.vue
      Registration_Login_used(){
        this.loginOrEmail_Used = true
      }
    }
  }
</script>

<style scoped>
.ff{
  color: #fdd835;
}
</style>
