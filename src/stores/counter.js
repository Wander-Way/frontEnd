import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const planStore = defineStore("planStore", () => {
  const selectedPlaces = ref([]);

  const addSelectedPlace = (place) => {
    // 현재 날짜의 배열이 없으면 새로운 배열을 생성
    if (!selectedPlaces.value.length || selectedPlaces.value[selectedPlaces.value.length - 1].length >= 5) {
      selectedPlaces.value.push([place]);
    } else {
      // 현재 날짜의 배열이 있고 최대 5개 미만이면 해당 배열에 추가
      selectedPlaces.value[selectedPlaces.value.length - 1].push(place);
    }
    console.log("pinia에서 selectedPlaces : ",selectedPlaces.value);
  };

  return { selectedPlaces, addSelectedPlace };
