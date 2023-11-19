<script setup></script>

<template>
  <div>
    <StepBackwardOutlined />
    <h3>SideNavBar</h3>
    <ul>
      <li>
        <router-link :to="{ name: 'myPageMyProfile' }">내 프로필</router-link> 
      </li>
      <li>
        <router-link :to="{ name: 'myPageRouteList' }">여행 계획</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'myPageLikeList' }">찜 목록</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
