<script setup>
import { ref, computed, onMounted } from "vue";
import { routeStore } from "@/stores/route";
import { useRoute, useRouter, RouterLink } from "vue-router";
import like from "./item/like.vue";
onMounted(() => {
  setRouteDetail();
});

const route = useRoute();
const store = routeStore();
const detailData = ref({});
const setRouteDetail = async() => {
  const id = route.params.id;
  detailData.value = await store.getRouteDetail(id);
}


</script>

<template>
  <div>
    <h3>여행루트의 상세정보를 조회하자!</h3>
    <div>
      <div>{{ detailData.nickname }}</div>
      <div>{{ detailData.location }}</div>
      <div>{{ detailData.period }}</div>
      <div>{{ detailData.description }}</div>
      <ul v-for="data in detailData.tag">
        <li>{{ data }}</li>
      </ul>
      <div>"눌럿나 ?" : {{ detailData._like }}</div>
      <like :like="detailData._like"  @updateLike="updateLike"></like>
      <div v-for="(items, key) in detailData.plan" :key="key">
        <!-- 'items' represents the array at each index in the 'plan' object -->
        <h3>DAY {{ key }}</h3>
        <div v-for="item in items" :key="item.tmapId">
          <!-- 'item' represents each object in the array -->
          <div>{{ item.name }}</div>
          <div>{{ item.detailAddress }}</div>
          <!-- Add more properties as needed -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
