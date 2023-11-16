<script setup>
import Map from "./item/map.vue";
import SearchBar from "./item/searchBar.vue";
import EditPlan from "./item/EditPlan.vue";
import Buttons from "./item/Buttons.vue";
</script>

<template>
  <div>
    <h3>CreateNewRoute</h3>
    <pre>
  검색을 통해 여행지를 추가해보세요.
  일별 5개 이하로 등록 가능하며, 각 거리를 계산하여 최적경로를 추천해 드립니다
    </pre>
  </div>

  <section>
    <SearchBar></SearchBar>
    <Map></Map>
  </section>

  <div>
    <EditPlan></EditPlan>
  </div>

  <div>
    <Buttons></Buttons>
  </div>
</template>

<style scoped></style>
