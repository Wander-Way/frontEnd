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
  <h1>추가된 여행지를 드래그앤드랍하여 순서 변경하기</h1>
  <section>
    <!-- VueDraggableNext를 ul 바깥으로 이동 -->
    <div v-for="(group, index) in selectedPlaces" :key="index">
      <h3>DAY{{ index + 1 }}</h3>
      <ul :class="'day' + (index + 1)">
        <VueDraggableNext
          :animation="200"
          @end="($event) => onDragEnd(index, $event)"
        >
          <li class="card" v-for="(place, orderIndex) in group" :key="place.id">
            <div>{{ place.id }}</div>
            <div>{{ place.name }}</div>
            <button @click="removePlace(index, orderIndex)">[-]</button>
          </li>
        </VueDraggableNext>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.card {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  cursor: grab; /* 추가: 드래그 가능한 커서 스타일 */
  display: flex; /* 추가: 세로 정렬을 위한 flex 속성 사용 */
  flex-direction: column; /* 추가: 컬럼 방향으로 정렬 */
  transition: box-shadow 0.3s ease; /* 드래그 시 그림자에 애니메이션 적용 */
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
</style>
