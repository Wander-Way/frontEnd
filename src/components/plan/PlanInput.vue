<script setup>
import { ref, computed } from "vue";
import { planStore } from "@/stores/plan";

const location = ref("서울"); //나중에 enum이랑 통일해서 추가하자
const title = ref("");
const description = ref("");
const tags = ref([]);
const tagInput = ref("");

const addTag = () => {
  if (tagInput.value.trim() !== "") {
    tags.value.push(tagInput.value.trim());
    tagInput.value = "";
  }
};

const store = planStore();
const handleSavePlan = () => {
  store.savePlan(location, title, description, tags);
  alert("저장완료");
};

const locations = [
  "서울",
  "대전",
  "대구",
  "부산",
  "제주",
  "인천",
  "광주",
  "울산",
  "경기",
  "충북",
  "충남",
  "전북",
  "전남",
  "경상",
];
</script>

<template>
  <div id="box">
    <div class="head">
      <h1>Save Your Plan</h1>
      <hr />
      <pre>
완성한 계획의 제목과 정보를 입력해주세요.
태그를 통해 사람들에게 검색될 수 있습니다.
      </pre>
    </div>

    <div class="content-box">
      <div class="content">
        <section class="left">
          <img src="/img/save_bg.png" />
        </section>
        <section class="right">
          <label for="location"
            ><font-awesome-icon
              size="xs"
              :icon="['fas', 'location-dot']"
            />&nbsp;Location</label
          >
          <select v-model="location">
            <option v-for="loc in locations" :key="loc" :value="loc">
              {{ loc }}
            </option>
          </select>

          <label for="title"
            ><font-awesome-icon
              size="xs"
              :icon="['fas', 'heading']"
            />&nbsp;Title</label
          >
          <input type="text" v-model="title" placeholder="제목을 입력하세요" />

          <label for="description"
            ><font-awesome-icon
              size="xs"
              :icon="['fas', 'pen-nib']"
            />&nbsp;Description</label
          >
          <textarea
            placeholder="소개글을 입력하세요"
            style="height: 100px"
            type="text"
            v-model="description"
          />

          <label for="tagInput"
            ><font-awesome-icon
              size="xs"
              :icon="['fas', 'tags']"
            />&nbsp;Tag</label
          >
          <input
            type="text"
            v-model="tagInput"
            placeholder="Enter하면 태그가 추가됩니다"
            @keyup.enter="addTag"
          />
          <ul class="tags">
            <li v-for="tag in tags" :key="tag">
              {{ tag }}&nbsp;<font-awesome-icon
                size="xs"
                :icon="['fas', 'xmark']"
                style="color: #ffffff"
              />
            </li>
          </ul>
        </section>
      </div>
      <section class="btn_section">
        <button @click="handleSavePlan">SAVE</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@1,800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@500;800&display=swap");
@font-face {
  font-family: "notosans-bold";
  src: url("/font/NotoSansKR-Bold.ttf");
}

@font-face {
  font-family: "notosans-regular";
  src: url("/font/NotoSansKR-Regular.ttf");
}

@font-face {
  font-family: "notosans-thin";
  src: url("/font/NotoSansKR-Thin.ttf");
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
.head {
  margin-left: 300px;
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

p,
h3,
span {
  padding: 0%;
  margin: 0%;
}
label {
  display: block;
  margin-bottom: 5px;
  font-family: "Abhaya Libre", serif;
  font-size: 20px;
}

input,
textarea,
select {
  background-color: rgb(255, 255, 255);
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input[type="text"]:focus {
  border-color: #4e39a2;
  outline: none;
}

.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.tags li {
  background-color: #9386c5;
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.content-box {
  /* border: 1px solid pink; */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}
.content {
  padding: 20px;
  /* border: 3px solid rgb(228, 228, 228); */
  background-color: rgb(228, 228, 228);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  width: 70%;
  height: 500px;
}

.left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 3px dashed rgb(255, 255, 255);
}
.left img {
  width: 50%;
  height: 50%;
  z-index: 1;
}

.right {
  padding: 0px 50px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

.left {
  position: relative;
}

.left::before {
  content: "";
  position: absolute;
  width: 350px; /* 동그라미의 지름을 조절 */
  height: 350px;
  background-color: white;
  border-radius: 50%; /* 동그라미를 원 모양으로 만들기 */
  top: 52%; /* 세로 중앙 정렬을 위한 조절 */
  left: 320px; /* 이미지로부터 동그라미까지의 거리 조절 */
  transform: translate(-50%, -50%); /* 가로 세로 중앙 정렬을 위한 조절 */
  z-index: 0;
  animation: scaleAnimation 2.5s infinite;
}

.btn_section {
  margin-top: 10px;
  width: 70%;
  display: flex;
  justify-content: flex-end;
}

@keyframes scaleAnimation {
  0% {
    width: 350px;
    height: 350px;
  }
  50% {
    width: 400px;
    height: 400px;
  }
  100% {
    width: 350px;
    height: 350px;
  }
}
</style>
