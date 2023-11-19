<script setup>

import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const goMain =  () => {
  router.push({ name: "main" });
};

</script>

<template>
  <div>
    <StepBackwardOutlined />
    <h3 @click="goMain">Wander Way</h3>
    <ul>
      <li>
        <router-link :to="{ name: 'planYourRoute' }">여행계획</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'anotherRoute' }">여행루트</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'hotplace' }">핫플정보</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'myPage' }">로그인/내정보</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
