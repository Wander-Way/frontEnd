<script setup>
import { ref, computed, onMounted } from "vue";
import { routeStore } from "@/stores/route";
import { useRoute, useRouter, RouterLink } from "vue-router";
import like from "./item/Like.vue";
import Modal from "./item/Modal.vue";
const isModalOpen = ref(false);
const modalContent = ref({});

const openModal = (route) => {
  isModalOpen.value = true;
  modalContent.value = route;
};

const closeModalOutside = (event) => {
  if (event.target.classList.contains("modal-container")) {
    closeModal();
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};
const isLoading = ref(true);

onMounted(() => {
  setRecentRoute();
  setTimeout(() => {
    isLoading.value = false;
  }, 0);
});

const resultRoute = ref([]); //검색결과 데이터 저장
const totalCnt = ref();
const resultObj = ref();

const store = routeStore();
const setRecentRoute = async () => {
  resultRoute.value = await store.getRecentRoute();
};

const router = useRouter();
const goToRouteDetail = (routeId) => {
  console.log(routeId);
  router.push({ name: "routeDetail", params: { id: routeId } });
};

const allKeywords = ref([]);
const selectedOption = ref("Option");
const inputText = ref("");

const addKeyword = () => {
  if (inputText.value.trim() !== "") {
    const newKeyword = {
      type: selectedOption.value,
      text: inputText.value.trim(),
    };
    console.log("입력된 태그 ", newKeyword);
    allKeywords.value.push(newKeyword);
    inputText.value = ""; // 입력 후 input 비우기
  }
};

const keywords = computed(() => allKeywords.value);

//검색
const page = ref(1);
const searchRoute = async () => {
  resultObj.value = await store.searchRoute(allKeywords.value, page.value);
  totalCnt.value = resultObj.value.totalCnt;
  resultRoute.value = resultObj.value.routes;
};
</script>

<template>
  <div class="box" :class="{ valid: !isLoading }">
    <section>
      <h1>Another Route</h1>
      <hr />
      <pre>
사람들의 여행 루트를 활용해보세요,
여행지, 기간, 테마, 제목에 따라 적절한 루트를 검색할 수 있습니다.
      </pre>
    </section>
    <section class="center-content">
      <section>
        <div class="input-container">
          <font-awesome-icon
            class="drop"
            :icon="['fas', 'caret-down']"
            style="color: #292929"
          />
          <select v-model="selectedOption">
            <option disabled value="Option">Option</option>
            <option value="Period">Period</option>
            <option value="Tag">Tag</option>
          </select>
          <input
            type="text"
            class="text_custom"
            v-model="inputText"
            placeholder="검색조건을 추가해주세요"
          />
          <button class="btn_select" @click="addKeyword">Add</button>
          <button class="btn_select" @click="searchRoute">Search</button>
        </div>
        <ul class="tags">
          <li
            v-for="(keyword, index) in keywords"
            :key="index"
            :class="{
              tag_tag: keyword.type === 'Tag',
              tag_period: keyword.type === 'Period',
            }"
          >
            {{ keyword.type }} :<span>&nbsp;{{ keyword.text }}</span
            >&nbsp;
            <font-awesome-icon
              size="xs"
              :icon="['fas', 'xmark']"
              style="color: #ffffff"
            />
          </li>
        </ul>
      </section>

      <section class="result-container">
        <h2>검색결과 {{ totalCnt }}</h2>
        <div class="card-container">
          <div
            class="card"
            @click="openModal(route)"
            v-for="route in resultRoute"
          >
            <!-- @click="goToRouteDetail(route.route_id)" -->
            <div class="card-image">
              <div>{{ route.perios }}</div>
              <img src="/img/cardImg.jpeg" alt="Card Image" />
              <div class="location-info">
                <font-awesome-icon
                  :icon="['fas', 'map-location-dot']"
                  style="color: #ebebeb"
                />
                {{ route.location }}
              </div>
            </div>
            <div class="card-info">
              <div class="card-title">{{ route.title }}</div>
              <div class="card-description">
                {{ route.description }}
              </div>
              <div class="tag-list">
                <span v-for="tag in route.tag" class="tag"># {{ tag }}</span>
              </div>
              <div class="like-count">
                <font-awesome-icon
                  :icon="['fas', 'heart']"
                  style="color: #ff5c5c"
                  class="fas fa-camera fa-lg"
                  v-if="route.like"
                />
                <font-awesome-icon
                  :icon="['far', 'heart']"
                  class="fas fa-camera fa-lg"
                  v-else
                />
                {{ route.like_cnt }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <Modal
      v-if="isModalOpen"
      class="modal-container"
      @click="closeModalOutside"
      :route_id="modalContent.route_id"
    >
      <!-- 모달 내용 -->
      <div>{{ modalContent.route_id }}</div>
      <!-- <div>{{ modalContent.description }}</div> -->
      <!-- 다른 카드 정보 추가 -->
    </Modal>
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

/* 입력, 내용부 컨테이너 */
.center-content {
  /* background-color: #0c0c0c; */
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/* 입력부 컨테이너 */
.input-container {
  width: 800px;
  position: relative;
  background-color: #f2f4f8;
  padding: 10px;
  border-radius: 8px;
}

.drop {
  position: absolute;
  left: 130px;
  top: 21px;
}

select {
  position: absolute;
  left: 75px;
  top: 22px;
  color: #535353;
  font-family: "Abhaya Libre";
}

.text_custom {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  padding-left: 90px; /* 아이콘의 너비에 따라 왼쪽 여백 조절 */
  margin-left: 50px;
  background-color: #fff;
  border-radius: 8px;
  font-family: "notosans-regular";
}

.btn_select {
  width: 100px;
  padding: 10px 10px 10px 10px;
  background-color: #6f74b4;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Abhaya Libre", serif;
  transition: background-color 0.3s ease;
  margin: 0px 5px;
}

.btn_select:hover {
  background-color: #bbb7e6;
}

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

.tags {
  list-style: none;
  padding: 0;
  margin: 0px 10px;
  display: flex;
}

li {
  margin: 10px 0px;
}
.tag_tag {
  background-color: rgb(192, 207, 226);
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}
.tag_period {
  background-color: #9386c5;
  color: white;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

/* 검색결과 컨테이너 */

.result-container {
  width: 100%;
  height: 500px;
  background-color: #ebebeb;
  display: flex;
  flex-direction: column;
  margin-top: 10;
  border-radius: 10px;
  padding: 20px;
  font-family: "notosans-regular";
}
/* 결과카드 컨테이너 */

.card-container {
  left: 90px;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  height: 400px;

  position: relative;
  overflow: hidden;
  border-radius: 10px;

  overflow: auto;

  flex-wrap: wrap; /*줄넘김 처리 */

  gap: 50px;
}

.card {
  margin-top: 20px;
  border-radius: 8px;
  background-color: #fff;
  width: 350px;
  height: 350px;
}

.card-image {
  position: relative;
  height: 60%;
  overflow: hidden;
}

.card-image img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-info {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
}

.card-info {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-description {
  font-size: 14px;
  margin-bottom: 10px;
}

.tag-list {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}

.tag {
  display: inline-block;
  background-color: #e7e7e7;
  color: rgb(0, 0, 0);
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 15px;
  font-size: 12px;
}

.like-count {
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
  gap: 5px;
}

::-webkit-scrollbar {
  width: 10px; /* 스크롤바의 너비 */
}

::-webkit-scrollbar-thumb {
  height: 10px; /* 스크롤바의 길이 */
  background: #6f74b4; /* 스크롤바의 색상 */
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(75, 76, 80, 0.1); /*스크롤바 뒷 배경 색상*/
}

.card:hover {
  transform: scale(1.05); /* 1.05 배 크기로 확대 (원하는 크기로 조절) */
  transition: transform 0.3s ease; /* 0.3초 동안 애니메이션 적용, ease 효과 사용 (필요에 따라 조절) */
  cursor: pointer; /* 호버 시 마우스 커서를 손가락 모양으로 변경 */
}

.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
