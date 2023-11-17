import { ref, computed } from "vue";
import { defineStore } from "pinia";

<<<<<<< HEAD
export const planStore = defineStore("planStore", () => {
  const selectedPlaces = ref([]);
  const addSelectedPlace = (place) => {
    console.log(place, "를 넣어요");
    selectedPlaces.value.push(place);
    console.log("넣어졌니??", selectedPlaces.value);
    //return selectedPlaces.value;
  };

  return { selectedPlaces, addSelectedPlace };
=======
export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
>>>>>>> d771188718b0c89a9754cc0bfbdb949a2e517297
});
