<script setup>
import Map from "./item/Map.vue";
import EditPlan from "./item/EditPlan.vue";
import Buttons from "./item/Buttons.vue";
</script>

<template>
  <div>
    <h3>FindAnotherRoute</h3>
    <pre>
  다른사람들의 루트를 참고하여 경로에 추가해보세요.
  [여행루트] 게시판에 방문하면 더 세부적인 검색이 가능합니다.
    </pre>
    <section>
      <SearchBar2></SearchBar2>
      <Map></Map>
      <div>다른사람들의 여행 카드들 두는자리</div>
    </section>

    <section>
      <EditPlan></EditPlan>
    </section>

    <Buttons></Buttons>
  </div>
</template>

<style scoped></style>
