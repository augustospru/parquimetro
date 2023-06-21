<script setup>
import axios from "axios"
import { ref } from 'vue';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Listbox from 'primevue/listbox';

const words = ref([{id: null, word: null, hint: null}]);
const word = ref({word: null, hint: null});

axios.get("http://localhost:10000/lista").then((res) => words.value = res.data);

const createRecord = (()  => {
    axios.post("http://localhost:10000/add", {word: word.value.word.toLowerCase(), hint: word.value.hint}, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then((res) => words.value.push(res.data));
    word.value = {word: null, hint: null}
})
const deleteRecord = ((element)  => {
    axios.post("http://localhost:10000/remove", {id: element._id}, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        .then(() => axios.get("http://localhost:10000/lista").then((res) => words.value = res.data));
})

</script>

<template>
    <header>
    <div>
        <h1 class="green" >Adicionar palavra</h1>
  
        <InputText autofocus type="text" v-model="word.word" placeholder="Palavra" minlength="1" v-on:keyup.enter="createRecord" />
        <InputText class="InputText" type="text" v-model="word.hint" placeholder="Dica" minlength="1" v-on:keyup.enter="createRecord" />
        <Button label="Envia" v-on:click="createRecord" />
    </div>
    </header>
  
  <main>
    <div> 
        <h1>Lista de palavras</h1>

        <ul>
            <li v-for="element in words" :key="element._id" style="margin: 5px;">
                <h2>{{ element.word }} // {{ element.hint }}<Button label="delete" v-on:click="deleteRecord(element)" style="margin-left: 5px;"/></h2>
                
            </li>
        </ul>
    </div>
  </main>
</template>

<style scoped>
.InputText {
    margin-left: 5px;
    margin-right: 5px;
}

div {
  text-align: center;
}

ul {
    list-style-type: none;
}

</style>