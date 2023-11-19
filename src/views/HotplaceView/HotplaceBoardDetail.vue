<script setup>

import { computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { ref } from "vue";

const boardStore = useBoardStore();

const article = computed(() => boardStore.article);
const router = useRouter();
const route = useRoute();
boardStore.getArticle(route.params.id);

const wroteContent = ref("");
const commentRequestData = ref({
    "nickname":"작성자에요",
    "createDate":"",
    "content":wroteContent.value,
    "profileImg":""
});



const submitComment = async () => {
  commentRequestData.value.content = wroteContent.value;
  console.log('submitComment send');
  const response = await boardStore.createComment(commentRequestData.value);
  console.log('submitComment response : ', response);
  
  router.push('/hotplace');
};

</script>

<template>
  <div>
    <h1>디테일 뷰</h1>
    <RouterLink to="/hotplace">목록</RouterLink>
    <table class="styled-table">
      <tr>
        <th>글 번호</th>
        <td>{{ article.id }}</td>
      </tr>
      <tr>
        <th>글 제목</th>
        <td>{{ article.title }}</td>
      </tr>
      <tr>
        <th>조회수</th>
        <td>{{ article.hit }}</td>
      </tr>
      <tr>
        <th>작성자</th>
        <td>{{ article.member }}</td>
      </tr>
      <tr>
        <td>{{ article.content }}</td>
      </tr>
      <br>
    </table>

    <br>
    <br>
    <br>
    <div v-for="(comment, index) in article.hotPlaceCommentDtoList" :key="index">
        <table class="styled-table">
            <tr>
                <th>댓글 번호</th>
                <td>{{ index }}</td>
                <th>작성자</th>
                <td>{{ comment.nickname }}</td>
                <th>작성일</th>
                <td>{{ comment.createDate }}</td>
                <th>프로필이미지</th>
                <td>{{ comment.profileImg }}</td>
                <th>글 내용</th>
                <td>{{ comment.content }}</td>
            </tr>
        </table>
    </div>
    <form class="comment-form">
      <label for="comment">Comment:</label>
      <input type="text" id="comment" v-model="wroteContent" required>
    </form>
    <button type="submit" @click="submitComment">Submit</button>

  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.styled-table th {
  background-color: #f2f2f2;
}

.styled-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.comment-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.comment-form label {
  margin-bottom: 10px;
}

.comment-form input, .comment-form button {
  margin-bottom: 20px;
  padding: 10px;
}

.comment-form button {
  cursor: pointer;
}
</style>