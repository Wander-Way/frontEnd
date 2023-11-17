import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const planStore = defineStore("planStore", () => {
  const selectedPlaces = ref([]);
  const addSelectedPlace = (place) => {
    console.log(place, "를 넣어요");
    selectedPlaces.value.push(place);
    console.log("넣어졌니??", selectedPlaces.value);
    //return selectedPlaces.value;
  };

  return { selectedPlaces, addSelectedPlace };
});
