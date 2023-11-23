<script setup>
import { ref, computed } from "vue";
import { planStore } from "@/stores/plan";
import { VueDraggableNext } from "vue-draggable-next";

const store = planStore();
const selectedPlaces = computed(() => {
  return store.selectedPlaces;
});

//카드 삭제
const removePlace = (dayIndex, oldIndex) => {
  store.selectedPlaces[dayIndex].splice(oldIndex, 1);
};

// 드래그 앤 드롭 이벤트 핸들러
const onDragEnd = (index, event) => {
  const { oldIndex, newIndex } = event;
  const draggedPlace = selectedPlaces.value[index][oldIndex];
  // 기존 위치에서 제거
  store.selectedPlaces[index].splice(oldIndex, 1);
  // 새로운 위치에 추가
  store.selectedPlaces[index].splice(newIndex, 0, draggedPlace);
  // console.log(store.selectedPlaces);
};
</script>

<template>
  <section>
    <div v-if="selectedPlaces.length == 0" class="empty">
      <h2 class="highlight">여행계획이 비어있습니다</h2>
      <img src="/img/empty_box.png">
      <p>검색을 통해 일정을 추가해보세요!</p>
    </div>


    <div v-else v-for="(group, index) in selectedPlaces" :key="index">
      <h3>📌 DAY {{ index + 1 }}</h3>
      <ul :class="'day' + (index + 1)">
        <VueDraggableNext
          :animation="200"
          @end="($event) => onDragEnd(index, $event)"
        >
          <li class="card-container" v-for="(place, orderIndex) in group" :key="place.id">
            <div class="card">
              <img src="/img/cardImg.jpeg" alt="Card Image" />
              <div class="card-content">
                <p>{{ place.name }}</p>
                <p>
                  <font-awesome-icon :icon="['fas', 'location-dot']" size="sm" style="color: #302f6f;"  />{{ place.bldAddr }}
                  <span v-if="place.bldAddr" style="margin-left: 1px;"></span>
                  <span v-else style="margin-left: 1px;">{{ place.detailAddress }}</span>
                  <font-awesome-icon :icon="['fas', 'phone']" size="sm" v-if="place.tel" style="color: #302f6f;" /> {{ place.tel }}
                </p>
              </div>
              <div @click="removePlace(index, orderIndex)" class="icon">
                <font-awesome-icon :icon="['fas', 'circle-minus']" size="lg" style="color: #1f2d93;" />
              </div>
            </div>
          </li>
        </VueDraggableNext>
      </ul>
    </div>

  </section>
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
.highlight{
  display: inline;
  box-shadow: inset 0 -10px 0 #d9dafc; 
  /*-10px은 highlight의 두께*/
}
.empty {
  padding: 40px 0px;
  width: 100%;
  height: 480px;
  border: 2px dashed rgb(214, 214, 214);
  border-radius: 8px;
  /* background-color: #6f74b4; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap : 50px;
}

.empty img{
  width: 50%;
}

h3 {
  margin-top: 30px;
  font-family: 'EB Garamond', serif;
  font-size: 30px;
}

h2,p {
  font-family: "notosans-regular";
}

ul, ol {
  list-style: none;
}

p {
  margin: 0px;
  padding: 0px;
}

section {
    max-height: 600px; /* 적절한 높이로 설정, 스크롤이 활성화될 최대 높이 */
    overflow-y: auto; /* 세로 스크롤을 활성화 */
 }

 .card-container {
  position: relative;
}
.icon {
  position: absolute;
  top: -9px; /* 상단 여백 조절 */
  right: -5px; /* 우측 여백 조절 */
}

 .card {
  cursor: pointer;
  position: relative;
  margin-bottom: 15px;
  padding: 5px 20px;
  border: 0.1px solid #e9e9e9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 80px;
}

.card img {
  width: 30%;
  border-radius: 5px;
  height: 60px;
  width: 60px;
  object-fit: cover;
  /* margin-right: 5px; */
}
.card-content {
  width: 60%;
  height: 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-content p:first-child {
  margin-top: 4px;
  margin-bottom: 5px;
  font-family: "notosans-bold";
  font-size: 15px; /* 첫 번째 p 태그의 크기를 18px로 설정 */
}

.card-content p:last-child {
  font-family: "notosans-regular";
  font-size: 12px; /* 두 번째 p 태그의 크기를 15px로 설정 */
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

/* 추가: 드래그 중인 아이템에 대한 스타일 */
.card:active {
  cursor: grabbing;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
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
</style>
