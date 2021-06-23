<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <div class="text-h4 mb-10 mt-10">Customer Details</div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="placeOrder"
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
            class="mt-4"
            color="deep-purple accent-4"
            small
            dark
            @click="placeOrder"
            type="submit"
            :disabled="!valid"
          >
            Place Order
          </v-btn>
        </v-form>
      </v-col>

      <v-spacer></v-spacer>

      <v-col md="6" class="pl-15">
        <div class="text-h4 mb-10 mt-10">Product Details Overview</div>
        <v-card :loading="loading" class="pa-2" max-width="380" tile>
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            height="250"
            :src="this.$route.params.product.modelList[0].thumbUrl"
          ></v-img>

          <v-card-title>{{
            this.$route.params.product.fmyMarketingName
          }}</v-card-title>

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="this.$route.params.product.modelList[0].ratings"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">
                {{
                  parseFloat(this.$route.params.product.modelList[0].ratings)
                }}
                ({{ this.$route.params.product.modelList[0].reviewCount }})
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ {{ this.$route.params.product.modelList[0].priceDisplay }} •
              {{ this.$route.params.product.modelList[0].pviTypeName }},
              {{ this.$route.params.product.modelList[0].pviSubtypeName }}
            </div>

            <div>
              {{ this.$route.params.product.modelList[0].usp[0] }},
              {{ this.$route.params.product.modelList[0].usp[1] }},
              {{ this.$route.params.product.modelList[0].usp[2] }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "OrderOverview",

  data: () => ({
    valid: false,
    fullName: "",
    nameRules: [(v) => !!v || "Full name is required"],
    telephone: "",
    telephoneRules: [
      (v) => !!v || "Telephone number is required",
      (v) =>
        /^\(?([+]31|0031|0)-?6(\s?|-)([0-9]\s{0,3}){8}$/.test(v) ||
        "Telephone number must be valid",
    ],
    address: "",
    addressRules: [(v) => !!v || "Address is required"],
  }),

  methods: {
    placeOrder() {
      //dispatch action and save the info to the db
      //this.$refs.form.placeOrder();
      this.$router.push("OrderConfirmation");
    },
  },
};
</script>

<style scoped>
</style>