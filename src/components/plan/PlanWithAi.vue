<script setup>
import { ref } from "vue";
import Map from "./item/map.vue";
import EditPlan from "./item/EditPlan.vue";
import Buttons from "./item/Buttons.vue";
import AiChat from "./item/AiChat.vue";

const showAiChat = ref(true);

// 토글 이벤트
const toggleView = () => {
  showAiChat.value = !showAiChat.value;
};
</script>

<template>
  <div>
    <h3>Planning Route With AI</h3>
    <pre>
  AI의 도움을 받아 여행지를 추가해보세요.
  원하는 지역의 관광지를 추천받아보시는건 어떨까요?
    </pre>

    <div class="flex-container">
      <section class="flex-item map-section">
        <Map></Map>
      </section>

      <section class="flex-item editplan-section">
        <button @click="toggleView">on/off 버튼</button>
        <AiChat v-if="showAiChat"></AiChat>
        <EditPlan v-else></EditPlan>
      </section>
    </div>

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
