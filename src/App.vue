<script>
import { useCharactersStore } from "@/stores/gameCharacters";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const store = useCharactersStore();

    const { validCharacters, charactersLoading } = storeToRefs(store);
    const { fetchCharacters } = store;

    onMounted( () => {
      fetchCharacters();
    });

    return {
      validCharacters,
      charactersLoading,
    }

  }
}

</script>

<template>
  <div>
    <div v-if="charactersLoading">Loading...</div>
    <div v-else-if="!validCharacters.length">Characters not found</div>
    <ul v-else>
      <li
          v-for="character in validCharacters"
          :key="character.id"
      >
        <span>{{ character.title.main }}</span>
        <div v-if="character.powers">
          <p v-for="(power, index) in character.powers" :key="index">
            {{ power.color }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

