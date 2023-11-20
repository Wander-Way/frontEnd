
<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";
import { ref } from "vue";
import { useBoardStore } from "../../stores/board";


const boardStore = useBoardStore();

const articles = computed(() => boardStore.articles);
const router = useRouter();

const params = ref({
    key: "", //조건 검색 시 컬럼명
    word: "", //해당 컬럼에 일치하는 데이터
    pgno: 1, //조회할 페이지 번호
    spp: 20, //한번에 얻어올 게시글 개수
    city: "",//검색할 도시
});


const result = boardStore.getArticles(params.value);
if (result == true) {
    console.log('게시글 조회 성공');
}


//이건 수정 가능
//const { selectedOption } = storeToRefs(store);

//이건 수정 불가
const selectedOption = computed(() => {
    return boardStore.selectedOption;
});


const moveDetail = (id) => {
    console.log('id', id);
    router.push({ name: "article-detail", params: { id } });
};

</script>


<template>
    <Suspense>
        <div>
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
                <tr class="article-item" v-for="article in articles" :key="article.id" @click="moveDetail(article.id)">
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
        </div>
    </Suspense>
</template>

<style scoped></style>
