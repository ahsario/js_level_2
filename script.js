const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
  el: '#app',
  data: {
    goods: [],
    filteredGoods: [],
    bascketGoods: [],
    searchLine: ''
  },
  computed: {
    isVisibleCard() {
      return this.bascketGoods.length
    }
  },

  methods: {
    makeGETRequest(url) {
      return new Promise( (resolve, reject) => {
        var xhr;
        if (window.XMLHttpRequest) {
          xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response) 
          }  
        }
      })
    },
    filterGoods() {
      const regexp = new RegExp(this.searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    }
  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`).
      then( goods => {
        this.goods = goods;
        this.filteredGoods = goods;
        },
        () => console.log('error')
      )
  }

});

//   sumPrice() {
//     let sum = 0;
//     this.goods.forEach(item => sum += item.price);
//     return sum;
//   }
  

// class Bascket{
//   constructor() {
//     this.basketItemList = []
//     this.sum = 0
//   }
//   getBascketItem() {
//     makeGETRequest(`${API_URL}/getBasket.json`).then(data => console.log(data.contents));
//   }
//   addBascetItem() {
//     makeGETRequest(`${API_URL}//addToBasket.json`).then(data => console.log(data));
//   }
//   deleteBascetItem() {
//     makeGETRequest(`${API_URL}//deleteFromBasket.json`).then(data => console.log(data));
//   }
//   sumPrice() {
//     makeGETRequest(`${API_URL}/getBasket.json`).then(data => console.log(data.amount));
//   }
// }

