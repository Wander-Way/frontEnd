
<script setup>

/*

로그인 파트 나중에 JWT 토큰 방식으로 변경할 예정

임시 로그인 방식 그냥 POST 요청하고 mypage.js 스토어에 저장하는 방식으로 구현


*/



import { ref } from 'vue';
import { useMyPageStore } from '../../stores/mypage.js';
import { RouterLink, useRouter } from "vue-router";

const email = ref('ssafytest@gmail.com');
const password = ref('p12345678');
const myPageStore = useMyPageStore();
const router = useRouter();


const login = async () => {
    const params = ref({
        email: email.value,
        password: password.value
    });
    console.log('params : ', params.value);

    const result = await myPageStore.requestLogin(params.value);
    console.log('result : ', result);

    if (result == true) {
        alert('로그인 성공');
        router.push({ name: "myPageHome" });
    }
    else {
        alert('로그인 실패');
    }
};
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form>
            <input type="text" v-model="email" placeholder="Email" />
            <input type="password" v-model="password" placeholder="Password" />
        </form>
        <button type="submit" @click="login">Login</button>
    </div>
</template>
  

<style>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    margin-bottom: 1rem;
}

input {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
}
</style>
