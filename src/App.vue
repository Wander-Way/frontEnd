<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
</script>

<template>
  <div>
    <p class="display-1 text--primary">responsive web design</p>
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
