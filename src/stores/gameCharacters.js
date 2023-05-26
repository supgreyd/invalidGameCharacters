import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

const charactersUrl = "https://my.api.mockaroo.com/mpq-cards.json?key=a65ab360";

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref([]);
    const charactersLoading = ref(false);

    const fetchCharacters = async () => {
        charactersLoading.value = true;
        try {
            const response = await fetch(charactersUrl);
            const data = await response.json();
            characters.value = data;
        } catch (err) {
            console.log(err);
        } finally {
            charactersLoading.value = false;
        }
    };

    const validCharacters = computed(() => {
        return characters.value.filter(character => {
            const colors = character.powers.map(power => power.color);
            return !hasDuplicates(colors);
        });
    });

    return { fetchCharacters, validCharacters, charactersLoading };
});