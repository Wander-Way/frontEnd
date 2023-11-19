<script setup>
import { ref, computed } from "vue";
import { planStore } from "@/stores/counter";
import axios from "axios";

const store = planStore();
const selectedPlaces = store.selectedPlaces;

const location = ref(""); //나중에 enum이랑 통일해서 추가하자
const title = ref("");
const description = ref("");
const tags = ref([]);
const plan = ref([]);
const tagInput = ref("");

const addTag = () => {
  if (tagInput.value.trim() !== "") {
        tags.value.push(tagInput.value.trim());
        tagInput.value = "";
      }
}

const savePlan = async() => {
  const url = "http://localhost:8080/plan";
  const transformedPlan = transformToPlanFormat(selectedPlaces);
  console.log(transformedPlan);
  const data = {
    "location" : location.value,
    "title" : title.value,
    "description" : description.value,
    "tags" : tags.value,
    "plan" : transformedPlan,
  };
  const resp = await axios.post(url,data);

  console.log(resp.data);
}


const transformToPlanFormat = (selectedPlaces) => {
  const plan = selectedPlaces.map((day, index) => {
    const dayNumber = index + 1;
    const dayData = day.map((place) => {
      // 여기서 필요한 위치 데이터를 추출 또는 가공하여 반환
      return {
        id : place.id,
        name: place.name, //시설물명칭
        frontLat : place.frontLat, //시설물입구 위도
        frontLon : place.frontLon, //시설물입구 경도
        lat : place.lat,
        lon : place.lon,
        address : place.address,
        bldAddr : place.bldAddr,
        bldNo1 : place.bldNo1, //건물번호1
        bldNo2 : place.bldNo2 //건물번호2
      };
    });

    // dayNumber를 key로 하는 객체를 생성
    const dayObject = {};
    dayObject[dayNumber.toString()] = dayData;

    return dayObject;
  });

  return plan;
};


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
    <section><button @click="savePlan">saveBtn</button></section>
  </div>
</template>

<style scoped>
input {
  background-color: aliceblue;
}
</style>
