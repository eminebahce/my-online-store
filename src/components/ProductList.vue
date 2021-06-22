<template>
  <div>
    <ProductListItem :products="allProducts" />
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem";
import { mapState } from "vuex";

export default {
  name: "ProductList",
  components: {
    ProductListItem,
  },
  computed: {
    ...mapState({
      allProducts: (state) => state.allProducts,
    }),
  },

  created() {
    this.$store.dispatch("getAllProducts");
  },
};
</script>

<style scoped>
</style>
