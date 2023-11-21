<script setup>
import Map from "./item/map.vue";
import EditPlan from "./item/EditPlan.vue";
import { planStore } from "@/stores/plan";
import { ref, computed } from "vue";
import EventBus from "@/util/EventBus";

const plans = ref([]);
const keyword = ref("");
const store = planStore();
const page = ref(1);

const findPlan = async () => {
  console.log("array 반환? ", store.findPlan(keyword.value, page.value));
  plans.value = await store.findPlan(keyword.value, page.value);
  console.log("plans.value : ", plans.value);
};

const clickBtn = (plan) => {
  console.log("클릭한 여행 정보 : ", plan.plan);
  EventBus.emit("setMapByAnotherRoute", plan.plan);
};
</script>

<template>
  <div>
    <h3>FindAnotherRoute</h3>
    <pre>
  다른사람들의 루트를 참고하여 경로에 추가해보세요.
  [여행루트] 게시판에 방문하면 더 세부적인 검색이 가능합니다.
    </pre>
    <section>
      <input placeholder="여행할 지역을 입력하세요" v-model="keyword" />
      <button @click="findPlan">지역검색</button>
      <Map></Map>
      <div>다른사람들의 여행 카드들 두는자리</div>
      <div v-for="plan in plans" class="card">
        <div>제목 : {{ plan.title }}</div>
        <div>한줄소개 : {{ plan.description }}</div>
        <div>닉네임 : @{{ plan.nickname }}</div>
        <div>프로필사진 : {{ plan.profile }}</div>
        <button @click="clickBtn(plan)">[+]</button>
      </div>
    </section>

    <section>
      <EditPlan></EditPlan>
    </section>

    <Buttons></Buttons>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 300px; /* 카드의 너비 조절 */
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 5px; /* 이미지에 둥근 테두리 적용 */
  margin-bottom: 10px;
}

.card div {
  margin-bottom: 5px;
}
</style>
