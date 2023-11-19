
<script setup>
import { computed } from "vue";
import { useStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";

const store = useStore();

const router = useRouter();

//이건 수정 가능
//const { selectedOption } = storeToRefs(store);

//이건 수정 불가
const selectedOption = computed(() => {
  return store.selectedOption;
});
const articles = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8080/hotplace/board", {
      params: {
        pgno: 1,
        spp: 20,
        place: selectedOption.value,
      },
    });
    //console.log(response.data);
    articles.value = response.data;
  } catch (error) {
    console.error(error);
  }
});


const moveDetail = (id) => {
    console.log('id', id);
    router.push({ name: "article-detail", params: { id } });
};

</script>


<template>
    <div>
      <!-- Your template code here -->
      <h1>HotplaceBoard</h1>
  
      Selected: {{ selectedOption }}
  

      
    <table>
      <tr>
        <th>글 번호</th>
        <th>글 제목</th>
        <th>조회수</th>
        <th>작성일</th>
        <th>작성자</th>
        <th>글 번호</th>
        <th>글 제목</th>
        <th>조회수</th>
        <th>작성일</th>
        <th>작성자</th>
        <th>작성자</th>
      </tr>
      <tr
        class="article-item"
        v-for="article in articles"
        :key="article.id"
        @click="moveDetail(article.id)"
      >
        <td>{{ article.id }}</td>
        <td>{{ article.authorName }}</td>
        <td>{{ article.city }}</td>
        <td>{{ article.detailAddress }}</td>
        <td>{{ article.district }}</td>
        <td>{{ article.hit }}</td>
        <td>{{ article.latitude }}</td>
        <td>{{ article.longitude }}</td>
        <td>{{ article.name }}</td>
        <td>{{ article.title }}</td>
        <td>{{ article.town }}</td>
      </tr>
    </table>
      <!-- <ul>
        <div v-for="article in articles" :key="article.id">
          <li>{{ article.id }}</li>
          <li>{{ article.authorName }}</li>
          <li>{{ article.city }}</li>
          <li>{{ article.detailAddress }}</li>
          <li>{{ article.district }}</li>
          <li>{{ article.hit }}</li>
          <li>{{ article.latitude }}</li>
          <li>{{ article.longitude }}</li>
          <li>{{ article.name }}</li>
          <li>{{ article.title }}</li>
          <li>{{ article.town }}</li>
        </div>
      </ul> -->
    </div>
  </template>
  
  <style scoped>
  /* Your scoped styles here */
.article-item:hover {
  background-color: aquamarine;
}
  </style>
  