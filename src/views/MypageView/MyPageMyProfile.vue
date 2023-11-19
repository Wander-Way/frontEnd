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
    const {myPageMyInfo} = storeToRefs(myPageStore);
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
        <h1>내 프로필 화면</h1>
        <p>Email: {{ localEmail }}</p>
        <p>Password: {{ localPassword }}</p>
        <p>Nickname: {{ localNickname }}</p>
        <p>Profile: {{ localProfile }}</p> 
    </div>
</template>

<style scoped></style>
