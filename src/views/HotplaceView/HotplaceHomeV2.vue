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
        <h2>여행을 굳이 가야 하나요?</h2>
        <p>
          여행을 굳이 가야 할까 편한 집이 있는데 그럴꺼면 집은 왜 큰돈 주고
          사는걸까<br />
          한달에 오십만원을 월세로 쓰는데 여행을 가면 오십만원을 다
          날리는거잖아<br />
          집에 있으면 더 재미있는데 왜 여행을 가냐구
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
</style>
