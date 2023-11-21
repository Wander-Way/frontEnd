<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "@/components/layout/NavBar.vue";
import NavBarV2 from "./components/layout/NavBarV2.vue";
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  //document.getElementById("app").style.paddingTop = "400px";
});
</script>

<template>
  <div>
    <!-- <p class="display-1 text--primary">responsive web design</p> -->
    <!--<NavBar></NavBar>-->

    <div class="box-container">
      <NavBarV2></NavBarV2>
      <div class="blank-div"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.blank-div {
  height: 4rem;
  width: 100%;
}
.box-container {
  display: flex;
  flex-direction: column;
}
</style>
