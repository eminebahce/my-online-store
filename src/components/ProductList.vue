<template>
  <v-container>
    <v-row>
      <v-col
        v-for="product in allProducts"
        :key="product.familyId"
        cols="12"
        md="3"
      >
        <ProductListItem :product="product" />
      </v-col>
    </v-row>
  </v-container>
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
