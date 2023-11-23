<script setup>
import { ref, onMounted } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const myPageStore = useMyPageStore();
const router = useRouter();
const myWishListLocal = ref({}); //여기에 저장되구요

const requestMyLikeList = async () => {
  await myPageStore.requestMyLikeList();
  const { myLikeListInfo } = storeToRefs(myPageStore);
  myWishListLocal.value = myLikeListInfo.value;
  console.log(myWishListLocal.value);
};

onMounted(() => {
  requestMyLikeList();

});
</script>

<template>
  <div>
    <h1>찜 목록</h1>
  </div>
</template>

<style scoped></style>
