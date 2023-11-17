<template>
  <div>
    <!-- Your component content goes here -->
    <h1>핫플레이스</h1>
    <div>
      <select v-model="selectedOption">
        <!--v-model="selectedOption">-->
        <option value="서울">서울</option>
        <option>대전</option>
        <option>대구</option>
        <option>광주</option>
        <option>부산</option>
        <option>울산</option>
        <option>세종</option>
        <option>경기</option>
        <option>강원</option>
        <option>충북</option>
        <option>충남</option>
        <option>경북</option>
        <option>경남</option>
        <option>전북</option>
        <option>전남</option>
      </select>
      <span>Selected: {{ selectedOption }}</span>
      <button @click="handleButtonClick">Click me</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useStore();

const { selectedOption } = storeToRefs(store);

const handleButtonClick = () => {
  router.push({ name: "hotPlaceBoard" });
  console.log("Button clicked!");
};
</script>

<style scoped></style>
