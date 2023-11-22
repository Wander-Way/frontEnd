<script setup>
import { computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { ref } from "vue";
import { reactive } from "vue";

const boardStore = useBoardStore();

const article = computed(() => boardStore.article);
const router = useRouter();
const route = useRoute();
boardStore.getArticle(route.params.id);

const wroteContent = ref("");
const commentRequestData = ref({
  nickname: "작성자에요",
  createDate: "",
  content: wroteContent.value,
  profileImg: "",
});

const submitComment = async () => {
  commentRequestData.value.content = wroteContent.value;
  console.log("submitComment send");
  const response = await boardStore.createComment(commentRequestData.value);
  console.log("submitComment response : ", response);
  router.push("/hotplace");
};
</script>

<template>
  <head>
    <title>Phantom by HTML5 UP</title>
    <!-- <link rel="stylesheet2" href="./editorial/assets/css/main2.css" /> -->
  </head>

<body class="is-preload">
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <div class="inner">




          <!-- Banner -->
          <section id="banner">
            <div class="content">
              <header>
                <h1>
                  {{ article.title }}<br />
                </h1>
              </header>
              <p>
                <!--Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin
                        aliquam facilisis ante interdum congue. Integer mollis, nisl
                        amet convallis, porttitor magna ullamcorper, amet egestas
                        mauris. Ut magna finibus nisi nec lacinia. Nam maximus erat id
                        euismod egestas. Pellentesque sapien ac quam. Lorem ipsum dolor
                        sit nullam.-->
                여기다가 ai 요청 복붙 사진도 복붙가능? <br>

                {{ article.content }}
              </p>
              <!--<ul class="actions">
                      <li><a href="#" class="button big">Learn More</a></li>
                    </ul>-->
            </div>
        </section>
      </div>
      <section>
      <div class="commentdiv">
          <body class="bg-gray-100">
            <div class="container mx-0 px-8 py-8">
              <div class="bg-white shadow-lg rounded-lg p-6">
                <div class="mb-4">
                  <label for="comment" class="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                  <div class="flex">
                    <input type="text" id="comment" name="comment" placeholder="user comment input here"
                      v-model="wroteContent" required
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                  <button @click="submitComment"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">Submit</button>
                </div>
              </div>
              <div class="space-y-4">
                <div v-for="(comment, index) in article.hotPlaceCommentDtoList" :key="index">
                  <div class="flex items-center bg-gray-50 p-4 rounded-lg">
                    <div class="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                    <div class="flex-1">
                        <div class="text-sm font-semibold">{{ comment.content }}</div>
                        <div class="text-xs text-gray-600">{{ comment.nickname }} / {{ comment.createDate }}</div>
                    </div>
                  </div>
                </div>
                <!--
                <div class="flex items-center bg-gray-50 p-4 rounded-lg">
                  <div class="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                  <div class="flex-1">
                    <div class="text-sm font-semibold">comment2</div>
                    <div class="text-xs text-gray-600">email2 / commented date2</div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </body>
      </div>
    </section>
    </div>
  </div>

  <!-- <a-flex gap="middle" align="start" vertical>
    <p>Select justify :</p>
    <a-segmented v-model:value="justify" :options="justifyOptions" />
    <p>Select align :</p>
    <a-segmented v-model:value="alignItems" :options="alignOptions" />
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
      <a-button type="primary">Primary</a-button>
    </a-flex> -->

  <!-- <div>
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

            </div> -->
  </body>
</template>

<style scoped>
@import url("@/views/HotplaceView/editorial/assets/css/main2.css");

.commentdiv {
}
</style>

<!-- 
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

.styled-table th,
.styled-table td {
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

.comment-form input,
.comment-form button {
  margin-bottom: 20px;
  padding: 10px;
}

.comment-form button {
  cursor: pointer;
}
</style> -->
