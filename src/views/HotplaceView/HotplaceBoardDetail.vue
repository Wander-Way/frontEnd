<script setup>
import { computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useBoardStore } from "@/stores/board";
import { ref } from "vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";




const callChatGPTBoard = async (message) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  console.log("callChatGPTBoard 실행");
  console.log("message : ", message);

  const data = JSON.stringify({
    messages: [
      {
        role: "user",
        content:
          message +
          "\n 이 여행지에 대한 설명을 최대한 길고 자세하게 작성해줘. 사진을 제공할 수 있으면 제공 해줘.",
      },
    ],
    max_tokens: 400,
    model: "gpt-3.5-turbo",
  });

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    //console.error("Error calling ChatGPT:", error.response.data);
    console.error("Error calling ChatGPT:", error.response); 
    throw error;
  } finally {
    isLoading.value = false;
    
  console.log("callChatGPTBoard 실행 종료");
    //loading.value = false; // API 요청이 완료되면 로딩 상태를 비활성화
  }
};




const article = computed(() => boardStore.article);
const router = useRouter();
const route = useRoute();



const debugForAI = async () => {
  console.log("debugForAI 실행");

  let article = boardStore.article;
  console.log("?? : ", article)
  console.log("article : ", article.title);
  aiWriteContent.value = await callChatGPTBoard(article.title);
  console.log("aiWriteContent : ", aiWriteContent.value);
  console.log("debugForAI 실행 종료");
};

const boardStore = useBoardStore();

onMounted( async () => {
  const boardStore = useBoardStore();
  await boardStore.getArticle(route.params.id);
  debugForAI();
});
//debugForAI();


const wroteContent = ref("");
const aiWriteContent = ref("wait for ai response");
const isLoading = ref(true);



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
                <div v-if="article.comtent = 'null content'">
                  {{ aiWriteContent }}
                </div>
                <div v-else>
                  {{ article.content }}
                </div>
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
            <div class="container-fluid mx-0 px-8 py-8">
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
