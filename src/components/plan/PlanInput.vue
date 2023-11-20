<script setup>
import { ref, computed } from "vue";
import { planStore } from "@/stores/plan";


const location = ref(""); //나중에 enum이랑 통일해서 추가하자
const title = ref("");
const description = ref("");
const tags = ref([]);
const tagInput = ref("");

const addTag = () => {
  if (tagInput.value.trim() !== "") {
        tags.value.push(tagInput.value.trim());
        tagInput.value = "";
      }
}


const store = planStore();
const handleSavePlan = () => store.savePlan(location,title,description,tags);

const locations = ["서울","대전","대구","부산","제주","인천","광주","경기","충북","충남","전북","전남","경상"];
</script>

<template>
  <div>
    <pre>
        <label for="location">Location:</label>
        <input type="text" v-model="location">

        <label for="title">Title:</label>
        <input type="text" v-model="title">

        <label for="description">한줄 소개:</label>
        <input type="text" v-model="description">

        <label for="tagInput">Tag:</label>
        <input type="text" v-model="tagInput" placeholder="Enter클릭시 태그가 추가됩니다" @keyup.enter="addTag">
        <ul class="tags">
          <li v-for="tag in tags" :key="tag">{{ tag }}</li>
        </ul>


    </pre>
    <section><button @click="handleSavePlan">saveBtn</button></section>
  </div>
</template>

<style scoped>
input {
  background-color: aliceblue;
}
</style>
