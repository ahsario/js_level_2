const API_URL = '/catalogData';

Vue.component('filter-input', {
  props: ['goods'],
  template: `
    <input type="text" class="goods-search"  @input="changes" />
  `,
  methods: {
   changes(e) {
        this.$emit('che', e) // Генерируем пользовательское событие
      }
  }
})

Vue.component('goods-list', {
  props: ['goods', 'bascketGoods'],
  template: `
    <div class="goods-list" v-on:click="addHandler">
      <goods-item v-for="good in goods" :good="good"></goods-item>
    </div>
  `,
  methods: {
    addHandler(e) {
        this.$emit('add', e) 
      }
    }
})

Vue.component('goods-item', {
  props: ['good'],
  template: `
    <div class="goods-item" :id="good.id_product">
      <h3>{{ good.product_name }}</h3>
      <p>{{ good.price }}</p>
    </div>
  `
})

Vue.component('bascket-list', {
  props: ['goods'],
  template: `
    <div>
      <button class="cart-button" @click="openCartHandler" type="button">Корзина</button>
      <div class="bascket-list" v-if="isVisibleCart" v-on:click="removeHandler">
        <h3>В вашей корзине:</h3>
        <goods-list :goods="goods" />
      </div>
    </div>
  `,
  data() { 
    return {
      isVisibleCart: false
    }
  },
  methods: {
    openCartHandler() {
      this.isVisibleCart = !this.isVisibleCart;
    },

    removeHandler(e) {
      this.$emit('remove', e) // Генерируем пользовательское событие
    }
  }
})

Vue.component('error-handle', {
  template: `
    <h1>не удаётся выполнить запрос к серверу</h1>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    isError: false,
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
        
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            resolve(xhr.response) 
          } 
        }
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
      })
    },
    makePOSTRequest(url, data, callback) {
      let xhr;

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) { 
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          callback(xhr.responseText);
        }
      }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      xhr.send(data);
    },

    filterGoods(e) {
      const regexp = new RegExp(e.target.value, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
      console.log(e.target.value)
    },
    addToCartHandler(e) {
      const id = e.target.closest('.goods-item').id;
      console.log(id)
      const good = this.goods.find((item) => item.id_product == id);

      this.bascketGoods.push(good);
      console.log(good)
    },

    removeFromCartHandler(e) {
      console.log(e.target.closest('.goods-item').id)
      const id = e.target.closest('.goods-item').id;
      const goodIndex = this.bascketGoods.findIndex((item) => item.id == id);

      this.bascketGoods.splice(goodIndex , 1);
    },

  },

  mounted() {
    this.makeGETRequest(`${API_URL}/catalogData.json`).
      then( goods => {
        this.goods = goods;
        this.filteredGoods = goods;
        console.log(JSON.stringify(goods));
        }).
      catch((e) => console.log(e))
  }

});

