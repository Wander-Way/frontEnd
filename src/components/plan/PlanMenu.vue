<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 0);
});
const clickNewRoute = () => {
  router.push({ name: "createNewRoute" });
};

const clickWithAI = () => {
  router.push({ name: "planWithAi" });
};

const clickAnotherRoute = () => {
  router.push({ name: "findAnotherRoute" });
};

const isLoading = ref(true);
</script>

<template>
  <div class="box" :class="{ valid: !isLoading }">
    <section>
      <h1>PlanYourRoute</h1>
      <hr />
      <pre>
여행 계획을 세워보세요! 방문하고싶은 관광지를 추가해봅시다. 
다른 사용자들의 루트를 사용하거나, 직접 여행지를 추가하거나, AI를 통해 여행지를 추천받을 수 있습니다.
      </pre>
    </section>

    <section class="card-container">
      <div class="card card_1" @click="clickNewRoute">
        <div class="card-title">
          <p class="title">Create</p>
          <p class="title">New</p>
          <p class="title">Route</p>
          <p class="title_kor">직접 여행지 추가하기</p>
        </div>
        <div class="arrow-container">
          <!-- 화살표 SVG 코드 -->
          <svg
            width="300"
            height="24"
            viewBox="0 0 348 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M347.061 13.0607C347.646 12.4749 347.646 11.5252 347.061 10.9394L337.515 1.39343C336.929 0.807641 335.979 0.807641 335.393 1.39343C334.808 1.97921 334.808 2.92896 335.393 3.51475L343.879 12L335.393 20.4853C334.808 21.0711 334.808 22.0208 335.393 22.6066C335.979 23.1924 336.929 23.1924 337.515 22.6066L347.061 13.0607ZM-1.31134e-07 13.5L346 13.5L346 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      <div class="card card_2" @click="clickWithAI">
        <div class="card-title">
          <p class="title">Planning</p>
          <p class="title">Route</p>
          <p class="title">With AI</p>
          <p class="title_kor">AI와 함께 계획짜기</p>
        </div>
        <div class="img-container">
          <img src="/img/gpt.png" />
        </div>
        <div class="arrow-container">
          <svg
            width="72"
            height="24"
            viewBox="0 0 72 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M71.0607 13.0607C71.6464 12.4749 71.6464 11.5251 71.0607 10.9393L61.5147 1.3934C60.9289 0.807617 59.9792 0.807617 59.3934 1.3934C58.8076 1.97919 58.8076 2.92894 59.3934 3.51472L67.8787 12L59.3934 20.4853C58.8076 21.0711 58.8076 22.0208 59.3934 22.6066C59.9792 23.1924 60.9289 23.1924 61.5147 22.6066L71.0607 13.0607ZM-1.31134e-07 13.5L70 13.5L70 10.5L1.31134e-07 10.5L-1.31134e-07 13.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      <div class="card card_3" @click="clickAnotherRoute">
        <div class="img-container">
          <img src="../../../public/img/another.png" />
        </div>
        <div class="card-title">
          <p class="title">Find</p>
          <p class="title">Another Route</p>
          <p class="title_kor">사람들의 여행루트 사용하기</p>
        </div>
        <div class="arrow-container">
          <svg
            width="46"
            height="24"
            viewBox="0 0 46 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M45.0607 13.0607C45.6464 12.4749 45.6464 11.5251 45.0607 10.9393L35.5147 1.3934C34.9289 0.807608 33.9792 0.807608 33.3934 1.3934C32.8076 1.97918 32.8076 2.92893 33.3934 3.51472L41.8787 12L33.3934 20.4853C32.8076 21.0711 32.8076 22.0208 33.3934 22.6066C33.9792 23.1924 34.9289 23.1924 35.5147 22.6066L45.0607 13.0607ZM1.31134e-07 13.5L44 13.5L44 10.5L-1.31134e-07 10.5L1.31134e-07 13.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");

.box {
  opacity: 0; /* 초기 상태에서는 투명하게 설정 */
  transition: opacity 1s ease;
  padding: 0% 14%;
  display: flex;
  flex-direction: column;
}
.box.valid {
  opacity: 1;
  transition: opacity 2s ease;
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
  /* margin: 10px 0px 80px 40px; */
}
.card-container {
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  margin-top: 10;
  /* gap: 20px; */
}
.card {
  border: 1px solid rgb(124, 124, 124);
  width: 400px;
  height: 400px;
}

@font-face {
  font-family: "notosans-bold";
  src: url("../../../public/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("../../../public/font/NotoSansKR-Regular.ttf");
}

.card_1 .card-title {
  margin: 40px 0px 0px 40px;
}
.card_1 .title {
  margin: 0px 0px;
  padding: 0px 0px;
  font-family: "Abhaya Libre", serif;
  font-size: 50px;
  font-weight: 500;
}
.card_1 .title_kor {
  font-family: notosans-regular;
  font-size: 18px;
}

.card_1 .arrow-container {
  margin: 90px 0px 0px 43px;
}

.card {
  overflow: hidden;
  position: relative;
  border-radius: 2px;
}
/* 카드2 */
.card_2 .card-title {
  margin: 40px 0px 0px 40px;
}
.card_2 .title {
  margin: 0px 0px;
  padding: 0px 0px;
  font-family: "Abhaya Libre", serif;
  font-size: 30px;
  font-weight: 500;
}

.card_2 .title_kor {
  font-family: notosans-regular;
  font-size: 18px;
}

.card_2 .img-container {
  position: absolute;
  bottom: 0%;
  right: 0%;

  transform: translate(30%, 30%);
  z-index: -1; /* card-title의 뒤로 이동 */
}

.card_2 img {
  width: 400px;
  height: auto;
  border-radius: 500px;
}

.card_2 .arrow-container {
  margin: 160px 0px 0px 43px;
}

/* 카드3 */
.card_3 .card-title {
  margin: 60px 0px 0px 40px;
}
.card_3 .title {
  margin: 0px 0px;
  padding: 0px 0px;
  font-family: "Abhaya Libre", serif;
  font-size: 30px;
  font-weight: 500;
  position: relative;
}

.card_3 .title_kor {
  font-family: notosans-regular;
  font-size: 18px;
}

.card_3 .img-container {
  display: flex;
  justify-content: center;
  margin: 30px 0px;
}

.card_3 img {
  width: 350px;
  height: auto;
}

.card_3 .arrow-container {
  position: absolute; /* card-title 내에서의 절대적인 위치를 설정 */
  top: 0;
  right: 0;
  margin: 325px 30px 0px 10px; /* 필요에 따라 마진을 조절 */
}

.card:hover {
  transform: scale(1.05); /* 1.05 배 크기로 확대 (원하는 크기로 조절) */
  transition: transform 0.3s ease; /* 0.3초 동안 애니메이션 적용, ease 효과 사용 (필요에 따라 조절) */
  cursor: pointer; /* 호버 시 마우스 커서를 손가락 모양으로 변경 */
}
</style>
