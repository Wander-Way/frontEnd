<script setup>
import { ref, computed } from "vue";
import { planStore } from "@/stores/counter";
const ps = planStore();

const selectedPlaces = computed(() => {
  console.log("store 변경 확인 ", ps.selectedPlaces);
  return ps.selectedPlaces;
});
</script>

<template>
  <div>여행지를 드래그앤 드랍1하기</div>
  <section>
    <div class="day1">
      <ul>
        <li v-for="place in selectedPlaces">
          {{ place.name }}
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
