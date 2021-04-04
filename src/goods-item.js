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

export default goods - item;
