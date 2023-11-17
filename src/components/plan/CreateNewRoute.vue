<script setup>
import Map from "./item/map.vue";
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

  <hr />
  <div class="flex-container">
    <section class="flex-item map-section">
      <Map></Map>
    </section>

    <section class="flex-item editplan-section">
      <EditPlan></EditPlan>
    </section>
  </div>

  <div>
    <Buttons></Buttons>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
}
.map-section {
  width: 70%;
}

.editplan-section {
  width: 30%;
}
</style>
