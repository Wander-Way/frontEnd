<template>
  <div>
    <!-- Your template code here -->
    <h1>HotplaceBoard</h1>

    Selected: {{ selectedOption }}

    <ul>
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
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "../../stores/index.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";

const store = useStore();

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
</script>

<style scoped>
/* Your scoped styles here */
</style>
