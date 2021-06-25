<template>
  <v-container>
    <v-row>
      <div class="loading" v-if="allProducts.length == 0">Loading...</div>
    </v-row>
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
.loading {
  margin: 0 auto;
  margin-top: 20px;
}
</style>
