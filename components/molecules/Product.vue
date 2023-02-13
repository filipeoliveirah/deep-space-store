<template>
    <v-container v-if="products" class="product">
        <h2 class="mb-2">{{ products.title }}</h2>
        <p>{{ products.description }}</p>
        <v-container class="product__price">
            <v-row>
                <v-col cols=auto v-if="products.sale">
                    <span class="product__price--label">De:</span>
                    <p class="product__price--default">{{ currency(products.price) }}</p>
                </v-col>
                <v-col cols=auto v-if="products.price">
                    <span class="product__price--label">Por:</span>
                    <p class="product__price--sale">{{ currency(products.sale) }}</p>
                </v-col>
            </v-row>
        </v-container>
        <img :src="products.image" :alt="products.title">
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { formatCurrency } from '@/utils/formatters.js'

export type DataType = {
  products: object;
  currency: Function;
};

export default Vue.extend({
  data(): DataType {
    return {
      products: {},
      currency: formatCurrency
    };
  },
  created() {
    this.getProducts()
  },
  methods: {
    ...mapGetters({
      getProductsOnSale: 'getProductsOnSale'
    }),

    async getProducts(): Promise<void> {
      const queryCode = this.$route.query?.code      
      try {
        const data = await this.$store.dispatch('fetchOffers', queryCode)

        if (data.length >= 1) {
            const storeProducts = this.$store.getters.getProductsOnSale        
            this.products = storeProducts
            this.$emit('error', false)
        } else {
            this.$emit('error', true)
            this.products = {};
        }
        
      } catch(error) {
        console.error('Erro ao obter ofertas', error)
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/product';
</style>