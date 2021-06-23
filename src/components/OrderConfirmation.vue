<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="3" class="mt-15">
        <p class="text-h5">Order Confirmation</p>
        <p class="text-subtitle-2">Order #{{ this.$route.params.id }}</p>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col
        v-for="(order, index) in orderInformation"
        :key="index"
        cols="12"
        md="3"
      >
        <p class="text-h7 mb-10">
          <span class="text-subtitle-2">{{ order.customer.name }}</span
          >, thank you shopping with us. We have received your order, and is
          preparing it for shipment to your
          <span class="text-subtitle-2">{{ order.customer.address }}</span>
          address.
        </p>
        <v-card max-width="500" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ order.products[0].name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                $ {{ order.products[0].price }} -
                {{ order.products[0].modal }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar tile size="80" color="grey">
              <v-img :src="order.products[0].image"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sanity from "../sanity";

const query = `*[_type == "order" && _id == $id]{
  orderId,
  orderDate,
  total,
  customer,
  products
}`;

export default {
  name: "OrderConfirmation",
  data() {
    return {
      orderInformation: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      sanity
        .fetch(query, { id: this.$route.params.id })
        .then((order) => {
          this.orderInformation = order;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
</style>