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
  <div id="box">
    <div class="head">
      <h1>Planning Route With AI</h1>
      <hr />
      <pre>
AI의 도움을 받아 여행지를 추가해보세요.
원하는 지역의 관광지를 추천받아보시는건 어떨까요?
      </pre>
    </div>
    
      <div class="container">
        <section class="map-section">
          <Map></Map>
        </section>

        <section class="editplan-section">
            <label @click="toggleView">
              <input role="switch" type="checkbox" v-model="showAiChat"/>
            </label>
          <div v-show="showAiChat"><AiChat></AiChat></div>
          <div v-show="!showAiChat"><EditPlan></EditPlan></div>
          <!-- <div><EditPlan></EditPlan></div> -->
        </section>
      </div>

      <div class="buttons">
      <Buttons></Buttons>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("../../../public/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("../../../public/font/NotoSansKR-Regular.ttf");
}
label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 10px;
}

[type="checkbox"] {
  appearance: none;
  position: relative;
  border: max(2px, 0.1em) solid gray;
  border-radius: 1.25em;
  width: 2.25em;
  height: 1.25em;
}

[type="checkbox"]::before {
  content: "";
  position: absolute;
  left: 0;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  transform: scale(0.8);
  background-color: gray;
  transition: left 250ms linear;
}

[type="checkbox"]:checked {
  background-color: rgb(40, 202, 167);
  border-color: rgb(40, 202, 167);
}

[type="checkbox"]:checked::before {
  background-color: white;
  left: 1em;
}
/* 
[type="checkbox"]:disabled {
  border-color: lightgray;
  opacity: 0.7;
  cursor: not-allowed;
}

[type="checkbox"]:disabled:before {
  background-color: lightgray;
}

[type="checkbox"]:disabled + span {
  opacity: 0.7;
  cursor: not-allowed;
} */

[type="checkbox"]:focus-visible {
  outline-offset: max(2px, 0.1em);
  outline: max(2px, 0.1em) solid tomato;
}

[type="checkbox"]:enabled:hover {
  box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
}

/* Global CSS */
body {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#box {
  /* border: 1px solid pink; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0% 10%;
}
.head {
  width: 100%;
  display: flex;
  flex-direction: column;
}
h1 {
  /* 상우하좌 */
  font-family: "Abhaya Libre", serif;
  font-size: 50px;
  font-weight: 800;
  padding: 50px 0px 0px 0px;
  margin: 0px 0px;
}
pre {
  overflow: hidden;
  margin-top: 10px;
  font-family: notosans-bold;
  margin-top: 23px;
  line-height: 1.5; /* 행간을 1.5로 설정, 필요에 따라 조절 */
}

hr {
  width: 60%; /* 원하는 길이로 설정 (예: 50%) */
  /* margin: 0px 40px; 가운데 정렬 및 위아래 여백 설정 (선택사항) */
}


.container {
  /* border: 1px solid rgb(182, 66, 66); */
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.map-section {
  width: 65%;
}

.editplan-section {
  width: 25%;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
 