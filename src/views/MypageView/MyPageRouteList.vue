<script setup>
import { ref, onMounted } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const myPageStore = useMyPageStore();
const router = useRouter();
const myRouteListLocal = ref({}); //여기에 저장됩니당

const requestMyRouteList = async () => {
  await myPageStore.requestMyRouteList();
  const { myRouteListInfo } = storeToRefs(myPageStore);
  myRouteListLocal.value = myRouteListInfo.value;
  console.log(myRouteListLocal.value);
};

onMounted(requestMyRouteList);

/**
 *
 *
 * requestMyLikeList
 */
</script>

<template>
  <div>
    <h1>내 여행경로</h1>
  </div>
</template>

<style scoped></style>
