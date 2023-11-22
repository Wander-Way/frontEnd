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
          <!-- Header -->
          <header id="header">
            <a href="#" class="logo"><strong>Editorial</strong> by HTML5 UP</a>
            <ul class="icons">
              <li>
                <a href="#" class="icon brands fa-twitter"
                  ><span class="label">Twitter</span></a
                >
              </li>
              <li>
                <a href="#" class="icon brands fa-facebook-f"
                  ><span class="label">Facebook</span></a
                >
              </li>
              <li>
                <a href="#" class="icon brands fa-snapchat-ghost"
                  ><span class="label">Snapchat</span></a
                >
              </li>
              <li>
                <a href="#" class="icon brands fa-instagram"
                  ><span class="label">Instagram</span></a
                >
              </li>
              <li>
                <a href="#" class="icon brands fa-medium-m"
                  ><span class="label">Medium</span></a
                >
              </li>
            </ul>
          </header>

          <!-- Banner -->
          <section id="banner">
            <div class="content">
              <header>
                <h1>
                  Hi, I’m Editorial<br />
                  by HTML5 UP
                </h1>
                <p>A free and fully responsive site template</p>
              </header>
              <p>
                Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin
                aliquam facilisis ante interdum congue. Integer mollis, nisl
                amet convallis, porttitor magna ullamcorper, amet egestas
                mauris. Ut magna finibus nisi nec lacinia. Nam maximus erat id
                euismod egestas. Pellentesque sapien ac quam. Lorem ipsum dolor
                sit nullam.
              </p>
              <ul class="actions">
                <li><a href="#" class="button big">Learn More</a></li>
              </ul>
            </div>
            <span class="image object">
              <img src="./editorial/images/pic10.jpg" alt="" />
            </span>
          </section>

          <!-- Section -->
          <section>
            <header class="major">
              <h2>Erat lacinia</h2>
            </header>
            <div class="features">
              <article>
                <span class="icon fa-gem"></span>
                <div class="content">
                  <h3>Portitor ullamcorper</h3>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore. Proin aliquam facilisis ante interdum. Sed nulla
                    amet lorem feugiat tempus aliquam.
                  </p>
                </div>
              </article>
              <article>
                <span class="icon solid fa-paper-plane"></span>
                <div class="content">
                  <h3>Sapien veroeros</h3>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore. Proin aliquam facilisis ante interdum. Sed nulla
                    amet lorem feugiat tempus aliquam.
                  </p>
                </div>
              </article>
              <article>
                <span class="icon solid fa-rocket"></span>
                <div class="content">
                  <h3>Quam lorem ipsum</h3>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore. Proin aliquam facilisis ante interdum. Sed nulla
                    amet lorem feugiat tempus aliquam.
                  </p>
                </div>
              </article>
              <article>
                <span class="icon solid fa-signal"></span>
                <div class="content">
                  <h3>Sed magna finibus</h3>
                  <p>
                    Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                    dolore. Proin aliquam facilisis ante interdum. Sed nulla
                    amet lorem feugiat tempus aliquam.
                  </p>
                </div>
              </article>
            </div>
          </section>

          <!-- Section -->
          <section>
            <header class="major">
              <h2>Ipsum sed dolor</h2>
            </header>
            <div class="posts">
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic01.jpg" alt=""
                /></a>
                <h3>Interdum aenean</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic02.jpg" alt=""
                /></a>
                <h3>Nulla amet dolore</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic03.jpg" alt=""
                /></a>
                <h3>Tempus ullamcorper</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic04.jpg" alt=""
                /></a>
                <h3>Sed etiam facilis</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic05.jpg" alt=""
                /></a>
                <h3>Feugiat lorem aenean</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
              <article>
                <a href="#" class="image"
                  ><img src="./editorial/images/pic06.jpg" alt=""
                /></a>
                <h3>Amet varius aliquam</h3>
                <p>
                  Aenean ornare velit lacus, ac varius enim lorem ullamcorper
                  dolore. Proin aliquam facilisis ante interdum. Sed nulla amet
                  lorem feugiat tempus aliquam.
                </p>
                <ul class="actions">
                  <li><a href="#" class="button">More</a></li>
                </ul>
              </article>
            </div>
          </section>
        </div>
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
