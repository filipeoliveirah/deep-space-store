<template>
  <div>
    <h2 class="mb-4">Finalize o seu pedido</h2>
    <div class="overline mb-4">Preencha o formulário corretamente</div>
    <v-stepper v-model="current">
      <v-stepper-header class="overflow-x-auto">
        <v-stepper-step 
            v-for="(step,n) in steps"
            :key="n"
            :complete="stepComplete(n+1)"
            :step="n+1"
            :rules="[value => !!step.valid]" 
            :color="stepStatus(n+1)">
            {{ step.name }}
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card color="dark-1" class="mb-12" >
              <v-card-text>
                <v-form :ref="'step1'" v-model="steps[0].valid" lazy-validation>
                  <v-text-field label="Nome completo" :rules="nameRules" required></v-text-field>
                  <v-text-field label="E-mail" :rules="emailRules"></v-text-field>
                  <v-text-field label="Telefone" ></v-text-field>
                  <span>* Campos obrigatórios</span>
                </v-form>
              </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            :disabled="!steps[0].valid"
            @click="validate(1)"
          >
            Próximo
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card color="dark-1" class="mb-12" >
              <v-card-text>
                <v-form :ref="'step2'" v-model="steps[1].valid" lazy-validation>
                  <v-text-field label="CEP*" :rules="nameRules" required v-model="cep" @input="fetchAddress()"></v-text-field>
                  
                  <div v-if="cep">
                    <v-text-field label="Rua" :rules="nameRules" v-model="address.street"></v-text-field>
                    
                    <v-row>
                      <v-col>
                        <v-text-field label="Bairro" :rules="districtRules" v-model="address.district" required></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field label="Número" :rules="numberAddressRules" v-model="address.number"></v-text-field>
                      </v-col>
                    </v-row> 

                    <v-row>
                      <v-col>
                        <v-text-field label="Cidade" :rules="nameRules" v-model="address.city" required></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field label="Estado" :rules="stateRules" v-model="address.state" required></v-text-field>  
                      </v-col>
                    </v-row>                  
                  </div>
                  <span>* Campos obrigatórios</span>
                </v-form>
              </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="validate(2)"
          >
            Próximo
          </v-btn>

          <v-btn text @click="current = 1">Voltar</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card color="dark-1" class="mb-12" >
              <v-card-text>
                <v-form :ref="'step3'" v-model="steps[2].valid" lazy-validation>
                  <v-text-field label="Insira seu CPF" v-model="cpf" :rules="cpfRules" required></v-text-field>
                  <v-select
                    v-bind="$attrs"
                    :items="paymentOptions"
                    label="Selecione"
                    class="mte-selected rounded-lg"
                    solo
                    outlined
                    required
                  />
                  <v-text-field label="Número do cartão" :rules="credidCardNumberRules" required></v-text-field>                  
                  <v-row>
                      <v-col>
                        <v-text-field label="Ano de vencimento" :rules="yearCardRules" required></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field label="Mês de vencimento" :rules="monthCardRules" required></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field label="CVC" :rules="cvcCardRules" required></v-text-field>
                      </v-col>
                  </v-row>

                  
                  <span>* Campos obrigatórios</span>
                </v-form>
              </v-card-text>
          </v-card>

          <v-btn
            color="primary"
            @click="fetchPayment()"
          >
            Finalizar
          </v-btn>

          <v-btn text @click="current = 2">Voltar</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  cpfValid,
  emailValid, 
  celphoneValid,
  nameValid,
  stateValid,
  districtValid,
  numberAddressValid,
  creditCardNumberValid,
  cvcCardValid,
  yearCardValid,
  monthCardValid
  }
from '@/utils/validate'

export type DataType = {
  current: number;
  address: object;
  cep: String,
};

export default Vue.extend({
  data: () => ({
      cep: '',
      cpf: '',
      current: 1,
      lastStep: 4,      
      valid: false,
      stepForm: [],
      address: {},
      cpfRules: cpfValid,
      emailRules: emailValid,
      celphoneRules: celphoneValid,
      nameRules: nameValid,
      districtRules: districtValid,
      stateRules: stateValid,
      numberAddressRules: numberAddressValid,
      credidCardNumberRules: creditCardNumberValid,
      cvcCardRules: cvcCardValid,
      yearCardRules: yearCardValid,
      monthCardRules: monthCardValid,
      paymentOptions: ['Cartão de crédito', 'Pix'],
      steps: [
        { 
          name: "Etapa 1", 
          description: "Dados pessoais", 
          rules: [(v: any) => !!v || 
          "Campo obrigatório."], 
          valid: false
        },
        {
          name: "Etapa 2",
          description: "Dados para entrega",
          rules: [(v: any)=> !!v || "Campo obrigatório."],
          valid: false
        },
        {
          name: "Pagamento",
          description: "Forma de pagamento",
          rules: [(v: string|any[]) => (v && v.length >= 4) || "Campo obrigatório."],
          valid: false
        }
      ],
    }),
    methods: {
      stepComplete(step: number) {
        return this.current > step
      },
      stepStatus(step: number) {
        return this.current > step ? 'green' : 'blue'
      },
      validate(n: number) {
        // @ts-ignore        
        let v = this.$refs['step'+n].validate()
        if (v) {
          this.steps[n].valid = true
          // continue to next
          this.current = n+1
        }
      },
      done() {
        this.current = 5
      },
      async fetchAddress(): Promise<void> {   
        try {
          const data = await this.$store.dispatch('fetchAddress', this.cep)

          if (data.length >= 1) {
            const storeProducts = this.$store.getters.getAddress
            this.address = storeProducts
            this.$emit('error', false)
          } else {
            this.$emit('error', true)
            this.address = {};
          }
          
        } catch(error) {
          console.error('Erro ao obter ofertas', error)
        }
      },
      async fetchPayment(): Promise<void> {        
        try {
          const queryCode = this.$route.query?.code
          const payload = {
            cpf: this.cpf,
            queryCode: queryCode
          }
          const data = await this.$store.dispatch('fetchPayment', payload)
          console.warn(data);

          if (data.length >= 1) {
            const storeProducts = this.$store.getters.getAddress
            this.address = storeProducts
            this.$emit('error', false)
          } else {
            this.$emit('error', true)
            this.address = {};
          }
          
        } catch(error) {
          console.error('Erro ao obter ofertas', error)
        }
      }
    },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/multi-step-form';
</style>
