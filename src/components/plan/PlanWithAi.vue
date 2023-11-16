<script setup>
import Map from "./item/map.vue";
import SearchBar from "./item/searchBar.vue";
import EditPlan from "./item/EditPlan.vue";
import Buttons from "./item/Buttons.vue";
</script>

<template>
  <div>
    <h3>Planning Route With AI</h3>
    <pre>
  AI의 도움을 받아 여행지를 추가해보세요.
  원하는 지역의 관광지를 추천받아보시는건 어떨까요?
    </pre>

    <section>
      <SearchBar></SearchBar>
      <Map></Map>
      <div>AI가 추천한 여행지를 표시해준다</div>
    </section>

    <section>
      <button>on/off 버튼</button>
      <div>지피티와 대화하는 채팅화면</div>
      <EditPlan></EditPlan>
    </section>

    <Buttons></Buttons>
  </div>
</template>

<style scoped></style>
