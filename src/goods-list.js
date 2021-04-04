import goods-item from './goods-item'

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

export default goods-list