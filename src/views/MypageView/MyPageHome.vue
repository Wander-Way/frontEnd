<script setup>
import { useMyPageStore } from "../../stores/mypage.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { computed } from "vue";
import myPageSideSideNavBar from "../../views/MypageView/MyPageSideNavBar.vue";
import myPageLogin from "../../views/MypageView/MyPageLogin.vue";

const router = useRouter();

const myPageStore = useMyPageStore();

const bisLogin = computed(() => myPageStore.bIsLogin);


const loginButtonClick = () => {
    router.push({ name: "myPageLogin" });
    console.log("Button clicked!");
    return;
};




</script>

<template>
    <div>
        <!--<h1>마이페이지 홈 화면</h1>
        <p>마이페이지 홈 화면입니다.</p>-->
        <div v-if="bisLogin">
            <!--<p>로그인 되었습니다.</p>-->
            <!--<button @click="logOutButtonClick">로그아웃</button>-->
            <myPageSideSideNavBar></myPageSideSideNavBar>
            <RouterView></RouterView>
        </div>
        <div v-else>
            <myPageLogin></myPageLogin>
            <!--<p>로그인이 필요합니다.</p>-->
            <!--<button @click="loginButtonClick">로그인하러가기</button>-->
        </div>
    </div>
</template>

<style scoped></style>
