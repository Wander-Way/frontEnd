<script setup>
import { ref, computed, onMounted } from "vue";
import { routeStore } from "@/stores/route";
import { useRoute, useRouter, RouterLink } from "vue-router";
onMounted(() => {
  setRecentRoute();
});


const resultRoute = ref([]); //검색결과 데이터 저장

const store = routeStore();
const setRecentRoute = async() => {
  resultRoute.value = await store.getRecentRoute();
}

const router = useRouter();
const goToRouteDetail = (routeId) => {
  console.log(routeId);
  router.push({ name: 'routeDetail', params: { id: routeId } });
}


const allKeywords = ref([]);
const selectedOption = ref('period');
const inputText = ref('');

const addKeyword = () => {
  if (inputText.value.trim() !== '') {
    const newKeyword = {
      type: selectedOption.value,
      text: inputText.value.trim(),
    };

    allKeywords.value.push(newKeyword);
    inputText.value = ''; // 입력 후 input 비우기
  }
};

const keywords = computed(() => allKeywords.value);

//검색
const page = ref(1);
const searchRoute = async () => {
  resultRoute.value = await store.searchRoute(allKeywords.value, page.value);
}
</script>

<template>
  <div>
    <h2>Another Route</h2>
    <pre>
      사람들의 여행 루트를 활용해보세요,
      여행지, 기간, 테마, 제목에 따라 적절한 루트를 검색할 수 있습니다.
    </pre>

    <section>
      <div>
        <div>검색창</div>
        <div>기간,태그기준만 구현해뒀음</div>


        <div>
          <select v-model="selectedOption">
            <option value="period">period</option>
            <option value="tag">tag</option>
          </select>
          <input v-model="inputText" />
          <button @click="addKeyword">Add Keyword</button>
          <button @click="searchRoute">검색</button>
          <ul>
            <li v-for="(keyword, index) in keywords" :key="index">
              [{{ keyword.type }}: {{ keyword.text }}]
            </li>
          </ul>
        </div>


      </div>
      <h2>검색결과</h2>
      <div class="card" v-for="route in resultRoute" @click="goToRouteDetail(route.route_id)">
        <div>{{route.title}}</div>
        <div>{{route.description}}</div>
        <div>{{route.like}}</div>
        <div>{{route.like_cnt}}</div>
        <div>{{route.location}}</div>
        <div>{{route.perios}}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  margin-right: 10px; /* 카드 간 간격 설정 */
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  max-width: 300px;
}

</style>
