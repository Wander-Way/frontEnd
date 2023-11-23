<script setup>
import { ref } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";

const myPageStore = useMyPageStore();
const router = useRouter();

const localEmail = ref("");
const localPassword = ref("");
const localPassword2 = ref("");
const localNickname = ref("");
const localProfile = ref("");

const login = async () => {
  const params = ref({
    email: email.value,
    password: password.value,
  });
  console.log("params : ", params.value);

  const result = await myPageStore.requestLogin(params.value);
  console.log("result : ", result);

  if (result == true) {
    alert("로그인 성공");
    router.push({ name: "myPageLogin" });
  } else {
    alert("로그인 실패");
  }
};

const register = async () => {
  if (localPassword.value != localPassword2.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const params = {
    email: localEmail.value,
    password: localPassword.value,
    nickname: localNickname.value,
    profile: localProfile.value,
  };
  const result = await myPageStore.requestSignUp(params);

  if (result == true) {
    alert("회원가입 성공");
    router.push({ name: "myPage" });
  } else {
    alert("회원가입 실패");
  }
};
</script>

<template>
  <div class="bg-white text-gray-800">
    <div class="min-h-screen flex items-start justify-center">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            회원가입을 위해 아래의 정보를 입력해주세요.
          </p>
        </div>
        <form v-on:submit.prevent class="mt-8 space-y-6">
          <input type="hidden" name="remember" value="true" />
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">이메일 주소</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="이메일 주소"
                v-model="localEmail"
              />
            </div>
            <div>
              <label for="nickname" class="sr-only">닉네임</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                autocomplete="nickname"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="닉네임"
                v-model="localNickname"
              />
            </div>
            <div>
              <label for="password" class="sr-only">비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호"
                v-model="localPassword"
              />
            </div>
            <div>
              <label for="password2" class="sr-only">비밀번호</label>
              <input
                id="password2"
                name="password2"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="비밀번호 재입력"
                v-model="localPassword2"
              />
            </div>
          </div>

          <div>
            <!-- <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="btn_select"
            >
              회원가입
            </button> -->
            <button id="btn_select" @click="register">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#btn_select {
  width: 100%;
  padding: 10px 10px 10px 10px;
  background-color: #6f74b4;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: w-full;
  /* font-family: "Abhaya Libre", serif; */
  transition: background-color 0.3s ease;
}

#btn_select:hover {
  background-color: #b5afff;
}
</style>
