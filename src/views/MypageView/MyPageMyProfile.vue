<script setup>
import { ref, onMounted } from 'vue';
import { useMyPageStore } from '../../stores/mypage.js';
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const myPageStore = useMyPageStore();
const router = useRouter();
const myPageMyInfoLocal = ref({
    "email": '',
    "password": '',
    "nickname": '',
    "profile": '',
});

const localEmail = ref('');
const localPassword = ref('');
const localNickname = ref('');
const localProfile = ref('');


const requestMypage = async () => {
    await myPageStore.requestMypage();
    const { myPageMyInfo } = storeToRefs(myPageStore);
    myPageMyInfoLocal.value = myPageMyInfo.value;
    localEmail.value = myPageMyInfoLocal.value.email;
    localPassword.value = myPageMyInfoLocal.value.password;
    localNickname.value = myPageMyInfoLocal.value.nickname;
    localProfile.value = myPageMyInfoLocal.value.profile;
};

onMounted(requestMypage);

</script>

<template>
    <div>

        <body class="bg-gray-50">
        <div class="min-h-screen flex items-start justify-center">
            <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div class="flex flex-col items-center mb-4">
                    <img class="w-24 h-24 rounded-full" src="https://cataas.com/cat?size:640" alt="Profile Picture">
                        <h2 class="mt-3 text-xl font-semibold text-gray-800">이름</h2>
                        <p class="text-gray-600">email@gmail.com</p>
                    </div>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700">이메일</span>
                            <span class="text-gray-700"><p>Email: {{ localEmail }}</p></span>
                            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">변경</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700">닉네임</span>
                            <span class="text-gray-700">{{ localNickname }}</span>
                            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">변경</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700">프로필</span>
                            <span class="text-gray-700"> {{ localProfile }}</span>
                            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">변경</button>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-gray-700">비밀번호</span>
                            <span class="text-gray-700">{{ localPassword }}</span>
                            <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">변경</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>


        <!--<h1>내 프로필 화면</h1>
            <p>Email: {{ localEmail }}</p>
            <p>Password: {{ localPassword }}</p>
            <p>Nickname: {{ localNickname }}</p>
            <p>Profile: {{ localProfile }}</p>-->
    </div>
</template>

<style scoped></style>
