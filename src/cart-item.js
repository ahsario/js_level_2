const cartItem = Vue.component("cart-item", {
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

export const cartItem;
