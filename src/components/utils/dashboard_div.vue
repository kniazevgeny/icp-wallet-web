<template>
  <div class="component" @click.native="this.change(event)">
    <v-flex xs12><a style="font-weight: 500; color: rgba(0,0,0,0.74); font-size: 1.5em">{{name}}</a></v-flex>
    <v-flex id="notimportant"><a>{{fullname}}</a></v-flex>
    <v-flex id="balance" xs3 v-if="alt.Checkedbalance"><a>{{CrB}}</a></v-flex>
    <v-flex id="price" xs12 style="text-align: right; color: rgba(0,0,0,0.6); font-weight: 700; font-size: 1.3em"
            v-if="alt.Checkedbalance"><a>${{Prce}}</a></v-flex>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data: () => ({
      CrB: '',
      Prce: ""
    }),
    props: ["name", "fullname", "balance", "price", "chartData", "alt"],
    mounted() {
      if (this.name == 'BTC') {
        this.CrB = this.alt.btc_balance;
      }
      ;
      if (this.name == 'ETH') {
        this.CrB = this.alt.eth_balance;
      }
      ;
      if (this.name == 'LTC') {
        this.CrB = this.alt.ltc_balance;
      }
      ;
      this.GetPrice(this.name);
      /*if (this.name == 'ZEC') {
          this.CrB = this.alt.zec_balance;
          this.Prce = this.alt.prices[3].zec;
      };*/
    },
    methods: {
      GetPrice(asset) {
        let pair = asset + "usdt";
        const pre_prce = {
          "pair": pair,
          "amount": 1.0
        }
        const prce = JSON.stringify(pre_prce);
        axios.post('http://api.icp.ru.com/' + 'price', prce).then(response => {
          this.Prce = response.data.price;
          ///console.log('Got "', asset, '" price!');
        })
      },
      change(el){
        //el.style.height = "30vh";
        //console.log(el);
      }
    }
  }
</script>

<style scoped>
  .component {
    width: 20vw;
    height: 7em;
    background: white;
    border-radius: 1em;
    box-shadow: 0 0.4em 1.3em 0.1em rgba(0, 0, 0, 0.1);
    padding: 3%;
    padding-bottom: -10px;
    margin-top: 1em;
    transition: 0.5s;
  }

  @media screen and (max-width: 600px) {
    .component {
      width: 40vw;
    }
  }

  .component:hover {
    transition: 0.5s;
    box-shadow: 0 0.4em 1.5em 0.1em rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  .notimportant,
  #balance {
    display: none;
  }

  @media screen and (min-width: 750px) {
    #balance {
      display: block;
    }

    #price {
      margin-top: -2.5em;
    }
  }

  @media screen and (min-width: 500px) and (max-width: 600px) {
    .notimportant {
      display: block;
    }

    #price {
      margin-top: -2.5em;
    }
  }
</style>
