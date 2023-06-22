<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import TheGame from '../components/theGame.vue'
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import axios from "axios"
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue'


// const word = ref({word: null, hint: null})
const value = ref(null);
const info = ref({dataIni: null, dataFin: null, placa: null, id: 37})
const createQRCode = (()  => {
    // axios.post("http://localhost:10000/add", {word: word.value.word.toLowerCase(), hint: word.value.hint}, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
    //     .then((res) => words.value.push(res.data));
    value.value = "inicio: " + info.value.dataIni + ",fim: " + info.value.dataFin + ",placa: " + info.value.placa + ",id: " + info.value.id;
})

// axios.get("http://localhost:10000/palavra").then((res) => word.value = res.data)

</script>

<template>
  <header>
    <div class="wrapper">
      <Calendar class="InputText" dateFormat="dd/mm/yy" autofocus type="text" v-model="info.dataIni" placeholder="Inicio" showTime hourFormat="24" showIcon v-on:keyup.enter="createQRCode" />
      <Calendar type="text" dateFormat="dd/mm/yy" v-model="info.dataFin" placeholder="Fim" showTime hourFormat="24" showIcon v-on:keyup.enter="createQRCode" />
      <InputText class="InputText" type="text" v-model="info.placa" placeholder="Placa" minlength="1" v-on:keyup.enter="createQRCode" />
      <Button label="Envia" v-on:click="createQRCode" />
    </div>
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
