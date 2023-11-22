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
      <h1>FindAnotherRoute</h1>
      <hr />
      <pre>
다른사람들의 루트를 참고하여 경로에 추가해보세요.
[여행루트] 게시판에 방문하면 더 세부적인 검색이 가능합니다.
      </pre>
  </div>


    <section class="container">
        <section class="map-section">
          <input placeholder="여행할 지역을 입력하세요" v-model="keyword" />
          <button @click="findPlan">지역검색</button>
          <Map></Map>
        </section>

        <div v-for="plan in plans" class="card">
          <div>제목 : {{ plan.title }}</div>
          <div>한줄소개 : {{ plan.description }}</div>
          <div>닉네임 : @{{ plan.nickname }}</div>
          <div>프로필사진 : {{ plan.profile }}</div>
          <button @click="clickBtn(plan)">[+]</button>
        </div>

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

@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("../../../public/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("../../../public/font/NotoSansKR-Regular.ttf");
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
</style>
