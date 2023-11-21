<script setup>
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const goMain = () => {
  router.push({ name: "main" });
};
</script>

<template>
  <div class="sidebar">
    <div class="header">
      <h3 class="logo" @click="goMain">Wander Way</h3>
      <StepBackwardOutlined class="back-icon" @click="goMain" />
    </div>

    <ul>
      <div class="nav-list">
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
      </div>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  padding: 16px;
  background-color: #f0f0f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-icon {
  cursor: pointer;
}

.logo {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: right;
  width: 100%;
  justify-content: flex-end;
  display: flex;
}

.nav-list li {
  margin: 8px 0;
}
</style>
