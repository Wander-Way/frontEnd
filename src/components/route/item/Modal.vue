<script setup>
import { ref, watch, onMounted, defineProps } from "vue";
import { routeStore } from "@/stores/route";
import like from "./Like.vue";
const props = defineProps(["route_id"]);
const planId = ref(props.route_id);
const detailData = ref({});

// props의 변경을 감시하고 detailData를 업데이트
watch(
  () => props.route_id,
  (newId) => {
    console.log("watch실행", newId);
    planId.value = newId; // 또는 필요에 따라 복사하여 사용
  }
);

onMounted(() => {
  setRouteDetail();
});

const store = routeStore();
const setRouteDetail = async () => {
  console.log("요청준비 ", planId.value);
  detailData.value = await store.getRouteDetail(planId.value);
  console.log(detailData.value);
};
</script>

<template>
  <div class="modal" >
    <div class="modal-content">
      <div>
        <div class="route-info">
          <div class="bold">{{ detailData.title }} <span style="font-family: 'notosans-bold'; font-size: 20px;">@{{ detailData.nickName }}</span></div> 
          
          <hr>
          <div style="font-family: 'notosans-regular'; font-size: 20px;">{{ detailData.description }}</div>
          
          <div>
            <ul>
              <li v-for="data in detailData.tag" :key="data">#{{ data }}</li>
            </ul>
          </div>
          <div style="font-family: 'notosans-regular'; font-size: 20px;"><font-awesome-icon
              size="xs"
              :icon="['fas', 'location-dot']"
            /> {{ detailData.location }}<span> in </span>{{ detailData.period }}<span>Days</span></div>

          <div class="heart">          
            <like
            :like="detailData._like"
            :routeId="detailData.planId"
            @updateLike="updateLike"
          ></like></div>

        </div>

        <div class="travel-plan">
          <div v-for="(items, key) in detailData.plan" :key="key">
            <h3 class="bold2">📌 DAY {{ key }}</h3>
            <div class="card-container" >
            <div class="card" v-for="(item, index) in items" :key="item.tmapId">
              <font-awesome-icon :icon="['fas', (index+1).toString()]" style="color: #584ac4;" />
              <hr >
              <div style="font-family: 'notosans-bold'; font-size: 15px;"> {{ item.name }}</div>
              <div style="font-family: 'notosans-regular'; font-size: 13px;"> {{ item.detailAddress }}</div>
              <!-- Add more properties as needed -->
            </div></div>
          </div>
        </div>
      </div>
    </div>

    <button @click="$emit('close')">닫기</button>
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

.heart{
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
hr {
  margin-bottom: 5px;
}
ul{
  margin : 20px 0px;
}
li {
  margin : 0px;
  display: inline-block; 
  /* margin-right: 5px; */
  background-color: #b9aee6;
  color: white;
  padding: 5px 13px;
  /* margin-right: 5px; */
  border-radius: 5px;
  cursor: pointer;
  font-family: "notosans-bold";
  font-size : 13px;
}
.bold {
  font-family: "notosans-bold";
  font-size : 30px;
}
.bold2 {
  font-family: "Abhaya Libre";
  font-size : 27px;
  margin-top: 10px;
}
.card-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 0px 20px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap; /* 또는 주석 처리: flex-wrap: nowrap; */
  gap: 10px;
  /* justify-content: center; */
}

.card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  width: 150px;
  height: 120px;
  overflow: hidden;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 800px;
  max-height: 500px;
  overflow: auto;
  background-color: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}


button {
  margin-top: 10px;
}


.route-info {
  margin-bottom: 20px;
}

.route-info div {
  margin-bottom: 10px;
}

.route-info ul {
  list-style: none;
  padding: 0;
}

.route-info ul li {
  margin-left: 20px;
}

.travel-plan {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}

.travel-plan h3 {
  margin-bottom: 10px;
}

.plan-item {
  margin-bottom: 15px;
}

.plan-item div {
  margin-bottom: 5px;
}


::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 */
}

::-webkit-scrollbar-thumb {
  height: 10px; /* 스크롤바의 길이 */
  background: #6f74b4; /* 스크롤바의 색상 */
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(75, 76, 80, 0.1); /*스크롤바 뒷 배경 색상*/
}

</style>
