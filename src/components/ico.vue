<template>
<v-layout column justify-center style="width: 91%; margin-left: 4%; height: 900px">
    <div>
        <a style="font-size: 4em; width: 80%">{{lang.wallet}}</a>
    </div>
    <v-layout>
        <v-flex xs4 class="mycryptowallets" v-for="(crw, p) in cryptowallets" :key="p">
            <dashdiv :name="crw.name" :fullname="crw.fullname" :balance="crw.balance" :price="crw.price"></dashdiv>
        </v-flex>
    </v-layout>
    <a style="text-align: right; color: rgba(0,0,0,0.74); font-weight: 500; margin-top: -140px">{{$root.crypto_balance}} BTC</a>
    <v-subheader style="margin-top: -35px">{{lang.today}}, {{cDate}} of {{cMonth}}, {{year}}</v-subheader>
    <v-layout style="margin-top: -10px">
        <v-flex xs12>
            <div style="width: 98%">
                <v-expansion-panel popout>
                    <v-expansion-panel-content v-for="(transaction, i) in transactions" :key="i" hide-actions>
                        <v-layout slot="header" justify-space-around row>
                            <v-flex xs3 sm2 md1>
                                <v-avatar slot="activator" size="30px">
                                    <img v-if="transaction.avatar" :src="transaction.avatar" alt="Avatar">
                                    <v-icon v-else :color="transaction.color" v-text="transaction.icon"></v-icon>
                                </v-avatar>
                            </v-flex>

                            <v-flex sm3 md3 hidden-xs-only>
                                <strong v-html="transaction.name"></strong>
                                <span v-if="transaction.total" class="grey--text">
              &nbsp;({{ transaction.total }})
            </span>
                            </v-flex>

                            <v-flex no-wrap xs3 sm3>
                                <v-chip v-if="transaction.count" :color="`${transaction.color} lighten-2`" :class=transaction.textcolor class="ml-1" label small>
                                    {{ transaction.count }} {{transaction.name}}
                                </v-chip>
                                <strong v-html="transaction.title"></strong>
                            </v-flex>

                            <v-flex v-if="transaction.excerpt" class="grey--text" ellipsis hidden-sm-and-down>
                                <a class="grey--text" v-if="transaction.type">{{lang.from}}</a>
                                <a class="grey--text" v-if="!transaction.type">{{lang.to}}</a>
                                {{ transaction.excerpt }}
                            </v-flex>
                            <v-flex xs3></v-flex>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex v-if="transaction.time" bold>
                                {{ transaction.time }}
                            </v-flex>
                        </v-layout>
                        <v-card>
                            <v-divider></v-divider>
                            <v-card-text v-text="lorem"></v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </div>
        </v-flex>
        <v-flex xs3>
            <div id="params">Vive nous touS</div>
        </v-flex>
    </v-layout>
    <user :get_balance="true"></user>
</v-layout>
</template>

<script>
import user from './server/user';
import dash_div from './utils/dashboard_div.vue';
export default {
    components: {
        'user': user,
        'dashdiv': dash_div
    },
    name: "order",
    props: ['lang'],
    data: () => ({
        date: "",
        year: null,
        month: "",
        cMonth: "",
        cDate: "",
        transactions: [{
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png",
                name: "BTC",
                count: "+0.00521",
                color: "green darken-1",
                textcolor: "white--text",
                excerpt: "Sema123",
                type: '+',
                time: "20:38"
            },
            {
                avatar: "https://pbs.twimg.com/media/DfvLXdOWsAEZXxX.jpg",
                color: "red darken-1",
                textcolor: "white--text",
                name: "ETH",
                count: -0.02591,
                excerpt: "Jeka999",
                type: '',
                time: "08:12"
            },
            {
                avatar: "/static/icp_logo_479.png",
                color: "red darken-1",
                name: "ICP",
                count: -0.006118,
                textcolor: "white--text",
                excerpt: "ICP education",
                type: '',
                time: "19:55"
            }
        ],
        cryptowallets: [{
                name: 'BTC',
                fullname: 'Bitcoin',
                balance: 0.020504,
                price: 6445
            },
            {
                name: 'ETH',
                fullname: 'Ethereum',
                balance: 30.456,
                price: 220
            },
            {
                name: 'LTC',
                fullname: 'Litecoin',
                balance: 50.3,
                price: 4
            },
            {
                name: 'XRP',
                fullname: 'ГОВНО',
                balance: 1,
                price: '↓'
            }
        ],
        lorem: "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
    }),
    mounted() {
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth();
        switch (this.month) {
            case 0:
                this.cMonth = "January";
                break;
            case 1:
                this.cMonth = "February";
                break;
            case 2:
                this.cMonth = "March";
                break;
            case 3:
                this.cMonth = "April";
                break;
            case 4:
                this.cMonth = "May";
                break;
            case 5:
                this.cMonth = "June";
                break;
            case 6:
                this.cMonth = "July";
                break;
            case 7:
                this.cMonth = "August";
                break;
            case 8:
                this.cMonth = "September";
                break;
            case 9:
                this.cMonth = "October";
                break;
            case 10:
                this.cMonth = "November";
                break;
            case 11:
                this.cMonth = "December";
                break;
        }
        this.cDate = date.getDate();
        this.$root.balance = "550";
        console.log(this.$root.balance);
        this.$root.wallet = true;
    }
};
</script>

<!-- инкапсулированные стили компонента -->

<style scoped>
.order {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#wallet {
    opacity: 1;
}

.display-3-1 {
    width: 100%;
    font-size: 56px;
    font-weight: 400;
}

.v-expansion-panel__container {
    box-shadow: 0 0.4em 1.3em 0.1em rgba(0, 0, 0, 0.1);
    margin-top: 5px;
    padding-bottom: 3px;
    border-radius: 1em;
    transition: 0.5s;
}
.v-expansion-panel__container:hover {
    transition: 0.5s;
    box-shadow: 0 0.4em 1.3em 0.2em rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.v-expansion-panel__container--active,
.v-expansion-panel__body,
.v-expansion-panel__body .v-card .v-card__text {
    border-radius: 1em;
}

.v-card {
    border-radius: 0 0 1em 1em;
}

.v-expansion-panel__container--active {
    box-shadow: 0 0.4em 1.3em 0.1em rgba(0, 0, 0, 0.15);
}

#params {
    width: 20em;
    height: 30em;
    background: white;
    box-shadow: 0 0.4em 1.3em 0.1em rgba(0, 0, 0, 0.1);
    border-radius: 1em;
    margin-right: -2em;
}

.mycryptowallets {
    width: 25vw;
    height: 20vh;
}
</style>
