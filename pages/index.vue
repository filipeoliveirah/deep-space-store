<template class="index">
  <v-container class="mt-12">
    <v-row v-if="err === false">
      <v-col cols="6">
        <Product @error="checkError($event)"/>
      </v-col>
      <v-col cols="6">
        <MultiStepForm />
      </v-col>      
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <p>Não encontramos produtos em promoção</p>
      </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export type DataType = {
  err: boolean;
};

export default Vue.extend({
  data(): DataType {
    return {
      err: false
    };
  },
  methods:{
    checkError(value: boolean) {
      console.warn(value);
      this.err = value
    }
  }
})
</script></>

<style lang="scss" scoped>
@import '@/assets/scss/index';
</style>
