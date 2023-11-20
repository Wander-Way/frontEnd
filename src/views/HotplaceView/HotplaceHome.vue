<script setup>
import { useBoardStore } from "../../stores/board";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useBoardStore();

const { selectedOption } = storeToRefs(store);

const handleButtonClick = () => {
  console.log("Button clicked!");
  router.push({ name: "hotplaceBoardList" });
  return;
};
</script>

<template>
  <div>
    <h1>핫플레이스 홈</h1>
    <div>
      <select v-model="selectedOption">
        <option value="서울특별시">서울특별시</option>
        <option>대전광역시</option>
        <option>대구광역시</option>
        <option>광주광역시</option>
        <option>부산광역시</option>
        <option>울산광역시</option>
        <option>세종특별자치시</option>
        <option>경기도</option>
        <option>강원특별자치도</option>
        <option>충청북도</option>
        <option>충청남도</option>
        <option>경상북도</option>
        <option>경상남도</option>
        <option>전라북도</option>
        <option>전라남도</option>
        <option>제주특별자치도</option>
      </select>
      <span>Selected: {{ selectedOption }}</span>
      <button @click="handleButtonClick">Click me</button>
    </div>
  </div>
</template>

<style scoped></style>
