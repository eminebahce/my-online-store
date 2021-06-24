<template>
  <v-container>
    <v-sheet
      class="mt-10 mx-auto"
      color="white"
      elevation="9"
      height="600"
      width="1000"
    >
      <v-row class="justify-center">
        <v-col cols="12" md="6" class="mt-15">
          <p class="text-h5">
            Order Confirmation
            <v-icon large color="teal darken-3">
              mdi-truck-check-outline
            </v-icon>
          </p>
          <p class="text-subtitle-2">
            Order number #{{ this.$route.params.orderId }}
          </p>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col
          v-for="(order, index) in orderInformation"
          :key="index"
          cols="12"
          md="6"
        >
          <p class="text-h7 mb-10">
            <span class="text-subtitle-2">{{ order.customer.name }}</span
            >, thank you for shopping with us. We have received your order at
            <span class="text-subtitle-2">{{
              formateDateTime(order.orderDate)
            }}</span
            >, and it has been prepared for the shipment to your address:
            <span class="text-subtitle-2">{{ order.customer.address }}</span
            >.
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
          <v-btn
            :to="{ path: '/' }"
            color="deep-purple accent-4"
            medium
            dark
            class="mt-10"
          >
            <v-icon>mdi-home</v-icon>
            Products
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import sanity from "../sanity";
import moment from "moment";

const query = `*[_type == "order" && _id == $id]{
  orderId,
  orderDate,
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
    formateDateTime(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
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