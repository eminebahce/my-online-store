<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="4">
        <div class="text-h4 mb-10 mt-10">Customer Details</div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="saveData"
        >
          <v-text-field
            v-model="fullName"
            :rules="nameRules"
            label="Full Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="telephone"
            :rules="telephoneRules"
            label="Telephone Number"
            required
          ></v-text-field>

          <v-text-field
            v-model="address"
            :rules="addressRules"
            label="Address"
            required
          ></v-text-field>

          <v-btn
            class="mt-5 ml-5"
            color="deep-purple accent-4"
            small
            dark
            type="submit"
          >
            <v-icon class="px-2">mdi-basket</v-icon>
            Place Order
          </v-btn>

          <v-btn :to="{ path: '/' }" color="red" small dark class="ml-10 mt-5">
            <v-icon class="px-2">mdi-cancel</v-icon>
            Cancel
          </v-btn>
        </v-form>
      </v-col>

      <v-col md="6" class="pl-15 ml-15">
        <div class="text-h4 mb-10 mt-10">Product Details Overview</div>
        <v-card :loading="loading" class="pa-2" max-width="380" tile>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img height="250" :src="product.thumbUrl"></v-img>

          <v-card-title>{{
            this.$route.params.product.fmyMarketingName
          }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="parseFloat(product.ratings)"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                {{ parseFloat(product.ratings) }}
                ({{ product.reviewCount }})
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ {{ product.priceDisplay }} • {{ product.pviTypeName }},
              {{ product.pviSubtypeName }}
            </div>

            <div>
              {{ product.usp[0] }}, {{ product.usp[1] }},
              {{ product.usp[2] }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sanity from "../sanity";
import { v4 as uuidv4 } from "uuid";

const doc = {
  _type: "order",
  orderId: "",
  orderDate: "",
  total: 0,
  customer: {
    _type: "customer",
    name: "",
    address: "",
    phoneNumber: "",
  },
  products: [
    {
      _type: "product",
      _key: "",
      name: "",
      modal: "",
      price: 0,
      image: "",
    },
  ],
};

export default {
  name: "OrderOverview",

  data: () => ({
    valid: false,
    fullName: "",
    nameRules: [],
    telephone: "",
    telephoneRules: [],
    address: "",
    addressRules: [],
    product: null,
  }),

  created() {
    this.product = this.$route.params.product.modelList[0];
  },

  watch: {
    /* eslint-disable */
    fullName(val) {
      this.nameRules = [];
    },
    /* eslint-disable */
    telephone(val) {
      this.telephoneRules = [];
    },
    /* eslint-disable */
    address(val) {
      this.addressRules = [];
    },
  },

  methods: {
    checkPhone(phone) {
      return (
        !!phone && /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/.test(phone)
      );
    },
    saveData() {
      this.nameRules = [(v) => !!v || "Full name is required"];
      this.telephoneRules = [
        (v) => !!v || "Telephone number is required",
        (v) =>
          /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/.test(v) ||
          "Telephone number must be valid",
      ];
      this.addressRules = [(v) => !!v || "Address is required"];
      this.$refs.form.validate();

      if (
        this.fullName &&
        this.checkPhone(this.telephone) &&
        this.address !== ""
      ) {
        doc.customer.name = this.fullName;
        doc.customer.address = this.address;
        doc.customer.phoneNumber = this.telephone;
        doc.orderId = uuidv4();
        doc.orderDate = new Date();
        doc.products[0].name = this.$route.params.product.fmyMarketingName;
        doc.products[0].modal = `${this.product.pviTypeName}, ${this.product.pviSubtypeName}`;
        doc.products[0].price = parseFloat(this.product.priceDisplay);
        doc.products[0].image = this.product.thumbUrl;
        doc.products[0]._key = doc.orderId;

        sanity
          .create(doc)
          .then((res) => {
            this.$router.push({
              name: "OrderConfirmation",
              params: { id: res._id, orderId: doc.orderId },
            });
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style scoped>
</style>