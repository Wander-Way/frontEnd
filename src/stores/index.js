// src/store/index.js
import { defineStore } from "pinia";
import { ref } from "vue";
export const useStore = defineStore("main", () => {
  const selectedOption = ref("");

  const setSelectedOption = (option) => {
    selectedOption.value = option;
  };

  return {
    selectedOption,
    setSelectedOption,
  };
});
