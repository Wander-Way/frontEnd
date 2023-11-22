<script setup>
import { useBoardStore } from "../../stores/board";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useBoardStore();

const { selectedOption } = storeToRefs(store);

const handleButtonClick = async () => {
  console.log("Button clicked!");
  router.push({ name: "hotplaceBoardList" });
  return;
};
</script>
<!-- Scripts -->

<template>
  <head>
    <title>Epilogue by TEMPLATED</title>
    <meta charset="utf-8" />
    <meta
      name="robots"
      content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="assets/css/main.css" />
  </head>

  <body>
    <!-- Header -->
    <header id="header" class="alt">
      <img class="header-image" src="./images/hotplacebackground.png" alt="" />
      <div class="inner">
        <h1>Hotplace</h1>
        <p>전국의 핫플레이스를 찾아보세요!</p>
      </div>
    </header>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Banner -->
      <section id="intro" class="main">
        <h3>Discover the magic where flavors dance and ambiance enchants</h3>
        <p>
          요즘 인기 있는 여행지는 다 모였네! <br>
          TMAP, 관광 빅데이터, Instagram 태그 활동 정보를 분석하여 제공하는<br>
          지역별 여행지와 맛집 정보를 확인해 보세요<br>
        </p>
        <ul class="actions">
          <li>
            <select
              name="select"
              id="selectsss"
              class="custom-select"
              v-model="selectedOption"
            >
              <option value="서울특별시">서울특별시</option>
              <option>대전광역시</option>
              <option>대구광역시</option>
              <option>광주광역시</option>
              <option>부산광역시</option>
              <option>울산광역시</option>
              <option>세종특별자치시</option>
              <option>경기도</option>
              <option>강원특별자치도</option>
              <option>충청북도</option>
              <option>충청남도</option>
              <option>경상북도</option>
              <option>경상남도</option>
              <option>전라북도</option>
              <option>전라남도</option>
              <option>제주특별자치도</option>
            </select>
          </li>
          <li>
            <a class="button big" @click="handleButtonClick">Travel place</a>
          </li>
        </ul>
        <div class = "emptytag"></div>

      </section>
    </div>
  </body>
</template>

<style scoped>
@charset "UTF-8";
@import "./assets/css/main.css";

#header {
  padding: 0;
}

.header-image {
  width: 100%;
  height: 100%;
}
.custom-select {
  width: 300px;
  height: 48px;
  font-size: 0.8em;
  padding: 0 2.5em 0 2.875em;
  height: 3.75em;
  line-height: 3.75em;
  background-color: transparent;
  box-shadow: inset 0 0 0 2px #666666;
  color: #444444 !important;
  border-radius: 4px;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.325em;
}

.emptytag {
  height: 300px;
}
</style>
