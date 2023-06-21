<script setup>
import { ref } from 'vue';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';

const character = ref("a");
character.value = null;
let count = ref(0);
let answer = [{value: null, discovered:false}];
let listCharacters =  [];
let lose = ref(false);
let win = ref(false);
const characterTried  = ref(false);

const props = defineProps({
  word: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  }
});

answer.pop();
props.word.split('').forEach(element => {
  answer.push({value: element, discovered:false})
});
count = ref(props.word.length + 3);

const sendCharacter = (()  => {
  let hasAtLeastOne = false;
  let discoveredAll = true;

  character.value = character.value.toLowerCase();

  if(listCharacters.find(element => element === character.value)){characterTried.value = true}

  else{
    characterTried.value = false;

    listCharacters.push(character.value);

    answer.forEach(element => {
      if (element.value === character.value)
      {
        element.discovered = true;
        hasAtLeastOne = true;
      }
      if (!element.discovered) {discoveredAll = false};
    })

    if (!hasAtLeastOne) {count.value--};
    if(!count.value) {lose = true};
    if(discoveredAll) {win = true};
    character.value = null;
  }

})

</script>

<template>
  <h1>Adivinhe!</h1>
  <h2>dica: {{ hint }}</h2>
  
  <h2>
      <span v-for="element in answer">
        <span v-if="element.discovered">{{ element.value }}</span>
        <span v-else>_ </span>
      </span>
  </h2>

  <div>
    <h1>Vidas restantes: {{ count }}</h1>
  
    <InputText autofocus type="text" v-model="character" placeholder="Character" maxlength="1" v-on:keyup.enter="sendCharacter" :disabled="win || lose" />
    <Button label="Envia" :disabled="win || lose || !character" v-on:click="sendCharacter" style="margin-left: 5px" />
  </div>
  
  <div>
    <span v-for="character in listCharacters">
      <span>{{ character }}, </span>
    </span>
  </div>
  <div> 
    <h2 v-if="win">Voce ganhou! 🥳</h2>
    <h2 v-if="lose">Voce perdeu!</h2>
    <h2 v-if="characterTried">Character repetido</h2>
  </div>

</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  text-align: center;
}

h2,
div {
  text-align: center;
}
</style>
