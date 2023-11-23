<script setup>
import Map from "./item/map.vue";
import EditPlan from "./item/EditPlan.vue";
import { planStore } from "@/stores/plan";
import { ref, computed } from "vue";
import EventBus from "@/util/EventBus";
import Buttons from "./item/Buttons.vue";

const plans = ref([]);
const keyword = ref("");
const store = planStore();
const page = ref(1);

const findPlan = async () => {
  plans.value = await store.findPlan(keyword.value, page.value);
  console.log("plans.value : ", plans.value);
};

const clickBtn = (plan) => {
  console.log("클릭한 여행 정보 : ", plan.plan);
  EventBus.emit("setMapByAnotherRoute", plan.plan);
};
</script>

<template>
  <div id="box">
    <div class="head">
      <h1>Find Another Route</h1>
      <hr />
      <pre>
다른사람들의 루트를 참고하여 경로에 추가해보세요.
[여행루트] 게시판에 방문하면 더 세부적인 검색이 가능합니다.
      </pre>
    </div>

    <section class="container">
      <section class="map-section">
        <Map inputContainer="none"></Map>
        <!-- <button>최적경로</button> -->
        <div class="input-container2">
          <font-awesome-icon
            :icon="['fas', 'magnifying-glass']"
            class="search-icon"
          />
          <input
            type="text"
            class="text_custom"
            v-model="keyword"
            placeholder="검색어를 입력해주세요"
          />
          <button id="btn_select" @click="findPlan">search</button>
        </div>

        <div v-if="plans.length > 0" class="card-container">
          <p>검색결과 3건</p>
          <div v-for="plan in plans" class="card">
            <img
              :src="plan.profile ? plan.profile : '/img/profile.png'"
              alt="프로필사진"
            />
            <div class="card-content">
              <h3>{{ plan.title }}</h3>
              <p>
                {{ plan.description }} &nbsp;<span>@{{ plan.nickname }}</span>
              </p>
            </div>
            <button @click="clickBtn(plan)">
              <font-awesome-icon
                :icon="['fas', 'circle-plus']"
                size="xl"
                style="color: #4e39a2"
              />
            </button>
          </div>
        </div>
      </section>

      <section class="editplan-section">
        <EditPlan></EditPlan>
      </section>
    </section>

    <div class="buttons">
      <Buttons></Buttons>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("/font/NotoSansKR-Regular.ttf");
}

@font-face {
  font-family: "notosans-thin";
  src: url("/font/NotoSansKR-Thin.ttf");
}

.input-container2 {
  width: 100%;
  position: relative;
  display: inline-block;
  margin: 10px 10px 10px 0px;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 10px;
}

.search-icon {
  position: absolute;
  left: 75px; /* 아이콘의 왼쪽 여백 조절 */
  top: 50%;
  transform: translateY(-50%);
  color: #888; /* 아이콘 색상 설정 */
}
.text_custom {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  padding-left: 40px; /* 아이콘의 너비에 따라 왼쪽 여백 조절 */
  margin-left: 50px;
  background-color: #fff;
  border-radius: 50px;
  font-family: "notosans-regular";
}

#btn_select {
  width: 15%;
  padding: 10px 10px 10px 10px;
  background-color: #6f74b4;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Abhaya Libre", serif;
  transition: background-color 0.3s ease;
}

#btn_select:hover {
  background-color: #b5afff;
}

#box {
  /* border: 1px solid pink; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0% 10%;
}
.head {
  width: 100%;
  display: flex;
  flex-direction: column;
}
h1 {
  /* 상우하좌 */
  font-family: "Abhaya Libre", serif;
  font-size: 50px;
  font-weight: 800;
  padding: 50px 0px 0px 0px;
  margin: 0px 0px;
}
pre {
  overflow: hidden;
  margin-top: 10px;
  font-family: notosans-bold;
  margin-top: 23px;
  line-height: 1.5; /* 행간을 1.5로 설정, 필요에 따라 조절 */
}

hr {
  width: 60%; /* 원하는 길이로 설정 (예: 50%) */
  /* margin: 0px 40px; 가운데 정렬 및 위아래 여백 설정 (선택사항) */
}

p,
h3,
span {
  padding: 0%;
  margin: 0%;
}

section {
  /* border: 1px solid black; */
}
.container {
  /* border: 1px solid rgb(182, 66, 66); */
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.map-section {
  width: 65%;
}

.editplan-section {
  width: 25%;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.card-container {
  padding: 30px;
  border-radius: 8px;
  width: 100%;
  height: auto;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-container > p {
  font-family: "notosans-bold";
  font-size: 13px;
}
.card {
  padding: 20px 20px;
  border-radius: 15px;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  display: flex;
  gap: 25px;
  align-items: center;
  position: relative;
}
.card-container img {
  width: 50px;
  height: 50px;
}

.card-content > h3 {
  font-family: "notosans-bold";
}

.card-content > p {
  font-family: "notosans-regular";
  margin-top: 4px;
}

.card > button {
  position: absolute;
  right: 25px;
}
</style>
