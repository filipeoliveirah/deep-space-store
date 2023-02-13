<template>
  <v-toolbar light max-height="80" background="https://wallpaperset.com/w/full/0/8/2/30116.jpg">
    <v-container>
      <v-row class="align-center">
        <img src="@/assets/images/deep-space-store-logo.png" alt="Deep Space Store">        
        <v-spacer></v-spacer>
        <v-toolbar-title v-if="user.name">
            Olá, {{ user.name }}
        </v-toolbar-title>
        <v-btn icon>
          <!-- <v-icon @click.prevent="resetProducts">mdi-export</v-icon> -->
        </v-btn>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
export type DataType = {
  user: object;
};

export default Vue.extend({
  data(): DataType {
    return {
      user: {}
    };
  },
  mounted() {
    this.getUser()
  },
  methods: {
    ...mapActions({
      fetchUser: 'fetchUser' 
    }),
    ...mapGetters({
      getUser: 'getUser'
    }),

    getUser(): void {      
      this.fetchUser().then(() => {
        const storeUser = this.$store.getters.getUser
        this.user = storeUser;
      })
      .catch((err) => {
        console.error('Erro ao baixar o arquivo', err)
        this.user = {};
      })
    },

    resetProducts() {
      this.$store.dispatch('fetchOffers', {})
      this.$store.commit('SET_USERS', [])
    }
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/header';
</style>
  