<script setup>
import Map from "./item/map.vue";
import EditPlan from "./item/EditPlan.vue";
import Buttons from "./item/Buttons.vue";
</script>

<template>
  <div id="box">
    <div class="head">
      <h1>CreateNewRoute</h1>
      <hr />
      <pre>
검색을 통해 여행지를 추가해보세요.
일별 5개 이하로 등록 가능하며, 각 거리를 계산하여 최적경로를 추천해드립니다
      </pre>
    </div>

    <div class="container">
      <section class="map-section">
        <Map></Map>
      </section>

      <section class="editplan-section">
        <EditPlan></EditPlan>
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
  src: url("/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("/font/NotoSansKR-Regular.ttf");
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

section {
  /* border: 1px solid black; */
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
