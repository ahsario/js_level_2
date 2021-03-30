const API_URL = "http://localhost:3003/";

Vue.component("goods-item", {
  template: `
    <div :data-id="id" class="goods-item">
      <h3>{{ title }}</h3>
      <div class="good-item-img"></div>
      <p>{{ price }}</p>
      <button @click="addToCart">Купить</button>
    </div>`,
  props: ["title", "price", "id"],
  methods: {
    addToCart() {
      this.$emit("addToCart", this.id);
    },
  },
});

Vue.component("goods-list", {
  template: `
    <div class="goods-list">
      <goods-item
        v-for="good in goods"
        :title="good.title"
        :price="good.price"
        :id="good.id"
        @addToCart="addToCartHandler"
      />
    </div>
  `,
  props: {
    goods: [],
  },
  methods: {
    addToCartHandler(id) {
      this.$emit("addToCart", id);
    },
  },
});

Vue.component("cart-item", {
  template: `
    <tr data-id="id">
      <td>{{ title }}</td>
      <td>{{ price }}</td>
      <td>{{ quantity }}</td>
      <td>{{ totalPrice }}</td>
      <td class="actionButtonsHolder">
        <button @click="increaseHandler">+</button>
        <button @click="decreaseHandler">-</button>
        <button @click="removeHandler">X</button>
      </td>
    </tr>`,

  props: ["title", "price", "id", "quantity"],

  computed: {
    totalPrice() {
      return this.price * this.quantity;
    },
  },

  methods: {
    increaseHandler() {
      this.$emit("increaseQuantity", this.id);
    },

    decreaseHandler() {
      this.$emit("decreaseQuantity", this.id);
    },

    removeHandler() {
      this.$emit("remove", this.id);
    },
  },
});

Vue.component("cart", {
  template: `
    <div class="bascket-list">
      <button @click="openCartHandler" type="button">Корзина ({{totalCount}}|{{totalPrice}}р)</button>
      <div class="cartPopup" v-if="isVisibleCart">
        <div class="emptyCartDisclaimer" v-if="!cartItems.length">Корзина пуста</div>
        <table v-if="cartItems.length" class="cartItemsTable">
          <tr class="cartTableHeader">
            <td>Название</td>
            <td>Количество</td>
            <td>Цена</td>
            <td>Сумма</td>
            <td></td>
          </tr>
          <cart-item
            v-for="good in cartItems"
            :title="good.title"
            :price="good.price"
            :id="good.id"
            :quantity="good.quantity"
            @remove="removeHandler"
            @decreaseQuantity="decreaseHandler"
            @increaseQuantity="increaseHandler"
          />
        </table>
      </div>
    </div>`,

  props: {
    cartItems: [],
  },

  data() {
    return {
      isVisibleCart: false,
    };
  },

  computed: {
    totalCount() {
      return this.cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
    },

    totalPrice() {
      return this.cartItems.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0
      );
    },
  },

  methods: {
    openCartHandler() {
      this.isVisibleCart = !this.isVisibleCart;
    },

    increaseHandler(id) {
      this.$emit("increaseQuantity", id);
    },

    decreaseHandler(id) {
      this.$emit("decreaseQuantity", id);
    },

    removeHandler(id) {
      this.$emit("remove", id);
    },
  },
});

Vue.component("search", {
  template: `<input id="search" @input="searchHandler" placeholder="Поиск..." />`,

  methods: {
    searchHandler(e) {
      this.$emit("valueChange", e);
    },
  },
});

Vue.component("loader", {
  template: `
    <div>
      <div v-if="isLoading">Загрузка</div>
      <div v-if="!isLoading && !isSuccessFetch">Упс, что-то не так. Уже чиним</div>
    </div>
`,

  props: {
    isLoading: false,
    isSuccessFetch: false,
  },
});

const vue = new Vue({
  el: "#app",
  template: `
    <div>
      <header class="header">
          <search @valueChange="searchHandler" />
          <cart
            :cartItems="cart" 
            @remove="removeFromCartHandler"
            @increaseQuantity="increaseQuantityInCartHandler"
            @decreaseQuantity="decreaseQuantityInCartHandler"
          />
      </header>
      <main>
        <loader :isLoading='isLoading' :isSuccessFetch='isSuccessFetch'/>
        <goods-list v-if="isSuccessFetch" :goods="filtredGoods" @addToCart="addToCartHandler"/>
      </main>
    </div>
  `,
  data: {
    cart: [],
    goods: [],
    filtredGoods: [],
    search: "",
    isLoading: true,
    isSuccessFetch: false,
  },
  methods: {
    updateCart() {
      fetch(`${API_URL}cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.cart),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.cart = data;
        });
    },

    addToCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good) {
        good.quantity++;
      } else {
        const initialGood = this.goods.find((item) => item.id == id);
        this.cart.push({ ...initialGood, quantity: 1 });
      }

      this.updateCart();
    },

    increaseQuantityInCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good) good.quantity++;

      this.updateCart();
    },

    decreaseQuantityInCartHandler(id) {
      const good = this.cart.find((item) => item.id == id);

      if (good && good.quantity >= 1) good.quantity--;

      if (good && good.quantity <= 0) {
        this.removeFromCartHandler(id);
      }

      this.updateCart();
    },

    removeFromCartHandler(id) {
      const goodIndex = this.cart.findIndex((item) => item.id == id);

      this.cart.splice(goodIndex, 1);

      this.updateCart();
    },

    searchHandler(e) {
      const {
        target: { value },
      } = e;
      if (value === "") {
        this.filtredGoods = this.goods;
      }
      const regexp = new RegExp(value, "gi");
      this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    fetchPromise() {
      return fetch(`${API_URL}data`)
        .then((response) => {
          this.isLoading = false;
          this.isSuccessFetch = true;
          return response.json();
        })
        .catch((err) => {
          this.isLoading = false;
          this.isSuccessFetch = false;
          console.error("что-то пошло не так");
        });
    },
  },
  mounted() {
    this.fetchPromise()
      .then((data) => {
        this.goods = data;
        this.filtredGoods = data;
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${API_URL}cart`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.cart = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const addGood = (prod = { title: "new", price: 1234 }) => {
  fetch(`${API_URL}data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: prod.title,
      price: prod.price,
    }),
  });
};