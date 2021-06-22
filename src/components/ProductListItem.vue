<template>
  <v-card :loading="loading" class="pa-2" max-width="380" tile>
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="250" :src="product.modelList[0].thumbUrl"></v-img>

    <v-card-title>{{ product.fmyMarketingName }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="product.modelList[0].ratings"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{ parseFloat(product.modelList[0].ratings) }} ({{
            product.modelList[0].reviewCount
          }})
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ {{ product.modelList[0].priceDisplay }} •
        {{ product.modelList[0].pviTypeName }},
        {{ product.modelList[0].pviSubtypeName }}
      </div>

      <div>
        {{ product.modelList[0].usp[0] }}, {{ product.modelList[0].usp[1] }},
        {{ product.modelList[0].usp[2] }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-row align="center" justify="space-around">
        <v-btn
          color="deep-purple accent-4"
          small
          dark
          class="mb-4 mt-4"
          @click="addToCart(product)"
        >
          Add to cart
          <v-icon right>mdi-basket</v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductListItem",
  props: ["product"],

  methods: {
    addToCart(product) {
      this.$router.push({
        name: "OrderOverview",
        params: { product: product },
      });
    },
  },
};
</script>

<style scoped>
</style>