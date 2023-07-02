<script setup>
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import axios from "axios"
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue'


const value = ref(null);
const valor = ref(null);
const info = ref({dataIni: null, dataFin: null, placa: "", id: 37})
const createQRCode = (()  => {
    axios.post("http://localhost:8000/add", {dataIni: String(info.value.dataIni).replace('-', '/'), dataFin: String(info.value.dataFin).replace('-', '/'), placa: String(info.value.placa)}, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then((res) => {
          info.value.id = res.data._id; 
          value.value = JSON.stringify({inicio: String(info.value.dataIni), fim: String(info.value.dataFin), placa: String(info.value.placa), id: String(info.value.id)});
          valor.value = Math.abs(info.value.dataFin - info.value.dataIni) / 36e5;
        });
    
})
const changeValor = (() => {
  if(info.value.dataIni && info.value.dataFin) valor.value = Math.abs(info.value.dataFin - info.value.dataIni) / 36e5;
})

</script>

<template>
  <header>
    <img alt="Parquimetro" class="logo" src="../assets/parquimetro-image.png" width="125" height="125" />
    <h1>Monte seu horário!</h1>
    <div class="wrapper">
      <Calendar class="InputText" dateFormat="dd/mm/yy" autofocus type="text" v-model="info.dataIni" placeholder="Inicio" showTime hourFormat="24" showIcon v-on:date-select="changeValor" v-on:keyup.enter="createQRCode" />
      <Calendar type="text" dateFormat="dd/mm/yy" v-model="info.dataFin" placeholder="Fim" showTime hourFormat="24" showIcon v-on:date-select="changeValor" v-on:keyup.enter="createQRCode" />
      <InputText class="InputText" type="text" v-model="info.placa" placeholder="Placa" minlength="1" v-on:keyup.enter="createQRCode" />
      <Button label="Envia" v-on:click="createQRCode" />
    </div>
    <h2 v-if="valor"> Horas: {{ valor }}, Valor total: R${{ valor * 1.5 }}</h2>
  </header>
  
  <main>

    <qrcode-vue v-if="value" :value="value" :margin="1" :size="300"/>
  </main>
</template>

<style scoped>
.InputText {
    margin-left: 5px;
    margin-right: 5px;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    flex-direction: column;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    min-width: max-content;
    flex-wrap: wrap;
  }
}
</style>
