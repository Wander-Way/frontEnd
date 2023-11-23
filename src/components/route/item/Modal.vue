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
  <div class="modal">
    <div class="modal-content">
      <div>
        <h3>여행루트의 상세정보를 조회하자!</h3>
        <div class="route-info">
          <div><strong>여행 ID:</strong> {{ detailData.planId }}</div>
          <div><strong>닉네임:</strong> {{ detailData.nickName }}</div>
          <div><strong>장소:</strong> {{ detailData.location }}</div>
          <div><strong>기간:</strong> {{ detailData.period }}</div>
          <div><strong>설명:</strong> {{ detailData.description }}</div>
          <div>
            <strong>태그:</strong>
            <ul>
              <li v-for="data in detailData.tag" :key="data">{{ data }}</li>
            </ul>
          </div>
          <div><strong>좋아요:</strong> {{ detailData.like }}</div>
          <like
            :like="detailData.like"
            :routeId="detailData.planId"
            @updateLike="updateLike"
          ></like>
        </div>

        <div class="travel-plan">
          <h3>여행 계획</h3>
          <div v-for="(items, key) in detailData.plan" :key="key">
            <h4>DAY {{ key }}</h4>
            <div class="plan-item" v-for="item in items" :key="item.tmapId">
              <div><strong>장소:</strong> {{ item.name }}</div>
              <div><strong>상세 주소:</strong> {{ item.detailAddress }}</div>
              <!-- Add more properties as needed -->
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>

    <button @click="$emit('close')">닫기</button>
  </div>
</template>

<style scoped>
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
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}

button {
  margin-top: 10px;
}

.modal-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
</style>
