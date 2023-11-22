<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import { useBoardStore } from "../../stores/board";

import randomImage0 from "./images/rand/rand0.jpg";
import randomImage1 from "./images/rand/rand1.jpg";
import randomImage2 from "./images/rand/rand2.jpg";
import randomImage3 from "./images/rand/rand3.jpg";
import randomImage4 from "./images/rand/rand4.jpg";
import randomImage5 from "./images/rand/rand5.jpg";
import randomImage6 from "./images/rand/rand6.jpg";
import randomImage7 from "./images/rand/rand7.jpg";
import randomImage8 from "./images/rand/rand8.jpg";
import randomImage9 from "./images/rand/rand9.jpg";

const boardStore = useBoardStore();

const articles = computed(() => boardStore.articles);
const router = useRouter();

const params = ref({
  key: "", //조건 검색 시 컬럼명
  word: "", //해당 컬럼에 일치하는 데이터
  pgno: 1, //조회할 페이지 번호
  spp: 20, //한번에 얻어올 게시글 개수
  city: "", //검색할 도시
});

const result = boardStore.getArticles(params.value);
if (result == true) {
  console.log("게시글 조회 성공");
}

//이건 수정 가능
//const { selectedOption } = storeToRefs(store);

//이건 수정 불가
const selectedOption = computed(() => {
  return boardStore.selectedOption;
});

const moveDetail = (id) => {
  console.log("id", id);
  router.push({ name: "article-detail", params: { id } });
};

const getRandomImage = async () => {
  const randomNum = Math.floor(Math.random() * 10) + 1;
  //return `@/images/rand${randomNum}.jpg`;
  return await `./images/rand/rand${randomNum}.jpg`;
};

const randomImageArray = ref([]);

const makeRandomImageArray = () => {
  randomImageArray.value.push(randomImage0);
  randomImageArray.value.push(randomImage1);
  randomImageArray.value.push(randomImage2);
  randomImageArray.value.push(randomImage3);
  randomImageArray.value.push(randomImage4);
  randomImageArray.value.push(randomImage5);
  randomImageArray.value.push(randomImage6);
  randomImageArray.value.push(randomImage7);
  randomImageArray.value.push(randomImage8);
  randomImageArray.value.push(randomImage9);
};

onMounted(() => {
  makeRandomImageArray();
});
</script>

<template>
  <Suspense>
    <div>
      <div class="selected-option-head">
        <h2>{{ selectedOption }}</h2>
      </div>
      <div class="board-container">
        <!-- Board Item 1 -->

        <div
          v-for="(article, index) in articles"
          :key="article.id"
          @click="moveDetail(article.id)"
        >
          <div class="board-item">
            <!-- <img :src="randomImageArray[index % 11]" alt="게시글 1 이미지" /> -->
            <img :src="randomImageArray[index % 10]" alt="게시글 이미지" />
            <!-- <img src="./images/rand/rand0.jpg" alt="게시글 1 이미지" /> -->
            <h2>{{ article.title }}</h2>
            <p>{{ article.city }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="board-item">
          <img src="image_url_1.jpg" alt="게시글 1 이미지" />
          <h2><a href="post_link_1.html">게시글 1 제목</a></h2>
          <p>게시글 1 주소 (실제 장소 주소)</p>
        </div>

        <div class="board-item">
          <img src="image_url_2.jpg" alt="게시글 2 이미지" />
          <h2><a href="post_link_2.html">게시글 2 제목</a></h2>
          <p>게시글 2 주소 (실제 장소 주소)</p>
        </div>

        <div class="board-item">
          <img src="image_url_3.jpg" alt="게시글 3 이미지" />
          <h2><a href="post_link_3.html">게시글 3 제목</a></h2>
          <p>게시글 3 주소 (실제 장소 주소)</p>
        </div>

        <div class="board-item">
          <img src="image_url_4.jpg" alt="게시글 4 이미지" />
          <h2><a href="post_link_4.html">게시글 4 제목</a></h2>
          <p>게시글 4 주소 (실제 장소 주소)</p>
        </div>
        <div class="board-item">
          <img src="image_url_4.jpg" alt="게시글 4 이미지" />
          <h2><a href="post_link_4.html">게시글 4 제목</a></h2>
          <p>게시글 4 주소 (실제 장소 주소)</p>
        </div>
        <div class="board-item">
          <img src="image_url_4.jpg" alt="게시글 4 이미지" />
          <h2><a href="post_link_4.html">게시글 4 제목</a></h2>
          <p>게시글 4 주소 (실제 장소 주소)</p>
        </div>
        <div class="board-item">
          <img src="image_url_4.jpg" alt="게시글 4 이미지" />
          <h2><a href="post_link_4.html">게시글 4 제목</a></h2>
          <p>게시글 4 주소 (실제 장소 주소)</p>
        </div>
        <div class="board-item">
          <img src="image_url_4.jpg" alt="게시글 4 이미지" />
          <h2><a href="post_link_4.html">게시글 4 제목</a></h2>
          <p>게시글 4 주소 (실제 장소 주소)</p>
        </div> -->
      <!-- <h1>HotplaceBoard</h1>
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
      </table> -->
    </div>
  </Suspense>
</template>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100vh;
  width: 100%;
  display: flex;
}

.selected-option-head {
  margin-left: 17.5%;
}

.board-container {
  width: 65%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center; /* Add this line */
  align-items: center; /* Add this line */
  margin: 0 auto;
}

.board-item {
  /*width: 100%;*/

  height: 225px; /* Adjust as needed */
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.board-item img {
  width: 98%;
  height: 75%;
  border-radius: 5px;
}

.board-item h2 {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
}

.board-item p {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}
</style>
