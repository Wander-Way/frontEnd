<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const pushSave = () => {
  router.push({name:"planInput"});
}
</script>

<template>
  <div>
    <!-- <button>최적경로</button> -->
    <button @click="pushSave">SAVE</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,800&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("/font/NotoSansKR-Regular.ttf");
}

button {
  font-family: "Abhaya Libre", serif;
  font-size: 15px; /* 폰트 크기 */
  background-color: #a9ade4; /* 핑크색 배경 */
  color: #fff; /* 흰색 텍스트 */
  border: none; /* 테두리 없음 */
  padding: 10px 20px; /* 내부 간격 */
  cursor: pointer; /* 커서를 손가락으로 변경 */
  border-radius: 7px; /* 모서리를 둥글게 만듦 */
  transition: background-color 0.3s ease; /* 배경색 전환에 애니메이션 추가 */
  
}
button:hover {
  background-color: #8286bb; /* 호버 시 핑크색으로 변경 */
}
</style>
